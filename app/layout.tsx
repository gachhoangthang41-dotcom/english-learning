import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { FloatingAiChat } from "../components/floating-ai-chat";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="min-h-screen antialiased overflow-x-hidden">
        <LanguageProvider>
          <ThemeProvider>{children}</ThemeProvider>
          <FloatingAiChat />
        </LanguageProvider>
      </body>
    </html>
  );
}
