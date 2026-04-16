import "./globals.css";
import { ThemeProvider } from '@/views/components/theme-provider';
import { LanguageProvider } from '@/views/components/language-provider';
import { getSession } from '@/controllers/auth-session';

import { ConditionalFloatingAiChat } from '@/views/components/conditional-floating-ai-chat';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="min-h-screen antialiased overflow-x-hidden">
        <LanguageProvider>
          <ThemeProvider>{children}</ThemeProvider>
          <ConditionalFloatingAiChat isAuthenticated={Boolean(session)} />
        </LanguageProvider>
      </body>
    </html>
  );
}
