import { NextResponse } from "next/server";
import { prisma } from '@/models/prisma';
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE_NAME } from '@/controllers/session';

export const runtime = "nodejs";

export async function GET() {
  try {
    const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value || "";
    let currentUserId = null;

    if (token) {
      try {
        const sess = await verifySession(token);
        currentUserId = sess.userId;
      } catch (e) {
        // Ignore invalid session
      }
    }

    const users = await prisma.user.findMany({
      where: currentUserId ? { id: { not: currentUserId } } : undefined,
      select: {
        id: true,
        displayName: true,
        username: true,
        avatarUrl: true,
        learnedWordsCount: true,
        createdAt: true,
        level: {
          select: {
            code: true,
            name: true,
          },
        },
      },
      take: 50,
      orderBy: {
        learnedWordsCount: 'desc'
      }
    });

    return NextResponse.json({ status: "success", users });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { status: "error", message: "Server error" },
      { status: 500 }
    );
  }
}
