import "./globals.css";
import { cookies } from "next/headers";
import { ThemeProvider } from '@/views/components/theme-provider';
import { LanguageProvider } from '@/views/components/language-provider';
import { getUserIdFromSessionCookies } from '@/controllers/server-session-user';
import type { Language } from '@/models/dictionaries';

import { ConditionalFloatingAiChat } from '@/views/components/conditional-floating-ai-chat';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const userId = await getUserIdFromSessionCookies();
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;
  const initialLanguage: Language = localeCookie === "en" ? "en" : "vi";

  return (
    <html lang={initialLanguage} suppressHydrationWarning>
      <body className="min-h-screen antialiased overflow-x-hidden">
        <LanguageProvider initialLanguage={initialLanguage}>
          <ThemeProvider>{children}</ThemeProvider>
          <ConditionalFloatingAiChat isAuthenticated={Boolean(userId)} />
        </LanguageProvider>
      </body>
    </html>
  );
}
