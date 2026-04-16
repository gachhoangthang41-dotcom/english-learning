import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/models/prisma';
import {
  getFlashcardReviewLevel,
  getFlashcardWordId,
  getOppositeFlashcardReviewLevel,
  normalizeFlashcardWord,
  type FlashcardReviewStatus,
} from '@/controllers/flashcards';
import { getUserIdFromSessionCookies } from '@/controllers/server-session-user';

export const runtime = "nodejs";

function isValidStatus(value: string | null): value is FlashcardReviewStatus {
  return value === "known" || value === "unknown";
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromSessionCookies();
    if (!userId) {
      return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
    }

    const status = request.nextUrl.searchParams.get("status");
    if (!isValidStatus(status)) {
      return NextResponse.json({ status: "error", message: "Invalid status" }, { status: 400 });
    }

    const items = await prisma.learningProgress.findMany({
      where: {
        userId,
        level: getFlashcardReviewLevel(status),
      },
      orderBy: { learnedAt: "desc" },
    });

    return NextResponse.json({ status: "success", data: items });
  } catch (error) {
    console.error("[API /flashcards/review GET] Error:", error);
    return NextResponse.json({ status: "error", message: "Failed to load flashcard review list" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromSessionCookies();
    if (!userId) {
      return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const status = body?.status;
    const word = String(body?.word || "").trim();
    const meaning = String(body?.meaning || "").trim();
    const pronunciation = typeof body?.pronunciation === "string" ? body.pronunciation.trim() : null;
    const partOfSpeech = typeof body?.partOfSpeech === "string" ? body.partOfSpeech.trim() : null;

    if (!isValidStatus(status)) {
      return NextResponse.json({ status: "error", message: "Invalid status" }, { status: 400 });
    }

    if (!word || !meaning) {
      return NextResponse.json(
        { status: "error", message: "Missing required fields: word and meaning" },
        { status: 400 }
      );
    }

    const normalizedWord = normalizeFlashcardWord(word) || word.toLowerCase();
    const wordId = getFlashcardWordId(normalizedWord);
    const targetLevel = getFlashcardReviewLevel(status);
    const oppositeLevel = getOppositeFlashcardReviewLevel(status);

    const saved = await prisma.$transaction(async (transaction) => {
      await transaction.learningProgress.deleteMany({
        where: {
          userId,
          level: oppositeLevel,
          wordId,
        },
      });

      return transaction.learningProgress.upsert({
        where: {
          userId_level_wordId: {
            userId,
            level: targetLevel,
            wordId,
          },
        },
        update: {
          word,
          meaning,
          pronunciation,
          partOfSpeech,
          learnedAt: new Date(),
        },
        create: {
          userId,
          level: targetLevel,
          wordId,
          word,
          meaning,
          pronunciation,
          partOfSpeech,
        },
      });
    });

    return NextResponse.json({ status: "success", data: saved });
  } catch (error) {
    console.error("[API /flashcards/review POST] Error:", error);
    return NextResponse.json({ status: "error", message: "Failed to record flashcard review" }, { status: 500 });
  }
}