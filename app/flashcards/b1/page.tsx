"use client";

import Link from "next/link";
import { ChevronLeft, Play } from "lucide-react";
import { useRouter } from "next/navigation";

interface Topic {
  id: string;
  title: string;
  description: string;
  wordCount: number;
}

const B1_TOPICS: Topic[] = [
  {
    id: "business",
    title: "Business & Work",
    description: "Professional vocabulary and workplace terms",
    wordCount: 12,
  },
  {
    id: "travel",
    title: "Travel & Culture",
    description: "Explore the world with vocabulary for travelers",
    wordCount: 12,
  },
  {
    id: "education",
    title: "Education & Academic",
    description: "Study-related words and academic expressions",
    wordCount: 12,
  },
  {
    id: "health",
    title: "Health & Wellness",
    description: "Medical and health-related vocabulary",
    wordCount: 12,
  },
];

export default function B1TopicsPage() {
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
            <h1 className="text-xl font-bold">B1 Flashcard Topics</h1>
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
            {B1_TOPICS.map((topic) => (
              <Link
                key={topic.id}
                href={`/flashcards/b1/${topic.id}`}
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
