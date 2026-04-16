"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Play, Lock, CheckCircle, Star } from "lucide-react";
import { ThemeToggle } from '@/views/components/theme-toggle';
import { useLanguage } from '@/views/components/language-provider';

type TopicStatus = "active" | "done" | "locked";

type CourseTopic = {
  id: number;
  title: {
    vi: string;
    en: string;
  };
  desc: {
    vi: string;
    en: string;
  };
  status: TopicStatus;
};

const coursesData: Record<string, CourseTopic[]> = {
  A1: [
    { id: 1, title: { vi: "Unit 1: Giới thiệu bản thân", en: "Unit 1: Introducing Myself" }, desc: { vi: "Chào hỏi, giới thiệu bản thân cơ bản.", en: "Basic greetings and self-introductions." }, status: "active" },
    { id: 2, title: { vi: "Unit 2: Gia đình của tôi", en: "Unit 2: My Family" }, desc: { vi: "Từ vựng về gia đình và mô tả người.", en: "Family vocabulary and describing people." }, status: "active" },
    { id: 3, title: { vi: "Unit 3: Thói quen hàng ngày", en: "Unit 3: My Daily Routine" }, desc: { vi: "Đời sống hằng ngày.", en: "Everyday routines and daily life." }, status: "active" },
  ],
  IPA: [
    { id: 1, title: { vi: "Unit 1: Nền tảng IPA & Nguyên âm", en: "Unit 1: IPA Basics & Vowel Map" }, desc: { vi: "Làm quen bảng IPA, nguyên âm ngắn và nguyên âm dài.", en: "Learn the IPA chart, short vowels, and long vowels." }, status: "active" },
    { id: 2, title: { vi: "Unit 2: Âm đôi & Âm lướt", en: "Unit 2: Diphthongs & Glides" }, desc: { vi: "Nắm các âm đôi quan trọng như /eɪ/, /aɪ/, /əʊ/, /aʊ/.", en: "Master core diphthongs such as /eɪ/, /aɪ/, /əʊ/, and /aʊ/." }, status: "active" },
    { id: 3, title: { vi: "Unit 3: Phụ âm & Cặp âm tối thiểu", en: "Unit 3: Consonants & Minimal Pairs" }, desc: { vi: "Luyện cặp phụ âm dễ nhầm và phụ âm cuối.", en: "Practice confusing consonant pairs and final consonants." }, status: "active" },
    { id: 4, title: { vi: "Unit 4: Trọng âm, Âm schwa & Nhịp điệu", en: "Unit 4: Stress, Schwa & Rhythm" }, desc: { vi: "Học trọng âm từ, schwa và nhịp đọc tự nhiên.", en: "Study word stress, schwa, and natural English rhythm." }, status: "active" },
  ],
  A2: [
    { id: 1, title: { vi: "Unit 1: Thói quen hàng ngày", en: "Unit 1: Daily Routine" }, desc: { vi: "Thói quen hàng ngày, giờ giấc.", en: "Daily habits, schedules, and time expressions." }, status: "active" },
    { id: 2, title: { vi: "Unit 2: Du lịch & Di chuyển", en: "Unit 2: Travel & Transport" }, desc: { vi: "Du lịch, hỏi đường, phương tiện.", en: "Travel, directions, and transportation." }, status: "active" },
  ],
  DEFAULT: [
    { id: 1, title: { vi: "Unit 1: Sắp ra mắt", en: "Unit 1: Coming Soon" }, desc: { vi: "Nội dung đang được biên soạn.", en: "Content is being prepared." }, status: "active" },
  ]
};

