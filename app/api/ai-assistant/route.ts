import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const EXTERNAL_MESSAGE_MAX_LENGTH = 1000;
const EXTERNAL_API_BASE_URL = process.env.AI_TUTOR_API_BASE_URL?.trim()?.replace(/\/+$/, "");
const EXTERNAL_API_KEY = process.env.AI_TUTOR_API_KEY?.trim();

function truncateText(value: string, maxLength: number): string {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

function isCloudflareTunnelError(status: number, body: string, serverHeader: string | null): boolean {
  const normalizedBody = body.toLowerCase();
  const normalizedServer = serverHeader?.toLowerCase() || "";

  return (
    status === 530 ||
    normalizedBody.includes("cloudflare tunnel error") ||
    normalizedBody.includes("error 1033") ||
    (normalizedServer.includes("cloudflare") && status === 502)
  );
}

function buildUpstreamErrorMessage(status: number, body: string): string {
  const trimmedBody = body.trim();

  if (!trimmedBody) {
    return `External AI API returned ${status}`;
  }

  if (trimmedBody.startsWith("<")) {
    return `External AI API returned ${status}`;
  }

  try {
    const parsed = JSON.parse(trimmedBody) as {
      message?: string;
      detail?: Array<{ msg?: string; loc?: string[] }>;
    };

    if (typeof parsed.message === "string" && parsed.message.trim()) {
      return parsed.message.trim();
    }

    const validationDetail = parsed.detail?.find((item) => typeof item?.msg === "string");

    if (validationDetail?.msg?.includes("at most 1000 characters")) {
      return "Câu hỏi hiện quá dài cho AI server. Hệ thống sẽ tự rút gọn ở các lượt tiếp theo, bạn có thể thử gửi lại hoặc chia nhỏ nội dung.";
    }

    if (validationDetail?.msg) {
      return validationDetail.msg;
    }
  } catch {
    // Fall through to raw text below when upstream does not return JSON.
  }

  return trimmedBody;
}

function normalizeMessages(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) return [];

  return messages.filter(
    (msg): msg is ChatMessage =>
      !!msg &&
      typeof msg === "object" &&
      ((msg as ChatMessage).role === "user" || (msg as ChatMessage).role === "assistant") &&
      typeof (msg as ChatMessage).content === "string" &&
      !!(msg as ChatMessage).content.trim()
  );
}

function buildExternalPrompt(messages: ChatMessage[]): string {
  if (messages.length === 0) return "";
  if (messages.length === 1) {
    return truncateText(messages[0].content, EXTERNAL_MESSAGE_MAX_LENGTH);
  }

  const latestMessage = messages[messages.length - 1];
  const latestUserMessage = latestMessage.role === "user"
    ? latestMessage.content
    : [...messages].reverse().find((msg) => msg.role === "user")?.content || latestMessage.content;
  const instruction = "Trả lời bằng tiếng Việt đơn giản, ngắn gọn, dễ hiểu cho trình độ A1-A2.";
  const latestSectionPrefix = "Tin nhắn mới nhất của người học: ";
  let latestSection = `${latestSectionPrefix}${latestUserMessage.replace(/\s+/g, " ").trim()}`;
  let prompt = [instruction, latestSection].join("\n\n");

  if (prompt.length > EXTERNAL_MESSAGE_MAX_LENGTH) {
    const availableLength = EXTERNAL_MESSAGE_MAX_LENGTH - instruction.length - latestSectionPrefix.length - 2;
    latestSection = `${latestSectionPrefix}${truncateText(latestUserMessage, Math.max(120, availableLength))}`;
    return truncateText([instruction, latestSection].join("\n\n"), EXTERNAL_MESSAGE_MAX_LENGTH);
  }

  const contextHeader = "Ngữ cảnh gần đây:";
  const contextLines: string[] = [];
  const recentMessages = messages.slice(0, -1).slice(-4).map((msg) => {
    const speaker = msg.role === "assistant" ? "Trợ lý" : "Người học";
    return `${speaker}: ${truncateText(msg.content, 140)}`;
  });

  for (let index = recentMessages.length - 1; index >= 0; index -= 1) {
    const nextContextLines = [recentMessages[index], ...contextLines];
    const candidatePrompt = [instruction, contextHeader, ...nextContextLines, latestSection].join("\n");

    if (candidatePrompt.length <= EXTERNAL_MESSAGE_MAX_LENGTH) {
      contextLines.unshift(recentMessages[index]);
    }
  }

  if (contextLines.length === 0) {
    return prompt;
  }

  prompt = [instruction, contextHeader, ...contextLines, latestSection].join("\n");
  return truncateText(prompt, EXTERNAL_MESSAGE_MAX_LENGTH);
}

export async function POST(request: Request) {
  try {
    if (!EXTERNAL_API_BASE_URL || !EXTERNAL_API_KEY) {
      console.error("[API /api/ai-assistant] Missing AI tutor API configuration.");

      return NextResponse.json(
        { message: "AI tutor API is not configured." },
        { status: 500 }
      );
    }

    const { messages, sessionId } = await request.json();
    const normalizedMessages = normalizeMessages(messages);

    if (normalizedMessages.length === 0) {
      return NextResponse.json(
        { message: "Messages array is required" },
        { status: 400 }
      );
    }

    const userId = typeof sessionId === "string" && sessionId.trim() ? sessionId.trim() : "web-anonymous-user";
    const externalMessage = buildExternalPrompt(normalizedMessages);

    const upstreamResponse = await fetch(`${EXTERNAL_API_BASE_URL}/api/v1/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": EXTERNAL_API_KEY,
      },
      body: JSON.stringify({
        message: externalMessage,
        user_id: userId,
      }),
      cache: "no-store",
    });

    if (!upstreamResponse.ok) {
      const rawError = await upstreamResponse.text().catch(() => "");

      if (isCloudflareTunnelError(upstreamResponse.status, rawError, upstreamResponse.headers.get("server"))) {
        return NextResponse.json(
          {
            message:
              "Server AI hiện không online. Cloudflare Tunnel chưa hoạt động hoặc chưa kết nối được tới máy chủ AI phía sau.",
          },
          { status: 502 }
        );
      }

      const message = buildUpstreamErrorMessage(upstreamResponse.status, rawError);

      return NextResponse.json(
        { message },
        { status: upstreamResponse.status === 502 ? 502 : 500 }
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
    console.error("[API /api/ai-assistant] External API proxy error:", error);

    if (error instanceof TypeError || (error instanceof Error && error.message.includes("fetch failed"))) {
      return NextResponse.json(
        {
          message:
            "Không thể kết nối tới server AI bên ngoài. Có thể tunnel hoặc máy chủ AI đang offline.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { message: "Đã xảy ra lỗi khi kết nối tới API AI bên ngoài." },
      { status: 500 }
    );
  }
}
