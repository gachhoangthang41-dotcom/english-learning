import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE_NAME } from "@/lib/session";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value || "";
    if (!token) return NextResponse.json({ status: "error", message: "Chưa đăng nhập." }, { status: 401 });

    const sess = await verifySession(token);
    const body = await req.json().catch(() => ({}));

    const currentPassword = String(body.currentPassword || "");
    const newPassword = String(body.newPassword || "");

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ status: "error", message: "Thiếu mật khẩu hiện tại hoặc mật khẩu mới." }, { status: 400 });
    }
    if (newPassword.length < 8) {
      return NextResponse.json({ status: "error", message: "Mật khẩu mới tối thiểu 8 ký tự." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: sess.userId } });
    if (!user) return NextResponse.json({ status: "error", message: "Không tìm thấy tài khoản." }, { status: 404 });

    const ok = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!ok) return NextResponse.json({ status: "error", message: "Mật khẩu hiện tại không đúng." }, { status: 400 });

    const hash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: user.id }, data: { passwordHash: hash } });

    return NextResponse.json({ status: "success", message: "Đổi mật khẩu thành công!" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "error", message: "Lỗi máy chủ." }, { status: 500 });
  }
}
