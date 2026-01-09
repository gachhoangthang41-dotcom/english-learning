import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "dev_secret");

export type SessionPayload = {
  userId: string;
  username: string;
  role: string;
};

export async function signSession(payload: SessionPayload, maxAgeSeconds?: number) {
  const jwt = new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt();

  if (maxAgeSeconds) jwt.setExpirationTime(`${maxAgeSeconds}s`);
  else jwt.setExpirationTime("2h"); // session ngắn nếu không remember

  return jwt.sign(secret);
}

export async function verifySession(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload as unknown as SessionPayload;
}
