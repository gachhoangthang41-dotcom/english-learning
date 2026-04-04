import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyCode } from "@/lib/otp";

export const runtime = "nodejs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ""));
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body?.email || "").trim();
    const code = String(body?.code || "").trim();

    if (!email || !code) {
      return NextResponse.json(
        { status: "error", message: "Thiếu email hoặc mã xác minh." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { status: "error", message: "Email không hợp lệ." },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { status: "error", message: "Mã OTP phải gồm đúng 6 chữ số." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { status: "error", message: "Phiên đăng ký đã hết hạn hoặc chưa gửi mã." },
        { status: 404 }
      );
    }

    // Idempotent: đã verify rồi thì coi như ok
    if (user.emailVerifiedAt) {
      return NextResponse.json(
        { status: "success", message: "Email đã được xác minh trước đó." },
        { status: 200 }
      );
    }

    const token = await prisma.token.findFirst({
      where: { userId: user.id, type: "EMAIL_VERIFY", usedAt: null },
      orderBy: { sentAt: "desc" },
    });

    if (!token) {
      return NextResponse.json(
        { status: "error", message: "Phiên đăng ký đã hết hạn hoặc chưa gửi mã." },
        { status: 404 }
      );
    }

    if (Date.now() > new Date(token.expiresAt).getTime()) {
      return NextResponse.json(
        { status: "error", message: "Mã xác minh đã hết hạn. Vui lòng gửi lại mã." },
        { status: 410 }
      );
    }

    const ok = await verifyCode(code, token.codeHash);
    if (!ok) {
      return NextResponse.json(
        { status: "error", message: "Mã xác minh không đúng." },
        { status: 401 }
      );
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { emailVerifiedAt: new Date() },
      }),
      prisma.token.update({
        where: { id: token.id },
        data: { usedAt: new Date() },
      }),
    ]);

    return NextResponse.json(
      { status: "success", message: "Đăng ký thành công!" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { status: "error", message: "Lỗi máy chủ khi đăng ký." },
      { status: 500 }
    );
  }
}
