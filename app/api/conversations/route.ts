import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get("sessionId");
    const userId = url.searchParams.get("userId");

    if (!sessionId && !userId) {
      return NextResponse.json({ message: "sessionId or userId required" }, { status: 400 });
    }

    let conv = null;
    if (sessionId) {
      conv = await prisma.chatConversation.findUnique({ where: { sessionId } });
    } else {
      conv = await prisma.chatConversation.findFirst({ where: { userId }, orderBy: { updatedAt: "desc" } });
    }

    return NextResponse.json(conv);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("/api/conversations GET error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, userId, messages, title } = body as {
      sessionId?: string;
      userId?: string;
      messages?: unknown;
      title?: string;
    };

    if (!Array.isArray(messages)) {
      return NextResponse.json({ message: "messages array required" }, { status: 400 });
    }

    if (sessionId) {
      const existing = await prisma.chatConversation.findUnique({ where: { sessionId } });
      if (existing) {
        const updated = await prisma.chatConversation.update({ where: { id: existing.id }, data: { messages, title } });
        return NextResponse.json(updated);
      }

      const created = await prisma.chatConversation.create({ data: { sessionId, userId, messages, title } });
      return NextResponse.json(created);
    }

    if (userId) {
      const created = await prisma.chatConversation.create({ data: { userId, messages, title } });
      return NextResponse.json(created);
    }

    const created = await prisma.chatConversation.create({ data: { messages, title } });
    return NextResponse.json(created);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("/api/conversations POST error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const sessionId = url.searchParams.get("sessionId");

    if (id) {
      const deleted = await prisma.chatConversation.delete({ where: { id } });
      return NextResponse.json(deleted);
    }

    if (sessionId) {
      const existing = await prisma.chatConversation.findUnique({ where: { sessionId } });
      if (!existing) return NextResponse.json({ message: "Not found" }, { status: 404 });
      const deleted = await prisma.chatConversation.delete({ where: { id: existing.id } });
      return NextResponse.json(deleted);
    }

    return NextResponse.json({ message: "id or sessionId required" }, { status: 400 });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("/api/conversations DELETE error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
