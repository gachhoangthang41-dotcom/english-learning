import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

function isValidGoogleClientId(value: string) {
  return /^\d+-[A-Za-z0-9_.-]+\.apps\.googleusercontent\.com$/.test(value);
}

export async function GET(req: Request) {
  const url = new URL(req.url);

  const remember = url.searchParams.get("remember") === "1";
  const flow = url.searchParams.get("flow") === "register" ? "register" : "login";
  const state = crypto.randomUUID();
  const appUrl = (process.env.APP_URL || url.origin).trim();
  const clientId = (process.env.GOOGLE_CLIENT_ID || "").trim();
  const authPath = flow === "register" ? "/register" : "/login";

  if (!isValidGoogleClientId(clientId)) {
    console.error("Invalid GOOGLE_CLIENT_ID configuration");
    return NextResponse.redirect(`${appUrl}${authPath}?error=oauth_google_config_invalid`);
  }

  const cookieStore = await cookies();

  cookieStore.set("oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 10 * 60,
  });

  cookieStore.set("oauth_remember", remember ? "1" : "0", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 10 * 60,
  });

  cookieStore.set("oauth_flow", flow, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 10 * 60,
  });

  const redirectUri = `${appUrl}/api/oauth/google/callback`;

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid email profile");
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("prompt", "select_account");

  console.log("GOOGLE OAUTH redirectUri =", redirectUri);

  return NextResponse.redirect(authUrl.toString());
}
