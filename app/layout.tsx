import "./globals.css";
import { ThemeProvider } from '@/views/components/theme-provider';
import { LanguageProvider } from '@/views/components/language-provider';
import { getUserIdFromSessionCookies } from '@/controllers/server-session-user';

import { ConditionalFloatingAiChat } from '@/views/components/conditional-floating-ai-chat';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const userId = await getUserIdFromSessionCookies();

  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="min-h-screen antialiased overflow-x-hidden">
        <LanguageProvider>
          <ThemeProvider>{children}</ThemeProvider>
          <ConditionalFloatingAiChat isAuthenticated={Boolean(userId)} />
        </LanguageProvider>
      </body>
    </html>
  );
}
