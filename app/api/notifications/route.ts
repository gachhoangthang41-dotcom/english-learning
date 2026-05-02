import { NextResponse } from "next/server";
import { prisma } from '@/models/prisma';
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE_NAME } from '@/controllers/session';

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value || "";
    if (!token) {
      return NextResponse.json({ status: "error", message: "Unauthenticated" }, { status: 401 });
    }

    const sess = await verifySession(token);
    const userId = sess.userId;

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    // 1. Check if user has studied today (COMPLETED)
    const completedExerciseToday = await prisma.userExerciseProgress.findFirst({
      where: {
        userId: userId,
        status: "COMPLETED",
        updatedAt: { gte: todayStart },
      },
    });

    const hasCompletedToday = !!completedExerciseToday;

    // 2. Check reminders today
    const remindersToday = await prisma.notification.findMany({
      where: {
        userId: userId,
        type: "DAILY_REMINDER",
        createdAt: { gte: todayStart },
      },
      orderBy: { createdAt: "desc" },
    });

    // Fetch user to check constraints for reminder
    const u = await prisma.user.findUnique({ where: { id: userId } });

    // 3. Generate reminder if needed (max 1 per day, at or after the smart reminder time)
    if (u && u.practiceRemindersEnabled && !hasCompletedToday && remindersToday.length === 0) {
      const [rHour, rMin] = (u.smartReminderTime || "20:00").split(":").map(Number);
      const now = new Date();
      const currentHour = now.getHours();
      const currentMin = now.getMinutes();

      let shouldCreate = false;

      if (currentHour > rHour || (currentHour === rHour && currentMin >= rMin)) {
        shouldCreate = true;
      }

      if (shouldCreate) {
        await prisma.notification.create({
          data: {
            userId: userId,
            title: "Nhắc nhở học tập",
            message: "Hôm nay bạn chưa hoàn thành bài tập nào cả. Hãy dành chút thời gian duy trì chuỗi (streak) nhé!",
            type: "DAILY_REMINDER",
          },
        });

        // ================= DISPATCH =================
        const userAgent = req.headers.get("user-agent") || "";
        const isMobile = /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(userAgent);

        if (isMobile) {
            // WEB PUSH (Điện thoại)
            const subs = await prisma.pushSubscription.findMany({ where: { userId } });
            if (subs.length > 0) {
               const webpush = require("web-push");
               webpush.setVapidDetails(
                 'mailto:admin@englishmaster.com',
                 process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string,
                 process.env.NEXT_PRIVATE_VAPID_KEY as string
               );
               for (const sub of subs) {
                  const pushSub = {
                    endpoint: sub.endpoint,
                    keys: { p256dh: sub.p256dh, auth: sub.auth }
                  };
                  try {
                    await webpush.sendNotification(pushSub, JSON.stringify({
                      title: "Nhắc nhở học tập",
                      body: "Hôm nay bạn chưa hoàn thành bài học nào nhé. Hãy dành 15 phút để duy trì chuỗi (streak)!",
                      url: "/home"
                    }));
                  } catch (e) {
                     console.error("Web push error", e);
                  }
               }
            }
          } else {
             // ĐÓNG GMAIL / EMAIL (Desktop)
             if (u.email) {
                const { sendEmail } = require("@/services/mailer");
                await sendEmail(
                   u.email, 
                   "Nhắc nhở học tập - EnglishMaster", 
                   `<h3>Thông báo nhắc nhở</h3><p>Hôm nay bạn chưa hoàn thành bộ bài học nào nhé. Hãy dành ít nhất 15 phút để duy trì chuỗi (streak)!</p><br/><a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/home">Vào ứng dụng ngay</a>`
                );
             }
          }
      }
    }

    // 4. Fetch all notifications
    const notifications = await prisma.notification.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ status: "success", notifications });
  } catch (err: any) {
    console.error("GET /api/notifications error:", err);
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value || "";
    if (!token) {
      return NextResponse.json({ status: "error", message: "Unauthenticated" }, { status: 401 });
    }

    const sess = await verifySession(token);
    const userId = sess.userId;

    const { ids } = await req.json();

    if (!Array.isArray(ids)) {
      return NextResponse.json({ status: "error", message: "Invalid payload" }, { status: 400 });
    }

    await prisma.notification.updateMany({
      where: {
        id: { in: ids },
        userId: userId,
      },
      data: { isRead: true },
    });

    return NextResponse.json({ status: "success" });
  } catch (err: any) {
    console.error("PUT /api/notifications error:", err);
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}
