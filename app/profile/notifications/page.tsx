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
  Camera,
  Loader2,
  ChevronDown,
  ChevronRight,
  Smartphone,
  Mail,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { ThemeToggle } from '@/views/components/theme-toggle';
import { NotificationBell } from '@/views/components/notification-bell';
import { useLanguage } from '@/views/components/language-provider';

type MeUser = {
  id: string;
  email: string;
  username: string;
  displayName?: string | null;
  role: string;
  avatarUrl?: string | null;
  practiceRemindersEnabled?: boolean;
  smartReminderTime?: string;
};

function urlB64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function NotificationsSettingsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();

  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<MeUser | null>(null);
  
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(true);
  const [permission, setPermission] = React.useState<NotificationPermission>("default");
  const [isSubscribing, setIsSubscribing] = React.useState(false);
  const [pushStatusMsg, setPushStatusMsg] = React.useState<{type: "info"|"success"|"error", text: string} | null>(null);

  const [practiceRemindersEnabled, setPracticeRemindersEnabled] = React.useState(true);
  const [smartReminderTime, setSmartReminderTime] = React.useState("20:00");
  const [savingPrefs, setSavingPrefs] = React.useState(false);

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
      const u = data.user as MeUser;
      setUser(u);
      if (typeof u.practiceRemindersEnabled === "boolean") {
          setPracticeRemindersEnabled(u.practiceRemindersEnabled);
      }
      if (u.smartReminderTime) {
          setSmartReminderTime(u.smartReminderTime);
      }
    } catch {
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    loadMe();
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  async function requestPushPermission() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      setPushStatusMsg({ type: "error", text: "Trình duyệt của bạn không hỗ trợ Web Push Notification." });
      return;
    }
    
    setIsSubscribing(true);
    setPushStatusMsg({ type: "info", text: "Đang xử lý cấp quyền..." });
    
    try {
      const perm = await Notification.requestPermission();
      setPermission(perm);
      
      if (perm === 'granted') {
        const registration = await navigator.serviceWorker.ready;
        const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
        if (!vapidKey) {
            setPushStatusMsg({ type: "error", text: "Hệ thống chưa cấu hình VAPID key cho Push." });
            return;
        }

        let subscription = await registration.pushManager.getSubscription();
        if (!subscription) {
            subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlB64ToUint8Array(vapidKey)
            });
        }
        
        const res = await fetch('/api/notifications/push-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subscription })
        });
        
        if (res.ok) {
            setPushStatusMsg({ type: "success", text: "Đăng ký thành công! Bạn sẽ nhận được thông báo nảy trên giao diện."});
        } else {
            setPushStatusMsg({ type: "error", text: "Lỗi kết nối tới máy chủ khi lưu thiết bị." });
        }
      } else {
        setPushStatusMsg({ type: "error", text: "Bạn đã từ chối cấp quyền thông báo." });
      }
    } catch (err) {
      console.error(err);
      setPushStatusMsg({ type: "error", text: "Có lỗi xảy ra khi thiết lập Push Notification." });
    } finally {
      setIsSubscribing(false);
    }
  }

  async function savePreferences(enabled: boolean, time: string) {
      if (savingPrefs) return;
      setSavingPrefs(true);
      setPushStatusMsg({ type: "info", text: "Đang lưu cài đặt nhắc nhở..." });
      try {
          const res = await fetch("/api/auth/profile/update-notifications", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                  practiceRemindersEnabled: enabled,
                  smartReminderTime: time
              })
          });
          const data = await res.json().catch(() => null);
          if (res.ok && data?.status === 'success') {
              setPushStatusMsg({ type: "success", text: "Đã lưu cài đặt thông báo." });
              setPracticeRemindersEnabled(enabled);
              setSmartReminderTime(time);
          } else {
              setPushStatusMsg({ type: "error", text: data?.message || "Lỗi khi lưu cài đặt." });
          }
      } catch (err) {
          setPushStatusMsg({ type: "error", text: "Lỗi kết nối máy chủ." });
      } finally {
          setSavingPrefs(false);
      }
  }

  function go(path: string) {
    router.push(path);
  }

  const shownName = user?.displayName || user?.username || "User";
  const shownRole = user?.role === "user" ? "Thành viên" : user?.role || "Thành viên";

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
            <Image src="/assets/icons/chick.png" alt="Logo" width={32} height={32} className="w-6 h-6 object-contain" priority />
          </span>
          <h2 className="text-lg font-bold leading-tight tracking-tight !text-black dark:!text-white">
            {t("appTitle")}
          </h2>
        </Link>
        <div className="flex items-center gap-3">
          <NotificationBell />
          <ThemeToggle />
          <Link href="/home" className="text-sm font-bold px-4 py-2 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 border border-transparent hover:border-blue-400/25 transition">
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
                      <Image src={user.avatarUrl} alt="Avatar" fill className="object-cover" sizes="48px" />
                    ) : (
                      <div className="w-full h-full grid place-items-center">
                        <User className="w-6 h-6 text-slate-400 dark:text-white/80" />
                      </div>
                    )}
                  </div>
                  <div className="leading-tight">
                    <div className="font-extrabold text-slate-800 dark:text-white">{shownName}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{shownRole}</div>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <MenuItem icon={<User className="w-5 h-5" />} label={t("profileTitle") || "Tài khoản"} active={false} onClick={() => go("/profile")} />
                  <MenuItem icon={<GraduationCap className="w-5 h-5" />} label={t("learning") || "Học tập"} active={false} onClick={() => alert("Mục này làm sau nhé.")} />

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                      className={["w-full flex items-center justify-between px-4 py-3 rounded-xl border transition text-left", isSettingsOpen ? "bg-blue-50/80 dark:bg-white/10 border-blue-200 dark:border-white/20 text-blue-700 dark:text-white" : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10"].join(" ")}
                    >
                      <div className="flex items-center gap-3">
                        <span className={isSettingsOpen ? "text-blue-600 dark:text-white" : "text-slate-500 dark:text-slate-300"}><Settings className="w-5 h-5" /></span>
                        <span className="font-semibold">{t("settings") || "Cài đặt"}</span>
                      </div>
                      <span className="text-slate-400">{isSettingsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}</span>
                    </button>

                    {isSettingsOpen && (
                      <div className="mt-2 ml-4 pl-4 border-l-2 border-white/10 space-y-2">
                        <MenuItem icon={<Volume2 className="w-5 h-5" />} label={t("audio") || "Âm thanh"} active={false} onClick={() => alert("Mục này làm sau nhé.")} />
                        <MenuItem icon={<Bell className="w-5 h-5" />} label={t("notifications") || "Thông báo"} active={pathname === "/profile/notifications"} onClick={() => go("/profile/notifications")} />
                        <MenuItem icon={<Shield className="w-5 h-5" />} label={t("security") || "Bảo mật"} active={false} onClick={() => go("/profile/security")} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </aside>

            <section className="lg:col-span-8">
              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#374053]/80 backdrop-blur-xl p-6">
                <div className="mb-6">
                  <h1 className="text-2xl font-extrabold tracking-tight text-slate-800 dark:text-white">Cài đặt Thông báo</h1>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">Quản lý cách chúng mình gửi thông tin nhắc nhở học tập đến bạn.</p>
                </div>
                
                {pushStatusMsg && (
                    <div className={`mb-6 p-4 rounded-xl text-sm font-semibold border ${
                        pushStatusMsg.type === 'success' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20' :
                        pushStatusMsg.type === 'error' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20' :
                        'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20'
                    }`}>
                        {pushStatusMsg.text}
                    </div>
                )}

                <div className="space-y-6">
                    {/* Cài đặt Nhắc nhở thông minh */}
                    <div className="flex flex-col gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/10 dark:border-white/10">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-white">Nhắc nhở học tập hàng ngày</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Ứng dụng sẽ kiểm tra tiến độ của bạn mỗi ngày và gửi lời nhắc nếu bạn chưa hoàn thành bài tập.
                                </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    checked={practiceRemindersEnabled}
                                    onChange={(e) => savePreferences(e.target.checked, smartReminderTime)}
                                    disabled={savingPrefs || loading}
                                />
                                <div className="w-11 h-6 bg-slate-300 dark:bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        {practiceRemindersEnabled && (
                            <div className="pt-4 mt-2 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <div className="text-sm font-semibold text-slate-800 dark:text-white">Lịch nhắc nhở thông minh</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">Chọn khung giờ bạn muốn được nhận nhắc nhở mỗi ngày (ví dụ 20:00 tối).</div>
                                </div>
                                <div className="flex items-center gap-2 max-w-[150px]">
                                    <input 
                                        type="time" 
                                        className="w-full h-11 px-3 text-center rounded-xl bg-white dark:bg-black/20 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40" 
                                        value={smartReminderTime}
                                        onChange={(e) => setSmartReminderTime(e.target.value)}
                                        onBlur={(e) => {
                                            if (e.target.value && e.target.value !== user?.smartReminderTime) {
                                                savePreferences(practiceRemindersEnabled, e.target.value);
                                            }
                                        }}
                                        disabled={savingPrefs || loading}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Luồng 1 */}
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/10 dark:border-white/10">
                        <div className="size-10 shrink-0 grid place-items-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-800 dark:text-white">Thông báo qua Email</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                Khi sử dụng máy tính, ứng dụng sẽ gửi email nhắc nhở học tập hàng ngày tới địa chỉ <span className="font-semibold text-slate-800 dark:text-white">{user?.email || "..."}</span>.
                            </p>
                            <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Được bật mặc định
                            </div>
                        </div>
                    </div>

                    {/* Luồng 2 */}
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/10 dark:border-white/10">
                        <div className="size-10 shrink-0 grid place-items-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
                            <Smartphone className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-800 dark:text-white">Thông báo Đẩy Nẩy (Thiết bị hiện tại)</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                Khi bạn đồng ý quyền thông báo trên trình duyệt (hoặc điện thoại) này, ứng dụng có thể đẩy thông báo nảy trên màn hình bất kể ứng dụng có đang mở hay không.
                            </p>
                            
                            <div className="mt-4 p-4 rounded-xl bg-background border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <div className="text-sm font-semibold flex items-center gap-2 text-foreground">
                                        Trạng thái trình duyệt: 
                                        {permission === 'granted' ? 
                                            <span className="text-green-600 dark:text-green-400">Đã kích hoạt</span> : 
                                            permission === 'denied' ? 
                                            <span className="text-red-600 dark:text-red-400">Bị từ chối quyền</span> : 
                                            <span className="text-orange-600 dark:text-orange-400">Chưa cấp quyền</span>
                                        }
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1">Bạn có thể dùng nút bên cạnh để lấy quyền nhé!</div>
                                </div>
                                <button
                                    type="button"
                                    onClick={requestPushPermission}
                                    disabled={permission === 'granted' || isSubscribing}
                                    className="px-4 py-2 shrink-0 rounded-lg text-sm font-bold bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition flex items-center justify-center gap-2 min-w-[140px]"
                                >
                                    {isSubscribing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bell className="w-4 h-4" />}
                                    {permission === 'granted' ? "Đã bật" : "Bật Thông Báo"}
                                </button>
                            </div>

                            {permission === 'denied' && (
                                <div className="mt-3 flex items-start gap-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 p-3 rounded-lg">
                                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                    <span>Trình duyệt đã cấm thông báo. Vui lòng mở quyền "Notifications" trong cài đặt trình duyệt (nút ổ khóa trên thanh địa chỉ) rồi tiến hành bật lại.</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {loading && <p className="text-sm text-slate-400 mt-6 text-center w-full">Đang tải...</p>}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function MenuItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void; }) {
  return (
    <button type="button" onClick={onClick} className={["w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition text-left", active ? "bg-blue-500/10 border-blue-400/20 text-blue-600 dark:text-blue-400" : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10"].join(" ")}>
      <span className={active ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-300"}>{icon}</span>
      <span className="font-semibold">{label}</span>
    </button>
  );
}
