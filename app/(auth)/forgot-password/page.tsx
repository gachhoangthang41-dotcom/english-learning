"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { HelpCircle, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

type MsgType = "error" | "success" | "info";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [msg, setMsg] = React.useState<{ type: MsgType; text: string } | null>(null);

  function showMessage(type: MsgType, text: string) {
    setMsg({ type, text });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    const v = email.trim().toLowerCase();
    if (!v) {
      showMessage("error", "Vui lòng nhập email.");
      return;
    }

    setSubmitting(true);
    showMessage("info", "Đang gửi link đặt lại mật khẩu...");

    try {
      const res = await fetch("/api/auth/password/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email: v }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || data?.status === "error") {
        showMessage("error", data?.message || `HTTP ${res.status}`);
        return;
      }

      // Lưu email để reset page hiển thị đẹp hơn (optional)
      try {
        localStorage.setItem("pending_reset_email", v);
      } catch {}

      showMessage(
        "success",
        data?.message ||
          "Đã gửi link đặt lại mật khẩu. Vui lòng kiểm tra Gmail (Inbox/Spam/Promotions)."
      );
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
      <header className="site-header w-full border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3">
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

          <h2 className="text-lg font-bold leading-tight tracking-tight">
            Shadowing <span className="text-blue-400">&amp;</span> Dictation
          </h2>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/help"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            Trợ giúp
          </Link>

          <ThemeToggle />
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[520px] rounded-2xl px-6 sm:px-10 py-10 glass-card shadow-xl">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex items-center justify-center size-16 rounded-full bg-blue-500/10 ring-1 ring-blue-400/20 mb-2">
              <Mail className="w-7 h-7 text-blue-400" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight">
                Quên mật khẩu
              </h1>
              <p className="text-muted text-base leading-relaxed max-w-[420px] mx-auto">
                Nhập email của bạn. Chúng tôi sẽ gửi link để bạn đặt lại mật khẩu.
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-5 mt-8">
            <div className="flex flex-col gap-2">
              <label className="text-base font-semibold">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                autoComplete="email"
                className="w-full rounded-lg h-14 px-4 text-base
                           border border-black/15 bg-white text-slate-900 placeholder:text-slate-400
                           focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500
                           dark:border-[#324d67] dark:bg-[#192633] dark:text-white dark:placeholder:text-[#92adc9]
                           transition-all"
              />
            </div>

            <div
              className={[
                "min-h-[20px] text-sm rounded-lg p-3",
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
              {submitting ? "Đang gửi..." : "Gửi link đặt lại mật khẩu"}
            </button>

            <div className="w-full h-px bg-white/10" />

            <Link
              href="/login"
              className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors text-center"
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
