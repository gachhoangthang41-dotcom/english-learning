"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FlashcardData {
  level: string;
  title: string;
  desc: string;
  gradient: string;
  href: string;
}

interface FlashcardsProps {
  onScroll?: (direction: "prev" | "next") => void;
}

export default function Flashcards({ onScroll }: FlashcardsProps) {
  const flashcardListRef = React.useRef<HTMLDivElement | null>(null);

  const flashcards: FlashcardData[] = [
    {
      level: "A1",
      title: "Thẻ nhớ A1",
      desc: "Từ vựng cơ bản – làm quen với đơn từ.",
      gradient: "bg-gradient-to-br from-[#1e3a8a] to-[#0f172a]",
      href: "/flashcards/a1",
    },
    {
      level: "A2",
      title: "Thẻ nhớ A2",
      desc: "Từ vựng sơ cấp – kết hợp từ thành câu.",
      gradient: "bg-gradient-to-br from-[#334155] to-[#0f172a]",
      href: "/flashcards/a2",
    },
    {
      level: "B1",
      title: "Thẻ nhớ B1",
      desc: "Từ vựng trung cấp – mở rộng hiểu biết.",
      gradient: "bg-gradient-to-br from-[#1f2937] to-[#030712]",
      href: "/flashcards/b1",
    },
    {
      level: "B2",
      title: "Thẻ nhớ B2",
      desc: "Từ vựng nâng cao – cụm từ chuyên ngành.",
      gradient: "bg-gradient-to-br from-[#3730a3] to-[#0f172a]",
      href: "/flashcards/b2",
    },
  ];

  function scrollFlashcards(dir: "prev" | "next") {
    const el = flashcardListRef.current;
    if (!el) return;
    const amount = 320;
    el.scrollBy({
      left: dir === "prev" ? -amount : amount,
      behavior: "smooth",
    });
    if (onScroll) onScroll(dir);
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-extrabold tracking-tight text-foreground">
          Flashcards
        </h2>

        <div className="flex items-center gap-2">
          <Link
            href="#"
            className="hidden sm:inline text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline transition"
          >
            View all
          </Link>

          <button
            onClick={() => scrollFlashcards("prev")}
            className="size-9 rounded-xl bg-secondary border border-transparent hover:brightness-95 transition grid place-items-center"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          <button
            onClick={() => scrollFlashcards("next")}
            className="size-9 rounded-xl bg-secondary border border-transparent hover:brightness-95 transition grid place-items-center"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      <div
        ref={flashcardListRef}
        className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-4 px-1"
      >
        {flashcards.map((card, index) => (
          <Link
            key={index}
            href={card.href}
            className={`
              relative overflow-hidden rounded-2xl p-6 
              flex flex-col justify-between shrink-0
              h-[220px] w-[280px] sm:w-[320px]
              cursor-pointer transition-all duration-300 
              hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-900/20
              border border-white/10
              ${card.gradient}
            `}
          >
            {/* Phần trên: Badge Level */}
            <div className="flex justify-between items-start z-10">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
                <span className="text-sm font-bold text-white">
                  {card.level}
                </span>
              </div>
              <span className="text-xs font-medium text-gray-300 bg-black/20 px-2 py-1 rounded-md backdrop-blur-sm">
                Flashcard
              </span>
            </div>

            {/* Phần dưới: Tiêu đề và Mô tả */}
            <div className="mt-auto z-10">
              <h3 className="text-xl font-bold text-white mb-2 tracking-wide">
                {card.title}
              </h3>
              <p className="text-sm text-gray-400 font-medium line-clamp-2 leading-relaxed">
                {card.desc}
              </p>
            </div>

            {/* Hiệu ứng trang trí */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-black/20 rounded-full blur-2xl pointer-events-none"></div>
          </Link>
        ))}
      </div>
    </section>
  );
}
