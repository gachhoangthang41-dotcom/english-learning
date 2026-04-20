"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { dictionaries, Language, DictionaryKey } from '@/models/dictionaries';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: DictionaryKey) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "vi",
  setLanguage: () => {},
  t: (key) => dictionaries["vi"][key] || key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return "vi";
    }

    const saved = localStorage.getItem("NEXT_LOCALE");
    return saved === "vi" || saved === "en" ? saved : "vi";
  });

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("NEXT_LOCALE", lang);
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`;
  };

  const t = (key: DictionaryKey): string => {
    // Return key as fallback if translation is not found
    return dictionaries[language]?.[key] || key;
  };

  // To prevent hydration errors when default language (vi) mismatches localStorage (en)
  // We can render children normally, but it might flicker. Next.js handles text node mismatched nicely usually.
  // Actually, returning a skeleton or null during SSR avoids hydration mismatch, but prevents SEO.
  // We'll proceed without returning null, standard approach.

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
