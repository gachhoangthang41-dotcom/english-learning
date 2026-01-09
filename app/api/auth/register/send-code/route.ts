import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { gen6DigitCode, hashCode } from "@/lib/otp";
import { sendEmail } from "@/lib/mailer";

export const runtime = "nodejs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ""));
}
function isValidUsername(username: string) {
  const u = String(username || "");
  return u.length >= 5 && u.length <= 255;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { username, email, password } = body || {};

    if (!username || !email || !password) {
      return NextResponse.json({ status: "error", message: "Vui lòng nhập đầy đủ Tên, Email, Mật khẩu." });
    }
    if (!isValidUsername(username)) {
      return NextResponse.json({ status: "error", message: "Tên người dùng phải từ 5 đến 255 ký tự." });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ status: "error", message: "Email không hợp lệ." });
    }
    if (String(password).length < 7 || String(password).length > 14) {
      return NextResponse.json({ status: "error", message: "Mật khẩu phải từ 7 đến 14 ký tự." });
    }

    // nếu email đã tồn tại và verified -> chặn
    const existingByEmail = await prisma.user.findUnique({ where: { email } });
    if (existingByEmail?.emailVerifiedAt) {
      return NextResponse.json({ status: "error", message: "Email này đã được sử dụng." });
    }

    // nếu username đã tồn tại -> chặn
    const existingByUsername = await prisma.user.findUnique({ where: { username } });
    if (existingByUsername) {
      return NextResponse.json({ status: "error", message: "Tên người dùng đã tồn tại." });
    }

    // tạo user pending (unverified)
    const passwordHash = await bcrypt.hash(String(password), 10);
    const user =
      existingByEmail ??
      (await prisma.user.create({
        data: { username, email, passwordHash, role: "user", emailVerifiedAt: null },
      }));

    // cooldown 60s: check token gần nhất
    const last = await prisma.token.findFirst({
      where: { userId: user.id, type: "EMAIL_VERIFY", usedAt: null },
      orderBy: { sentAt: "desc" },
      select: { sentAt: true },
    });
    if (last) {
      const diff = Date.now() - new Date(last.sentAt).getTime();
      const cooldown = 60_000;
      if (diff < cooldown) {
        const remain = Math.ceil((cooldown - diff) / 1000);
        return NextResponse.json({ status: "error", message: `Vui lòng đợi ${remain}s rồi hãy gửi lại mã.` });
      }
    }

    const code = gen6DigitCode();
    const codeHash = await hashCode(code);

    await prisma.token.create({
      data: {
        type: "EMAIL_VERIFY",
        codeHash,
        userId: user.id,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    const mailHtml = `Xin chào ${user.username},<br><br>Mã xác minh đăng ký tài khoản của bạn là: <b>${code}</b><br>Mã này sẽ hết hạn sau 10 phút.`;
    await sendEmail(user.email, "Mã xác minh đăng ký tài khoản", mailHtml);

    return NextResponse.json({ status: "success", message: "Mã xác minh đã được gửi tới email của bạn." });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "error", message: "Lỗi máy chủ khi gửi mã đăng ký." });
  }
}
