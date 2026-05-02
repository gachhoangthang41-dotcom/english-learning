"use client";

import * as React from "react";
import { Bell } from "lucide-react";

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

type Notification = {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export function NotificationBell() {
  const [open, setOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const [loading, setLoading] = React.useState(true);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    fetchNotifications();
    registerPushManager();
  }, []);

  async function registerPushManager() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
          if (!vapidKey) return;
          
          let subscription = await registration.pushManager.getSubscription();
          if (!subscription) {
            subscription = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlB64ToUint8Array(vapidKey)
            });
          }

          // Gửi subscription lên backend
          await fetch('/api/notifications/push-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subscription })
          });
        }
      } catch (err) {
        console.error("Lỗi khi đăng ký service worker hoặc Web Push", err);
      }
    }
  }

  React.useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  async function fetchNotifications() {
    setLoading(true);
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      if (data.status === "success") {
        setNotifications(data.notifications || []);
      }
    } catch (err) {
      console.error("Failed to load notifications", err);
    } finally {
      setLoading(false);
    }
  }

  async function markAsRead(ids: string[]) {
    if (!ids.length) return;
    try {
      await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      setNotifications((prev) =>
        prev.map((n) => (ids.includes(n.id) ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark notifications as read", err);
    }
  }

  function toggleDropdown() {
    const isOpening = !open;
    setOpen(isOpening);
    if (isOpening) {
      // Mark unread ones as read when opening
      const unreads = notifications.filter((n) => !n.isRead).map((n) => n.id);
      if (unreads.length > 0) {
        markAsRead(unreads);
      }
    }
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="relative size-9 rounded-full hover:bg-secondary border border-transparent transition grid place-items-center"
        onClick={toggleDropdown}
        title="Thông báo"
      >
        {unreadCount > 0 && (
          <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-red-500 ring-2 ring-background" />
        )}
        <Bell className="w-5 h-5 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-xl bg-popover text-popover-foreground shadow-2xl border border-border z-[999] pointer-events-auto">
          <div className="px-4 py-3 border-b border-border sticky top-0 bg-popover/90 backdrop-blur-sm">
            <h3 className="font-bold text-sm">Thông báo</h3>
          </div>
          <div className="flex flex-col">
            {loading ? (
              <div className="px-4 py-5 text-center text-xs text-muted-foreground">Đang tải...</div>
            ) : notifications.length === 0 ? (
              <div className="px-4 py-5 text-center text-xs text-muted-foreground">Không có thông báo nào</div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`px-4 py-3 border-b border-white/5 last:border-0 transition ${
                    !n.isRead ? "bg-blue-500/10" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-semibold text-sm line-clamp-1">{n.title}</div>
                    <div className="text-[10px] text-muted-foreground whitespace-nowrap">
                      {new Date(n.createdAt).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                      })}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                    {n.message}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
