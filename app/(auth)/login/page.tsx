"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { HelpCircle, Eye, EyeOff } from "lucide-react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRouter } from "next/navigation";

type MsgType = "error" | "success" | "info";

const PENDING_LOGIN_EMAIL_KEY = "pending_login_email";
const PENDING_LOGIN_REMEMBER_KEY = "pending_login_remember";

export default function LoginPage() {
  const router = useRouter();

  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(false);
  const [showPw, setShowPw] = React.useState(false);

  const [submitting, setSubmitting] = React.useState(false);
  const [msg, setMsg] = React.useState<{ type: MsgType; text: string } | null>(null);

  function showMessage(type: MsgType, text: string) {
    setMsg({ type, text });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    const id = identifier.trim();
    if (!id || !password) {
      showMessage("error", "Vui lòng nhập đầy đủ Email/Tên người dùng và Mật khẩu.");
      return;
    }

    setSubmitting(true);
    showMessage("info", "Đang đăng nhập...");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ identifier: id, password, remember }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        showMessage("error", data?.message || `HTTP ${res.status}`);
        return;
      }

      if (data?.status === "2fa_required") {
        const email = String(data?.email || "").trim();

        if (!email) {
          showMessage("error", "Server không trả về email để xác thực. Kiểm tra API /api/auth/login.");
          return;
        }

        // ✅ LƯU EMAIL THẬT (kể cả khi login bằng username)
        try {
          localStorage.setItem(PENDING_LOGIN_EMAIL_KEY, email);
          localStorage.setItem(PENDING_LOGIN_REMEMBER_KEY, JSON.stringify(remember));
        } catch {}

        showMessage("success", "Vui lòng kiểm tra email để lấy mã xác thực...");

        // ✅ Route đúng vì bạn có app/(auth)/verify-login/page.tsx
        router.push(`/verify-login?email=${encodeURIComponent(email)}`);
        return;
      }

      if (data?.status === "success") {
        // (nếu sau này bạn cho login không cần 2FA)
        try {
          localStorage.removeItem(PENDING_LOGIN_EMAIL_KEY);
          localStorage.removeItem(PENDING_LOGIN_REMEMBER_KEY);
        } catch {}

        showMessage("success", "Đăng nhập thành công!");
        setTimeout(() => (window.location.href = data.redirect || "/"), 400);
        return;
      }

      showMessage("error", data?.message || "Đăng nhập thất bại.");
    } catch (err) {
      console.error(err);
      showMessage("error", "Không thể kết nối đến máy chủ.");
    } finally {
      setSubmitting(false);
    }
  }

  const messageClass =
    msg?.type === "error"
      ? "bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-500/20"
      : msg?.type === "success"
      ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-500/20"
      : "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-500/20";

  return (
    <div className="min-h-screen flex flex-col">
      <div className="landing-bg">
        <div className="landing-bg__base" />
        <div className="landing-blob landing-blob--top" />
        <div className="landing-blob landing-blob--left" />
        <div className="landing-blob landing-blob--right" />
        <div className="landing-noise" />
      </div>

      <header className="site-header w-full border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full grid place-items-center border border-white/10 bg-white/5 overflow-hidden">
            <Image
              src="/assets/icons/chick.png"
              alt="Logo"
              width={32}
              height={32}
              className="w-6 h-6 object-contain"
              priority
            />
          </span>

          <Link href="/" className="text-lg sm:text-xl font-extrabold tracking-tight">
            Shadowing <span className="text-blue-400">&amp;</span> Dictation
          </Link>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/help"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            Trợ giúp
          </Link>

          <ThemeToggle />

          <Link
            href="/register"
            className="text-sm font-bold px-4 py-2 rounded-full text-blue-400 hover:bg-blue-500/10 border border-transparent hover:border-blue-400/25 transition"
          >
            Đăng ký
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <section className="w-full">
              <div className="w-full max-w-[480px]">
                <div className="flex flex-col gap-2 text-center sm:text-left">
                  <h1 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight">
                    Chào mừng trở lại!
                  </h1>
                  <p className="text-muted text-base leading-normal">
                    Tiếp tục hành trình chinh phục tiếng Anh của bạn.
                  </p>
                </div>

                <form onSubmit={onSubmit} className="flex flex-col gap-5 mt-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-base font-semibold">Email hoặc tên người dùng</label>
                    <input
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="email@example.com hoặc username"
                      className="w-full rounded-lg h-14 px-4 text-base
                                 border border-black/15 bg-white text-slate-900 placeholder:text-slate-400
                                 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500
                                 dark:border-[#324d67] dark:bg-[#192633] dark:text-white dark:placeholder:text-[#92adc9]
                                 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-base font-semibold">Mật khẩu</label>

                    <div className="relative flex w-full items-stretch rounded-lg overflow-hidden">
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPw ? "text" : "password"}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        className="w-full h-14 px-4 text-base
                                   border border-r-0 border-black/15 bg-white text-slate-900 placeholder:text-slate-400
                                   focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500
                                   dark:border-[#324d67] dark:bg-[#192633] dark:text-white dark:placeholder:text-[#92adc9]
                                   transition-all"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPw((v) => !v)}
                        className="px-4 grid place-items-center
                                   border border-l-0 border-black/15 bg-white text-slate-600 hover:bg-slate-50
                                   dark:border-[#324d67] dark:bg-[#192633] dark:text-[#92adc9] dark:hover:bg-[#233648]
                                   transition-colors"
                        aria-label={showPw ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      >
                        {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="h-5 w-5 rounded border-2 border-black/20
                                   text-blue-600 checked:bg-blue-600 checked:border-blue-600
                                   focus:ring-2 focus:ring-blue-500/40 transition-all cursor-pointer
                                   dark:border-[#324d67]"
                      />
                      <span className="text-sm sm:text-base text-muted group-hover:opacity-90 transition">
                        Ghi nhớ đăng nhập
                      </span>
                    </label>

                    <Link href="/forgot-password" className="text-sm sm:text-base font-bold text-accent hover:opacity-80 transition">
                      Quên mật khẩu?
                    </Link>
                  </div>

                  <div className={["min-h-[20px] text-sm rounded-lg p-3", msg ? messageClass : "hidden"].join(" ")}>
                    {msg?.text || ""}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-12 rounded-lg font-bold text-base text-white
                               bg-blue-600 hover:bg-blue-700 active:scale-[0.98]
                               transition-all shadow-lg shadow-blue-500/20
                               focus:outline-none focus:ring-2 focus:ring-blue-500/40
                               disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Đăng nhập
                  </button>

                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-black/15 dark:border-[#324d67]" />
                    <span className="flex-shrink mx-4 text-muted text-sm">Hoặc</span>
                    <div className="flex-grow border-t border-black/15 dark:border-[#324d67]" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 h-12 rounded-lg
                                 border border-black/15 bg-white hover:bg-slate-50
                                 text-slate-800 font-semibold
                                 dark:border-[#324d67] dark:bg-[#192633] dark:hover:bg-[#233648] dark:text-white
                                 transition-all"
                      onClick={() => alert("Tích hợp Google OAuth sau")}
                    >
                      <FaGoogle className="w-5 h-5" />
                      <span>Google</span>
                    </button>

                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 h-12 rounded-lg
                                 border border-black/15 bg-white hover:bg-slate-50
                                 text-slate-800 font-semibold
                                 dark:border-[#324d67] dark:bg-[#192633] dark:hover:bg-[#233648] dark:text-white
                                 transition-all"
                      onClick={() => alert("Tích hợp Facebook OAuth sau")}
                    >
                      <FaFacebookF className="w-5 h-5" />
                      <span>Facebook</span>
                    </button>
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-muted text-sm sm:text-base">
                      Chưa có tài khoản?
                      <Link href="/register" className="font-extrabold text-accent hover:opacity-80 transition ml-1">
                        Đăng ký ngay
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </section>

            {/* RIGHT giữ nguyên như bạn */}
            <section className="w-full">
              <div className="rounded-2xl px-6 sm:px-10 py-10 glass-card">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                    How Practicing Dictation &amp; Shadowing Improves Your English Skills
                  </h2>
                  <p className="mt-2 text-muted text-sm sm:text-base">
                    When practicing exercises, you will go through 4 main steps,
                    all of them are equally important!
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Step img="/images/nghe.png" title="1. Listen to the audio" desc="Listen carefully — it’s the key to improving your listening skills." />
                  <Step img="/images/nhap.png" title="2. Type what you hear" desc="Typing forces you to focus on details: spelling, pronunciation, and writing." />
                  <Step img="/images/tick.png" title="3. Check & correct" desc="Learn from mistakes to improve accuracy and comprehension." />
                  <Step img="/images/noi.png" title="4. Read it out loud" desc="Reading out loud helps your pronunciation and speaking skills." />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function Step({ img, title, desc }: { img: string; title: string; desc: string }) {
  return (
    <div className="text-center">
      <Image src={img} alt={title} width={96} height={96} className="mx-auto h-20 w-20 object-contain" />
      <h3 className="mt-4 text-lg sm:text-xl font-extrabold">{title}</h3>
      <p className="mt-2 text-sm text-muted leading-relaxed">{desc}</p>
    </div>
  );
}
