import { NextResponse } from "next/server";
import { prisma } from "@/models/prisma";
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE_NAME } from "@/controllers/session";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value || "";
    if (!token) {
      return NextResponse.json(
        { status: "error", message: "Unauthenticated" },
        { status: 401 }
      );
    }

    const sess = await verifySession(token);
    const userId = sess.userId;

    const body = await req.json();
    const { practiceRemindersEnabled, smartReminderTime } = body;

    const data: any = {};
    if (typeof practiceRemindersEnabled === "boolean") {
        data.practiceRemindersEnabled = practiceRemindersEnabled;
    }
    if (typeof smartReminderTime === "string") {
        // Validate HH:MM
        if (/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(smartReminderTime)) {
            data.smartReminderTime = smartReminderTime;
        } else {
            return NextResponse.json({ status: "error", message: "Invalid time format (HH:MM required)" }, { status: 400 });
        }
    }

    if (Object.keys(data).length === 0) {
        return NextResponse.json({ status: "error", message: "No data to update" }, { status: 400 });
    }

    await prisma.user.update({
        where: { id: userId },
        data
    });

    return NextResponse.json({ status: "success", message: "Cập nhật thành công!" });
  } catch (err: any) {
    console.error("POST /api/auth/profile/update-notifications error:", err);
    return NextResponse.json({ status: "error", message: "Internal Server Error" }, { status: 500 });
  }
}
