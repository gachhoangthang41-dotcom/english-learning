"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useLanguage } from '@/views/components/language-provider';
import type { FlashcardReviewStatus } from '@/controllers/flashcards';

type ReviewWord = {
  id: string;
  word: string;
  meaning: string;
  pronunciation?: string | null;
  partOfSpeech?: string | null;
  learnedAt: string;
};

type FlashcardReviewPageProps = {
  status: FlashcardReviewStatus;
};

export default function FlashcardReviewPage({ status }: FlashcardReviewPageProps) {
  const { language, t } = useLanguage();
  const [items, setItems] = useState<ReviewWord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    fetch(`/api/flashcards/review?status=${status}`, { credentials: "same-origin" })
      .then((response) => response.json())
      .then((data) => {
        if (isActive && data?.status === "success") {
          setItems(data.data || []);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch flashcard review words:", error);
      })
      .finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [status]);

  const isKnownPage = status === "known";
  const title = isKnownPage ? t("flashcardsKnownPageTitle") : t("flashcardsUnknownPageTitle");
  const description = isKnownPage ? t("flashcardsKnownPageDesc") : t("flashcardsUnknownPageDesc");
  const emptyTitle = isKnownPage ? t("flashcardsKnownEmptyTitle") : t("flashcardsUnknownEmptyTitle");
  const emptyDesc = isKnownPage ? t("flashcardsKnownEmptyDesc") : t("flashcardsUnknownEmptyDesc");
  const badgeLabel = isKnownPage ? t("flashcardsKnownBadge") : t("flashcardsUnknownBadge");
  const accentClass = isKnownPage
    ? "text-emerald-200 bg-emerald-400/12 border-emerald-300/35 shadow-sm shadow-emerald-950/30"
    : "text-amber-200 bg-amber-400/12 border-amber-300/35 shadow-sm shadow-amber-950/30";

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="text-sm font-medium text-muted-foreground">{t("loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Link
              href="/home"
              className="grid size-9 place-items-center rounded-xl bg-secondary transition hover:brightness-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">{title}</h1>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>

          <div className={`rounded-full border px-3 py-1 text-sm font-semibold ${accentClass}`}>
            {items.length} {badgeLabel}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card px-6 py-14 text-center shadow-sm">
            <h2 className="text-xl font-bold">{emptyTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{emptyDesc}</p>
            <Link
              href="/home"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              {t("flashcardsReturnToDecks")}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <article key={item.id} className="rounded-3xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold">{item.word}</h2>
                    {item.pronunciation ? (
                      <p className="mt-1 text-sm text-muted-foreground">/{item.pronunciation.replaceAll("/", "")}/</p>
                    ) : null}
                  </div>
                  <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${accentClass}`}>
                    {badgeLabel}
                  </span>
                </div>

                {item.partOfSpeech ? (
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {item.partOfSpeech}
                  </p>
                ) : null}

                <p className="mt-2 text-sm leading-6 text-foreground/90">{item.meaning}</p>

                <p className="mt-4 text-xs text-muted-foreground">
                  {language === "en" ? "Updated" : "Cập nhật"}: {new Date(item.learnedAt).toLocaleDateString(language === "en" ? "en-US" : "vi-VN")}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}