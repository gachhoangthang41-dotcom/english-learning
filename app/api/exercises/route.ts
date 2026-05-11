import { NextResponse } from "next/server";

const EXTERNAL_API_BASE_URL = process.env.AI_TUTOR_API_BASE_URL?.trim()?.replace(/\/+$/, "") || "https://website-joyce-payroll-lived.trycloudflare.com";
const EXTERNAL_API_KEY = process.env.AI_TUTOR_API_KEY?.trim() || "viet-tutor-secret-key-2024"; // Fallback to provided key if missing

export async function POST(request: Request) {
  try {
    const { action, message, sessionId, tense } = await request.json();
    
    // We expect action to be 'new_quiz' or 'answer'
    let finalMessage = "";
    if (action === "new_quiz") {
      const targetTense = tense || "các thì tiếng anh";
      finalMessage = `Tạo 1 câu hỏi trắc nghiệm tiếng Anh (chỉ có duy nhất 1 chỗ trống cần điền) về ${targetTense}. Bắt buộc cung cấp 4 lựa chọn A, B, C, D. Không tạo bài đục lỗ nhiều chỗ. Không hỏi lý thuyết.`;
    } else if (action === "answer") {
      finalMessage = message; // "A", "B", "C", "D", etc.
    } else {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    const userId = typeof sessionId === "string" && sessionId.trim() ? sessionId.trim() : "web-anonymous-user";

    const upstreamResponse = await fetch(`${EXTERNAL_API_BASE_URL}/api/v1/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": EXTERNAL_API_KEY,
      },
      body: JSON.stringify({
        message: finalMessage,
        user_id: userId,
      }),
      cache: "no-store",
    });

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        { message: "External AI API returned an error." },
        { status: upstreamResponse.status }
      );
    }

    const data = await upstreamResponse.json().catch(() => null);
    const text = data?.response || data?.text || data?.message || "";

    if (!text) {
      return NextResponse.json(
        { message: "External AI API returned an empty response." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      text,
      status: "success",
    });
  } catch (error) {
    console.error("[API /api/exercises] External API proxy error:", error);
    return NextResponse.json(
      { message: "Đã xảy ra lỗi khi kết nối tới API AI bên ngoài." },
      { status: 500 }
    );
  }
}
