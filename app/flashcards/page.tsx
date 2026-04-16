"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useLanguage } from '@/views/components/language-provider';

type FlashcardLevel = {
  level: string;
  title: string;
  desc: string;
  gradient: string;
  href: string;
};

export default function FlashcardsPage() {
  const { t } = useLanguage();
  const flashcards: FlashcardLevel[] = [
    { level: t("savedShort"), title: t("flashcardsSavedTitle"), desc: t("flashcardsSavedDesc"), gradient: "bg-gradient-to-br from-emerald-600 to-[#0f172a]", href: "/flashcards/saved" },
    { level: t("knownShort"), title: t("flashcardsKnownTitle"), desc: t("flashcardsKnownDesc"), gradient: "bg-gradient-to-br from-[#047857] to-[#0f172a]", href: "/flashcards/known" },
    { level: t("unknownShort"), title: t("flashcardsUnknownTitle"), desc: t("flashcardsUnknownDesc"), gradient: "bg-gradient-to-br from-[#b45309] to-[#0f172a]", href: "/flashcards/unknown" },
    { level: "A1", title: t("flashcardsA1Title"), desc: t("flashcardsA1Desc"), gradient: "bg-gradient-to-br from-[#1e3a8a] to-[#0f172a]", href: "/flashcards/a1" },
    { level: "A2", title: t("flashcardsA2Title"), desc: t("flashcardsA2Desc"), gradient: "bg-gradient-to-br from-[#334155] to-[#0f172a]", href: "/flashcards/a2" },
    { level: "B1", title: t("flashcardsB1Title"), desc: t("flashcardsB1Desc"), gradient: "bg-gradient-to-br from-[#1f2937] to-[#030712]", href: "/flashcards/b1" },
    { level: "B2", title: t("flashcardsB2Title"), desc: t("flashcardsB2Desc"), gradient: "bg-gradient-to-br from-[#3730a3] to-[#0f172a]", href: "/flashcards/b2" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <Link
            href="/home"
            className="grid size-9 place-items-center rounded-xl bg-secondary transition hover:brightness-95"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">{t("allFlashcards")}</h1>
            <p className="text-sm text-muted-foreground">
              {t("flashcardsOverviewDesc")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {flashcards.map((card) => (
            <Link
              key={card.level}
              href={card.href}
              className={[
                "relative overflow-hidden rounded-2xl border border-white/10 p-6",
                "flex min-h-56 flex-col justify-between",
                "transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-900/20",
                card.gradient,
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3 z-10">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-inner">
                  <span className="text-sm font-bold text-white">{card.level}</span>
                </div>
                <span className="rounded-md bg-black/20 px-2 py-1 text-xs font-medium text-gray-300 backdrop-blur-sm">
                  {t("flashcardLabel")}
                </span>
              </div>

              <div className="z-10 mt-auto">
                <h2 className="mb-2 text-xl font-bold tracking-wide text-white">{card.title}</h2>
                <p className="text-sm font-medium leading-relaxed text-gray-300/85">{card.desc}</p>
              </div>

              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-black/20 blur-2xl" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}