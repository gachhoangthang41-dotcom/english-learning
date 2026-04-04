import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const remember = url.searchParams.get("remember") === "1";
  const state = crypto.randomUUID();

  // ✅ cookies() KHÔNG cần await
  (await
        // ✅ cookies() KHÔNG cần await
        cookies()).set("oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 10 * 60,
  });

  (await cookies()).set("oauth_remember", remember ? "1" : "0", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 10 * 60,
  });

  const redirectUri = `${process.env.APP_URL}/api/oauth/google/callback`;

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID || "");
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid email profile");
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("prompt", "select_account");
console.log("✅ GOOGLE OAUTH redirectUri =", redirectUri);
console.log("✅ FULL Google URL =", authUrl.toString());

  return NextResponse.redirect(authUrl.toString());
 
}
