"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type MsgType = "error" | "success" | "info";

const PENDING_REGISTER_EMAIL_KEY = "pending_register_email";

function isDigit(ch: string) {
  return /^[0-9]$/.test(ch);
}

export default function VerifyRegisterPage() {
  const router = useRouter();

  const [email, setEmail] = React.useState<string>("");
  const [digits, setDigits] = React.useState<string[]>(Array(6).fill(""));
  const code = React.useMemo(() => digits.join("").slice(0, 6), [digits]);

  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);

  const [submitting, setSubmitting] = React.useState(false);
  const [resending, setResending] = React.useState(false);

  const [msg, setMsg] = React.useState<{ type: MsgType; text: string } | null>(
    null
  );

  // UI cooldown resend
  const [resendLeft, setResendLeft] = React.useState<number>(0);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(PENDING_REGISTER_EMAIL_KEY) || "";
      setEmail(saved);
    } catch {
      setEmail("");
    }
  }, []);

  React.useEffect(() => {
    if (resendLeft <= 0) return;
    const t = window.setInterval(() => setResendLeft((s) => s - 1), 1000);
    return () => window.clearInterval(t);
  }, [resendLeft]);

  function showMessage(type: MsgType, text: string) {
    setMsg({ type, text });
  }

  function focusAt(i: number) {
    const el = inputsRef.current[i];
    if (el) el.focus();
  }

  function setDigitAt(index: number, value: string) {
    let v = value.trim();

    if (v.length > 1) v = v.slice(-1);
    if (v && !isDigit(v)) v = "";

    setDigits((prev) => {
      const copy = [...prev];
      copy[index] = v;
      return copy;
    });

    if (v && index < 5) focusAt(index + 1);
  }

  function clearDigitAt(index: number) {
    setDigits((prev) => {
      const copy = [...prev];
      copy[index] = "";
      return copy;
    });
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    const key = e.key;

    if (key === "Backspace") {
      if (digits[index]) {
        clearDigitAt(index);
        return;
      }
      if (index > 0) {
        clearDigitAt(index - 1);
        focusAt(index - 1);
        e.preventDefault();
      }
      return;
    }

    if (key === "ArrowLeft") {
      if (index > 0) focusAt(index - 1);
      e.preventDefault();
      return;
    }

    if (key === "ArrowRight") {
      if (index < 5) focusAt(index + 1);
      e.preventDefault();
      return;
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const text = (e.clipboardData.getData("text") || "")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!text) return;
    e.preventDefault();

    const arr = Array.from({ length: 6 }, (_, i) => text[i] || "");
    setDigits(arr);

    const last = Math.min(text.length, 6) - 1;
    if (last >= 0) focusAt(last);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    if (!email) {
      showMessage("error", "Thiếu email đăng ký. Vui lòng quay lại trang đăng ký.");
      return;
    }

    if (!/^\d{6}$/.test(code)) {
      showMessage("error", "Vui lòng nhập mã OTP gồm 6 chữ số.");
      return;
    }

    setSubmitting(true);
    showMessage("info", "Đang xác minh...");

    try {
      const res = await fetch("/api/auth/register/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.status === "success") {
        showMessage("success", data?.message || "Xác minh thành công! Đang chuyển...");
        try {
          localStorage.removeItem(PENDING_REGISTER_EMAIL_KEY);
        } catch {}

        setTimeout(() => router.push("/login"), 800);
        return;
      }

      showMessage("error", data?.message || "Mã OTP không đúng hoặc đã hết hạn.");
    } catch (err) {
      console.error(err);
      showMessage("error", "Lỗi kết nối server.");
    } finally {
      setSubmitting(false);
    }
  }

  async function onResend() {
    if (resending) return;
    if (resendLeft > 0) return;

    if (!email) {
      showMessage("error", "Thiếu email đăng ký. Vui lòng quay lại trang đăng ký.");
      return;
    }

    setResending(true);
    showMessage("info", "Đang gửi lại mã...");

    try {
      const res = await fetch("/api/auth/register/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.status === "success") {
        showMessage("success", data?.message || "Đã gửi lại mã OTP.");
        setResendLeft(60);
      } else {
        // nếu backend trả remain
        const remain = Number(data?.remain || 0);
        if (remain > 0) setResendLeft(remain);

        showMessage("error", data?.message || "Không gửi lại được mã.");
      }
    } catch (err) {
      console.error(err);
      showMessage("error", "Lỗi kết nối server.");
    } finally {
      setResending(false);
    }
  }

  const messageClass =
    msg?.type === "error"
      ? "text-rose-300"
      : msg?.type === "success"
      ? "text-emerald-300"
      : "text-slate-300";

  return (
    <div className="min-h-screen w-full bg-[#101922] text-white antialiased overflow-x-hidden">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1220] via-[#0a1322] to-[#101922]" />
        <div className="absolute top-[-12%] left-[-12%] w-[520px] h-[520px] rounded-full bg-[#137fec]/20 blur-[120px] opacity-80" />
        <div className="absolute bottom-[-14%] right-[-12%] w-[520px] h-[520px] rounded-full bg-[#137fec]/10 blur-[130px] opacity-80" />
      </div>

      <div className="relative flex min-h-screen w-full flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-white/5 px-6 py-4 lg:px-10 bg-[#0b1423]/50 backdrop-blur-md">
          <div className="flex items-center gap-3 select-none">
            <div className="size-8 rounded-lg bg-[#137fec]/15 ring-1 ring-white/10 grid place-items-center">
              <span className="text-[#7db5ff] font-black">S</span>
            </div>
            <h2 className="text-lg font-bold tracking-tight">
              Shadowing &amp; Dictation
            </h2>
          </div>

          <Link
            className="text-sm font-medium text-slate-300/90 hover:text-white transition-colors"
            href="/help"
          >
            Trợ giúp?
          </Link>
        </header>

        {/* Main */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <section className="w-full max-w-[520px]">
            {/* Card */}
            <div className="w-full rounded-2xl bg-[#1c2630]/80 border border-white/10 backdrop-blur-md shadow-2xl p-6 sm:p-10 flex flex-col gap-6">
              {/* Icon + Title */}
              <div className="flex flex-col items-center text-center gap-2">
                <div className="mb-3 size-16 rounded-full bg-[#137fec]/15 ring-1 ring-[#137fec]/20 grid place-items-center">
                  <Image
                    src="/assets/icons/lock.png"
                    alt="Lock"
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain select-none"
                    draggable={false}
                    priority
                  />
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Xác thực tài khoản
                </h1>

                <p className="text-base text-slate-300/80 leading-relaxed max-w-[360px]">
                  Vui lòng nhập mã OTP gồm 6 chữ số đã được gửi đến email{" "}
                  <span className="text-white font-semibold">
                    {email || "—"}
                  </span>
                </p>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="flex flex-col gap-6 w-full">
                {/* OTP boxes */}
                <div className="flex justify-center">
                  <fieldset className="flex gap-2 sm:gap-3" aria-label="Nhập mã OTP 6 số">
                    {digits.map((d, i) => (
                      <input
                        key={i}
                        ref={(el) => {
                          inputsRef.current[i] = el;
                        }}
                        value={d}
                        onChange={(e) => setDigitAt(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        onPaste={handlePaste}
                        inputMode="numeric"
                        maxLength={1}
                        autoComplete={i === 0 ? "one-time-code" : "off"}
                        placeholder="-"
                        autoFocus={i === 0}
                        className="flex h-12 w-10 sm:h-14 sm:w-12 rounded-lg text-center
                                   bg-[#111a22] border border-white/10 text-xl font-bold text-white
                                   placeholder:text-slate-600 outline-none transition-all caret-[#137fec]
                                   focus:ring-2 focus:ring-[#137fec]/45 focus:border-[#137fec]/60"
                      />
                    ))}
                  </fieldset>
                </div>

                {/* Message */}
                <p className={`min-h-[20px] text-sm ${msg ? messageClass : "text-slate-300"}`}>
                  {msg?.text || ""}
                </p>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 rounded-xl bg-[#137fec] hover:bg-[#137fec]/90 text-white font-extrabold tracking-wide
                             shadow-lg shadow-[#137fec]/25 active:scale-[0.98] transition
                             disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Đang xác minh..." : "Xác nhận →"}
                </button>

                {/* Resend + back */}
                <div className="flex flex-col items-center gap-2 text-sm">
                  <div className="text-slate-300/80">
                    Bạn chưa nhận được mã?
                    <button
                      type="button"
                      onClick={onResend}
                      disabled={resending || resendLeft > 0}
                      className="ml-1 text-[#65a9ff] font-semibold hover:underline
                                 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {resendLeft > 0 ? `Gửi lại mã (${resendLeft}s)` : "Gửi lại mã"}
                    </button>
                  </div>

                  <div className="w-full h-px bg-white/10" />

                  <Link
                    href="/register"
                    className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                  >
                    ← Quay lại Đăng ký
                  </Link>
                </div>
              </form>
            </div>

            {/* Badge */}
            <div className="mt-8 flex items-center justify-center">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                <span className="inline-block size-2 rounded-full bg-emerald-400" />
                Bảo mật SSL được mã hóa đầu cuối
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
