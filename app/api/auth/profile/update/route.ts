import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE_NAME } from "@/lib/session";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    // 1) Auth
    const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value || "";
    if (!token) {
      return NextResponse.json({ status: "error", message: "Chưa đăng nhập." }, { status: 401 });
    }

    const sess = await verifySession(token);

    // 2) Parse body
    const body = await req.json().catch(() => ({}));

    const displayName =
      typeof body.displayName === "string" ? body.displayName.trim() : "";
    const newEmail =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const currentPassword =
      typeof body.currentPassword === "string" ? body.currentPassword : "";

    if (!displayName && !newEmail) {
      return NextResponse.json(
        { status: "error", message: "Không có dữ liệu để cập nhật." },
        { status: 400 }
      );
    }

    // 3) Load user
    const user = await prisma.user.findUnique({
      where: { id: sess.userId },
      select: { id: true, email: true, passwordHash: true },
    });

    if (!user) {
      return NextResponse.json(
        { status: "error", message: "Không tìm thấy tài khoản." },
        { status: 404 }
      );
    }

    // 4) Build update data (update 1 lần)
    const dataToUpdate: Record<string, any> = {};

    // ✅ Update "biệt danh" -> displayName (KHÔNG đụng username)
    if (displayName) {
      if (displayName.length < 3 || displayName.length > 30) {
        return NextResponse.json(
          { status: "error", message: "Tên hiển thị phải từ 3–30 ký tự." },
          { status: 400 }
        );
      }

      // displayName thường KHÔNG cần unique.
      // Nếu bạn muốn unique thì bạn tự thêm unique check theo displayName.

      // Prisma sẽ error nếu schema chưa có displayName -> bạn cần thêm vào schema.prisma
      dataToUpdate.displayName = displayName;
    }

    // ✅ Update email (nhạy cảm) -> bắt nhập mật khẩu hiện tại
    if (newEmail) {
      if (!isValidEmail(newEmail)) {
        return NextResponse.json(
          { status: "error", message: "Email không hợp lệ." },
          { status: 400 }
        );
      }

      if (!currentPassword) {
        return NextResponse.json(
          { status: "error", message: "Vui lòng nhập mật khẩu hiện tại để đổi email." },
          { status: 400 }
        );
      }

      if (!user.passwordHash) {
        return NextResponse.json(
          { status: "error", message: "Tài khoản này chưa có mật khẩu (đăng nhập OAuth)." },
          { status: 400 }
        );
      }

      const ok = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!ok) {
        return NextResponse.json(
          { status: "error", message: "Mật khẩu hiện tại không đúng." },
          { status: 400 }
        );
      }

      const emailUsed = await prisma.user.findFirst({
        where: { email: newEmail, NOT: { id: user.id } },
        select: { id: true },
      });

      if (emailUsed) {
        return NextResponse.json(
          { status: "error", message: "Email này đã được sử dụng." },
          { status: 400 }
        );
      }

      dataToUpdate.email = newEmail;
      dataToUpdate.emailVerifiedAt = null; // đổi email thì nên verify lại
    }

    await prisma.user.update({
      where: { id: user.id },
      data: dataToUpdate,
    });

    return NextResponse.json({ status: "success", message: "Cập nhật thành công!" });
  } catch (err: any) {
    console.error(err);

    // Prisma unique error fallback
    if (err?.code === "P2002") {
      return NextResponse.json(
        { status: "error", message: "Dữ liệu bị trùng (email đã tồn tại)." },
        { status: 400 }
      );
    }

    return NextResponse.json({ status: "error", message: "Lỗi máy chủ." }, { status: 500 });
  }
}
