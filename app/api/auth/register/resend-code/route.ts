import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { gen6DigitCode, hashCode } from "@/lib/otp";
import { sendEmail } from "@/lib/mailer";

export const runtime = "nodejs";

const COOLDOWN_MS = 60_000;          // 60s
const OTP_TTL_MS = 10 * 60 * 1000;   // 10 phút

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ""));
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body?.email || "").trim();

    if (!email) {
      return NextResponse.json(
        { status: "error", message: "Thiếu email." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { status: "error", message: "Email không hợp lệ." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { status: "error", message: "Không tìm thấy người dùng với email này." },
        { status: 404 }
      );
    }

    if (user.emailVerifiedAt) {
      return NextResponse.json(
        { status: "error", message: "Email này đã được xác minh." },
        { status: 409 }
      );
    }

    // cooldown 60s theo token gần nhất
    const last = await prisma.token.findFirst({
      where: { userId: user.id, type: "EMAIL_VERIFY", usedAt: null },
      orderBy: { sentAt: "desc" },
      select: { sentAt: true },
    });

    if (last?.sentAt) {
      const diff = Date.now() - new Date(last.sentAt).getTime();
      if (diff < COOLDOWN_MS) {
        const remain = Math.ceil((COOLDOWN_MS - diff) / 1000);
        return NextResponse.json(
          {
            status: "error",
            message: `Vui lòng đợi ${remain}s rồi hãy gửi lại mã.`,
            remain,
          },
          { status: 429 }
        );
      }
    }

    const code = gen6DigitCode();
    const codeHash = await hashCode(code);

    await prisma.token.create({
      data: {
        type: "EMAIL_VERIFY",
        codeHash,
        userId: user.id,
        expiresAt: new Date(Date.now() + OTP_TTL_MS),
        // sentAt thường @default(now()) trong schema
      },
    });

    const mailHtml = `Xin chào ${user.username},<br><br>Mã xác minh của bạn là: <b>${code}</b><br>Mã này sẽ hết hạn sau 10 phút.`;
    await sendEmail(user.email, "Gửi lại mã xác minh đăng ký", mailHtml);

    return NextResponse.json(
      { status: "success", message: "Đã gửi lại mã OTP tới email của bạn." },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { status: "error", message: "Lỗi máy chủ khi gửi lại mã." },
      { status: 500 }
    );
  }
}
