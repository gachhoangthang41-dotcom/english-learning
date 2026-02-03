// lib/session.ts
import { SignJWT, jwtVerify } from "jose";

export type SessionPayload = {
  userId: string;
  username: string;
  role: string;
};

// ✅ đồng bộ với code dùng cookies().get(SESSION_COOKIE_NAME)
export const SESSION_COOKIE_NAME = "auth_session";

function getSecret(): Uint8Array {
  const raw =
    process.env.JWT_SECRET ||
    process.env.SESSION_SECRET ||
    "dev_secret"; // chỉ dùng khi dev

  return new TextEncoder().encode(raw);
}

export async function signSession(payload: SessionPayload, maxAgeSeconds?: number) {
  const secret = getSecret();

  const jwt = new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt();

  if (maxAgeSeconds && Number.isFinite(maxAgeSeconds) && maxAgeSeconds > 0) {
    jwt.setExpirationTime(`${Math.floor(maxAgeSeconds)}s`);
  } else {
    jwt.setExpirationTime("2h"); // session ngắn nếu không remember
  }

  return jwt.sign(secret);
}

/**
 * ✅ Alias để OAuth callback dùng chung tên createSessionToken
 * Không phá code cũ
 */
export const createSessionToken = signSession;

export async function verifySession(token: string): Promise<SessionPayload> {
  const secret = getSecret();
  const { payload } = await jwtVerify(token, secret);

  // ✅ normalize + validate tối thiểu
  const userId = String((payload as any)?.userId || "");
  const username = String((payload as any)?.username || "");
  const role = String((payload as any)?.role || "user");

  if (!userId) throw new Error("Invalid session: missing userId");

  return { userId, username, role };
}
