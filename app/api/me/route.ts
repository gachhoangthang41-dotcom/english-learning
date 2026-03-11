import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE_NAME } from "@/lib/session";

export const runtime = "nodejs";

export async function GET() {
  try {
    const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value || "";
    if (!token) {
      return NextResponse.json(
        { status: "error", message: "Unauthenticated" },
        { status: 401 }
      );
    }

    const sess = await verifySession(token);

    const user = await prisma.user.findUnique({
      where: { id: sess.userId },
      select: {
        id: true,
        email: true,
        username: true,
        displayName: true,
        role: true,
        avatarUrl: true,
        emailVerifiedAt: true,
        createdAt: true,
        updatedAt: true,

        // ✅ thêm cấp độ
        level: {
          select: {
            code: true,
            name: true,
            order: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { status: "error", message: "User not found" },
        { status: 401 }
      );
    }

    return NextResponse.json({ status: "success", user });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { status: "error", message: "Server error" },
      { status: 500 }
    );
  }
}
