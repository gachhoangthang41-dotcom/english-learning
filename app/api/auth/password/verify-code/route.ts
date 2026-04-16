import { NextResponse } from "next/server";

import { verifyCode } from '@/services/otp';
import { prisma } from '@/models/prisma';

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

    if (!identifier || !code) {
      return NextResponse.json(
        { status: "error", message: "Thiếu định danh hoặc mã xác minh." },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { status: "error", message: "Mã xác minh phải gồm đúng 6 chữ số." },
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

    const token = await prisma.token.findFirst({
      where: {
        userId: user.id,
        type: "PASSWORD_RESET",
        usedAt: null,
      },
      orderBy: { sentAt: "desc" },
    });

    if (!token) {
      return NextResponse.json(
        { status: "error", message: "Mã xác minh không hợp lệ hoặc đã dùng." },
        { status: 400 }
      );
    }

    if (Date.now() > new Date(token.expiresAt).getTime()) {
      return NextResponse.json(
        { status: "error", message: "Mã xác minh đã hết hạn." },
        { status: 400 }
      );
    }

    const ok = await verifyCode(code, token.codeHash);
    if (!ok) {
      return NextResponse.json(
        { status: "error", message: "Mã xác minh không đúng." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: "success",
      message: "Xác minh mã thành công. Bạn có thể nhập mật khẩu mới.",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { status: "error", message: "Lỗi máy chủ." },
      { status: 500 }
    );
  }
}