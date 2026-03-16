import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { FloatingAiChat } from "../components/floating-ai-chat";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="min-h-screen antialiased overflow-x-hidden">
        <ThemeProvider>{children}</ThemeProvider>
        <FloatingAiChat />
      </body>
    </html>
  );
}
