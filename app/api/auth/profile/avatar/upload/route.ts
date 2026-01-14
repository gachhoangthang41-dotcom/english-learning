import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { cloudinary } from "@/lib/cloudinary";

export const runtime = "nodejs";

const COOKIE_NAME = "auth_session";
const MAX_MB = 5;
const ALLOW_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function jsonError(message: string, status = 400) {
  return NextResponse.json({ status: "error", message }, { status });
}

async function getSession(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

/**
 * POST: upload avatar (multipart/form-data, field: "file")
 */
export async function POST(req: NextRequest) {
  try {
    // 1) Auth
    const session = await getSession(req);
    if (!session) return jsonError("Chưa đăng nhập.", 401);

    // 2) Parse formData
    const form = await req.formData();
    const file = form.get("file");

    if (!file || !(file instanceof File)) {
      return jsonError("Thiếu file.", 400);
    }

    if (!ALLOW_TYPES.has(file.type)) {
      return jsonError("Chỉ hỗ trợ JPG/PNG/WEBP.", 400);
    }

    const sizeMb = file.size / (1024 * 1024);
    if (sizeMb > MAX_MB) {
      return jsonError(`File quá lớn. Tối đa ${MAX_MB}MB.`, 400);
    }

    // 3) Lấy user để biết avatar cũ (nếu có)
    const current = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { id: true, avatarPublicId: true },
    });

    if (!current) {
      return jsonError("User không tồn tại.", 404);
    }

    // 4) Upload lên Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const folder = process.env.CLOUDINARY_FOLDER || "shadowing-avatars";

    const uploaded = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
          overwrite: true,
          transformation: [{ width: 256, height: 256, crop: "fill", gravity: "face" }],
        },
        (err, result) => {
          if (err || !result) return reject(err);
          resolve({ secure_url: result.secure_url, public_id: result.public_id });
        }
      );

      stream.end(buffer);
    });

    // 5) Lưu DB trước (an toàn hơn)
    const user = await prisma.user.update({
      where: { id: session.userId },
      data: {
        avatarUrl: uploaded.secure_url,
        avatarPublicId: uploaded.public_id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        avatarUrl: true,
        createdAt: true,
      },
    });

    // 6) Xoá avatar cũ (best-effort) sau khi DB đã update
    if (current.avatarPublicId && current.avatarPublicId !== uploaded.public_id) {
      try {
        await cloudinary.uploader.destroy(current.avatarPublicId, { resource_type: "image" });
      } catch {
        // ignore best-effort
      }
    }

    return NextResponse.json({
      status: "success",
      message: "Cập nhật avatar thành công!",
      user,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "error", message: "Lỗi upload avatar." }, { status: 500 });
  }
}

/**
 * DELETE: remove avatar (set null + destroy on Cloudinary best-effort)
 */
export async function DELETE(req: NextRequest) {
  try {
    // 1) Auth
    const session = await getSession(req);
    if (!session) return jsonError("Chưa đăng nhập.", 401);

    // 2) Lấy avatar hiện tại
    const current = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { id: true, avatarPublicId: true },
    });

    if (!current) return jsonError("User không tồn tại.", 404);

    // Nếu chưa có avatar -> vẫn trả success cho “idempotent”
    if (!current.avatarPublicId) {
      const user = await prisma.user.findUnique({
        where: { id: session.userId },
        select: { id: true, username: true, email: true, role: true, avatarUrl: true, createdAt: true },
      });

      return NextResponse.json({
        status: "success",
        message: "Bạn chưa có avatar để xoá.",
        user,
      });
    }

    // 3) Update DB trước
    const user = await prisma.user.update({
      where: { id: session.userId },
      data: { avatarUrl: null, avatarPublicId: null },
      select: { id: true, username: true, email: true, role: true, avatarUrl: true, createdAt: true },
    });

    // 4) Xoá Cloudinary best-effort
    try {
      await cloudinary.uploader.destroy(current.avatarPublicId, { resource_type: "image" });
    } catch {
      // ignore
    }

    return NextResponse.json({
      status: "success",
      message: "Đã xoá avatar.",
      user,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "error", message: "Lỗi xoá avatar." }, { status: 500 });
  }
}
