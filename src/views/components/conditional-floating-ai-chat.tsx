"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { FloatingAiChat } from "./floating-ai-chat";

const HIDDEN_AUTH_ROUTES = new Set([
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-login",
  "/verify-register",
]);

type ConditionalFloatingAiChatProps = {
  isAuthenticated?: boolean;
};

export function ConditionalFloatingAiChat(_props: ConditionalFloatingAiChatProps) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    let mounted = true;

    async function check() {
      try {
        const res = await fetch('/api/me', { cache: 'no-store' });
        if (!mounted) return;
        if (res.ok) {
          const data = await res.json().catch(() => null);
          setIsAuthenticated(Boolean(data?.status === 'success' && data?.user));
          return;
        }
        setIsAuthenticated(false);
      } catch (err) {
        if (!mounted) return;
        setIsAuthenticated(false);
      }
    }

    check();

    // re-check when auth may have changed within this tab or other tabs
    const refreshHandler = () => {
      setIsAuthenticated(null);
      // small timeout to allow cookie to be set by browser
      setTimeout(() => {
        if (mounted) check();
      }, 50);
    };

    window.addEventListener('auth-changed', refreshHandler as EventListener);
    window.addEventListener('focus', refreshHandler as EventListener);
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') refreshHandler();
    });

    // storage events are fired in other tabs
    const storageHandler = (e: StorageEvent) => {
      if (e.key === 'pending_login_email' || e.key === 'auth_event') {
        refreshHandler();
      }
    };
    window.addEventListener('storage', storageHandler);

    return () => {
      mounted = false;
      window.removeEventListener('auth-changed', refreshHandler as EventListener);
      window.removeEventListener('focus', refreshHandler as EventListener);
      window.removeEventListener('storage', storageHandler);
    };
  }, []);

  if (!pathname) return null;

  if (isAuthenticated === null) return null; // still checking

  if (!isAuthenticated || HIDDEN_AUTH_ROUTES.has(pathname)) return null;

  return <FloatingAiChat />;
}