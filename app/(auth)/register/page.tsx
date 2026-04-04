"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { HelpCircle, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { ThemeToggle } from "@/components/theme-toggle";

type MsgType = "error" | "success" | "info";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function RegisterPage() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [pw2, setPw2] = React.useState("");
  const [terms, setTerms] = React.useState(false);

  const [showPw, setShowPw] = React.useState(false);
  const [showPw2, setShowPw2] = React.useState(false);

  const [submitting, setSubmitting] = React.useState(false);
  const [msg, setMsg] = React.useState<{ type: MsgType; text: string } | null>(
    null
  );

  const messageClass =
    msg?.type === "error"
      ? "bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-500/20"
      : msg?.type === "success"
      ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-500/20"
      : "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-500/20";

  function showMessage(type: MsgType, text: string) {
    setMsg({ type, text });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    const u = username.trim();
    const em = email.trim();

    if (!u || !em || !pw || !pw2) {
      showMessage("error", "Vui lòng nhập đầy đủ Tên, Email và Mật khẩu.");
      return;
    }
    if (u.length < 5 || u.length > 255) {
      showMessage("error", "Tên người dùng phải từ 5 đến 255 ký tự.");
      return;
    }
    if (!isValidEmail(em)) {
      showMessage("error", "Email không hợp lệ. Ví dụ: ten@gmail.com");
      return;
    }
    if (pw.length < 7 || pw.length > 14) {
      showMessage("error", "Mật khẩu phải từ 7 đến 14 ký tự.");
      return;
    }
    if (pw !== pw2) {
      showMessage("error", "Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }
    if (!terms) {
      showMessage("error", "Bạn phải đồng ý Điều khoản sử dụng thì mới đăng ký được.");
      return;
    }

    setSubmitting(true);
    showMessage("info", "Đang gửi mã xác minh tới email của bạn...");

    try {
      const res = await fetch("/api/auth/register/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ username: u, email: em, password: pw }),
      });

      const data = await res.json().catch(() => null);

      if (data?.status === "success") {
        showMessage(
          "success",
          data?.message || "Đã gửi mã, đang chuyển sang trang xác minh..."
        );

        try {
          localStorage.setItem("pending_register_email", em);
        } catch {}

        // giữ đúng như bản bạn đang dùng
        setTimeout(() => {
          window.location.href = "/verify-register";
        }, 900);

        return;
      }

      showMessage("error", data?.message || "Có lỗi xảy ra khi gửi mã xác minh.");
    } catch (err) {
      console.error(err);
      showMessage("error", "Lỗi kết nối server khi gửi mã xác minh.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background giống login/marketing (đừng set bg-white ở wrapper để khỏi đè gradient) */}
      <div className="landing-bg">
        <div className="landing-bg__base" />
        <div className="landing-blob landing-blob--top" />
        <div className="landing-blob landing-blob--left" />
        <div className="landing-blob landing-blob--right" />
        <div className="landing-noise" />
      </div>

      {/* Header: dùng style giống Login */}
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
            href="/login"
            className="text-sm font-bold px-4 py-2 rounded-full text-blue-400 hover:bg-blue-500/10 border border-transparent hover:border-blue-400/25 transition"
          >
            Đăng nhập
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 w-full">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* LEFT: REGISTER CARD */}
            <section className="w-full order-2 lg:order-1">
              <div className="w-full max-w-[520px] rounded-2xl px-6 sm:px-10 py-8 glass-card">
                <div className="mb-6">
                  <h2 className="text-2xl font-black tracking-tight">Tạo tài khoản</h2>
                  <p className="mt-1 text-sm text-muted">
                    Điền thông tin bên dưới để đăng ký.
                  </p>
                </div>

                <form onSubmit={onSubmit} className="flex flex-col gap-4" autoComplete="off">
                  {/* Username */}
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold">Tên người dùng</span>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Nhập tên của bạn"
                      className="
                        h-12 px-4 rounded-lg text-base
                        border border-black/15 bg-white text-slate-900 placeholder:text-slate-400
                        focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500
                        dark:border-[#324d67] dark:bg-[#192633] dark:text-white dark:placeholder:text-[#92adc9]
                        transition-all
                      "
                      required
                    />
                  </label>

                  {/* Email */}
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold">Email</span>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ten@gmail.com"
                      type="email"
                      className="
                        h-12 px-4 rounded-lg text-base
                        border border-black/15 bg-white text-slate-900 placeholder:text-slate-400
                        focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500
                        dark:border-[#324d67] dark:bg-[#192633] dark:text-white dark:placeholder:text-[#92adc9]
                        transition-all
                      "
                      required
                    />
                  </label>

                  {/* Passwords */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-semibold">Mật khẩu</span>
                      <div className="relative flex w-full items-stretch rounded-lg overflow-hidden">
                        <input
                          value={pw}
                          onChange={(e) => setPw(e.target.value)}
                          type={showPw ? "text" : "password"}
                          placeholder="••••••••"
                          className="
                            w-full h-12 px-4 text-base
                            border border-r-0 border-black/15 bg-white text-slate-900 placeholder:text-slate-400
                            focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500
                            dark:border-[#324d67] dark:bg-[#192633] dark:text-white dark:placeholder:text-[#92adc9]
                            transition-all
                          "
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPw((v) => !v)}
                          className="
                            px-4 grid place-items-center
                            border border-l-0 border-black/15 bg-white text-slate-600 hover:bg-slate-50
                            dark:border-[#324d67] dark:bg-[#192633] dark:text-[#92adc9] dark:hover:bg-[#233648]
                            transition-colors
                          "
                          aria-label={showPw ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                          title="Hiện/Ẩn"
                        >
                          {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-semibold">Xác nhận</span>
                      <div className="relative flex w-full items-stretch rounded-lg overflow-hidden">
                        <input
                          value={pw2}
                          onChange={(e) => setPw2(e.target.value)}
                          type={showPw2 ? "text" : "password"}
                          placeholder="••••••••"
                          className="
                            w-full h-12 px-4 text-base
                            border border-r-0 border-black/15 bg-white text-slate-900 placeholder:text-slate-400
                            focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500
                            dark:border-[#324d67] dark:bg-[#192633] dark:text-white dark:placeholder:text-[#92adc9]
                            transition-all
                          "
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPw2((v) => !v)}
                          className="
                            px-4 grid place-items-center
                            border border-l-0 border-black/15 bg-white text-slate-600 hover:bg-slate-50
                            dark:border-[#324d67] dark:bg-[#192633] dark:text-[#92adc9] dark:hover:bg-[#233648]
                            transition-colors
                          "
                          aria-label={showPw2 ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                          title="Hiện/Ẩn"
                        >
                          {showPw2 ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </label>
                  </div>

                  {/* Terms */}
                  <label className="flex items-start gap-3 mt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={terms}
                      onChange={(e) => setTerms(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-2 border-black/20
                                 text-blue-600 checked:bg-blue-600 checked:border-blue-600
                                 focus:ring-2 focus:ring-blue-500/40 transition-all cursor-pointer
                                 dark:border-[#324d67]"
                      required
                    />
                    <span className="text-sm text-muted">
                      Tôi đồng ý với{" "}
                      <a className="text-accent hover:opacity-80 transition" href="#">
                        Điều khoản sử dụng
                      </a>{" "}
                      và{" "}
                      <a className="text-accent hover:opacity-80 transition" href="#">
                        Chính sách bảo mật
                      </a>
                      .
                    </span>
                  </label>

                  {/* Message */}
                  <div
                    className={[
                      "min-h-[20px] text-sm rounded-lg p-3",
                      msg ? messageClass : "hidden",
                    ].join(" ")}
                  >
                    {msg?.text || ""}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="
                      mt-1 h-12 rounded-lg font-bold text-base text-white
                      bg-blue-600 hover:bg-blue-700 active:scale-[0.98]
                      transition-all shadow-lg shadow-blue-500/20
                      focus:outline-none focus:ring-2 focus:ring-blue-500/40
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                  >
                    Đăng ký ngay
                  </button>

                  {/* Divider */}
                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-black/15 dark:border-[#324d67]" />
                    <span className="flex-shrink mx-4 text-muted text-sm">
                      Hoặc tiếp tục với
                    </span>
                    <div className="flex-grow border-t border-black/15 dark:border-[#324d67]" />
                  </div>

                  {/* Social */}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      className="
                        flex items-center justify-center gap-2 h-12 rounded-lg
                        border border-black/15 bg-white hover:bg-slate-50
                        text-slate-800 font-semibold
                        dark:border-[#324d67] dark:bg-[#192633] dark:hover:bg-[#233648] dark:text-white
                        transition-all
                      "
                      onClick={() => alert("Tích hợp Google OAuth sau")}
                    >
                      <FaGoogle className="w-5 h-5" />
                      <span>Google</span>
                    </button>

                    <button
                      type="button"
                      className="
                        flex items-center justify-center gap-2 h-12 rounded-lg
                        border border-black/15 bg-white hover:bg-slate-50
                        text-slate-800 font-semibold
                        dark:border-[#324d67] dark:bg-[#192633] dark:hover:bg-[#233648] dark:text-white
                        transition-all
                      "
                      onClick={() => alert("Tích hợp Facebook OAuth sau")}
                    >
                      <FaFacebookF className="w-5 h-5" />
                      <span>Facebook</span>
                    </button>
                  </div>

                  {/* Login link */}
                  <div className="mt-4 text-center">
                    <p className="text-muted text-sm sm:text-base">
                      Bạn đã có tài khoản?
                      <Link
                        href="/login"
                        className="font-extrabold text-accent hover:opacity-80 transition ml-1"
                      >
                        Đăng nhập
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </section>

            {/* RIGHT: HERO */}
            <section className="flex flex-col gap-6 order-1 lg:order-2">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                  Bắt đầu hành trình <br />
                  <span className="text-blue-400">thành thạo tiếng Anh</span>
                </h1>

                <p className="text-muted text-lg leading-relaxed max-w-[60ch]">
                  Tạo tài khoản miễn phí để luyện tập Shadowing &amp; Dictation với hàng ngàn
                  bài học chất lượng cao ngay hôm nay.
                </p>
              </div>

              <div className="w-full aspect-video rounded-2xl overflow-hidden relative shadow-2xl glass-card">
                <Image
                  src="/images/register-hero.png"
                  alt="Register hero"
                  fill
                  className="object-cover opacity-95"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass-card">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                    <p className="text-sm font-semibold">
                      Học tập kết hợp với AI hiệu quả
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted">
                {["Lộ trình cá nhân hoá", "Phát âm chuẩn quốc tế", "Theo dõi tiến độ"].map(
                  (t) => (
                    <div key={t} className="inline-flex items-center gap-2">
                      <span className="inline-block size-5 rounded-full bg-blue-500/10 border border-blue-400/25 grid place-items-center">
                        <span className="block size-2 rounded-full bg-blue-400" />
                      </span>
                      {t}
                    </div>
                  )
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
