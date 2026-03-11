"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { HelpCircle, Eye, EyeOff, Lock } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

type MsgType = "error" | "success" | "info";

export default function ResetPasswordPage() {
  const router = useRouter();
  const sp = useSearchParams();

  // ✅ Lấy từ link: /reset-password?email=...&token=...
  const emailFromQuery = (sp.get("email") || "").trim().toLowerCase();
  const tokenFromQuery = (sp.get("token") || "").trim();

  // ✅ Không cho user sửa email/token -> chỉ dùng state ẩn
  const [email] = React.useState(emailFromQuery);
  const [token] = React.useState(tokenFromQuery);

  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [showPw, setShowPw] = React.useState(false);

  const [submitting, setSubmitting] = React.useState(false);
  const [msg, setMsg] = React.useState<{ type: MsgType; text: string } | null>(
    null
  );

  function showMessage(type: MsgType, text: string) {
    setMsg({ type, text });
  }

  const isInvalidLink = !email || !token;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    if (isInvalidLink) {
      showMessage(
        "error",
        "Link đặt lại mật khẩu không hợp lệ hoặc thiếu token. Vui lòng gửi lại link mới."
      );
      return;
    }

    if (!password || password.length < 7 || password.length > 14) {
      showMessage("error", "Mật khẩu phải từ 7 đến 14 ký tự.");
      return;
    }

    if (password !== confirm) {
      showMessage("error", "Mật khẩu xác nhận không khớp.");
      return;
    }

    setSubmitting(true);
    showMessage("info", "Đang đặt lại mật khẩu...");

    try {
      const res = await fetch("/api/auth/password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          email,
          token,
          newPassword: password,
          confirmPassword: confirm,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || data?.status === "error") {
        showMessage("error", data?.message || `HTTP ${res.status}`);
        return;
      }

      showMessage(
        "success",
        data?.message || "Đặt lại mật khẩu thành công! Chuyển sang đăng nhập..."
      );

      setTimeout(() => router.push("/login"), 700);
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
              <Lock className="w-7 h-7 text-blue-400" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight">
                Đặt lại mật khẩu
              </h1>

              <p className="text-muted text-base leading-relaxed max-w-[420px] mx-auto">
                {email ? (
                  <>
                    Nhập mật khẩu mới cho tài khoản{" "}
                    <span className="text-white/90 font-medium">{email}</span>
                  </>
                ) : (
                  "Không tìm thấy email trong link."
                )}
              </p>
            </div>
          </div>

          {/* ✅ Nếu link sai (thiếu token/email) => khóa form */}
          <form onSubmit={onSubmit} className="flex flex-col gap-5 mt-8">
            {isInvalidLink ? (
              <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 dark:border-red-500/20 dark:bg-red-900/20 dark:text-red-400 p-4 text-sm">
                Link đặt lại mật khẩu không hợp lệ hoặc đã thiếu token.
                <div className="mt-3 flex gap-3">
                  <Link
                    href="/forgot-password"
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                  >
                    Gửi lại link mới
                  </Link>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg border border-white/10 text-slate-200 hover:text-blue-400 transition-colors"
                  >
                    Về đăng nhập
                  </Link>
                </div>
              </div>
            ) : null}

            {/* ✅ Email hiển thị readonly (không cho sửa) */}
            <div className="flex flex-col gap-2">
              <label className="text-base font-semibold">Email</label>
              <input
                value={email}
                readOnly
                className="w-full rounded-lg h-14 px-4 text-base
                           border border-black/15 bg-white text-slate-700 placeholder:text-slate-400
                           dark:border-[#324d67] dark:bg-[#192633] dark:text-white/90
                           opacity-90"
              />
            </div>

            {/* ✅ KHÔNG HIỂN THỊ TOKEN Ở ĐÂY */}

            <div className="flex flex-col gap-2">
              <label className="text-base font-semibold">Mật khẩu mới</label>
              <div className="relative flex w-full items-stretch rounded-lg overflow-hidden">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  disabled={isInvalidLink || submitting}
                  className="w-full h-14 px-4 text-base
                             border border-r-0 border-black/15 bg-white text-slate-900 placeholder:text-slate-400
                             focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500
                             dark:border-[#324d67] dark:bg-[#192633] dark:text-white dark:placeholder:text-[#92adc9]
                             transition-all disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  disabled={isInvalidLink || submitting}
                  className="px-4 grid place-items-center
                             border border-l-0 border-black/15 bg-white text-slate-600 hover:bg-slate-50
                             dark:border-[#324d67] dark:bg-[#192633] dark:text-[#92adc9] dark:hover:bg-[#233648]
                             transition-colors disabled:opacity-60"
                  aria-label={showPw ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  title="Hiện/Ẩn mật khẩu"
                >
                  {showPw ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted">Mật khẩu 7–14 ký tự.</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-base font-semibold">Xác nhận mật khẩu</label>
              <input
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={isInvalidLink || submitting}
                className="w-full rounded-lg h-14 px-4 text-base
                           border border-black/15 bg-white text-slate-900 placeholder:text-slate-400
                           focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500
                           dark:border-[#324d67] dark:bg-[#192633] dark:text-white dark:placeholder:text-[#92adc9]
                           transition-all disabled:opacity-60"
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
              disabled={submitting || isInvalidLink}
              className="
                flex w-full items-center justify-center overflow-hidden rounded-lg h-12 px-5
                bg-blue-600 hover:bg-blue-700 text-white text-base font-bold
                transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {submitting ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
            </button>

            <div className="w-full h-px bg-white/10" />

            <div className="flex items-center justify-between text-sm">
              <Link
                href="/forgot-password"
                className="text-slate-300 hover:text-blue-400 transition-colors"
              >
                ← Gửi lại link
              </Link>

              <Link
                href="/login"
                className="text-slate-300 hover:text-blue-400 transition-colors"
              >
                Quay lại đăng nhập →
              </Link>
            </div>
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
