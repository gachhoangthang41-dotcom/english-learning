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
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

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

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("vi-VN", {
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

  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<MeUser | null>(null);
  const [msg, setMsg] = React.useState<{ type: MsgType; text: string } | null>(
    null
  );

  // avatar upload
  const fileRef = React.useRef<HTMLInputElement | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = React.useState(false);

  function showMessage(type: MsgType, text: string) {
    setMsg({ type, text });
  }

  const messageClass =
    msg?.type === "error"
      ? "bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-500/20"
      : msg?.type === "success"
        ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-500/20"
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

      const u: MeUser = data.user;
      setUser(u);
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
      showMessage("error", "Vui lòng chọn file ảnh (jpg/png/webp...).");
      return;
    }

    setUploadingAvatar(true);
    showMessage("info", "Đang tải avatar lên...");

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

      showMessage("success", data?.message || "Cập nhật avatar thành công!");
      await loadMe();
    } catch (err) {
      console.error(err);
      showMessage("error", "Không thể kết nối đến máy chủ.");
    } finally {
      setUploadingAvatar(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function onPickAvatarClick() {
    fileRef.current?.click();
  }

  function onAvatarFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    uploadAvatar(f);
  }

  function go(path: string) {
    router.push(path);
  }

  const shownName = user?.displayName || user?.username || "User";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background giống login/verify */}
      <div className="landing-bg">
        <div className="landing-bg__base" />
        <div className="landing-blob landing-blob--top" />
        <div className="landing-blob landing-blob--left" />
        <div className="landing-blob landing-blob--right" />
        <div className="landing-noise" />
      </div>

      {/* Header */}
      <header className="site-header w-full border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link href="/home" className="flex items-center gap-3">
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

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/home"
            className="text-sm font-bold px-4 py-2 rounded-full text-blue-400 hover:bg-blue-500/10 border border-transparent hover:border-blue-400/25 transition"
          >
            Home
          </Link>
        </div>
      </header>

      <main className="flex-1 px-4 py-10">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="glass-card rounded-2xl border border-white/10 p-5">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
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
                        <User className="w-6 h-6 text-white/80" />
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={onPickAvatarClick}
                      disabled={uploadingAvatar || loading}
                      className="absolute -bottom-1 -right-1 size-7 rounded-full bg-blue-600 hover:bg-blue-500 border border-white/10 grid place-items-center shadow-lg shadow-blue-500/25 disabled:opacity-60"
                      title="Đổi avatar"
                    >
                      {uploadingAvatar ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Camera className="w-4 h-4" />
                      )}
                    </button>

                    {/* hidden input */}
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={onAvatarFileChange}
                    />
                  </div>

                  <div className="leading-tight">
                    <div className="font-extrabold">{shownName}</div>
                    <div className="text-sm text-slate-400">
                      {user?.role || "Member"}
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <MenuItem
                    icon={<Settings className="w-5 h-5" />}
                    label="Chung"
                    active={false}
                    onClick={() => showMessage("info", "Mục này làm sau nhé.")}
                  />
                  <MenuItem
                    icon={<User className="w-5 h-5" />}
                    label="Tài khoản"
                    active={pathname === "/profile"}
                    onClick={() => go("/profile")}
                  />
                  <MenuItem
                    icon={<GraduationCap className="w-5 h-5" />}
                    label="Học tập"
                    active={false}
                    onClick={() => showMessage("info", "Mục này làm sau nhé.")}
                  />
                  <MenuItem
                    icon={<Volume2 className="w-5 h-5" />}
                    label="Âm thanh"
                    active={false}
                    onClick={() => showMessage("info", "Mục này làm sau nhé.")}
                  />
                  <MenuItem
                    icon={<Bell className="w-5 h-5" />}
                    label="Thông báo"
                    active={false}
                    onClick={() => showMessage("info", "Mục này làm sau nhé.")}
                  />
                  <MenuItem
                    icon={<Shield className="w-5 h-5" />}
                    label="Bảo mật"
                    active={pathname === "/profile/security"}
                    onClick={() => go("/profile/security")}
                  />
                </div>

                <p className="mt-4 text-xs text-slate-400"></p>
              </div>
            </aside>

            {/* Content */}
            <section className="lg:col-span-8">
              <div className="glass-card rounded-2xl border border-white/10 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-extrabold tracking-tight">
                      Tài khoản
                    </h1>
                    <p className="text-muted mt-1">
                      Xem profile và thông tin cơ bản.
                    </p>
                  </div>
                </div>

                <div
                  className={[
                    "mt-4 min-h-[20px] text-sm rounded-lg p-3",
                    msg ? messageClass : "hidden",
                  ].join(" ")}
                >
                  {msg?.text || ""}
                </div>

                {/* Info */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InfoCard
                    icon={<Mail className="w-4 h-4" />}
                    label="Email"
                    value={loading ? "..." : user?.email || "-"}
                  />

                  <InfoCard
                    icon={<User className="w-4 h-4" />}
                    label="Tên hiển thị"
                    value={
                      loading
                        ? "..."
                        : user?.displayName || user?.username || "-"
                    }
                  />

                  <InfoCard
                    icon={<Calendar className="w-4 h-4" />}
                    label="Ngày tạo"
                    value={loading || !user ? "..." : formatDate(user.createdAt)}
                  />

                  <InfoCard
                    icon={<Shield className="w-4 h-4" />}
                    label="Xác thực email"
                    value={
                      loading
                        ? "..."
                        : user?.emailVerifiedAt
                          ? "Đã xác thực"
                          : "Chưa xác thực"
                    }
                  />

                  <InfoCard
                    icon={<GraduationCap className="w-4 h-4" />}
                    label="Cấp độ"
                    value={
                      loading
                        ? "..."
                        : user?.level?.code
                          ? `${user.level.code} - ${user.level.name}`
                          : "Chưa xếp loại"
                    }
                  />
                </div>

                {loading ? (
                  <p className="text-sm text-slate-400 mt-6">Đang tải...</p>
                ) : null}
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
          ? "bg-blue-500/10 border-blue-400/20 text-blue-300"
          : "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10",
      ].join(" ")}
    >
      <span className={active ? "text-blue-300" : "text-slate-300"}>
        {icon}
      </span>
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
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold">
        {icon}
        <span>{label}</span>
      </div>
      <div className="mt-2 text-white font-extrabold">{value}</div>
    </div>
  );
}
