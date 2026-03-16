import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { SESSION_COOKIE_NAME } from "@/lib/session";

export const runtime = "nodejs";

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

export async function GET(req: NextRequest) {
    try {
        const userId = await getUserIdFromSession();
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const history = await prisma.userExerciseProgress.findMany({
            where: { userId },
            orderBy: { updatedAt: 'desc' },
            include: {
                exercise: {
                    include: {
                        lesson: {
                            include: {
                                level: true
                            }
                        }
                    }
                }
            }
        });

        return NextResponse.json({ status: "success", data: history });
    } catch (error) {
        console.error("[API /learning/history GET] Error:", error);
        return NextResponse.json({ message: "Lỗi tải lịch sử học tập" }, { status: 500 });
    }
}
