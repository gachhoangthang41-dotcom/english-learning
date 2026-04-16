"use client";

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
  isAuthenticated: boolean;
};

export function ConditionalFloatingAiChat({ isAuthenticated }: ConditionalFloatingAiChatProps) {
  const pathname = usePathname();

  if (!isAuthenticated || !pathname || HIDDEN_AUTH_ROUTES.has(pathname)) {
    return null;
  }

  return <FloatingAiChat />;
}