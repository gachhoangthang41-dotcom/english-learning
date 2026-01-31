"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { HelpCircle } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRouter, useSearchParams } from "next/navigation";

type MsgType = "error" | "success" | "info";

const PENDING_LOGIN_EMAIL_KEY = "pending_login_email";
const PENDING_LOGIN_REMEMBER_KEY = "pending_login_remember";

function onlyDigits(s: string) {
  return (s || "").replace(/\D/g, "");
}

export default function VerifyLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [otp, setOtp] = React.useState<string[]>(Array(6).fill(""));
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);

  const [submitting, setSubmitting] = React.useState(false);
  const [msg, setMsg] = React.useState<{ type: MsgType; text: string } | null>(null);

  const [secondsLeft, setSecondsLeft] = React.useState(59);
  const [email, setEmail] = React.useState<string>("");
  const [remember, setRemember] = React.useState<boolean>(false);

  const code = otp.join("");

  function showMessage(type: MsgType, text: string) {
    setMsg({ type, text });
  }

  // focus ô đầu
  React.useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  // countdown resend
  React.useEffect(() => {
    const t = setInterval(() => setSecondsLeft((s) => (s <= 0 ? 0 : s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  // ✅ lấy email từ query hoặc localStorage
  React.useEffect(() => {
    try {
      const qEmail = String(searchParams.get("email") || "").trim();
      const lsEmail = localStorage.getItem(PENDING_LOGIN_EMAIL_KEY) || "";
      const finalEmail = (qEmail || lsEmail).trim();

      setEmail(finalEmail);

      if (finalEmail) {
        localStorage.setItem(PENDING_LOGIN_EMAIL_KEY, finalEmail);
      }

      const r = localStorage.getItem(PENDING_LOGIN_REMEMBER_KEY);
      setRemember(r ? JSON.parse(r) : false);
    } catch {
      setEmail("");
      setRemember(false);
    }
  }, [searchParams]);

  function setDigitAt(index: number, value: string) {
    setOtp((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function handleInput(index: number, raw: string) {
    const d = onlyDigits(raw).slice(-1);
    setDigitAt(index, d);
    if (d && index < 5) inputsRef.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    const key = e.key;

    if (key === "Backspace") {
      e.preventDefault();
      if (otp[index]) return setDigitAt(index, "");
      if (index > 0) {
        setDigitAt(index - 1, "");
        inputsRef.current[index - 1]?.focus();
      }
      return;
    }

    if (key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputsRef.current[index - 1]?.focus();
    }
    if (key === "ArrowRight" && index < 5) {
      e.preventDefault();
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const text = e.clipboardData.getData("text") || "";
    const digits = onlyDigits(text).slice(0, 6);
    if (!digits) return;

    e.preventDefault();
    const arr = digits.split("");
    setOtp(() => {
      const next = Array(6).fill("");
      for (let i = 0; i < 6; i++) next[i] = arr[i] || "";
      return next;
    });

    const nextIndex = Math.min(digits.length, 6) - 1;
    inputsRef.current[Math.max(0, nextIndex)]?.focus();
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    if (!email) {
      showMessage("error", "Thiếu email. Vui lòng quay lại đăng nhập.");
      return;
    }

    if (code.length !== 6) {
      showMessage("error", "Vui lòng nhập đủ 6 chữ số.");
      return;
    }

    setSubmitting(true);
    showMessage("info", "Đang xác thực...");

    try {
      const res = await fetch("/api/auth/login/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email, code, remember }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        showMessage("error", data?.message || `HTTP ${res.status}`);
        return;
      }

      if (data?.status === "success") {
        showMessage("success", data?.message || "Xác thực thành công!");

        try {
          localStorage.removeItem(PENDING_LOGIN_EMAIL_KEY);
          localStorage.removeItem(PENDING_LOGIN_REMEMBER_KEY);
        } catch { }

        router.push(data?.redirect || "/");
        return;
      }

      showMessage("error", data?.message || "Mã không đúng hoặc đã hết hạn.");
    } catch (err) {
      console.error(err);
      showMessage("error", "Không thể kết nối đến máy chủ.");
    } finally {
      setSubmitting(false);
    }
  }

  async function onResend() {
    if (secondsLeft > 0) return;

    if (!email) {
      showMessage("error", "Thiếu email. Vui lòng quay lại đăng nhập.");
      return;
    }

    showMessage("info", "Đang gửi lại mã...");

    try {
      const res = await fetch("/api/auth/login/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || data?.status === "error") {
        showMessage("error", data?.message || `HTTP ${res.status}`);
        return;
      }

      showMessage("success", data?.message || "Đã gửi lại mã.");
      setSecondsLeft(59);
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

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

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
        <Link href="/" className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full grid place-items-center border border-white/10 bg-white/5 overflow-hidden">
            <Image src="/assets/icons/chick.png" alt="Logo" width={32} height={32} className="w-6 h-6 object-contain" priority />
          </span>

          <h2 className="text-lg font-bold leading-tight tracking-tight">
            Shadowing <span className="text-blue-400">&amp;</span> Dictation
          </h2>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/help" className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">
            <HelpCircle className="w-4 h-4" />
            Trợ giúp
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[480px] rounded-2xl px-6 sm:px-10 py-10 glass-card shadow-xl">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex items-center justify-center size-16 rounded-full bg-blue-500/10 ring-1 ring-blue-400/20 mb-2">
              <Image src="/assets/icons/lock.png" alt="Lock" width={36} height={36} className="w-9 h-9 object-contain select-none" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight">Xác thực đăng nhập</h1>
              <p className="text-muted text-base leading-relaxed max-w-[360px] mx-auto">
                Nhập mã 6 chữ số đã gửi tới email{" "}
                {email ? <span className="font-medium" style={{ color: 'var(--fg)' }}>{email}</span> : <span className="text-rose-300 font-medium">[chưa có email]</span>}
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-5 mt-8" autoComplete="off">
            <div className="flex justify-center gap-2 sm:gap-3">
              {otp.map((v, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputsRef.current[idx] = el;
                  }}
                  inputMode="numeric"
                  maxLength={1}
                  value={v}
                  onChange={(e) => handleInput(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  onPaste={idx === 0 ? handlePaste : undefined}
                  className="
                    otp-box flex h-12 w-10 sm:h-14 sm:w-12 rounded-lg text-center
                    bg-gray-50 dark:bg-[#111a22]
                    border border-black/15 dark:border-[#324d67]
                    text-lg sm:text-xl font-medium
                    focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:outline-none
                    transition-all caret-blue-400
                    text-slate-900 dark:text-white
                  "
                  aria-label={`OTP digit ${idx + 1}`}
                />
              ))}
            </div>

            <div className={["min-h-[20px] text-sm rounded-lg p-3", msg ? messageClass : "hidden"].join(" ")}>
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
              Xác nhận
            </button>
          </form>

          <div className="flex flex-col items-center gap-4 mt-6">
            <div className="flex flex-col items-center gap-1">
              <p className="text-muted text-sm">Chưa nhận được mã?</p>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <span className="text-sm font-medium text-muted tabular-nums">
                  {mm}:{ss}
                </span>
                <div className="w-px h-3.5 bg-white/15 mx-1" />

                <button
                  type="button"
                  onClick={onResend}
                  disabled={secondsLeft > 0}
                  className={[
                    "text-sm font-semibold transition-colors",
                    secondsLeft > 0 ? "text-slate-400 cursor-not-allowed" : "text-blue-400 hover:text-cyan-300",
                  ].join(" ")}
                >
                  Gửi lại mã
                </button>
              </div>
            </div>

            <div className="w-full h-px bg-white/10" />

            <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors">
              ← Quay lại đăng nhập
            </Link>

            <button
              type="button"
              className="text-sm font-medium text-muted hover:text-blue-400 transition-colors"
              onClick={() => showMessage("info", "Bạn có thể thêm phương thức xác thực khác sau.")}
            >
              Thử phương thức xác thực khác
            </button>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-600">© 2024 Shadowing &amp; Dictation. All rights reserved.</p>
      </footer>
    </div>
  );
}
