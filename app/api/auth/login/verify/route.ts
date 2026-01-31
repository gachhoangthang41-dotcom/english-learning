import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyCode } from "@/lib/otp";
import { signSession } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const email = String(body.email || "").trim().toLowerCase();
    const code = String(body.code || "").trim();
    const remember = Boolean(body.remember);

    if (!email || !code) {
      return NextResponse.json(
        { status: "error", message: "Thiếu email hoặc mã xác thực." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { status: "error", message: "Phiên hết hạn. Vui lòng đăng nhập lại." },
        { status: 400 }
      );
    }

    const token = await prisma.token.findFirst({
      where: { userId: user.id, type: "LOGIN_2FA", usedAt: null },
      orderBy: { sentAt: "desc" },
    });

    if (!token) {
      return NextResponse.json(
        { status: "error", message: "Phiên hết hạn. Vui lòng đăng nhập lại." },
        { status: 400 }
      );
    }

    if (Date.now() > new Date(token.expiresAt).getTime()) {
      return NextResponse.json(
        { status: "error", message: "Mã đã hết hạn. Vui lòng đăng nhập lại." },
        { status: 400 }
      );
    }

    const ok = await verifyCode(code, token.codeHash);
    if (!ok) {
      return NextResponse.json(
        { status: "error", message: "Mã xác thực không đúng." },
        { status: 400 }
      );
    }

    await prisma.token.update({
      where: { id: token.id },
      data: { usedAt: new Date() },
    });

    const maxAge = remember ? 30 * 24 * 60 * 60 : undefined; // seconds
    const jwt = await signSession(
      { userId: user.id, username: String(user.username || ""), role: user.role },
      maxAge
    );

    const res = NextResponse.json({
      status: "success",
      message: "Xác thực thành công!",
      redirect: "/home",
    });

    res.cookies.set({
      name: "auth_session",
      value: jwt,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      ...(maxAge ? { maxAge } : {}),
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "error", message: "Lỗi máy chủ." }, { status: 500 });
  }
}
