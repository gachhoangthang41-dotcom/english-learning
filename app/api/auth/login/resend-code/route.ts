import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { gen6DigitCode, hashCode } from "@/lib/otp";
import { sendEmail } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body.email || "").trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ status: "error", message: "Thiếu email." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { status: "error", message: "Phiên hết hạn. Vui lòng đăng nhập lại." },
        { status: 400 }
      );
    }

    // cooldown 60s
    const last = await prisma.token.findFirst({
      where: { userId: user.id, type: "LOGIN_2FA", usedAt: null },
      orderBy: { sentAt: "desc" },
      select: { sentAt: true },
    });

    if (last) {
      const diff = Date.now() - new Date(last.sentAt).getTime();
      const cooldown = 60_000;
      if (diff < cooldown) {
        const remain = Math.ceil((cooldown - diff) / 1000);
        return NextResponse.json(
          { status: "error", message: `Vui lòng đợi ${remain}s rồi hãy gửi lại mã.` },
          { status: 429 }
        );
      }
    }

    // vô hiệu hoá các token cũ chưa dùng
    await prisma.token.updateMany({
      where: { userId: user.id, type: "LOGIN_2FA", usedAt: null },
      data: { usedAt: new Date() },
    });

    const code = gen6DigitCode();
    const codeHash = await hashCode(code);

    await prisma.token.create({
      data: {
        type: "LOGIN_2FA",
        codeHash,
        userId: user.id,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    const mailHtml = `Xin chào ${user.username},<br><br>Mã xác thực đăng nhập của bạn là: <b>${code}</b><br>Mã này sẽ hết hạn sau 10 phút.`;
    await sendEmail(user.email, "Mã xác thực đăng nhập", mailHtml);

    return NextResponse.json({ status: "success", message: "Đã gửi lại mã OTP." });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "error", message: "Lỗi máy chủ." }, { status: 500 });
  }
}
