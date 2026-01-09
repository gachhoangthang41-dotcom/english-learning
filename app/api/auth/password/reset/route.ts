import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body.email || "").trim().toLowerCase();
    const token = String(body.token || "").trim();
    const newPassword = String(body.newPassword || "");

    if (!email || !token || !newPassword) {
      return NextResponse.json(
        { status: "error", message: "Thiếu dữ liệu." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { status: "error", message: "Mật khẩu phải từ 6 ký tự." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ status: "error", message: "Link không hợp lệ." }, { status: 400 });
    }

    const tokenHash = sha256(token);

    const t = await prisma.token.findFirst({
      where: {
        userId: user.id,
        type: "PASSWORD_RESET",
        usedAt: null,
        codeHash: tokenHash,
      },
      orderBy: { sentAt: "desc" },
    });

    if (!t) {
      return NextResponse.json({ status: "error", message: "Link không hợp lệ hoặc đã dùng." }, { status: 400 });
    }

    if (Date.now() > new Date(t.expiresAt).getTime()) {
      return NextResponse.json({ status: "error", message: "Link đã hết hạn." }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await prisma.$transaction([
      prisma.user.update({ where: { id: user.id }, data: { passwordHash } }),
      prisma.token.update({ where: { id: t.id }, data: { usedAt: new Date() } }),
    ]);

    return NextResponse.json({ status: "success", message: "Đặt lại mật khẩu thành công!", redirect: "/login" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "error", message: "Lỗi máy chủ." }, { status: 500 });
  }
}
