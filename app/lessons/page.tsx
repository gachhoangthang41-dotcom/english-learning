"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useLanguage } from '@/views/components/language-provider';

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function AllLessonsPage() {
  const { t } = useLanguage();
  const lessons = [
    { level: "IPA", title: t("ipaLessonTitle"), desc: t("ipaLessonDesc"), gradient: "bg-gradient-to-br from-[#0f766e] via-[#0f5257] to-[#111827]" },
    { level: "A1", title: t("a1LessonTitle"), desc: t("a1LessonDesc"), gradient: "bg-gradient-to-br from-[#1e3a8a] to-[#0f172a]", bgImage: "/images/a1-bg.jpg" },
    { level: "A2", title: t("a2LessonTitle"), desc: t("a2LessonDesc"), gradient: "bg-gradient-to-br from-[#334155] to-[#0f172a]", bgImage: "/images/a2-bg.png" },
    { level: "B1", title: t("b1LessonTitle"), desc: t("b1LessonDesc"), gradient: "bg-gradient-to-br from-[#1f2937] to-[#030712]", bgImage: "/images/b1-bg.png" },
    { level: "B2", title: t("b2LessonTitle"), desc: t("b2LessonDesc"), gradient: "bg-gradient-to-br from-[#3730a3] to-[#0f172a]", bgImage: "/images/b2-bg.png" },
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
            {t("allLessons")}
          </h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <Link
              key={lesson.level}
              href={`/lessons/${lesson.level.toLowerCase()}`}
              className={cx(
                "relative overflow-hidden rounded-2xl p-6",
                "flex flex-col justify-between",
                "h-[220px]",
                "cursor-pointer transition-all duration-300",
                "hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-900/20",
                "border border-white/10",
                lesson.gradient
              )}
              style={
                lesson.bgImage
                  ? {
                      backgroundImage: `url(${lesson.bgImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : undefined
              }
            >
              {lesson.bgImage && (
                <div className="absolute inset-0 bg-black/40" />
              )}

              <div className="flex justify-between items-start z-10">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
                  <span className="text-sm font-bold text-white">
                    {lesson.level}
                  </span>
                </div>
              </div>

              <div className="mt-auto z-10">
                <h3 className="text-xl font-bold text-white mb-2 tracking-wide">
                  {lesson.title}
                </h3>
                <p className="text-sm text-gray-300/80 font-medium line-clamp-2 leading-relaxed">
                  {lesson.desc}
                </p>
              </div>

              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-black/20 rounded-full blur-2xl pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
