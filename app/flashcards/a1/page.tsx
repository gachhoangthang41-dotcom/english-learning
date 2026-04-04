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

const A1_TOPICS: Topic[] = [
  {
    id: "basics",
    title: "Greetings & Basics",
    description: "Lời chào hỏi và từ cơ bản nhất",
    wordCount: 10,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "family",
    title: "Family & People",
    description: "Các thành viên trong gia đình",
    wordCount: 8,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "numbers",
    title: "Numbers & Colors",
    description: "Số, màu sắc và kích cỡ",
    wordCount: 12,
    color: "from-pink-500 to-pink-600",
  },
  {
    id: "daily",
    title: "Daily Activities",
    description: "Hoạt động hàng ngày",
    wordCount: 10,
    color: "from-green-500 to-green-600",
  },
];

export default function A1TopicsPage() {
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
            <h1 className="text-xl font-bold">A1 Flashcard Topics</h1>
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
            {A1_TOPICS.map((topic) => (
              <Link
                key={topic.id}
                href={`/flashcards/a1/${topic.id}`}
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

          {/* Info Card */}
          <div className="mt-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6">
            <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2">
              💡 Mẹo học hiệu quả
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Học từng chủ đề một cách có hệ thống giúp bạn dễ dàng ghi nhớ và áp dụng từ vựng trong các tình huống thực tế. Hãy hoàn thành tất cả các chủ đề để nâng cao trình độ!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}