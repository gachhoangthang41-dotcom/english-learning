import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const EXTERNAL_FEEDBACK_URL = process.env.EXTERNAL_FEEDBACK_URL?.trim().replace(/\/+$/, "") || 
  (process.env.AI_TUTOR_API_BASE_URL ? `${process.env.AI_TUTOR_API_BASE_URL.trim().replace(/\/+$/, "")}/api/v1/feedback` : undefined);
const EXTERNAL_FEEDBACK_API_KEY = process.env.EXTERNAL_FEEDBACK_API_KEY?.trim() || process.env.AI_TUTOR_API_KEY?.trim();

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    // Debug log incoming payload to server logs
    try {
      console.log("[API /api/ai-feedback] Received payload:", JSON.stringify(body));
    } catch (e) {
      console.log("[API /api/ai-feedback] Received payload (non-serializable)");
    }

    // Accept both legacy and new payload shapes
    const rawMessageId = (body?.metadata?.message_id as string) || (body?.messageId as string) || null;
    const messageId = rawMessageId || `msg_${Date.now()}`;
    const assistantContent = (body?.response as string) || (body?.assistantContent as string) || "";
    const previousUserInput = (body?.query as string) || (body?.previousUserInput as string) || null;
    const sessionId = (body?.metadata?.session_id as string) || (body?.sessionId as string) || null;
    const userId = (body?.user_id as string) || (body?.userId as string) || null;
    const feedbackType = (body?.feedback_type as string) || (body?.feedbackType as string) || (body?.command ? "explicit_command" : "unknown");
    const liked = typeof body?.liked === "boolean" ? body.liked : typeof body?.score === "number" ? body.score === 1 : (body?.command === "like");

    if (!assistantContent) {
      return NextResponse.json({ message: "Missing required fields (response)" }, { status: 400 });
    }

    // Try to save with Prisma model if available, otherwise fallback to raw SQL.
    let savedId = `fb_${Date.now()}`;
    try {
      if ((prisma as any).aiFeedback && typeof (prisma as any).aiFeedback.create === "function") {
        const record = await (prisma as any).aiFeedback.create({
          data: {
            messageId,
            assistantContent: assistantContent.slice(0, 10000),
            previousUserInput: previousUserInput ?? null,
            sessionId: sessionId ?? null,
            userId: userId ?? null,
            feedbackType,
          },
        });
        savedId = record.id;
      } else {
        // ensure table exists and insert using raw SQL (works even if Prisma client not regenerated)
        const createTableSql = `
          CREATE TABLE IF NOT EXISTS "AiFeedback" (
            id TEXT PRIMARY KEY,
            user_id TEXT,
            session_id TEXT,
            message_id TEXT,
            assistant_content TEXT,
            previous_user_input TEXT,
            feedback_type TEXT,
            liked BOOLEAN,
            score INTEGER,
            command TEXT,
            metadata JSONB,
            created_at TIMESTAMPTZ DEFAULT NOW()
          );
        `;

        await prisma.$executeRawUnsafe(createTableSql);

        // Insert record
        const metadataJson = JSON.stringify((body as any)?.metadata ?? {});
        await prisma.$executeRaw`
          INSERT INTO "AiFeedback"
            (id, user_id, session_id, message_id, assistant_content, previous_user_input, feedback_type, liked, score, command, metadata, created_at)
          VALUES (
            ${savedId}, ${userId}, ${sessionId}, ${messageId}, ${assistantContent}, ${previousUserInput}, ${feedbackType}, ${liked}, ${body?.score ?? null}, ${body?.command ?? null}, ${metadataJson}, NOW()
          )`;
      }
    } catch (saveErr) {
      console.warn("[API /api/ai-feedback] Save error (fallback):", saveErr);
    }

    // Forward to external feedback API if configured (non-blocking, but we attempt to send)
    if (EXTERNAL_FEEDBACK_URL) {
      const forwardPayload = {
        query: previousUserInput || "",
        response: assistantContent,
        liked: liked === undefined ? null : liked,
        score: body?.score ?? (liked ? 1 : 0),
        user_id: userId ?? null,
        feedback_type: feedbackType,
        command: body?.command ?? (liked ? "like" : "dislike"),
        correction: body?.correction ?? null,
        metadata: body?.metadata ?? { message_id: messageId, session_id: sessionId, intent: null, source: "AI_TUTOR" },
        timestamp: body?.timestamp ?? new Date().toISOString(),
      } as any;

      try {
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (EXTERNAL_FEEDBACK_API_KEY) {
          headers["Authorization"] = `Bearer ${EXTERNAL_FEEDBACK_API_KEY}`;
          headers["X-API-Key"] = EXTERNAL_FEEDBACK_API_KEY;
        }
        const upstreamRes = await fetch(EXTERNAL_FEEDBACK_URL, {
          method: "POST",
          headers,
          body: JSON.stringify(forwardPayload),
          cache: "no-store",
        });

        if (!upstreamRes.ok) {
          const raw = await upstreamRes.text().catch(() => "");
          console.warn("[API /api/ai-feedback] Forward failed:", upstreamRes.status, raw);
        }
      } catch (err) {
        console.error("[API /api/ai-feedback] Forward error:", err);
      }
    }

    return NextResponse.json({ status: "ok", id: savedId, forwarded: Boolean(EXTERNAL_FEEDBACK_URL) });
  } catch (error) {
    console.error("[API /api/ai-feedback] Error:", error);
    return NextResponse.json({ message: "Failed to save feedback" }, { status: 500 });
  }
}
