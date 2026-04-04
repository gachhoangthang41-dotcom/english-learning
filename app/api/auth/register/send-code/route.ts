import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

import { gen6DigitCode, hashCode } from "@/lib/otp";
import { sendEmail } from "@/lib/mailer";

export const runtime = "nodejs";

/* ------------------ helpers ------------------ */
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ""));
}

function isValidUsername(username: string) {
  const u = String(username || "");
  return u.length >= 5 && u.length <= 255;
}

/* ------------------ handler ------------------ */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { username, email, password } = body || {};

    /* ---------- validate ---------- */
    if (!username || !email || !password) {
      return NextResponse.json(
        { status: "error", message: "Vui lòng nhập đầy đủ Tên, Email, Mật khẩu." },
        { status: 400 }
      );
    }

    if (!isValidUsername(username)) {
      return NextResponse.json(
        { status: "error", message: "Tên người dùng phải từ 5 đến 255 ký tự." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { status: "error", message: "Email không hợp lệ." },
        { status: 400 }
      );
    }

    if (String(password).length < 7 || String(password).length > 14) {
      return NextResponse.json(
        { status: "error", message: "Mật khẩu phải từ 7 đến 14 ký tự." },
        { status: 400 }
      );
    }

    /* ---------- đảm bảo level A1 tồn tại ---------- */
    const levelA1 = await prisma.level.upsert({
      where: { code: "A1" },
      update: {},
      create: {
        code: "A1",
        name: "A1 Beginner",
        order: 1,
        description: "Beginner level",
      },
      select: { id: true },
    });

    /* ---------- check email ---------- */
    const existingByEmail = await prisma.user.findFirst({
      where: { email: { equals: email, mode: "insensitive" } },
    });

    if (existingByEmail?.emailVerifiedAt) {
      return NextResponse.json(
        { status: "error", message: "Email này đã được sử dụng. Vui lòng đăng nhập." },
        { status: 409 }
      );
    }

    /* ---------- check username ---------- */
    const existingByUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingByUsername) {
      return NextResponse.json(
        { status: "error", message: "Tên người dùng đã tồn tại." },
        { status: 409 }
      );
    }

    /* ---------- create / update user (pending) ---------- */
    const passwordHash = await bcrypt.hash(String(password), 10);

    const user =
      existingByEmail ??
      (await prisma.user.create({
        data: {
          username,
          email,
          passwordHash,
          role: "user",
          emailVerifiedAt: null,
          levelId: levelA1.id, // ✅ mặc định A1
        },
      }));

    /* ---------- cooldown 60s ---------- */
    const lastToken = await prisma.token.findFirst({
      where: {
        userId: user.id,
        type: "EMAIL_VERIFY",
        usedAt: null,
      },
      orderBy: { sentAt: "desc" },
      select: { sentAt: true },
    });

    if (lastToken) {
      const diff = Date.now() - new Date(lastToken.sentAt).getTime();
      const cooldown = 60_000;

      if (diff < cooldown) {
        const remain = Math.ceil((cooldown - diff) / 1000);
        return NextResponse.json(
          { status: "error", message: `Vui lòng đợi ${remain}s rồi hãy gửi lại mã.` },
          { status: 429 }
        );
      }
    }

    /* ---------- tạo OTP ---------- */
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

    /* ---------- gửi mail ---------- */
    const mailHtml = `
      Xin chào <b>${user.username}</b>,<br><br>
      Mã xác minh đăng ký tài khoản của bạn là:<br>
      <h2>${code}</h2>
      Mã này sẽ hết hạn sau <b>10 phút</b>.
    `;

    await sendEmail(user.email, "Mã xác minh đăng ký tài khoản", mailHtml);

    return NextResponse.json({
      status: "success",
      message: "Mã xác minh đã được gửi tới email của bạn.",
    });
  } catch (err) {
    console.error("REGISTER SEND CODE ERROR:", err);
    return NextResponse.json(
      { status: "error", message: "Lỗi máy chủ khi gửi mã đăng ký." },
      { status: 500 }
    );
  }
}
