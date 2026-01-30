"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  House,
  BookOpen,
  Dumbbell,
  Users,
  Settings,
  Bell,
  ChevronDown,
  Menu,
  ChevronLeft,
  ChevronRight,
  LogOut,
  HelpCircle,
  Zap,
  Flame,
  Timer,
  TrendingUp,
  Newspaper,
  Mic2,
  Signal,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

// ---------------- TYPES ----------------
type MsgType = "error" | "success" | "info";

type MeUser = {
  id?: string;
  email?: string;
  username?: string;
  displayName?: string | null;
  role?: string;
  avatarUrl?: string | null;
};

type HomeStats = {
  streakDays: number;
  wordsLearned: number;
  hoursStudied: number;
  dailyGoalPct: number;
  weekMinutes: number[]; // 7 ngày
  todayMin: number;
  dailyGoalMin: number;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// ---------------- MAIN ----------------
export default function HomePage() {
  const router = useRouter();

  // Menu states
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const userMenuRef = React.useRef<HTMLDivElement | null>(null);

  // User states
  const [displayName, setDisplayName] = React.useState("User");
  const [role, setRole] = React.useState("Member");
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);

  // Stats states (dynamic)
  const [stats, setStats] = React.useState<HomeStats | null>(null);
  const [loadingStats, setLoadingStats] = React.useState(true);

  // UI message
  const [msg, setMsg] = React.useState<{ type: MsgType; text: string } | null>(
    null
  );

  // Scroll ref
  const coreListRef = React.useRef<HTMLDivElement | null>(null);

  // Lessons data (NO time)
  const lessons = [
    {
      level: "Pre-A1",
      title: "Bài tập Pre-A1",
      desc: "Làm quen với tiếng Anh cơ bản.",
      gradient: "bg-gradient-to-br from-[#0c4a6e] to-[#0f172a]",
      bgImage: "/images/prea1-bg.png",
    },
    {
      level: "A1",
      title: "Bài tập A1",
      desc: "Nền tảng nghe – nói cơ bản.",
      gradient: "bg-gradient-to-br from-[#1e3a8a] to-[#0f172a]",
      bgImage: "/images/a1-bg.jpg",
    },
    {
      level: "A2",
      title: "Bài tập A2",
      desc: "Tăng phản xạ – từ vựng thông dụng.",
      gradient: "bg-gradient-to-br from-[#334155] to-[#0f172a]",
      bgImage: "/images/a2-bg.png",
    },
    {
      level: "B1",
      title: "Bài tập B1",
      desc: "Nghe sâu – nói mạch lạc hơn.",
      gradient: "bg-gradient-to-br from-[#1f2937] to-[#030712]",
      bgImage: "/images/b1-bg.png",
    },
    {
      level: "B2",
      title: "Bài tập B2",
      desc: "Tốc độ + độ chính xác cao hơn.",
      gradient: "bg-gradient-to-br from-[#3730a3] to-[#0f172a]",
      bgImage: "/images/b2-bg.png",
    },
  ];

  // ---------------- EFFECTS ----------------

  // ✅ Load user info (/api/me)
  React.useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const res = await fetch("/api/me", {
          method: "GET",
          credentials: "same-origin",
          cache: "no-store",
        });

        const data = await res.json().catch(() => null);
        if (!alive) return;

        if (res.ok && data?.status === "success") {
          const u: MeUser = data.user || {};
          setAvatarUrl(u.avatarUrl || null);
          setDisplayName(u.displayName || u.username || "User");
          setRole(u.role || "Member");
        }
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);


  React.useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoadingStats(true);

        const res = await fetch("/api/stats/home", {
          method: "GET",
          credentials: "same-origin",
          cache: "no-store",
        });

        const data = await res.json().catch(() => null);
        if (!alive) return;

        if (res.ok && data?.status === "success") {
          setStats(data.stats);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (alive) setLoadingStats(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  // ✅ Click outside để đóng menu user
  React.useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const el = userMenuRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setUserMenuOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // ---------------- ACTIONS ----------------
  async function onLogout() {
    setMsg({ type: "info", text: "Đang đăng xuất..." });
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setMsg({ type: "error", text: data?.message || `HTTP ${res.status}` });
        return;
      }

      router.replace("/login");
    } catch (e) {
      console.error(e);
      setMsg({ type: "error", text: "Không thể kết nối máy chủ." });
    }
  }

  function go(path: string) {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    router.push(path);
  }

  function scrollCore(dir: "prev" | "next") {
    const el = coreListRef.current;
    if (!el) return;
    const amount = 320;
    el.scrollBy({
      left: dir === "prev" ? -amount : amount,
      behavior: "smooth",
    });
  }

  // ---------------- DERIVED DATA ----------------
  const messageClass =
    msg?.type === "error"
      ? "bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-500/20"
      : msg?.type === "success"
        ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-500/20"
        : "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-500/20";

  const streakText = loadingStats ? "..." : `${stats?.streakDays || 0}-day streak`;

  const dailyGoalPct = stats?.dailyGoalPct ?? 0;
  const week = stats?.weekMinutes || [0, 0, 0, 0, 0, 0, 0];
  const maxWeek = Math.max(...week, 1);

  return (
    // ROOT
    <div className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden transition-colors duration-300">
      <div className="h-screen w-full flex flex-col">

        {/* ---------------- TOP NAV ---------------- */}
        <header className="shrink-0 sticky top-0 z-[200] overflow-visible bg-background/80 backdrop-blur-xl">
          <div className="mx-auto max-w-[1200px] px-5 lg:px-8 h-16 flex items-center justify-between overflow-visible">
            {/* Brand */}
            <Link href="/home" className="flex items-center gap-3 select-none">
              <div className="size-9 rounded-xl bg-blue-600/10 ring-1 ring-border grid place-items-center">
                <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="leading-tight">
                <div className="font-extrabold tracking-tight text-foreground">EnglishMaster</div>
                <div className="text-[11px] text-muted-foreground">Learn efficiently</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-2">
              <NavItem href="/home" active icon={<House className="w-4 h-4" />}>
                Home
              </NavItem>
              <NavItem href="#" icon={<BookOpen className="w-4 h-4" />}>
                Lessons
              </NavItem>
              <NavItem href="#" icon={<Dumbbell className="w-4 h-4" />}>
                Practice
              </NavItem>
              <NavItem href="#" icon={<Users className="w-4 h-4" />}>
                Friends
              </NavItem>
              <NavItem href="#" icon={<Settings className="w-4 h-4" />}>
                Settings
              </NavItem>
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="relative size-9 rounded-full hover:bg-secondary border border-transparent transition grid place-items-center"
                title="Notifications"
                onClick={() =>
                  setMsg({ type: "info", text: "Thông báo sẽ có sau." })
                }
              >
                <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-red-500 ring-2 ring-background" />
                <Bell className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  className="flex items-center gap-3 pl-3 pr-2 py-2 rounded-full hover:bg-secondary border border-transparent transition"
                  onClick={() => setUserMenuOpen((v) => !v)}
                >
                  <div className="text-right leading-tight hidden sm:block">
                    <div className="text-sm font-semibold text-foreground">{displayName}</div>
                    <div className="text-[11px] text-muted-foreground">{role}</div>
                  </div>

                  <div className="relative size-8 rounded-full bg-secondary ring-1 ring-border overflow-hidden grid place-items-center">
                    {avatarUrl ? (
                      <Image
                        key={avatarUrl}
                        src={avatarUrl}
                        alt="Avatar"
                        fill
                        className="object-cover"
                        sizes="32px"
                        unoptimized
                        onError={() => setAvatarUrl(null)}
                      />
                    ) : (
                      <span className="text-sm">🙂</span>
                    )}
                  </div>

                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>

                <div
                  className={cx(
                    "absolute right-0 mt-2 w-44 rounded-xl bg-popover text-popover-foreground shadow-xl overflow-hidden z-[999] pointer-events-auto",
                    userMenuOpen ? "block" : "hidden"
                  )}
                >
                  <button
                    onClick={() => go("/profile")}
                    className="w-full text-left block px-4 py-2 text-sm hover:bg-secondary"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => go("/help")}
                    className="w-full text-left block px-4 py-2 text-sm hover:bg-secondary"
                  >
                    Help
                  </button>
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-secondary text-red-500 inline-flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Đăng xuất
                  </button>
                </div>
              </div>

              {/* Mobile toggle */}
              <button
                type="button"
                className="md:hidden size-9 rounded-xl bg-secondary border border-transparent grid place-items-center"
                onClick={() => setMobileMenuOpen((v) => !v)}
              >
                <Menu className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-background/95 backdrop-blur-xl">
              <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-3 flex flex-col gap-2">
                <NavItem href="/home" active icon={<House className="w-4 h-4" />}>
                  Home
                </NavItem>
                <NavItem href="#" icon={<BookOpen className="w-4 h-4" />}>
                  Lessons
                </NavItem>
                <NavItem href="#" icon={<Dumbbell className="w-4 h-4" />}>
                  Practice
                </NavItem>
                <NavItem href="#" icon={<Users className="w-4 h-4" />}>
                  Friends
                </NavItem>
                <NavItem href="#" icon={<Settings className="w-4 h-4" />}>
                  Settings
                </NavItem>
              </div>
            </div>
          )}
        </header>

        {/* ---------------- MAIN ---------------- */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-6 lg:py-8 space-y-8">
            {/* msg */}
            <div className={cx("rounded-lg p-3 text-sm", msg ? messageClass : "hidden")}>
              {msg?.text}
            </div>

            {/* HERO - GIỮ NGUYÊN NỀN TỐI (Vì là Banner) */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600/20 via-[#0b1220] to-[#020617] p-6 lg:p-8">
              <div className="absolute -top-24 -left-24 size-[380px] rounded-full bg-blue-500/20 blur-[90px]" />
              <div className="absolute -bottom-28 -right-24 size-[420px] rounded-full bg-cyan-500/10 blur-[100px]" />

              <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                    Welcome back! <span className="inline-block">👋</span>
                  </h1>
                  <p className="text-slate-300 mt-2">
                    Bạn đang có{" "}
                    <span className="text-blue-400 font-bold">{streakText}</span>. Giữ nhịp mỗi ngày nhé!
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden sm:block text-right">
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      Daily Goal
                    </div>

                    {/* ✅ progress dynamic */}
                    <div className="mt-2 w-40 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: `${dailyGoalPct}%` }}
                      />
                    </div>

                    <div className="mt-2 text-[11px] text-slate-400">
                      {loadingStats
                        ? "..."
                        : `${stats?.todayMin || 0} / ${stats?.dailyGoalMin || 0} phút`}
                    </div>
                  </div>

                  <button
                    onClick={() => setMsg({ type: "info", text: "Coming soon." })}
                    className="h-11 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-bold shadow-lg shadow-blue-500/20 flex items-center gap-2 text-white"
                  >
                    <Zap className="w-5 h-5" /> Resume Learning
                  </button>
                </div>
              </div>
            </section>

            {/* STATS (dynamic) */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                icon={<Flame className="w-5 h-5 text-orange-500 dark:text-orange-300" />}
                badge={loadingStats ? "..." : `${stats?.todayMin || 0} min`}
                badgeTone="emerald"
                label="Weekly Streak"
                value={loadingStats ? "..." : `${stats?.streakDays || 0} Days`}
              />
              <StatCard
                icon={<GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-300" />}
                badge={loadingStats ? "..." : "This week"}
                badgeTone="emerald"
                label="Words Learned"
                value={loadingStats ? "..." : `${stats?.wordsLearned || 0}`}
              />
              <StatCard
                icon={<Timer className="w-5 h-5 text-purple-600 dark:text-purple-300" />}
                badge={loadingStats ? "..." : `Goal ${stats?.dailyGoalMin || 0}m`}
                badgeTone="emerald"
                label="Hours Studied"
                value={loadingStats ? "..." : `${stats?.hoursStudied || 0}h`}
              />
            </section>

            {/* CORE LESSONS */}
            <section className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-extrabold tracking-tight text-foreground">
                  Core Lessons
                </h2>

                <div className="flex items-center gap-2">
                  <Link
                    href="#"
                    className="hidden sm:inline text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline transition"
                  >
                    View all
                  </Link>

                  <button
                    onClick={() => scrollCore("prev")}
                    className="size-9 rounded-xl bg-secondary border border-transparent hover:brightness-95 transition grid place-items-center"
                  >
                    <ChevronLeft className="w-5 h-5 text-foreground" />
                  </button>

                  <button
                    onClick={() => scrollCore("next")}
                    className="size-9 rounded-xl bg-secondary border border-transparent hover:brightness-95 transition grid place-items-center"
                  >
                    <ChevronRight className="w-5 h-5 text-foreground" />
                  </button>
                </div>
              </div>

              <div
                ref={coreListRef}
                className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-4 px-1"
              >
                {lessons.map((lesson, index) => (
                  <LessonCard
                    key={index}
                    level={lesson.level}
                    title={lesson.title}
                    desc={lesson.desc}
                    gradient={lesson.gradient}
                    href={`/lessons/${lesson.level.toLowerCase()}`}
                    bgImage={lesson.bgImage}
                  />
                ))}
              </div>
            </section>

            {/* RECOMMENDED + ACTIVITY */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-extrabold tracking-tight text-foreground">
                    Recommended for You
                  </h2>
                  <Link
                    href="#"
                    className="text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline transition"
                  >
                    View all
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <RecommendedCard
                    tag="Shadowing"
                    title="Business English: Negotiation"
                    metaLeft={
                      <span className="inline-flex items-center gap-1">
                        <Timer className="w-4 h-4" /> 15 min
                      </span>
                    }
                    metaRight={
                      <span className="inline-flex items-center gap-1">
                        <Signal className="w-4 h-4" /> B2
                      </span>
                    }
                    bgTone="slate"
                    icon={<Mic2 className="w-4 h-4" />}
                    href="/practice/shadowing"
                  />

                  <RecommendedCard
                    tag="Dictation"
                    title="Daily News: Tech Trends"
                    metaLeft={
                      <span className="inline-flex items-center gap-1">
                        <Timer className="w-4 h-4" /> 10 min
                      </span>
                    }
                    metaRight={
                      <span className="inline-flex items-center gap-1">
                        <Signal className="w-4 h-4" /> C1
                      </span>
                    }
                    bgTone="slate2"
                    icon={<Newspaper className="w-4 h-4" />}
                    href="/practice/dictation"
                  />
                </div>
              </div>

              {/* Activity This Week (dynamic chart) */}
              <aside className="space-y-4">
                <h2 className="text-xl font-extrabold tracking-tight text-foreground">
                  Activity This Week
                </h2>

                <div className="rounded-2xl bg-card p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">
                        Total Time
                      </div>

                      <div className="mt-2 text-2xl font-black text-foreground">
                        {loadingStats ? "..." : `${stats?.hoursStudied || 0}h`}
                      </div>

                      <div className="mt-1 text-xs text-muted-foreground">
                        {loadingStats ? "" : "Last 7 days"}
                      </div>
                    </div>

                    <div className="size-10 rounded-xl bg-blue-500/10 ring-1 ring-border grid place-items-center">
                      <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                    </div>
                  </div>

                  {/* 🔥 SỬA BIỂU ĐỒ Ở ĐÂY: Dùng bg-slate-300 cho cột chưa đạt */}
                  <div className="mt-5 grid grid-cols-7 gap-2 items-end h-28">
                    {week.map((m, idx) => {
                      const pct = Math.round((m / maxWeek) * 100);
                      const isToday = idx === 6; // cột cuối là hôm nay
                      return (
                        <div
                          key={idx}
                          className={cx(
                            "rounded-md transition-all",
                            isToday
                              ? "bg-blue-600 shadow-[0_0_14px_rgba(37,99,235,0.35)]"
                              : "bg-slate-300 dark:bg-secondary/50" // <--- ĐÃ SỬA MÀU NÀY ĐẬM HƠN
                          )}
                          style={{ height: `${pct}%` }}
                          title={`${m} phút`}
                        />
                      );
                    })}
                  </div>

                  <div className="mt-4 flex justify-between text-xs text-slate-500 dark:text-muted-foreground">
                    <span>M</span>
                    <span>T</span>
                    <span>W</span>
                    <span>T</span>
                    <span className="text-foreground font-bold">F</span>
                    <span>S</span>
                    <span>S</span>
                  </div>
                </div>

                <Link
                  href="/help"
                  className="rounded-2xl bg-card p-4 hover:bg-secondary transition flex items-center gap-3"
                >
                  <div className="size-10 rounded-xl bg-secondary ring-1 ring-border grid place-items-center">
                    <HelpCircle className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="leading-tight">
                    <div className="font-bold text-foreground">Need help?</div>
                    <div className="text-xs text-muted-foreground">
                      Xem hướng dẫn sử dụng
                    </div>
                  </div>
                </Link>
              </aside>
            </section>

            <div className="h-10" />
          </div>
        </main>
      </div>
    </div>
  );
}

// ---------------- SMALL COMPONENTS ----------------

function NavItem({
  href,
  icon,
  active,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cx(
        "px-3 py-2 rounded-xl border text-sm inline-flex items-center gap-2 transition",
        active
          ? "bg-secondary border-border font-semibold text-foreground"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground border-transparent font-medium"
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

// STAT CARD
function StatCard({
  icon,
  badge,
  badgeTone,
  label,
  value,
}: {
  icon: React.ReactNode;
  badge: string;
  badgeTone: "emerald" | "blue" | "orange";
  label: string;
  value: string;
}) {
  const badgeClass =
    badgeTone === "emerald"
      ? "text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-500/20"
      : badgeTone === "blue"
        ? "text-indigo-700 bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-500/20"
        : "text-violet-700 bg-violet-100 dark:text-violet-300 dark:bg-violet-500/20";

  return (
    <div className="rounded-2xl bg-card p-5 hover:-translate-y-0.5 transition shadow-sm border border-sky-200 dark:border-border">
      <div className="flex items-start justify-between">
        <div className="size-10 rounded-xl bg-[#0f172a] ring-1 ring-slate-600 grid place-items-center">
          {icon}
        </div>

        <span className={cx("text-xs font-bold px-2 py-1 rounded-full", badgeClass)}>
          {badge}
        </span>
      </div>

      <div className="mt-4">
        <div className="text-sm text-muted-foreground font-medium">{label}</div>
        <div className="text-2xl font-extrabold mt-1 text-foreground">{value}</div>
      </div>
    </div>
  );
}

// RECOMMENDED CARD
function RecommendedCard({
  tag,
  title,
  metaLeft,
  metaRight,
  bgTone,
  icon,
  href,
}: {
  tag: string;
  title: string;
  metaLeft: React.ReactNode;
  metaRight: React.ReactNode;
  bgTone: "slate" | "slate2";
  icon: React.ReactNode;
  href: string;
}) {
  const bg = bgTone === "slate" ? "from-slate-100 dark:from-slate-600/25" : "from-slate-200 dark:from-slate-700/25";

  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl bg-card overflow-hidden hover:-translate-y-0.5 transition shadow-sm"
    >
      <div className="h-32 relative overflow-hidden">
        <div
          className={cx(
            "absolute inset-0 bg-gradient-to-br",
            bg,
            "via-background to-background"
          )}
        />
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.12),transparent_55%)]" />

        <div className="absolute left-3 bottom-3 flex items-center gap-2">
          <span className="px-2 py-1 rounded bg-black/50 border border-white/10 text-xs font-semibold text-white">
            {tag}
          </span>

          <span className="px-2 py-1 rounded bg-black/35 border border-white/10 text-xs font-semibold inline-flex items-center gap-1 text-slate-200">
            {icon} {tag === "Shadowing" ? "Speak" : "Write"}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-extrabold text-lg text-foreground">{title}</h3>
        <div className="flex items-center gap-3 text-muted-foreground text-sm">
          {metaLeft}
          {metaRight}
        </div>
      </div>
    </Link>
  );
}

// ---------------- LESSON CARD (Giữ nguyên) ----------------
function LessonCard({
  level,
  title,
  desc,
  gradient,
  href,
  bgImage,
}: {
  level: string;
  title: string;
  desc: string;
  gradient: string;
  href: string;
  bgImage?: string;
}) {
  const isPreA1 = level.toLowerCase().includes("pre");

  return (
    <Link
      href={href}
      className={cx(
        "relative overflow-hidden rounded-2xl p-6",
        "flex flex-col justify-between shrink-0",
        "h-[220px] w-[280px] sm:w-[320px]",
        "cursor-pointer transition-all duration-300",
        "hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-900/20",
        "border border-white/10",
        gradient
      )}
      style={bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    >
      {/* Overlay để chữ dễ đọc trên ảnh */}
      {bgImage && <div className="absolute inset-0 bg-black/40" />}
      <div className="flex justify-between items-start z-10">
        <div
          className={
            isPreA1
              ? "inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-inner"
              : "flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-inner"
          }
        >
          <span className={isPreA1 ? "text-xs font-bold text-white" : "text-sm font-bold text-white"}>
            {level}
          </span>
        </div>
      </div>

      <div className="mt-auto z-10">
        <h3 className="text-xl font-bold text-white mb-2 tracking-wide">
          {title}
        </h3>
        <p className="text-sm text-gray-300/80 font-medium line-clamp-2 leading-relaxed">
          {desc}
        </p>
      </div>

      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-black/20 rounded-full blur-2xl pointer-events-none" />
    </Link>
  );
}