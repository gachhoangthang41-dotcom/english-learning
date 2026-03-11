// app/providers.tsx
"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"              // ✅ quan trọng: dùng class "dark"
      defaultTheme="dark"            // ✅ mặc định dark
      enableSystem={false}           // ✅ tránh bị OS override
      storageKey="theme"             // ✅ lưu localStorage key = "theme"
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
