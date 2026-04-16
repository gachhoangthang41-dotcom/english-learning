import bcrypt from "bcryptjs";
import crypto from "crypto";

export function gen6DigitCode() {
  // an toàn hơn Math.random
  const n = crypto.randomInt(100000, 1000000);
  return String(n);
}

export async function hashCode(code: string) {
  return bcrypt.hash(code, 10);
}

export async function verifyCode(code: string, codeHash: string) {
  return bcrypt.compare(code, codeHash);
}
