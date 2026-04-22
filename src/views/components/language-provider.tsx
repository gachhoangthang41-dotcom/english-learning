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

const DEFAULT_LANGUAGE: Language = "vi";

function normalizeLanguage(value: string | null | undefined): Language {
  return value === "en" ? "en" : "vi";
}

type LanguageProviderProps = {
  children: React.ReactNode;
  initialLanguage?: Language;
};

export function LanguageProvider({ children, initialLanguage = DEFAULT_LANGUAGE }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(normalizeLanguage(initialLanguage));

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("NEXT_LOCALE", lang);
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`;
  };

  const t = (key: DictionaryKey): string => {
    return dictionaries[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
