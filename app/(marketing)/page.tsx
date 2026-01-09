import Link from "next/link";
import {
  GraduationCap,
  HelpCircle,
  Keyboard,
  Mic,
  NotebookPen,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

function FeatureCard({
  accent,
  icon,
  title,
  desc,
}: {
  accent: "blue" | "cyan";
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  const hover =
    accent === "blue"
      ? "group-hover:text-blue-400"
      : "group-hover:text-cyan-400";
  const glow = accent === "blue" ? "from-blue-400/10" : "from-cyan-400/10";
  const badge = accent === "blue" ? "bg-blue-400/10" : "bg-cyan-400/10";

  return (
    <div className="group relative p-5 sm:p-6 rounded-2xl bg-[#0f172a]/70 border border-white/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden glass-card">
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
      />
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div
          className={`size-11 rounded-full ${badge} border border-white/10 grid place-items-center`}
        >
          {icon}
        </div>

        <div className="text-center">
          <h3
            className={`font-bold text-base sm:text-lg transition-colors ${hover}`}
          >
            {title}
          </h3>
          <p className="text-sm text-slate-400">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function MarketingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background giống bản cũ */}
      <div className="landing-bg">
        <div className="landing-bg__base" />
        <div className="landing-blob landing-blob--top" />
        <div className="landing-blob landing-blob--left" />
        <div className="landing-blob landing-blob--right" />
        <div className="landing-noise" />
      </div>

      {/* Header (không hardcode bg tối nữa) */}
      <header className="site-header w-full border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full grid place-items-center border border-white/10 bg-white/5">
            <GraduationCap className="w-5 h-5" />
          </span>

          <h2 className="text-xl font-bold tracking-tight">
            Shadowing <span className="text-blue-400">&amp;</span> Dictation
          </h2>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors"
            href="/help"
          >
            <HelpCircle className="w-4 h-4" />
            Trợ giúp
          </Link>

          <ThemeToggle />

          <Link
            className="text-sm font-bold px-4 py-2 rounded-full text-blue-400 hover:bg-blue-500/10 border border-transparent hover:border-blue-400/25 transition"
            href="/login"
          >
            Đăng nhập
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-10 sm:py-14">
        <section className="w-full max-w-[760px]">
          <div className="mx-auto w-full max-w-[620px] flex flex-col items-center text-center gap-8 sm:gap-9">
            {/* Hero / Orbit */}
            <div className="relative mt-2 sm:mt-4">
              <div className="relative size-[160px] sm:size-[185px] grid place-items-center">
                <div className="absolute inset-0 rounded-full border border-blue-400/20" />
                <div className="absolute inset-5 rounded-full border border-dashed border-cyan-400/20" />
                <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-2xl" />

                <div className="relative z-10 size-[76px] sm:size-[86px] rounded-2xl bg-gradient-to-br from-blue-600 to-sky-400 shadow-xl shadow-blue-500/25 ring-1 ring-white/10 grid place-items-center">
                  <GraduationCap className="w-10 h-10 sm:w-11 sm:h-11" />
                </div>

                <div className="absolute -right-3 -top-2 sm:-right-4 sm:-top-3 bg-[#0f172a]/85 backdrop-blur-sm p-2.5 rounded-full border border-white/10 shadow-lg glass-card">
                  <Mic className="w-5 h-5 text-slate-200" />
                </div>

                <div className="absolute -left-3 bottom-2 sm:-left-4 sm:bottom-4 bg-[#0f172a]/85 backdrop-blur-sm p-2.5 rounded-full border border-white/10 shadow-lg glass-card">
                  <NotebookPen className="w-5 h-5 text-slate-200" />
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl font-black leading-[1.06] tracking-tight">
                Chinh phục
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                  Tiếng Anh
                </span>
              </h1>

              <p className="text-slate-400 text-base sm:text-xl leading-relaxed max-w-[52ch] mx-auto">
                Nền tảng chuyên sâu về{" "}
                <span className="text-blue-400 font-semibold">Shadowing</span> và{" "}
                <span className="text-cyan-400 font-semibold">Dictation</span>.
                Biến việc nghe nói trở thành phản xạ tự nhiên.
              </p>
            </div>

            {/* Feature cards */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-1">
              <FeatureCard
                accent="blue"
                icon={<MessageCircle className="w-6 h-6 text-blue-300" />}
                title="Shadowing"
                desc="Luyện ngữ điệu & phát âm"
              />
              <FeatureCard
                accent="cyan"
                icon={<Keyboard className="w-6 h-6 text-cyan-300" />}
                title="Dictation"
                desc="Nghe sâu & chép chính tả"
              />
            </div>

            {/* CTA */}
            <div className="w-full flex flex-col gap-3 sm:gap-4 pt-1">
              <Link
                href="/register"
                className="btn-shine group relative w-full h-13 sm:h-14 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-sky-400 hover:brightness-110 text-white text-base sm:text-lg font-bold tracking-wide shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-[0.98] transition overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Bắt đầu miễn phí
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

   <Link
  href="/login"
  className="
    w-full h-13 sm:h-14 flex items-center justify-center rounded-xl
    glass-card
    hover:bg-black/5 dark:hover:bg-white/10
    !text-[color:var(--fg)]
    font-semibold transition
  "
>
  Đã có tài khoản? Đăng nhập
</Link>
            </div>

            {/* Footer note */}
            <div className="text-center pt-3 sm:pt-4">
              <p className="text-slate-500 text-sm">
                Ứng dụng tối ưu cho mọi trình độ.{" "}
                <Link
                  className="text-blue-400 hover:text-cyan-400 font-medium transition-colors underline decoration-transparent hover:decoration-current"
                  href="/about"
                >
                  Tìm hiểu thêm
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
    </div>
  );
}
