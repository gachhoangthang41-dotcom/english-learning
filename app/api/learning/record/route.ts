import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { SESSION_COOKIE_NAME } from "@/lib/session";

export const runtime = "nodejs";

// ✅ Lấy userId từ cookie JWT
async function getUserIdFromSession() {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const secretRaw =
    process.env.JWT_SECRET || process.env.SESSION_SECRET || "dev_secret";
  const secret = new TextEncoder().encode(secretRaw);

  try {
    const { payload } = await jwtVerify(token, secret);
    const userId = String(payload?.userId || "");
    return userId || null;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromSession();
    
    console.log("[API /learning/record] UserId:", userId);
    
    if (!userId) {
      console.log("[API /learning/record] ERROR: No valid session");
      return NextResponse.json(
        { status: "error", message: "Unauthenticated - no token" },
        { status: 401 }
      );
    }

    // ✅ Verify user exists in database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      console.log("[API /learning/record] ERROR: User not found in database");
      return NextResponse.json(
        { status: "error", message: "User not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { level, wordId, word, meaning } = body;
    
    console.log("[API /learning/record] Request body:", { level, wordId, word, meaning });

    if (!level || wordId === undefined || !word || !meaning) {
      console.log("[API /learning/record] Missing required fields");
      return NextResponse.json(
        {
          status: "error",
          message: "Missing required fields: level, wordId, word, meaning",
        },
        { status: 400 }
      );
    }

    // Only create a new learning record if it doesn't already exist
    const existing = await prisma.learningProgress.findUnique({
      where: {
        userId_level_wordId: {
          userId,
          level,
          wordId,
        },
      },
    });

    let learning = existing;
    if (!existing) {
      console.log("[API /learning/record] Creating new learning progress for word:", word);
      learning = await prisma.learningProgress.create({
        data: {
          userId,
          level,
          wordId,
          word,
          meaning,
        },
      });
      
      console.log("[API /learning/record] Incrementing learnedWordsCount");
      // Increment user's learnedWordsCount only when a new unique word is created
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { learnedWordsCount: { increment: 1 } },
        select: { learnedWordsCount: true },
      });
      console.log("[API /learning/record] New learnedWordsCount:", updatedUser.learnedWordsCount);
    } else {
      console.log("[API /learning/record] Word already learned, skipping");
    }

    console.log("[API /learning/record] Success");
    return NextResponse.json(
      {
        status: "success",
        message: "Word learned recorded successfully",
        data: learning,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API /learning/record] Error:", error);
    return NextResponse.json(
      { 
        status: "error", 
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
