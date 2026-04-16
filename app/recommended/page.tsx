"use client";

import Link from "next/link";
import { ChevronLeft, Timer, Signal, Mic2 } from "lucide-react";
import { useLanguage } from '@/views/components/language-provider';

type RecommendedItem = {
  tag: string;
  title: string;
  time: string;
  level: string;
  href: string;
};

export default function RecommendedPage() {
  const { t, language } = useLanguage();
  const items: RecommendedItem[] = [
    { tag: t("shadowing"), title: t("recommendedBusinessTitle"), time: `15 ${t("minutes")}`, level: "B2", href: "/practice/shadowing" },
    { tag: t("dictation"), title: t("recommendedNewsTitle"), time: `10 ${t("minutes")}`, level: "A1 A2", href: "/learn/a1/1/dictation" },
    { tag: t("listening"), title: t("recommendedConversationsTitle"), time: `12 ${t("minutes")}`, level: "A1", href: "/learn/a1/1" },
    { tag: t("vocabulary"), title: t("recommendedPhrasalVerbsTitle"), time: `8 ${t("minutes")}`, level: "A2 B1", href: "/flashcards/a2" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/home"
            className="size-9 rounded-xl bg-secondary grid place-items-center hover:brightness-90 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-extrabold tracking-tight">
            {t("recommendedForYou")}
          </h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-2xl border border-border bg-card p-5 transition hover:shadow-lg hover:border-blue-500/30"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-xs font-semibold">
                  <Mic2 className="w-3.5 h-3.5" />
                  {item.tag}
                </span>
              </div>

              <h3 className="text-base font-bold text-foreground mb-3 group-hover:text-blue-500 transition">
                {item.title}
              </h3>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Timer className="w-4 h-4" />
                  {item.time}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Signal className="w-4 h-4" />
                  {item.level}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
