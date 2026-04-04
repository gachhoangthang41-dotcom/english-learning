"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Play } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  wordCount: number;
  color: string;
}

const A2_TOPICS: Topic[] = [
  {
    id: "description",
    title: "Adjectives & Description",
    description: "Tính từ mô tả và đặc điểm",
    wordCount: 10,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "food",
    title: "Food & Drinks",
    description: "Thức ăn và đồ uống",
    wordCount: 12,
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "shopping",
    title: "Shopping & Money",
    description: "Mua sắm và tiền tệ",
    wordCount: 10,
    color: "from-pink-500 to-pink-600",
  },
  {
    id: "hobbies",
    title: "Hobbies & Interests",
    description: "Sở thích và hứng thú",
    wordCount: 10,
    color: "from-purple-500 to-purple-600",
  },
];

export default function A2TopicsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold hidden sm:inline">Back</span>
          </button>

          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold">A2 Flashcard Topics</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Chọn chủ đề để bắt đầu học
            </p>
          </div>

          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 py-8">
          <div className="space-y-3">
            {A2_TOPICS.map((topic) => (
              <Link
                key={topic.id}
                href={`/flashcards/a2/${topic.id}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors border border-border hover:border-blue-500/50 group"
              >
                {/* Play Button */}
                <div className="flex-shrink-0 size-10 rounded-lg bg-blue-600 grid place-items-center group-hover:bg-blue-700 transition">
                  <Play className="w-5 h-5 text-white fill-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground">{topic.description}</p>
                </div>

                {/* Học ngay Button */}
                <button className="flex-shrink-0 px-4 py-2 rounded-lg text-blue-600 dark:text-blue-400 font-semibold text-sm hover:bg-blue-600/10 transition">
                  Học ngay
                </button>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
