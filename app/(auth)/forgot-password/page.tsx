"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HelpCircle, Mail } from "lucide-react";
import { ThemeToggle } from '@/views/components/theme-toggle';

type MsgType = "error" | "success" | "info";

const PENDING_RESET_IDENTIFIER_KEY = "pending_reset_identifier";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [identifier, setIdentifier] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [msg, setMsg] = React.useState<{ type: MsgType; text: string } | null>(null);

  function showMessage(type: MsgType, text: string) {
    setMsg({ type, text });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    const v = identifier.trim();
    if (!v) {
      showMessage("error", "Vui lòng nhập email hoặc tên đăng nhập.");
      return;
    }

    setSubmitting(true);
    showMessage("info", "Đang gửi mã xác minh...");

    try {
      const res = await fetch("/api/auth/password/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ identifier: v }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || data?.status === "error") {
        showMessage("error", data?.message || `HTTP ${res.status}`);
        return;
      }

      try {
        localStorage.setItem(PENDING_RESET_IDENTIFIER_KEY, v);
      } catch {}

      showMessage("success", data?.message || "Đã gửi mã xác minh.");
      setTimeout(() => {
        router.push(`/reset-password?identifier=${encodeURIComponent(v)}`);
      }, 350);
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
      {/* Background */}
      <div className="landing-bg">
        <div className="landing-bg__base" />
        <div className="landing-blob landing-blob--top" />
        <div className="landing-blob landing-blob--left" />
        <div className="landing-blob landing-blob--right" />
        <div className="landing-noise" />
      </div>

      {/* Header */}
        <header className="site-header sticky top-0 z-50 flex w-full items-center justify-between border-b border-slate-200/80 bg-white/65 px-6 py-4 backdrop-blur dark:border-white/5 dark:bg-transparent">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full grid place-items-center border border-slate-300 bg-white/80 shadow-sm overflow-hidden dark:border-white/10 dark:bg-white/5 dark:shadow-none">
            <Image
              src="/assets/icons/chick.png"
              alt="Logo"
              width={32}
              height={32}
              className="w-6 h-6 object-contain"
              priority
            />
          </span>

            <Link href="/" className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Shadowing <span className="text-blue-600 dark:text-blue-400">&amp;</span> Dictation
            </Link>
          </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/help"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors dark:text-slate-400 dark:hover:text-blue-400"
          >
            <HelpCircle className="w-4 h-4" />
            Trợ giúp
          </Link>

          <ThemeToggle />

            <Link
              href="/login"
              className="text-sm font-bold px-4 py-2 rounded-full text-blue-700 hover:bg-blue-50 border border-blue-200/60 hover:border-blue-300 transition dark:text-blue-400 dark:hover:bg-blue-500/10 dark:border-transparent dark:hover:border-blue-400/25"
            >
              Đăng nhập
            </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="glass-card w-full max-w-130 rounded-2xl border border-slate-200 bg-white/78 px-6 py-10 shadow-xl shadow-slate-300/35 sm:px-10 dark:border-white/10 dark:bg-transparent dark:shadow-none">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex items-center justify-center size-16 rounded-full bg-blue-500/10 ring-1 ring-blue-400/20 mb-2">
              <Mail className="w-7 h-7 text-blue-400" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-slate-950 dark:text-white">
                Quên mật khẩu
              </h1>
              <p className="mx-auto max-w-105 text-base leading-relaxed text-slate-600 dark:text-muted">
                Nhập email hoặc tên đăng nhập đã đăng ký. Chúng tôi sẽ gửi mã xác minh về email của bạn để đặt lại mật khẩu.
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-5 mt-8">
            <div className="flex flex-col gap-2">
              <label className="text-base font-semibold text-slate-900 dark:text-white">Email hoặc tên đăng nhập</label>
              <input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="email@example.com hoặc username"
                autoComplete="username"
                className="w-full rounded-lg h-14 px-4 text-base
                             border border-slate-300 bg-white/95 shadow-sm text-slate-900 placeholder:text-slate-500
                           focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500
                           dark:border-[#324d67] dark:bg-[#192633] dark:text-white dark:placeholder:text-[#92adc9]
                           transition-all"
              />
            </div>

            <div
              className={[
                "min-h-5 text-sm rounded-lg p-3",
                msg ? messageClass : "hidden",
              ].join(" ")}
            >
              {msg?.text || ""}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="
                flex w-full items-center justify-center overflow-hidden rounded-lg h-12 px-5
                bg-blue-600 hover:bg-blue-700 text-white text-base font-bold
                transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {submitting ? "Đang gửi..." : "Tiếp tục"}
            </button>

            <div className="w-full h-px bg-white/10" />

            <Link
              href="/login"
              className="text-center text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors dark:text-slate-300 dark:hover:text-blue-400"
            >
              ← Quay lại đăng nhập
            </Link>
          </form>
        </div>
      </main>

      <footer className="py-6 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-600">
          © 2024 Shadowing &amp; Dictation. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
