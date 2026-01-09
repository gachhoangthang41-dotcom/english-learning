// app/api/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const token = (await cookies()).get("auth_session")?.value;
    if (!token) {
      return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifySession(token);

    // (tuỳ chọn) lấy DB để chắc chắn user còn tồn tại + role mới nhất
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, username: true, role: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
      status: "success",
      user: {
        id: user.id,
        username: user.username,
        role: user.role || "user",
        email: user.email,
      },
    });
  } catch {
    return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
  }
}
