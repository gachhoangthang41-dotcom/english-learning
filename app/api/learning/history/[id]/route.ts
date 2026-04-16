import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/models/prisma';
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { SESSION_COOKIE_NAME } from '@/controllers/session';

export const runtime = "nodejs";

async function getUserIdFromSession() {
    const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;

    const secretRaw = process.env.JWT_SECRET || process.env.SESSION_SECRET || "dev_secret";
    const secret = new TextEncoder().encode(secretRaw);

    try {
        const { payload } = await jwtVerify(token, secret);
        const userId = String(payload?.userId || "");
        return userId || null;
    } catch {
        return null;
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const userId = await getUserIdFromSession();
        if (!userId) {
            return NextResponse.json({ status: "error", message: "Unauthenticated" }, { status: 401 });
        }

        const resolvedParams = await context.params;
        const progressId = resolvedParams.id;

        // Verify this progress belongs to the user
        const progress = await prisma.userExerciseProgress.findUnique({
            where: { id: progressId }
        });

        if (!progress || progress.userId !== userId) {
            return NextResponse.json({ status: "error", message: "Not found or unauthorized" }, { status: 404 });
        }

        await prisma.userExerciseProgress.delete({
            where: { id: progressId }
        });

        return NextResponse.json({ status: "success", message: "Deleted successfully" }, { status: 200 });

    } catch (error: any) {
        console.error(`[API /learning/history] Error:`, error);
        return NextResponse.json({ status: "error", message: error.message || "Internal server error" }, { status: 500 });
    }
}