export default function LessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const [lessonId, setLessonId] = React.useState<string>("DEFAULT");
  const [topics, setTopics] = React.useState<CourseTopic[]>([]);
  const [progress, setProgress] = React.useState(0);
  const isIpaCourse = lessonId === "IPA";
  const copy = isEnglish
    ? {
        backToDashboard: "Back to Dashboard",
        roadmapTitle: isIpaCourse ? "IPA learning roadmap" : "Learning roadmap",
        roadmapDesc: isIpaCourse
          ? "Move through the units below to understand symbols, sounds, and natural English rhythm."
          : "Complete the lessons below to unlock the next level.",
        progress: "Progress",
        startNow: "Start now",
        completed: "Completed",
        locked: "Locked",
        levelTag: isIpaCourse ? "IPA FOUNDATION" : `LEVEL ${lessonId}`,
      }
    : {
        backToDashboard: "Quay lại Dashboard",
        roadmapTitle: isIpaCourse ? "Lộ trình học IPA" : "Lộ trình học tập",
        roadmapDesc: isIpaCourse
          ? "Đi qua từng unit bên dưới để nắm ký hiệu, âm và nhịp đọc tự nhiên trong tiếng Anh."
          : "Hoàn thành các bài học bên dưới để mở khóa cấp độ tiếp theo.",
        progress: "Tiến độ",
        startNow: "Học ngay",
        completed: "Đã xong",
        locked: "Khóa",
        levelTag: isIpaCourse ? "NỀN TẢNG IPA" : `LEVEL ${lessonId}`,
      };

  React.useEffect(() => {
    params.then((resolved) => {
      const id = resolved.id.toUpperCase();
      setLessonId(id);
      const data = coursesData[id] || coursesData["DEFAULT"];
      setTopics(data);

      const total = data.length;
      const completed = data.filter((t) => t.status === "done").length;
      setProgress(total === 0 ? 0 : Math.round((completed / total) * 100));
    });
  }, [params]);

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <Link
            href="/home"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition group font-bold"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition" />
            {copy.backToDashboard}
          </Link>

          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-1.5 pl-4 rounded-full shadow-sm">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-extrabold text-sm mb-4 transform hover:scale-105 transition-all cursor-default">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              {copy.levelTag}
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
              {copy.roadmapTitle}
            </h1>

            <p className="text-muted-foreground mt-2 text-lg">
              {copy.roadmapDesc}
            </p>
          </div>

          <div className="bg-card p-4 rounded-2xl min-w-[200px] shadow-sm">
            <div className="flex justify-between text-sm mb-2 font-medium">
              <span className="text-muted-foreground">{copy.progress}</span>
              <span className="text-green-600 dark:text-green-400 font-bold">{progress}%</span>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-500 ease-out shadow-sm shadow-green-500/30"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className={`
                group relative flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 shadow-sm
                ${topic.status === 'locked'
                  ? 'bg-secondary/50 text-muted-foreground cursor-not-allowed opacity-80'
                  : 'bg-card hover:shadow-md cursor-pointer'
                }
              `}
            >
              {/* Icon */}
              <div className={`
                shrink-0 size-12 rounded-full grid place-items-center transition-colors
                ${topic.status === 'done' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : ''}
                ${topic.status === 'active' ? 'bg-primary text-primary-foreground shadow-lg shadow-blue-500/30' : ''}
                ${topic.status === 'locked' ? 'bg-secondary text-muted-foreground' : ''}
              `}>
                {topic.status === 'done' && <CheckCircle size={24} />}
                {topic.status === 'active' && <Play size={24} className="ml-1 fill-white" />}
                {topic.status === 'locked' && <Lock size={20} />}
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="text-lg font-bold transition-colors text-foreground">
                  {topic.title[language as keyof typeof topic.title]}
                </h3>
                <p className="text-sm mt-1 line-clamp-1 text-muted-foreground">
                  {topic.desc[language as keyof typeof topic.desc]}
                </p>
              </div>

              <div className="hidden sm:block">
                {topic.status === 'active' ? (
                  <Link
                    href={`/learn/${lessonId.toLowerCase()}/${topic.id}`}
                    className="inline-block px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold transition shadow-lg shadow-blue-600/20 whitespace-nowrap"
                  >
                    {copy.startNow}
                  </Link>
                ) : topic.status === 'done' ? (
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400 px-4 whitespace-nowrap">{copy.completed}</span>
                ) : (
                  <span className="text-xs font-medium text-muted-foreground bg-secondary px-3 py-1.5 rounded-md whitespace-nowrap">{copy.locked}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}