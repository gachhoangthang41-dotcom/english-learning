import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendEmail } from "@/lib/mailer";

export const runtime = "nodejs";

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body.email || "").trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ status: "error", message: "Vui lòng nhập email." }, { status: 400 });
    }

    // ✅ luôn trả success để tránh lộ email có tồn tại hay không
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({
        status: "success",
        message: "Nếu email tồn tại, hệ thống đã gửi link đặt lại mật khẩu.",
      });
    }

    // xoá token reset cũ chưa dùng (tuỳ chọn)
    await prisma.token.updateMany({
      where: { userId: user.id, type: "PASSWORD_RESET", usedAt: null },
      data: { usedAt: new Date() },
    });

    const rawToken = crypto.randomBytes(32).toString("hex"); // token thật
    const tokenHash = sha256(rawToken); // lưu hash

    await prisma.token.create({
      data: {
        type: "PASSWORD_RESET",
        codeHash: tokenHash,
        userId: user.id,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 phút
      },
    });

    const baseUrl = process.env.APP_URL || "http://localhost:3000";
    const resetLink = `${baseUrl}/reset-password?token=${encodeURIComponent(rawToken)}&email=${encodeURIComponent(email)}`;

    const html = `
      Xin chào ${user.username},<br><br>
      Bạn đã yêu cầu đặt lại mật khẩu. Bấm vào link dưới đây để tạo mật khẩu mới:<br>
      <a href="${resetLink}">${resetLink}</a><br><br>
      Link sẽ hết hạn sau 30 phút. Nếu bạn không yêu cầu, hãy bỏ qua email này.
    `;

    await sendEmail(user.email, "Đặt lại mật khẩu", html);

    return NextResponse.json({
      status: "success",
      message: "Nếu email tồn tại, hệ thống đã gửi link đặt lại mật khẩu.",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "error", message: "Lỗi máy chủ." }, { status: 500 });
  }
}
