import "./globals.css";
import { cookies } from "next/headers";
import Script from "next/script";
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
      <body className="min-h-screen antialiased overflow-x-hidden" suppressHydrationWarning>
        <Script
          id="strip-extension-hydration-attrs"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                function stripAttrs(root) {
                  if (!root || !root.querySelectorAll) return;
                  root.querySelectorAll('[bis_skin_checked]').forEach(function (node) {
                    node.removeAttribute('bis_skin_checked');
                  });
                }

                stripAttrs(document);

                if (typeof MutationObserver !== 'undefined') {
                  var observer = new MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                      if (mutation.type === 'attributes' && mutation.attributeName === 'bis_skin_checked') {
                        mutation.target.removeAttribute('bis_skin_checked');
                      }
                      mutation.addedNodes.forEach(function (node) {
                        if (node.nodeType === 1) {
                          if (node.hasAttribute && node.hasAttribute('bis_skin_checked')) {
                            node.removeAttribute('bis_skin_checked');
                          }
                          stripAttrs(node);
                        }
                      });
                    });
                  });

                  observer.observe(document.documentElement, {
                    attributes: true,
                    childList: true,
                    subtree: true,
                    attributeFilter: ['bis_skin_checked']
                  });

                  window.addEventListener('load', function () {
                    window.setTimeout(function () {
                      observer.disconnect();
                    }, 1000);
                  });
                }
              })();
            `,
          }}
        />
        <LanguageProvider initialLanguage={initialLanguage}>
          <ThemeProvider>{children}</ThemeProvider>
          <ConditionalFloatingAiChat isAuthenticated={Boolean(userId)} />
        </LanguageProvider>
      </body>
    </html>
  );
}
