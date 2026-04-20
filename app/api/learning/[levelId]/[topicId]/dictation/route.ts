import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/models/prisma';
import { LESSONS_BY_LEVEL, type LessonContent } from '@/models/data/a1-lessons';
import type { CefrLevel, Prisma } from "@prisma/client";

export const runtime = "nodejs";

type DictationSegment = {
    id: number;
    startTime: number;
    endTime: number;
    text: string;
    translation: string;
};

const VALID_LEVEL_CODES: readonly CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
const MOCK_VIDEO_ID = "t205A51S07A";
const MOCK_SEGMENTS: DictationSegment[] = [
    {
        id: 1,
        startTime: 0,
        endTime: 3,
        text: "Hello everyone! My name is Anna.",
        translation: "Xin chĂ o má»i ngÆ°á»i! TĂªn tĂ´i lĂ  Anna."
    },
    {
        id: 2,
        startTime: 3.5,
        endTime: 6,
        text: "I come from New York.",
        translation: "TĂ´i Ä‘áº¿n tá»« New York."
    },
    {
        id: 3,
        startTime: 6.5,
        endTime: 9,
        text: "Today, I want to talk about my daily routine.",
        translation: "HĂ´m nay, tĂ´i muá»‘n nĂ³i vá» thĂ³i quen hĂ ng ngĂ y cá»§a mĂ¬nh."
    },
    {
        id: 4,
        startTime: 9.5,
        endTime: 13,
        text: "I usually wake up at 7:00 AM.",
        translation: "TĂ´i thÆ°á»ng thá»©c dáº­y lĂºc 7 giá» sĂ¡ng."
    },
    {
        id: 5,
        startTime: 13.5,
        endTime: 17,
        text: "Then I have breakfast with coffee and toast.",
        translation: "Sau Ä‘Ă³ tĂ´i Äƒn sĂ¡ng vá»›i cĂ  phĂª vĂ  bĂ¡nh mĂ¬ nÆ°á»›ng."
    }
];

function toLocalSegments(lessonData: LessonContent, autoSentences: string[]): DictationSegment[] {
    return lessonData.segments.map((segment, index) => ({
        id: index + 1,
        startTime: segment.start,
        endTime: segment.end,
        text: segment.text || autoSentences[index] || "(no text)",
        translation: "..."
    }));
}

function isDictationSegment(value: unknown): value is DictationSegment {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const segment = value as Partial<DictationSegment>;
    return (
        typeof segment.id === "number" &&
        typeof segment.startTime === "number" &&
        typeof segment.endTime === "number" &&
        typeof segment.text === "string" &&
        typeof segment.translation === "string"
    );
}

function parseDbSegments(value: Prisma.JsonValue | null): DictationSegment[] | null {
    if (!Array.isArray(value)) {
        return null;
    }

    const parsed = value.filter(isDictationSegment);
    return parsed.length > 0 ? parsed : null;
}

export async function GET(
    _request: NextRequest,
    context: { params: Promise<{ levelId: string; topicId: string }> }
) {
    try {
        const { levelId, topicId } = await context.params;
        const upperLevelId = levelId.toUpperCase();
        const isCode = VALID_LEVEL_CODES.includes(upperLevelId as CefrLevel);

        const level = await prisma.level.findFirst({
            where: isCode ? { code: upperLevelId as CefrLevel } : { id: levelId }
        });

        const levelData = LESSONS_BY_LEVEL[levelId.toLowerCase()];
        const lessonData = levelData?.[topicId] ?? null;

        const autoSentences: string[] = [];
        if (lessonData?.transcript) {
            const matches = lessonData.transcript.match(/[^.?!]+[.?!]+(?=\s|$)/g);
            if (matches) {
                autoSentences.push(...matches.map((sentence) => sentence.trim()));
            }
            console.log(`[Dictation API] Parsed ${autoSentences.length} sentences from transcript for Unit ${topicId}.`);
        }

        const localSegments = lessonData ? toLocalSegments(lessonData, autoSentences) : MOCK_SEGMENTS;
        const fallbackVideoSrc = lessonData?.videoSrc ?? MOCK_VIDEO_ID;

        // Prefer local lesson definitions from code when available so
        // the video file, transcript, and segment timings stay aligned.
        if (lessonData) {
            return NextResponse.json({
                videoId: fallbackVideoSrc,
                segments: localSegments,
                levelCode: isCode ? upperLevelId : "A1",
                message: "Using local lesson data"
            }, { status: 200 });
        }

        if (!level) {
            return NextResponse.json({
                videoId: fallbackVideoSrc,
                segments: localSegments,
                levelCode: isCode ? upperLevelId : "A1",
                message: "Level not found, using fallback data"
            }, { status: 200 });
        }

        const lesson = await prisma.lesson.findFirst({
            where: { levelId: level.id, title: `Unit ${topicId}` }
        });

        if (!lesson) {
            return NextResponse.json({
                videoId: fallbackVideoSrc,
                segments: localSegments,
                levelCode: level.code,
                message: "Lesson not found, using fallback data"
            }, { status: 200 });
        }

        const exercise = await prisma.exercise.findFirst({
            where: { lessonId: lesson.id, type: "DICTATION" }
        });

        if (!exercise || !exercise.contentJson) {
            return NextResponse.json({
                videoId: exercise?.mediaUrl || fallbackVideoSrc,
                segments: localSegments,
                levelCode: level.code,
                message: "Exercise or specific segments not found, using fallback data"
            }, { status: 200 });
        }

        const dbSegments = parseDbSegments(exercise.contentJson);

        return NextResponse.json({
            videoId: exercise.mediaUrl || fallbackVideoSrc,
            segments: dbSegments ?? localSegments,
            levelCode: level.code,
            message: "Success"
        }, { status: 200 });
    } catch (error) {
        console.error("[API /learning/[levelId]/[topicId]/dictation] Error:", error);
        return NextResponse.json({
            videoId: MOCK_VIDEO_ID,
            segments: MOCK_SEGMENTS,
            message: "Internal server error, using fallback data"
        }, { status: 500 });
    }
}
