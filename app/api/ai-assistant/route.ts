import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

// System prompt configuration
const systemPrompt = `Bạn là một trợ lý tiếng Anh nhiệt tình, thân thiện và kiên nhẫn. 
Đối tượng học viên của bạn là những người mới bắt đầu (Trình độ A1-A2).
Nhiệm vụ của bạn:
1. Giải thích ngữ pháp tiếng Anh, từ vựng một cách đơn giản, dễ hiểu nhất bằng tiếng Việt.
2. Đưa ra các ví dụ thực tế, ngắn gọn kèm theo bản dịch tiếng Việt.
3. Luôn khích lệ người học.
4. KHÔNG dùng ngôn ngữ học thuật phức tạp. KHÔNG trả lời dài dòng quá 150 chữ trừ phi thực sự cần thiết.
Nếu người dùng hỏi các vấn đề không liên quan đến việc học tiếng Anh hoặc giao tiếp cơ bản, hãy lịch sự từ chối và hướng họ quay lại việc học tiếng Anh.`;

// Khởi tạo Gemini AI (thay vì OpenAI) với process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: systemPrompt,
});

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { message: "Messages array is required" },
        { status: 400 }
      );
    }

    // Process chat history into Gemini's format
    // Gemini 1.5 format requires role to be "user" or "model"
    let history = messages.slice(0, -1).map((msg: ChatMessage) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // Gemini API requires the first message in history to be from 'user'
    // The frontend sends the welcome 'assistant' message first, which we must drop
    if (history.length > 0 && history[0].role === "model") {
      history = history.slice(1);
    }

    // The last message is what we'll send to start/continue the chat
    const latestMessage = messages[messages.length - 1]?.content || "";

    const chat = model.startChat({
        history: history,
    });

    const result = await chat.sendMessage(latestMessage);
    const responseText = result.response.text();

    return NextResponse.json({
      text: responseText,
      status: "success",
    });

  } catch (error) {
    console.error("[API /api/ai-assistant] Error:", error);
    return NextResponse.json(
      { message: "Đã xảy ra lỗi khi tạo phản hồi từ AI." },
      { status: 500 }
    );
  }
}
