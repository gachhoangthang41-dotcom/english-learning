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

    const { subscription } = await req.json();

    if (!subscription || !subscription.endpoint || !subscription.keys) {
      return NextResponse.json({ status: "error", message: "Invalid payload" }, { status: 400 });
    }

    const { endpoint, keys } = subscription;

    // Check if exists
    const existing = await prisma.pushSubscription.findUnique({
      where: { endpoint },
    });

    if (existing) {
      // Update if needed, or if it belongs to another user, re-assign
      await prisma.pushSubscription.update({
        where: { endpoint },
        data: {
          userId,
          p256dh: keys.p256dh,
          auth: keys.auth,
        },
      });
    } else {
      await prisma.pushSubscription.create({
        data: {
          userId,
          endpoint,
          p256dh: keys.p256dh,
          auth: keys.auth,
        },
      });
    }

    return NextResponse.json({ status: "success", message: "Subscription saved." });
  } catch (err: any) {
    console.error("POST /api/notifications/push-subscription error:", err);
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}
