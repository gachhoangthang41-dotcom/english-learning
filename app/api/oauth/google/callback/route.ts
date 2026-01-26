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
    return NextResponse.redirect(
      `${process.env.APP_URL}/login?error=oauth_state_invalid`
    );
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
    return NextResponse.redirect(
      `${process.env.APP_URL}/login?error=oauth_token_failed`
    );
  }

  // 2) Lấy profile (v2 userinfo có field "id" = sub/googleId)
  const profileRes = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  const profile = await profileRes.json().catch(() => null);

  const email = String(profile?.email || "").trim().toLowerCase();
  const name = String(profile?.name || "").trim();
  const picture = String(profile?.picture || "").trim();

  // ✅ cái này quan trọng nhất
  const googleId = String(profile?.id || "").trim();

  if (!email) {
    return NextResponse.redirect(
      `${process.env.APP_URL}/login?error=oauth_no_email`
    );
  }
  if (!googleId) {
    return NextResponse.redirect(
      `${process.env.APP_URL}/login?error=oauth_no_google_id`
    );
  }

  // ✅ A) Ưu tiên 1: đã có googleSub => login đúng user đó
  const byGoogle = await prisma.user.findUnique({
    where: { googleSub: googleId },
    select: { id: true, email: true, username: true, role: true },
  });

  let userId: string;
  let usernameForSession = "";
  let roleForSession = "user";

  if (byGoogle) {
    userId = byGoogle.id;
    usernameForSession = byGoogle.username ?? byGoogle.email;
    roleForSession = byGoogle.role;
  } else {
    // ✅ B) Ưu tiên 2: tìm theo email (insensitive để không bị trùng hoa thường)
    const byEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        displayName: true,
        avatarUrl: true,
      },
    });

    if (byEmail) {
      // ✅ Link googleSub vào user cũ
      await prisma.user.update({
        where: { id: byEmail.id },
        data: {
          googleSub: googleId,
          oauthProvider: "google",

          // chỉ update nếu user đang trống
          displayName: byEmail.displayName || name || undefined,
          avatarUrl: byEmail.avatarUrl || picture || undefined,
          emailVerifiedAt: new Date(),

          // ép email về lowercase luôn để hết trùng
          email: byEmail.email.toLowerCase(),
        },
      });

      userId = byEmail.id;
      usernameForSession = byEmail.username ?? byEmail.email;
      roleForSession = byEmail.role;
    } else {
      // ✅ C) Chưa có email => tạo user mới
      const created = await prisma.user.create({
        data: {
          email,
          username: null,
          displayName: name || null,
          avatarUrl: picture || null,
          emailVerifiedAt: new Date(),
          role: "user",
          passwordHash: null,

          googleSub: googleId,
          oauthProvider: "google",
        },
        select: { id: true, username: true, email: true, role: true },
      });

      userId = created.id;
      usernameForSession = created.username ?? created.email;
      roleForSession = created.role;
    }
  }

  // 3) Session cookie
  const maxAge = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 2;

  const token = await createSessionToken(
    { userId, username: usernameForSession, role: roleForSession },
    maxAge
  );

  (await cookies()).set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });

  // clear oauth cookies
  (await cookies()).set("oauth_state", "", { path: "/", maxAge: 0 });
  (await cookies()).set("oauth_remember", "", { path: "/", maxAge: 0 });

  return NextResponse.redirect(`${process.env.APP_URL}/home`);
}
