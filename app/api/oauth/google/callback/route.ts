import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE_NAME, createSessionToken } from "@/lib/session";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const savedState = (await cookies()).get("oauth_state")?.value;
  const remember = (await cookies()).get("oauth_remember")?.value === "1";

  if (!code || !state || !savedState || savedState !== state) {
    return NextResponse.redirect(`${process.env.APP_URL}/login?error=oauth_state_invalid`);
  }

  const redirectUri = `${process.env.APP_URL}/api/oauth/google/callback`;

  // 1) Đổi code -> access_token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID || "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    }),
  });

  const tokenData = await tokenRes.json().catch(() => null);
  const accessToken = tokenData?.access_token;

  if (!accessToken) {
    return NextResponse.redirect(`${process.env.APP_URL}/login?error=oauth_token_failed`);
  }

  // 2) Lấy profile
  const profileRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const profile = await profileRes.json().catch(() => null);

  const email = String(profile?.email || "").trim();
  const name = String(profile?.name || "").trim();
  const picture = String(profile?.picture || "").trim();

  if (!email) {
    return NextResponse.redirect(`${process.env.APP_URL}/login?error=oauth_no_email`);
  }

  // 3) Upsert User (giữ schema của bạn)
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      displayName: name || undefined,
      avatarUrl: picture || undefined,
      emailVerifiedAt: new Date(),
    },
    create: {
      email,
      username: null,
      displayName: name || null,
      avatarUrl: picture || null,
      emailVerifiedAt: new Date(),
      role: "user",
      passwordHash: null,
    },
  });

  // 4) Sign session theo format bạn đang dùng
  const maxAge = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 2; // 30 ngày hoặc 2h

  const token = await createSessionToken(
    {
      userId: user.id,
      username: user.username ?? user.email, // ✅ OAuth user chưa có username
      role: user.role,
    },
    maxAge
  );

  (await cookies()).set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });

  (await cookies()).set("oauth_state", "", { path: "/", maxAge: 0 });
  (await cookies()).set("oauth_remember", "", { path: "/", maxAge: 0 });

  return NextResponse.redirect(`${process.env.APP_URL}/home`);
}
