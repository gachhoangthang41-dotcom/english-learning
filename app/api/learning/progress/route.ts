import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { SESSION_COOKIE_NAME } from "@/lib/session";

export const runtime = "nodejs";

// Lấy userId từ cookie JWT
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

        if (!userId) {
            return NextResponse.json(
                { status: "error", message: "Unauthenticated" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { levelId, topicId, timeSpentMin } = body;

        // Validate request
        if (!levelId || !topicId || timeSpentMin === undefined) {
            return NextResponse.json(
                { status: "error", message: "Missing required fields" },
                { status: 400 }
            );
        }

        // 1. Verify Level (if not exists, we create a mock one)
        let level = await prisma.level.findUnique({
            where: { code: levelId.toUpperCase() as any }
        });

        if (!level) {
            level = await prisma.level.create({
                data: {
                    code: levelId.toUpperCase() as any,
                    name: `Level ${levelId.toUpperCase()}`,
                    order: levelId === 'A1' ? 1 : levelId === 'A2' ? 2 : levelId === 'B1' ? 3 : 4,
                    description: `Automatically created level for ${levelId}`,
                    recommendedMinPerLesson: 15
                }
            });
        }

        // 2. Locate or create Lesson
        let lesson = await prisma.lesson.findFirst({
            where: { levelId: level.id, title: `Unit ${topicId}` }
        });

        if (!lesson) {
            // Find max order to append
            const maxOrder = await prisma.lesson.aggregate({
                where: { levelId: level.id },
                _max: { order: true }
            });
            const nextOrder = (maxOrder._max.order || 0) + 1;

            lesson = await prisma.lesson.create({
                data: {
                    levelId: level.id,
                    title: `Unit ${topicId}`,
                    description: `Automatically created lesson ${topicId}`,
                    order: nextOrder,
                    isPublished: true,
                    estimatedMin: 15,
                    primarySkill: "LISTENING"
                }
            });
        }

        // 3. Locate or create Exercise
        let exercise = await prisma.exercise.findFirst({
            where: { lessonId: lesson.id }
        });

        if (!exercise) {
            exercise = await prisma.exercise.create({
                data: {
                    lessonId: lesson.id,
                    title: "Mock Exercise",
                    type: "DICTATION",
                    skill: "LISTENING",
                    order: 1,
                    isPublished: true
                }
            });
        }

        // 4. Save progress record for this exercise
        const today = new Date();

        const progress = await prisma.userExerciseProgress.upsert({
            where: {
                userId_exerciseId: {
                    userId,
                    exerciseId: exercise.id
                }
            },
            update: {
                // Aggregate time spent
                timeSpentMin: { increment: Number(timeSpentMin) },
                status: "COMPLETED",
                lastAccessedAt: today,
                completedAt: today,
                updatedAt: today
            },
            create: {
                userId,
                exerciseId: exercise.id,
                timeSpentMin: Number(timeSpentMin),
                status: "COMPLETED",
                progressPct: 100,
                startedAt: today,
                lastAccessedAt: today,
                completedAt: today
            }
        });

        return NextResponse.json(
            {
                status: "success",
                message: "Learning progress recorded successfully",
                data: progress
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("[API /learning/progress] Error:", error);
        return NextResponse.json(
            {
                status: "error",
                message: "Internal server error"
            },
            { status: 500 }
        );
    }
}
