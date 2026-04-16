import { cookies } from "next/headers";
import { jwtVerify, type JWTPayload } from "jose";

const SESSION_COOKIE_NAMES = ["auth_session", "app_session"] as const;

function getCandidateSecrets() {
  return [
    process.env.JWT_SECRET,
    process.env.SESSION_SECRET,
    process.env.SESSION_JWT_SECRET,
    "dev_secret",
  ].filter((value, index, array): value is string => Boolean(value) && array.indexOf(value) === index);
}

async function verifyToken(token: string): Promise<JWTPayload | null> {
  for (const secretValue of getCandidateSecrets()) {
    try {
      const secret = new TextEncoder().encode(secretValue);
      const { payload } = await jwtVerify(token, secret);
      return payload;
    } catch {
      continue;
    }
  }

  return null;
}

export async function getUserIdFromSessionCookies() {
  const cookieStore = await cookies();

  for (const cookieName of SESSION_COOKIE_NAMES) {
    const token = cookieStore.get(cookieName)?.value;
    if (!token) {
      continue;
    }

    const payload = await verifyToken(token);
    const userId = String(payload?.userId || "").trim();
    if (userId) {
      return userId;
    }
  }

  return null;
}