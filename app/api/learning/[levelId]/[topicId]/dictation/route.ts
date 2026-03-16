import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const MOCK_VIDEO_ID = "t205A51S07A";
const MOCK_SEGMENTS = [
    {
        id: 1,
        startTime: 0,
        endTime: 3,
        text: "Hello everyone! My name is Anna.",
        translation: "Xin chào mọi người! Tên tôi là Anna."
    },
    {
        id: 2,
        startTime: 3.5,
        endTime: 6,
        text: "I come from New York.",
        translation: "Tôi đến từ New York."
    },
    {
        id: 3,
        startTime: 6.5,
        endTime: 9,
        text: "Today, I want to talk about my daily routine.",
        translation: "Hôm nay, tôi muốn nói về thói quen hàng ngày của mình."
    },
    {
        id: 4,
        startTime: 9.5,
        endTime: 13,
        text: "I usually wake up at 7:00 AM.",
        translation: "Tôi thường thức dậy lúc 7 giờ sáng."
    },
    {
        id: 5,
        startTime: 13.5,
        endTime: 17,
        text: "Then I have breakfast with coffee and toast.",
        translation: "Sau đó tôi ăn sáng với cà phê và bánh mì nướng."
    }
];

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ levelId: string; topicId: string }> }
) {
    try {
        const { levelId, topicId } = await context.params;

        // 1. Locate Level
        const level = await prisma.level.findUnique({
            where: { code: levelId.toUpperCase() as any }
        });

        if (!level) {
            return NextResponse.json({
                 videoId: MOCK_VIDEO_ID,
                 segments: MOCK_SEGMENTS,
                 message: "Level not found, using fallback data"
            }, { status: 200 });
        }

       // 2. Locate Lesson
       const lesson = await prisma.lesson.findFirst({
           where: { levelId: level.id, title: `Unit ${topicId}` }
       });

       if (!lesson) {
           return NextResponse.json({
                videoId: MOCK_VIDEO_ID,
                segments: MOCK_SEGMENTS,
                message: "Lesson not found, using fallback data"
           }, { status: 200 });
       }

       // 3. Locate Exercise (Dictation)
       const exercise = await prisma.exercise.findFirst({
           where: { lessonId: lesson.id, type: "DICTATION" }
       });

       if (!exercise || !exercise.contentJson) {
           return NextResponse.json({
                videoId: exercise?.mediaUrl || MOCK_VIDEO_ID,
                segments: MOCK_SEGMENTS,
                message: "Exercise or specific segments not found, using fallback data"
           }, { status: 200 });
       }

       // 4. Transform DB JSON structure if needed to match frontend
       const dbSegments = exercise.contentJson as any[];
       
       return NextResponse.json({
           videoId: exercise.mediaUrl || MOCK_VIDEO_ID,
           segments: Array.isArray(dbSegments) && dbSegments.length > 0 ? dbSegments : MOCK_SEGMENTS,
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
