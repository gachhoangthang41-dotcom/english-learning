import { NextResponse } from "next/server";

import { sendEmail } from '@/services/mailer';
import { gen6DigitCode, hashCode } from '@/services/otp';
import { prisma } from '@/models/prisma';

export const runtime = "nodejs";

const COOLDOWN_MS = 60_000;
const OTP_TTL_MS = 10 * 60 * 1000;

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
    const identifier = String(body.identifier || body.email || "").trim();

    if (!identifier) {
      return NextResponse.json({ status: "error", message: "Thiếu email hoặc tên đăng nhập." }, { status: 400 });
    }

    const user = await findUserByIdentifier(identifier);
    if (!user || !user.email || !user.emailVerifiedAt) {
      return NextResponse.json(
        { status: "error", message: "Phiên đặt lại mật khẩu không hợp lệ. Vui lòng bắt đầu lại." },
        { status: 400 }
      );
    }

    const last = await prisma.token.findFirst({
      where: { userId: user.id, type: "PASSWORD_RESET", usedAt: null },
      orderBy: { sentAt: "desc" },
      select: { sentAt: true },
    });

    if (last?.sentAt) {
      const diff = Date.now() - new Date(last.sentAt).getTime();
      if (diff < COOLDOWN_MS) {
        const remain = Math.ceil((COOLDOWN_MS - diff) / 1000);
        return NextResponse.json(
          { status: "error", message: `Vui lòng đợi ${remain}s rồi hãy gửi lại mã.` },
          { status: 429 }
        );
      }
    }

    await prisma.token.updateMany({
      where: { userId: user.id, type: "PASSWORD_RESET", usedAt: null },
      data: { usedAt: new Date() },
    });

    const code = gen6DigitCode();
    const codeHash = await hashCode(code);

    await prisma.token.create({
      data: {
        type: "PASSWORD_RESET",
        codeHash,
        userId: user.id,
        expiresAt: new Date(Date.now() + OTP_TTL_MS),
      },
    });

    const html = `
      Xin chào ${user.username || user.email},<br><br>
      Mã xác minh đặt lại mật khẩu mới của bạn là: <b style="font-size: 24px; letter-spacing: 2px;">${code}</b><br><br>
      Mã này sẽ hết hạn sau <b>10 phút</b>.
    `;

    await sendEmail(user.email, "Gửi lại mã đặt lại mật khẩu", html);

    return NextResponse.json({ status: "success", message: "Đã gửi lại mã xác minh." });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "error", message: "Lỗi máy chủ." }, { status: 500 });
  }
}