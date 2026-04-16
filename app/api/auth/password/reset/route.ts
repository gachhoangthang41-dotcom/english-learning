import { NextResponse } from "next/server";
import { prisma } from '@/models/prisma';
import bcrypt from "bcryptjs";
import { verifyCode } from '@/services/otp';

export const runtime = "nodejs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ""));
}

async function findUserByIdentifier(identifier: string) {
  const normalized = String(identifier || "").trim();
  if (!normalized) return null;

  if (isValidEmail(normalized)) {
    return prisma.user.findUnique({ where: { email: normalized.toLowerCase() } });
  }

  return prisma.user.findUnique({ where: { username: normalized } });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const identifier = String(body?.identifier ?? body?.email ?? "").trim();
    const code = String(body?.code ?? "").trim();
    const newPassword = String(body?.newPassword ?? body?.password ?? "").trim();

    const confirmPassword = String(body?.confirmPassword ?? body?.confirm ?? "").trim();

    if (!identifier || !code || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { status: "error", message: "Thiếu dữ liệu." },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { status: "error", message: "Mã xác minh phải gồm đúng 6 chữ số." },
        { status: 400 }
      );
    }

    if (newPassword.length < 7 || newPassword.length > 14) {
      return NextResponse.json(
        { status: "error", message: "Mật khẩu phải từ 7 đến 14 ký tự." },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { status: "error", message: "Mật khẩu xác nhận không khớp." },
        { status: 400 }
      );
    }

    const user = await findUserByIdentifier(identifier);
    if (!user) {
      return NextResponse.json(
        { status: "error", message: "Phiên đặt lại mật khẩu không hợp lệ." },
        { status: 400 }
      );
    }

    const t = await prisma.token.findFirst({
      where: {
        userId: user.id,
        type: "PASSWORD_RESET",
        usedAt: null,
      },
      orderBy: { sentAt: "desc" },
    });

    if (!t) {
      return NextResponse.json(
        { status: "error", message: "Mã xác minh không hợp lệ hoặc đã dùng." },
        { status: 400 }
      );
    }

    if (Date.now() > new Date(t.expiresAt).getTime()) {
      return NextResponse.json(
        { status: "error", message: "Mã xác minh đã hết hạn." },
        { status: 400 }
      );
    }

    const ok = await verifyCode(code, t.codeHash);
    if (!ok) {
      return NextResponse.json(
        { status: "error", message: "Mã xác minh không đúng." },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { passwordHash },
      }),
      prisma.token.update({
        where: { id: t.id },
        data: { usedAt: new Date() },
      }),
      prisma.token.updateMany({
        where: { userId: user.id, type: "PASSWORD_RESET", usedAt: null },
        data: { usedAt: new Date() },
      }),
    ]);

    return NextResponse.json(
      {
        status: "success",
        message: "Đặt lại mật khẩu thành công!",
        redirect: "/login",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { status: "error", message: "Lỗi máy chủ." },
      { status: 500 }
    );
  }
}
