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

  // 1) Exchange code -> access_token
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

  // 2) Get Google profile (v2 userinfo có field id)
  const profileRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const profile = await profileRes.json().catch(() => null);

  const email = String(profile?.email || "").trim().toLowerCase();
  const name = String(profile?.name || "").trim();
  const picture = String(profile?.picture || "").trim();
  const googleId = String(profile?.id || "").trim(); // ✅ chính là sub/google user id

  if (!email) {
    return NextResponse.redirect(`${process.env.APP_URL}/login?error=oauth_no_email`);
  }
  if (!googleId) {
    return NextResponse.redirect(`${process.env.APP_URL}/login?error=oauth_no_google_id`);
  }

  // ✅ lấy Level A1 để set mặc định
  const levelA1 = await prisma.level.findUnique({
    where: { code: "A1" },
    select: { id: true },
  });

  // 3) Ưu tiên tìm theo googleSub trước
  const byGoogle = await prisma.user.findUnique({
    where: { googleSub: googleId },
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
      levelId: true,
    },
  });

  let userId = "";
  let usernameForSession = "";
  let roleForSession = "user";

  if (byGoogle) {
    // ✅ user đã link google trước đó
    userId = byGoogle.id;
    usernameForSession = byGoogle.username ?? byGoogle.email;
    roleForSession = byGoogle.role;

    // ✅ nếu user này chưa có level => set A1
    if (!byGoogle.levelId && levelA1?.id) {
      await prisma.user.update({
        where: { id: byGoogle.id },
        data: { levelId: levelA1.id },
      });
    }
  } else {
    // 4) Nếu chưa có googleSub => tìm user theo email (chống trùng hoa thường)
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
        levelId: true,
      },
    });

    if (byEmail) {
      // ✅ Link googleSub vào user cũ (đăng ký Gmail trước đó)
      await prisma.user.update({
        where: { id: byEmail.id },
        data: {
          googleSub: googleId,
          oauthProvider: "google",
          emailVerifiedAt: new Date(),

          // chỉ update nếu đang trống
          displayName: byEmail.displayName || name || undefined,
          avatarUrl: byEmail.avatarUrl || picture || undefined,

          // ép email về lowercase để sạch
          email: byEmail.email.toLowerCase(),

          // ✅ nếu chưa có level => set A1
          levelId: byEmail.levelId ?? levelA1?.id ?? null,
        },
      });

      userId = byEmail.id;
      usernameForSession = byEmail.username ?? byEmail.email;
      roleForSession = byEmail.role;
    } else {
      // ✅ Chưa có user nào => tạo user mới
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

          // ✅ mặc định A1
          levelId: levelA1?.id ?? null,
        },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
        },
      });

      userId = created.id;
      usernameForSession = created.username ?? created.email;
      roleForSession = created.role;
    }
  }

  // 5) Create session cookie
  const maxAge = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 2; // 30 ngày hoặc 2h

  const sessionToken = await createSessionToken(
    {
      userId,
      username: usernameForSession,
      role: roleForSession,
    },
    maxAge
  );

  (await cookies()).set(SESSION_COOKIE_NAME, sessionToken, {
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
