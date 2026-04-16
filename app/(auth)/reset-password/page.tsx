"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { HelpCircle, Eye, EyeOff, Lock } from "lucide-react";
import { ThemeToggle } from '@/views/components/theme-toggle';

type MsgType = "error" | "success" | "info";

const PENDING_RESET_IDENTIFIER_KEY = "pending_reset_identifier";

function onlyDigits(s: string) {
  return (s || "").replace(/\D/g, "");
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Đang tải...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}

function ResetPasswordContent() {
  const router = useRouter();
  const sp = useSearchParams();

  const [identifier, setIdentifier] = React.useState("");
  const [otp, setOtp] = React.useState<string[]>(Array(6).fill(""));
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);
  const passwordRef = React.useRef<HTMLInputElement | null>(null);

  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [showPw, setShowPw] = React.useState(false);
  const [isCodeVerified, setIsCodeVerified] = React.useState(false);

  const [verifyingCode, setVerifyingCode] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [secondsLeft, setSecondsLeft] = React.useState(59);
  const [msg, setMsg] = React.useState<{ type: MsgType; text: string } | null>(
    null
  );

  const code = otp.join("");

  function showMessage(type: MsgType, text: string) {
    setMsg({ type, text });
  }

  React.useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  React.useEffect(() => {
    const queryIdentifier = String(sp.get("identifier") || "").trim();

    try {
      const storedIdentifier = localStorage.getItem(PENDING_RESET_IDENTIFIER_KEY) || "";
      const finalIdentifier = (queryIdentifier || storedIdentifier).trim();

      setIdentifier(finalIdentifier);

      if (finalIdentifier) {
        localStorage.setItem(PENDING_RESET_IDENTIFIER_KEY, finalIdentifier);
      }
    } catch {
      setIdentifier(queryIdentifier);
    }
  }, [sp]);

  React.useEffect(() => {
    const t = window.setInterval(() => {
      setSecondsLeft((s) => (s <= 0 ? 0 : s - 1));
    }, 1000);

    return () => window.clearInterval(t);
  }, []);

  const isInvalidSession = !identifier;

  function setDigitAt(index: number, value: string) {
    setOtp((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function handleInput(index: number, raw: string) {
    const digit = onlyDigits(raw).slice(-1);
    setDigitAt(index, digit);
    if (digit && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      e.preventDefault();

      if (otp[index]) {
        setDigitAt(index, "");
        return;
      }

      if (index > 0) {
        setDigitAt(index - 1, "");
        inputsRef.current[index - 1]?.focus();
      }
      return;
    }

    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputsRef.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const digits = onlyDigits(e.clipboardData.getData("text") || "").slice(0, 6);
    if (!digits) return;

    e.preventDefault();
    setOtp(() => {
      const next = Array(6).fill("");
      digits.split("").forEach((digit, index) => {
        next[index] = digit;
      });
      return next;
    });

    const focusIndex = Math.max(0, Math.min(digits.length, 6) - 1);
    inputsRef.current[focusIndex]?.focus();
  }

  async function onVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    if (verifyingCode) return;

    if (isInvalidSession) {
      showMessage("error", "Phiên đặt lại mật khẩu không hợp lệ. Vui lòng bắt đầu lại.");
      return;
    }

    if (code.length !== 6) {
      showMessage("error", "Vui lòng nhập đủ 6 chữ số xác minh.");
      return;
    }

    setVerifyingCode(true);
    showMessage("info", "Đang xác minh mã...");

    try {
      const res = await fetch("/api/auth/password/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ identifier, code }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || data?.status === "error") {
        showMessage("error", data?.message || `HTTP ${res.status}`);
        return;
      }

      setIsCodeVerified(true);
      showMessage("success", data?.message || "Xác minh mã thành công.");
      setTimeout(() => passwordRef.current?.focus(), 50);
    } catch (err) {
      console.error(err);
      showMessage("error", "Không thể kết nối đến máy chủ.");
    } finally {
      setVerifyingCode(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    if (isInvalidSession) {
      showMessage(
        "error",
        "Phiên đặt lại mật khẩu không hợp lệ. Vui lòng bắt đầu lại từ bước quên mật khẩu."
      );
      return;
    }

    if (code.length !== 6) {
      showMessage("error", "Vui lòng nhập đủ 6 chữ số xác minh.");
      return;
    }

    if (!isCodeVerified) {
      showMessage("error", "Vui lòng xác minh mã trước khi nhập mật khẩu mới.");
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
          identifier,
          code,
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

      try {
        localStorage.removeItem(PENDING_RESET_IDENTIFIER_KEY);
      } catch {}

      setTimeout(() => router.push("/login"), 700);
    } catch (err) {
      console.error(err);
      showMessage("error", "Không thể kết nối đến máy chủ.");
    } finally {
      setSubmitting(false);
    }
  }

  async function onResend() {
    if (secondsLeft > 0) return;

    if (isInvalidSession) {
      showMessage("error", "Phiên đặt lại mật khẩu không hợp lệ. Vui lòng bắt đầu lại.");
      return;
    }

    showMessage("info", "Đang gửi lại mã xác minh...");

    try {
      const res = await fetch("/api/auth/password/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ identifier }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || data?.status === "error") {
        showMessage("error", data?.message || `HTTP ${res.status}`);
        return;
      }

      showMessage("success", data?.message || "Đã gửi lại mã xác minh.");
      setIsCodeVerified(false);
      setOtp(Array(6).fill(""));
      setSecondsLeft(59);
      setTimeout(() => inputsRef.current[0]?.focus(), 50);
    } catch (err) {
      console.error(err);
      showMessage("error", "Không thể kết nối đến máy chủ.");
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
              <Lock className="w-7 h-7 text-blue-400" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-slate-950 dark:text-white">
                Đặt lại mật khẩu
              </h1>

              <p className="mx-auto max-w-105 text-base leading-relaxed text-slate-600 dark:text-muted">
                {identifier ? (
                  <>
                    Xác minh mã 6 số cho tài khoản{" "}
                    <span className="font-medium text-slate-900 dark:text-white/90">{identifier}</span>
                    {!isCodeVerified ? " trước, sau đó bạn sẽ nhập mật khẩu mới." : ". Mã đã đúng, bạn có thể tạo mật khẩu mới."}
                  </>
                ) : (
                  "Không tìm thấy phiên đặt lại mật khẩu."
                )}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            {isInvalidSession ? (
              <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 dark:border-red-500/20 dark:bg-red-900/20 dark:text-red-400 p-4 text-sm">
                Phiên đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.
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

            <form onSubmit={onVerifyCode} className="space-y-5">
              <div className="flex flex-col gap-2">
                <label className="text-base font-semibold text-slate-900 dark:text-white">Mã xác minh</label>

                <div className="flex justify-center gap-2 sm:gap-3">
                  {otp.map((value, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputsRef.current[index] = el;
                      }}
                      inputMode="numeric"
                      maxLength={1}
                      value={value}
                      onChange={(e) => handleInput(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      disabled={isInvalidSession || submitting || verifyingCode || isCodeVerified}
                      className="
                        otp-box flex h-12 w-10 sm:h-14 sm:w-12 rounded-lg text-center
                        bg-white/95 dark:bg-[#192633]
                        border border-slate-300 dark:border-[#324d67]
                        text-lg sm:text-xl font-medium
                        focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:outline-none
                        transition-all caret-blue-400
                        text-slate-900 dark:text-white
                        disabled:opacity-60
                      "
                      aria-label={`Reset OTP digit ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isInvalidSession || verifyingCode || isCodeVerified}
                className="
                  flex w-full items-center justify-center overflow-hidden rounded-lg h-12 px-5
                  bg-blue-600 hover:bg-blue-700 text-white text-base font-bold
                  transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98]
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {isCodeVerified ? "Mã đã xác minh" : verifyingCode ? "Đang xác minh..." : "Xác minh mã"}
              </button>
            </form>

            {isCodeVerified ? (
              <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-emerald-200/70 bg-emerald-50/70 p-5 dark:border-emerald-500/20 dark:bg-emerald-500/8">
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-900/20 dark:text-emerald-300">
                  Mã xác minh hợp lệ. Bây giờ bạn có thể nhập mật khẩu mới.
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-base font-semibold text-slate-900 dark:text-white">Mật khẩu mới</label>
                  <div className="relative flex w-full items-stretch rounded-lg overflow-hidden">
                    <input
                      ref={passwordRef}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPw ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      disabled={isInvalidSession || submitting}
                      className="w-full h-14 px-4 text-base
                               border border-r-0 border-slate-300 bg-white/95 shadow-sm text-slate-900 placeholder:text-slate-500
                               focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500
                               dark:border-[#324d67] dark:bg-[#192633] dark:text-white dark:placeholder:text-[#92adc9]
                               transition-all disabled:opacity-60"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      disabled={isInvalidSession || submitting}
                      className="px-4 grid place-items-center
                               border border-l-0 border-slate-300 bg-white/95 text-slate-600 hover:bg-slate-100
                               dark:border-[#324d67] dark:bg-[#192633] dark:text-[#92adc9] dark:hover:bg-[#233648]
                               transition-colors disabled:opacity-60"
                      aria-label={showPw ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      title="Hiện/Ẩn mật khẩu"
                    >
                      {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-muted">Mật khẩu 7–14 ký tự.</p>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-base font-semibold text-slate-900 dark:text-white">Xác nhận mật khẩu</label>
                  <input
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    disabled={isInvalidSession || submitting}
                    className="w-full rounded-lg h-14 px-4 text-base
                             border border-slate-300 bg-white/95 shadow-sm text-slate-900 placeholder:text-slate-500
                             focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500
                             dark:border-[#324d67] dark:bg-[#192633] dark:text-white dark:placeholder:text-[#92adc9]
                             transition-all disabled:opacity-60"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting || isInvalidSession}
                  className="
                    flex w-full items-center justify-center overflow-hidden rounded-lg h-12 px-5
                    bg-blue-600 hover:bg-blue-700 text-white text-base font-bold
                    transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98]
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                >
                  {submitting ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
                </button>
              </form>
            ) : null}

            <div
              className={[
                "min-h-5 text-sm rounded-lg p-3",
                msg ? messageClass : "hidden",
              ].join(" ")}
            >
              {msg?.text || ""}
            </div>

            <div className="flex flex-col items-center gap-2 rounded-xl border border-slate-200/70 bg-white/55 px-4 py-3 dark:border-white/10 dark:bg-white/5">
              <p className="text-sm text-slate-600 dark:text-muted">
                {isCodeVerified ? "Muốn dùng mã mới?" : "Chưa nhận được mã?"}
              </p>
              <button
                type="button"
                onClick={onResend}
                disabled={secondsLeft > 0 || isInvalidSession || submitting || verifyingCode}
                className={[
                  "text-sm font-semibold transition-colors",
                  secondsLeft > 0 || isInvalidSession || submitting || verifyingCode
                    ? "cursor-not-allowed text-slate-400"
                    : "text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-cyan-300",
                ].join(" ")}
              >
                {secondsLeft > 0 ? `Gửi lại mã sau ${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}` : "Gửi lại mã"}
              </button>
            </div>

            <div className="w-full h-px bg-white/10" />

            <div className="flex items-center justify-between text-sm">
              <Link
                href="/forgot-password"
                className="text-slate-600 hover:text-blue-700 transition-colors dark:text-slate-300 dark:hover:text-blue-400"
              >
                ← Quay lại quên mật khẩu
              </Link>

              <Link
                href="/login"
                className="text-slate-600 hover:text-blue-700 transition-colors dark:text-slate-300 dark:hover:text-blue-400"
              >
                Quay lại đăng nhập →
              </Link>
            </div>
          </div>
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
