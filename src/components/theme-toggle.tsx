"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  // Tránh hydration mismatch: trước khi mounted, giả định dark
  const isDark = mounted ? resolvedTheme === "dark" : true;

  function toggle() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <div className="flex items-center gap-2">
      <span className="hidden sm:inline text-sm font-semibold text-muted">chế độ:</span>

      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        onClick={toggle}
        suppressHydrationWarning
        className={[
          "relative inline-flex h-6 w-11 items-center rounded-full border transition-colors",
          "border-black/15 bg-white/70 hover:bg-white",
          "dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/15",
          "focus:outline-none focus:ring-2 focus:ring-blue-500/30",
        ].join(" ")}
        title={isDark ? "Chuyển sang Sáng" : "Chuyển sang Tối"}
      >
        <span
          className={[
            "inline-block h-5 w-5 rounded-full bg-white shadow transition-transform",
            isDark ? "translate-x-5" : "translate-x-1",
          ].join(" ")}
        />
      </button>

      <span className="text-sm font-semibold text-muted">
        {isDark ? "Tối" : "Sáng"}
      </span>
    </div>
  );
}
