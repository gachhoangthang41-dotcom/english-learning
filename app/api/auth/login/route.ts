import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { gen6DigitCode, hashCode } from "@/lib/otp";
import { sendEmail } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const identifier = String(body.identifier || body.email || "").trim();
    const password = String(body.password || "");
    const remember = Boolean(body.remember);

    if (!identifier || !password) {
      return NextResponse.json(
        { status: "error", message: "Vui lòng nhập đầy đủ Email/Tên người dùng và Mật khẩu." },
        { status: 400 }
      );
    }

    const isEmail = identifier.includes("@");
    const user = isEmail
      ? await prisma.user.findUnique({ where: { email: identifier.toLowerCase() } })
      : await prisma.user.findUnique({ where: { username: identifier } });

    if (!user) {
      return NextResponse.json(
        { status: "error", message: "Sai email/tên người dùng hoặc mật khẩu." },
        { status: 400 }
      );
    }

    if (!user.emailVerifiedAt) {
      return NextResponse.json(
        { status: "error", message: "Tài khoản chưa xác thực email." },
        { status: 400 }
      );
    }

    const okPw = await bcrypt.compare(password, user.passwordHash);
    if (!okPw) {
      return NextResponse.json(
        { status: "error", message: "Sai email/tên người dùng hoặc mật khẩu." },
        { status: 400 }
      );
    }

    // cooldown 60s theo token LOGIN_2FA gần nhất chưa dùng
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

    // vô hiệu hoá các token LOGIN_2FA cũ chưa dùng (để chỉ còn 1 mã hợp lệ)
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

    
    return NextResponse.json({
      status: "2fa_required",
      message: "Vui lòng kiểm tra email để lấy mã xác thực.",
      email: user.email,
      remember,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "error", message: "Lỗi máy chủ." }, { status: 500 });
  }
}
