"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  User,
  Settings,
  GraduationCap,
  Volume2,
  Bell,
  Shield,
  Mail,
  Calendar,
  Camera,
  Loader2,
  Globe,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { ThemeToggle } from '@/views/components/theme-toggle';
import { useLanguage } from '@/views/components/language-provider';

type MsgType = "error" | "success" | "info";

type MeUser = {
  id: string;
  email: string;
  username: string;
  displayName?: string | null;
  role: string;
  emailVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
  avatarUrl?: string | null;
  level?: {
    code: string;
    name: string;
  } | null;
};

function formatDate(iso: string, language: "vi" | "en") {
  try {
    return new Intl.DateTimeFormat(language === "vi" ? "vi-VN" : "en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function ProfilePage() {
  const router = useRouter();
  const pathname = usePathname();
  const { t, language } = useLanguage();

  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<MeUser | null>(null);
  const [msg, setMsg] = React.useState<{ type: MsgType; text: string } | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(
    pathname.startsWith("/profile/settings") || pathname.startsWith("/profile/security")
  );
  const fileRef = React.useRef<HTMLInputElement | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = React.useState(false);

  function showMessage(type: MsgType, text: string) {
    setMsg({ type, text });
  }

  const messageClass =
    msg?.type === "error"
      ? "bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-500/20"
      : msg?.type === "success"
        ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-red-500/20"
        : "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-500/20";

  async function loadMe() {
    setLoading(true);
    try {
      const res = await fetch("/api/me", {
        credentials: "same-origin",
        cache: "no-store",
      });
      const data = await res.json().catch(() => null);

      if (!res.ok || data?.status !== "success") {
        router.replace("/login");
        return;
      }

      setUser(data.user as MeUser);
    } catch {
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    loadMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function uploadAvatar(file: File) {
    if (uploadingAvatar) return;

    if (!file.type.startsWith("image/")) {
      showMessage("error", t("requireImage"));
      return;
    }

    setUploadingAvatar(true);
    showMessage("info", t("uploadingAvatar"));

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/auth/profile/avatar/upload", {
        method: "POST",
        credentials: "same-origin",
        body: fd,
      });

      const data = await res.json().catch(() => null);
      if (!res.ok || data?.status === "error") {
        showMessage("error", data?.message || `HTTP ${res.status}`);
        return;
      }

      showMessage("success", data?.message || t("uploadSuccess"));
      await loadMe();
    } catch (err) {
      console.error(err);
      showMessage("error", t("serverError"));
    } finally {
      setUploadingAvatar(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function onPickAvatarClick() {
    fileRef.current?.click();
  }

  function onAvatarFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadAvatar(file);
  }

  function go(path: string) {
    router.push(path);
  }

  const shownName = user?.displayName || user?.username || t("user");
  const shownRole = user?.role === "user" ? t("member") : user?.role || t("member");

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
        <Link href="/home" className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full grid place-items-center border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 overflow-hidden">
            <Image
              src="/assets/icons/chick.png"
              alt="Logo"
              width={32}
              height={32}
              className="w-6 h-6 object-contain"
              priority
            />
          </span>
          <h2 className="text-lg font-bold leading-tight tracking-tight !text-black dark:!text-white">
            {t("appTitle")}
          </h2>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/home"
            className="text-sm font-bold px-4 py-2 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 border border-transparent hover:border-blue-400/25 transition"
          >
            {t("home")}
          </Link>
        </div>
      </header>

      <main className="flex-1 px-4 py-10">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <aside className="lg:col-span-4">
              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#374053]/80 backdrop-blur-xl p-5">
                <div className="flex items-center gap-3">
                  <div className="relative size-12 rounded-full bg-white/10 ring-1 ring-white/10 overflow-hidden">
                    {user?.avatarUrl ? (
                      <Image
                        src={user.avatarUrl}
                        alt="Avatar"
                        fill
                        className="object-cover"
                        sizes="48px"
                        priority={false}
                      />
                    ) : (
                      <div className="w-full h-full grid place-items-center">
                        <User className="w-6 h-6 text-slate-400 dark:text-white/80" />
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={onPickAvatarClick}
                      disabled={uploadingAvatar || loading}
                      className="absolute -bottom-1 -right-1 size-7 rounded-full bg-blue-600 hover:bg-blue-500 border border-white/10 grid place-items-center shadow-lg shadow-blue-500/25 disabled:opacity-60 text-white"
                      title={t("changeAvatar")}
                    >
                      {uploadingAvatar ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Camera className="w-4 h-4" />
                      )}
                    </button>

                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={onAvatarFileChange}
                    />
                  </div>

                  <div className="leading-tight">
                    <div className="font-extrabold text-slate-800 dark:text-white">{shownName}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{shownRole}</div>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <MenuItem
                    icon={<User className="w-5 h-5" />}
                    label={t("profileTitle")}
                    active={pathname === "/profile"}
                    onClick={() => go("/profile")}
                  />
                  <MenuItem
                    icon={<GraduationCap className="w-5 h-5" />}
                    label={t("learning")}
                    active={false}
                    onClick={() => showMessage("info", t("comingSoon"))}
                  />

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                      className={[
                        "w-full flex items-center justify-between px-4 py-3 rounded-xl border transition text-left",
                        isSettingsOpen
                          ? "bg-blue-50/80 dark:bg-white/10 border-blue-200 dark:border-white/20 text-blue-700 dark:text-white"
                          : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10",
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-3">
                        <span className={isSettingsOpen ? "text-blue-600 dark:text-white" : "text-slate-500 dark:text-slate-300"}>
                          <Settings className="w-5 h-5" />
                        </span>
                        <span className="font-semibold">{t("settings")}</span>
                      </div>
                      <span className="text-slate-400">
                        {isSettingsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </span>
                    </button>

                    {isSettingsOpen && (
                      <div className="mt-2 ml-4 pl-4 border-l-2 border-white/10 space-y-2">
                        <MenuItem
                          icon={<Volume2 className="w-5 h-5" />}
                          label={t("audio")}
                          active={false}
                          onClick={() => showMessage("info", t("comingSoon"))}
                        />
                        <MenuItem
                          icon={<Bell className="w-5 h-5" />}
                          label={t("notifications")}
                          active={false}
                          onClick={() => showMessage("info", t("comingSoon"))}
                        />
                        <MenuItem
                          icon={<Shield className="w-5 h-5" />}
                          label={t("security")}
                          active={pathname === "/profile/security"}
                          onClick={() => go("/profile/security")}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </aside>

            <section className="lg:col-span-8">
              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#374053]/80 backdrop-blur-xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-800 dark:text-white">
                      {t("profileTitle")}
                    </h1>
                    <p className="text-slate-400 mt-1">{t("profileDesc")}</p>
                  </div>
                </div>

                <div className={[
                  "mt-4 min-h-[20px] text-sm rounded-lg p-3",
                  msg ? messageClass : "hidden",
                ].join(" ")}>
                  {msg?.text || ""}
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InfoCard icon={<Mail className="w-4 h-4" />} label={t("email")} value={loading ? t("loading") : user?.email || "-"} />
                  <InfoCard icon={<User className="w-4 h-4" />} label={t("displayName")} value={loading ? t("loading") : user?.displayName || user?.username || "-"} />
                  <InfoCard icon={<Calendar className="w-4 h-4" />} label={t("createdAt")} value={loading || !user ? t("loading") : formatDate(user.createdAt, language)} />
                  <InfoCard icon={<Shield className="w-4 h-4" />} label={t("emailVerified")} value={loading ? t("loading") : user?.emailVerifiedAt ? t("isVerified") : t("notVerified")} />
                  <InfoCard icon={<GraduationCap className="w-4 h-4" />} label={t("level")} value={loading ? t("loading") : user?.level?.code ? `${user.level.code} - ${user.level.name}` : t("notRanked")} />
                  <LanguageCard />
                </div>

                {loading ? <p className="text-sm text-slate-400 mt-6">{t("loading")}</p> : null}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function MenuItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition text-left",
        active
          ? "bg-blue-500/10 border-blue-400/20 text-blue-600 dark:text-blue-400"
          : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10",
      ].join(" ")}
    >
      <span className={active ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-300"}>{icon}</span>
      <span className="font-semibold">{label}</span>
    </button>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4">
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-semibold">
        {icon}
        <span>{label}</span>
      </div>
      <div className="mt-2 text-slate-800 dark:text-white font-extrabold">{value}</div>
    </div>
  );
}

function LanguageCard() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4 flex flex-col justify-between">
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-semibold">
        <Globe className="w-4 h-4" />
        <span>{t("language")}</span>
      </div>
      <div className="mt-2 relative">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as "vi" | "en")}
          className="w-full appearance-none bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-800 dark:text-white text-sm font-bold rounded-xl px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
        >
          <option value="vi" className="bg-slate-800 text-white font-semibold">{t("vietnamese")}</option>
          <option value="en" className="bg-slate-800 text-white font-semibold">{t("english")}</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
