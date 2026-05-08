import { getSession } from "next-auth/react";

// URL Backend - cập nhật khi chạy Cloudflare Tunnel mới
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://seriously-colin-scheduled-comparable.trycloudflare.com";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "viet-tutor-secret-key-2024";

/**
 * Lấy user_id từ NextAuth session.
 * Trả về CUID id từ bảng User trong database frontend.
 */
async function getUserId(): Promise<string> {
  const session = await getSession();
  if (session?.user) {
    // Ưu tiên dùng id (CUID), fallback về email
    return (session.user as any).id || session.user.email || "anonymous";
  }
  return "anonymous";
}

/**
 * Gọi API backend với user_id tự động.
 */
export async function callBackendAPI(
  endpoint: string,
  body: Record<string, any>,
  method: string = "POST"
): Promise<any> {
  const userId = await getUserId();

  const response = await fetch(`${BACKEND_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
    },
    body: JSON.stringify({
      ...body,
      user_id: userId,  // <-- Tự động gắn user_id vào mọi request
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message || `API error: ${response.status}`);
  }

  return response.json();
}
