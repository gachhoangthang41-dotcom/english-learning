import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";
import { SESSION_COOKIE_NAME } from "@/lib/session";

export const runtime = "nodejs";

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function keyDay(d: Date) {
  // YYYY-MM-DD
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, delta: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + delta);
  return x;
}

// ✅ Lấy userId từ cookie JWT (theo lib/session của bạn)
async function getUserIdFromSession() {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const secretRaw =
    process.env.JWT_SECRET || process.env.SESSION_SECRET || "dev_secret";
  const secret = new TextEncoder().encode(secretRaw);

  try {
    const { payload } = await jwtVerify(token, secret);
    const userId = String(payload?.userId || "");
    return userId || null;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, dailyGoalMin: true, learnedWordsCount: true },
    });

    if (!user) {
      return NextResponse.json(
        { status: "error", message: "User not found" },
        { status: 404 }
      );
    }

    // ✅ Lấy data 60 ngày gần nhất để tính streak
    const now = new Date();
    const today = startOfDay(now);
    const from60 = addDays(today, -60);

    const progress = await prisma.userExerciseProgress.findMany({
      where: {
        userId,
        updatedAt: { gte: from60 },
      },
      select: {
        timeSpentMin: true,
        status: true,
        completedAt: true,
        lastAccessedAt: true,
        updatedAt: true,
      },
    });

    // ✅ Gom phút theo ngày
    const dailyMinutes: Record<string, number> = {};

    for (const p of progress) {
      const ts = p.completedAt || p.lastAccessedAt || p.updatedAt;
      const dayKey = keyDay(startOfDay(new Date(ts)));

      const min = Number(p.timeSpentMin || 0);
      if (min <= 0) continue;

      dailyMinutes[dayKey] = (dailyMinutes[dayKey] || 0) + min;
    }

    // ✅ 1) Tính streak (ngày liên tiếp có học)
    let streakDays = 0;
    for (let i = 0; i < 365; i++) {
      const day = addDays(today, -i);
      const k = keyDay(day);
      const min = dailyMinutes[k] || 0;

      if (min > 0) streakDays++;
      else break;
    }

    // ✅ 2) Tuần này (7 ngày gần nhất)
    const weekMinutesArr: number[] = [];
    let totalWeekMin = 0;

    for (let i = 6; i >= 0; i--) {
      const day = addDays(today, -i);
      const k = keyDay(day);
      const min = dailyMinutes[k] || 0;

      weekMinutesArr.push(min);
      totalWeekMin += min;
    }

    const hoursStudied = Math.round((totalWeekMin / 60) * 10) / 10; // 1 số thập phân

    // ✅ 3) Words learned - đếm unique từ từ LearningProgress
    // Dùng learnedWordsCount nếu có, nếu không thì count từ DB
    let wordsLearnedCount = user.learnedWordsCount || 0;
    
    // Fallback: nếu learnedWordsCount = 0, đếm từ LearningProgress
    if (wordsLearnedCount === 0) {
      wordsLearnedCount = await prisma.learningProgress.count({
        where: {
          userId,
        },
      });
    }

    // ✅ 4) Daily goal %
    const todayMin = dailyMinutes[keyDay(today)] || 0;
    const dailyGoalPct =
      user.dailyGoalMin > 0
        ? Math.min(100, Math.round((todayMin / user.dailyGoalMin) * 100))
        : 0;

    return NextResponse.json(
      {
        status: "success",
        stats: {
          streakDays,
          wordsLearned: wordsLearnedCount,
          hoursStudied,
          dailyGoalPct,
          weekMinutes: weekMinutesArr, // 7 ngày
          todayMin,
          dailyGoalMin: user.dailyGoalMin,
        },
      },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { status: "error", message: "Server error" },
      { status: 500 }
    );
  }
}
