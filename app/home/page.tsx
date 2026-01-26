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

// --- TYPES ---
type MeUser = {
  id?: string;
  email?: string;
  username?: string;
  displayName?: string | null;
  role?: string;
  avatarUrl?: string | null;
};

type MeResponse =
  | { status: "success"; user: MeUser }
  | { status: "error"; message?: string }
  | any;

type MsgType = "error" | "success" | "info";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// --- MAIN COMPONENT ---
export default function HomePage() {
  const router = useRouter();

  // State quản lý Menu & User
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const userMenuRef = React.useRef<HTMLDivElement | null>(null);

  // State dữ liệu User
  const [displayName, setDisplayName] = React.useState("User");
  const [role, setRole] = React.useState("Member");
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
  const [msg, setMsg] = React.useState<{ type: MsgType; text: string } | null>(
    null
  );

  // Ref cho chức năng cuộn ngang Core Lessons
  const coreListRef = React.useRef<HTMLDivElement | null>(null);

  // --- DATA: Dữ liệu bài học (Đã cập nhật Gradient) ---
  const lessons = [
    {
      level: "Pre-A1",
      title: "Bài tập Pre-A1",
      desc: "Làm quen với tiếng Anh cơ bản.",
      gradient: "bg-gradient-to-br from-[#0c4a6e] to-[#0f172a]", // Xanh biển đậm
    },
    {

      level: "A1",
      
      title: "Bài tập A1",
      desc: "Nền tảng nghe – nói cơ bản.",
      gradient: "bg-gradient-to-br from-[#1e3a8a] to-[#0f172a]", // Xanh đậm
    },
    {
      level: "A2",
      
      title: "Bài tập A2",
      desc: "Tăng phản xạ – từ vựng thông dụng.",
      gradient: "bg-gradient-to-br from-[#334155] to-[#0f172a]", // Xám xanh
    },
    {
      level: "B1",
      
      title: "Bài tập B1",
      desc: "Nghe sâu – nói mạch lạc hơn.",
      gradient: "bg-gradient-to-br from-[#1f2937] to-[#030712]", // Đen xám
    },
    {
      level: "B2",
      
      title: "Bài tập B2",
      desc: "Tốc độ + độ chính xác cao hơn.",
      gradient: "bg-gradient-to-br from-[#3730a3] to-[#0f172a]", // Tím than
    },
  ];

  // --- EFFECTS ---
  // ✅ (CHỈ SỬA AVATAR) load avatar từ /api/me
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
        const u = data.user || {};

        // ✅ set avatar
        setAvatarUrl(u.avatarUrl || null);

        // ✅ set tên hiển thị (ưu tiên displayName -> username -> User)
        setDisplayName(u.displayName || u.username || "User");

        // ✅ set role
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


  // --- ACTIONS ---
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
    const amount = 320; // Scroll bằng chiều rộng 1 thẻ
    el.scrollBy({
      left: dir === "prev" ? -amount : amount,
      behavior: "smooth",
    });
  }

  const messageClass =
    msg?.type === "error"
      ? "bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-500/20"
      : msg?.type === "success"
      ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-500/20"
      : "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-500/20";

  return (
    <div className="bg-background-dark text-white antialiased overflow-x-hidden">
      <div className="h-screen w-full flex flex-col">
        {/* --- TOP NAV --- */}
        <header className="shrink-0 sticky top-0 z-[200] overflow-visible border-b border-white/10 bg-[#0b1220]/60 backdrop-blur-xl">
          <div className="mx-auto max-w-[1200px] px-5 lg:px-8 h-16 flex items-center justify-between overflow-visible">
            {/* Brand */}
            <Link href="/home" className="flex items-center gap-3 select-none">
              <div className="size-9 rounded-xl bg-blue-500/15 ring-1 ring-white/10 grid place-items-center">
                <GraduationCap className="w-5 h-5 text-blue-300" />
              </div>
              <div className="leading-tight">
                <div className="font-extrabold tracking-tight">
                  EnglishMaster
                </div>
                <div className="text-[11px] text-slate-400">
                  Learn efficiently
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-2">
              <NavItem
                href="/home"
                active
                icon={<House className="w-4 h-4" />}
              >
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
                className="relative size-9 rounded-full hover:bg-white/5 border border-white/10 transition grid place-items-center"
                title="Notifications"
                onClick={() => setMsg({ type: "info", text: "Thông báo sẽ có sau." })}
              >
                <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-red-500 ring-2 ring-[#0b1220]" />
                <Bell className="w-5 h-5 text-slate-200/90" />
              </button>

              {/* User Menu Dropdown */}
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  className="flex items-center gap-3 pl-3 pr-2 py-2 rounded-full hover:bg-white/5 border border-white/10 transition"
                  onClick={() => setUserMenuOpen((v) => !v)}
                >
                  <div className="text-right leading-tight hidden sm:block">
                    <div className="text-sm font-semibold">{displayName}</div>
                    <div className="text-[11px] text-slate-400">{role}</div>
                  </div>

                  <div className="relative size-8 rounded-full bg-white/10 ring-1 ring-white/10 overflow-hidden grid place-items-center">
                    {avatarUrl ? (
                      <Image
                        key={avatarUrl} // ✅ (CHỈ SỬA AVATAR) bắt Image update khi URL đổi
                        src={avatarUrl}
                        alt="Avatar"
                        fill
                        className="object-cover"
                        sizes="32px"
                        unoptimized // ✅ (CHỈ SỬA AVATAR) đảm bảo hiện ảnh cloudinary không cần config domain
                        onError={() => setAvatarUrl(null)} // ✅ lỗi ảnh thì fallback
                      />
                    ) : (
                      <span className="text-sm">🙂</span>
                    )}
                  </div>

                  <ChevronDown className="w-4 h-4 text-slate-300" />
                </button>

                <div
                  className={cx(
                    "absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-[#0f172a]/95 backdrop-blur-xl shadow-xl overflow-hidden z-[999] pointer-events-auto",
                    userMenuOpen ? "block" : "hidden"
                  )}
                >
                  <button
                    onClick={() => go("/profile")}
                    className="w-full text-left block px-4 py-2 text-sm hover:bg-white/5"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => go("/help")}
                    className="w-full text-left block px-4 py-2 text-sm hover:bg-white/5"
                  >
                    Help
                  </button>
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 text-red-300 inline-flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Đăng xuất
                  </button>
                </div>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                className="md:hidden size-9 rounded-xl bg-white/5 border border-white/10 grid place-items-center"
                onClick={() => setMobileMenuOpen((v) => !v)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Nav Content */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 bg-[#0b1220]/70 backdrop-blur-xl">
              <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-3 flex flex-col gap-2">
                <NavItem
                  href="/home"
                  active
                  icon={<House className="w-4 h-4" />}
                >
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

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-6 lg:py-8 space-y-8">
            <div
              className={cx(
                "rounded-lg p-3 text-sm",
                msg ? messageClass : "hidden"
              )}
            >
              {msg?.text}
            </div>

            {/* HERO SECTION */}
            <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/25 via-[#0b1220] to-[#0b1220] p-6 lg:p-8">
              <div className="absolute -top-24 -left-24 size-[380px] rounded-full bg-blue-500/25 blur-[90px]" />
              <div className="absolute -bottom-28 -right-24 size-[420px] rounded-full bg-cyan-500/15 blur-[100px]" />
              <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                    Welcome back! <span className="inline-block">👋</span>
                  </h1>
                  <p className="text-slate-300 mt-2">
                    Bạn đang có{" "}
                    <span className="text-blue-400 font-bold">5-day streak</span>
                    . Giữ nhịp mỗi ngày nhé!
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:block text-right">
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      Daily Goal
                    </div>
                    <div className="mt-2 w-40 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-[80%] bg-blue-500 rounded-full" />
                    </div>
                  </div>
                  <button
                    onClick={() => setMsg({ type: "info", text: "Coming soon." })}
                    className="h-11 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-bold shadow-lg shadow-blue-500/20 flex items-center gap-2"
                  >
                    <Zap className="w-5 h-5" /> Resume Learning
                  </button>
                </div>
              </div>
            </section>

            {/* STATS SECTION */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                icon={<Flame className="w-5 h-5 text-orange-300" />}
                badge="+1 Day"
                badgeTone="emerald"
                label="Weekly Streak"
                value="5 Days"
              />
              <StatCard
                icon={<GraduationCap className="w-5 h-5 text-blue-300" />}
                badge="+15 New"
                badgeTone="emerald"
                label="Words Learned"
                value="120"
              />
              <StatCard
                icon={<Timer className="w-5 h-5 text-purple-300" />}
                badge="+30 min"
                badgeTone="emerald"
                label="Hours Studied"
                value="4.5h"
              />
            </section>

            {/* CORE LESSONS SECTION (Updated) */}
            <section className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-extrabold tracking-tight">
                  Core Lessons
                </h2>
                <div className="flex items-center gap-2">
                  <Link
                    href="#"
                    className="hidden sm:inline text-blue-400 font-semibold text-sm hover:text-cyan-300 transition"
                  >
                    View all
                  </Link>
                  <button
                    onClick={() => scrollCore("prev")}
                    className="size-9 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition grid place-items-center"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => scrollCore("next")}
                    className="size-9 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition grid place-items-center"
                  >
                    <ChevronRight className="w-5 h-5" />
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
                  />
                ))}
              </div>
            </section>

            {/* RECOMMENDED + ACTIVITY */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-extrabold tracking-tight">
                    Recommended for You
                  </h2>
                  <Link
                    href="#"
                    className="text-blue-400 font-semibold text-sm hover:text-cyan-300 transition"
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

              <aside className="space-y-4">
                <h2 className="text-xl font-extrabold tracking-tight">
                  Activity This Week
                </h2>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-slate-400 font-semibold uppercase tracking-wider">
                        Total Time
                      </div>
                      <div className="mt-2 text-2xl font-black">12h 30m</div>
                    </div>
                    <div className="size-10 rounded-xl bg-blue-500/15 ring-1 ring-white/10 grid place-items-center">
                      <TrendingUp className="w-5 h-5 text-blue-300" />
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-7 gap-2 items-end h-28">
                    <div className="h-[35%] bg-white/10 rounded-md" />
                    <div className="h-[60%] bg-white/10 rounded-md" />
                    <div className="h-[28%] bg-white/10 rounded-md" />
                    <div className="h-[80%] bg-white/10 rounded-md" />
                    <div className="h-[92%] bg-blue-500 rounded-md shadow-[0_0_14px_rgba(59,130,246,0.35)]" />
                    <div className="h-[18%] bg-white/10 rounded-md" />
                    <div className="h-[12%] bg-white/10 rounded-md" />
                  </div>

                  <div className="mt-4 flex justify-between text-xs text-slate-400">
                    <span>M</span>
                    <span>T</span>
                    <span>W</span>
                    <span>T</span>
                    <span className="text-white font-bold">F</span>
                    <span>S</span>
                    <span>S</span>
                  </div>
                </div>

                <Link
                  href="/help"
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition flex items-center gap-3"
                >
                  <div className="size-10 rounded-xl bg-white/5 ring-1 ring-white/10 grid place-items-center">
                    <HelpCircle className="w-5 h-5 text-slate-200" />
                  </div>
                  <div className="leading-tight">
                    <div className="font-bold">Need help?</div>
                    <div className="text-xs text-slate-400">
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

// --- SMALL COMPONENTS ---

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
          ? "bg-white/5 border-white/10 font-semibold"
          : "text-slate-300 hover:bg-white/5 hover:border-white/10 border-transparent font-medium"
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

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
      ? "text-emerald-300 bg-emerald-500/15"
      : badgeTone === "blue"
      ? "text-blue-300 bg-blue-500/15"
      : "text-orange-300 bg-orange-500/15";
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:-translate-y-0.5 transition">
      <div className="flex items-start justify-between">
        <div className="size-10 rounded-xl bg-white/5 ring-1 ring-white/10 grid place-items-center">
          {icon}
        </div>
        <span className={cx("text-xs font-bold px-2 py-1 rounded-full", badgeClass)}>
          {badge}
        </span>
      </div>
      <div className="mt-4">
        <div className="text-sm text-slate-400 font-medium">{label}</div>
        <div className="text-2xl font-extrabold mt-1">{value}</div>
      </div>
    </div>
  );
}

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
  const bg = bgTone === "slate" ? "from-slate-600/25" : "from-slate-700/25";

  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:-translate-y-0.5 transition"
    >
      <div className="h-32 relative overflow-hidden">
        <div className={cx("absolute inset-0 bg-gradient-to-br", bg, "via-[#0b1220] to-[#0b1220]")} />
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.12),transparent_55%)]" />
        <div className="absolute left-3 bottom-3 flex items-center gap-2">
          <span className="px-2 py-1 rounded bg-black/50 border border-white/10 text-xs font-semibold">
            {tag}
          </span>
          <span className="px-2 py-1 rounded bg-black/35 border border-white/10 text-xs font-semibold inline-flex items-center gap-1 text-slate-200">
            {icon} {tag === "Shadowing" ? "Speak" : "Write"}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-extrabold text-lg">{title}</h3>
        <div className="flex items-center gap-3 text-slate-400 text-sm">
          {metaLeft}
          {metaRight}
        </div>
      </div>
    </Link>
  );
}

// --- LESSON CARD ---

function LessonCard({
  level,
  title,
  desc,
  gradient,
  href,
}: {
  level: string;
  title: string;
  desc: string;
  gradient: string;
  href: string;
}) {
  const isPreA1 = level.toLowerCase().includes("pre");

  return (
    <Link
      href={href}
      className={`
        relative overflow-hidden rounded-2xl p-6 
        flex flex-col justify-between shrink-0
        h-[220px] w-[280px] sm:w-[320px]
        cursor-pointer transition-all duration-300 
        hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-900/20
        border border-white/10
        ${gradient}
      `}
    >
      <div className="flex justify-between items-start z-10">
        {/* ✅ Khung level - fix Pre-A1 */}
        <div
          className={
            isPreA1
              ? "px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-inner"
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
        <p className="text-sm text-gray-400 font-medium line-clamp-2 leading-relaxed">
          {desc}
        </p>
      </div>

      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-black/20 rounded-full blur-2xl pointer-events-none"></div>
    </Link>
  );
}
