"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Play, Lock, CheckCircle, Star } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

// --- DỮ LIỆU GIẢ ---
const coursesData: Record<string, any[]> = {
  A1: [
    { id: 1, title: "Unit 1: Greetings & Introductions", desc: "Chào hỏi, giới thiệu bản thân cơ bản.", status: "active" },
    { id: 2, title: "Unit 2: Numbers & Money", desc: "Số đếm, giá tiền và mua sắm.", status: "active" },
    { id: 3, title: "Unit 3: Family & Friends", desc: "Từ vựng về gia đình và mô tả người.", status: "active" },
    { id: 4, title: "Unit 4: Food & Drinks", desc: "Đặt món ăn, từ vựng đồ uống.", status: "active" },
  ],
  A2: [
    { id: 1, title: "Unit 1: Daily Routine", desc: "Thói quen hàng ngày, giờ giấc.", status: "active" },
    { id: 2, title: "Unit 2: Travel & Transport", desc: "Du lịch, hỏi đường, phương tiện.", status: "active" },
  ],
  DEFAULT: [
    { id: 1, title: "Unit 1: Coming Soon", desc: "Nội dung đang được biên soạn.", status: "active" },
  ]
};

export default function LessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [lessonId, setLessonId] = React.useState<string>("DEFAULT");
  const [topics, setTopics] = React.useState<any[]>([]);
  const [progress, setProgress] = React.useState(0);

  // Xử lý Params
  React.useEffect(() => {
    params.then((resolved) => {
      const id = resolved.id.toUpperCase();
      setLessonId(id);
      const data = coursesData[id] || coursesData["DEFAULT"];
      setTopics(data);

      const total = data.length;
      const completed = data.filter((t: any) => t.status === 'done').length;
      setProgress(total === 0 ? 0 : Math.round((completed / total) * 100));
    });
  }, [params]);

  return (
    // Sử dụng bg-background để nhận màu xám xanh dịu từ globals.css
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">

        {/* --- THANH ĐIỀU HƯỚNG & NÚT TOGGLE (ĐÃ NÂNG CẤP) --- */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/home"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition group font-bold"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition" />
            Quay lại Dashboard
          </Link>

          {/* 🔥 UPDATE: Đóng khung khu vực Toggle nhìn chuyên nghiệp hơn */}
          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-1.5 pl-4 rounded-full shadow-sm">
            <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Chế độ
            </span>
            <ThemeToggle />
          </div>
        </div>

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-8">
          <div>
            {/* 🔥 UPDATE: Level Badge nổi bật (Xanh đậm + Bóng đổ + Sao vàng) */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-extrabold text-sm mb-4 transform hover:scale-105 transition-all cursor-default">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              LEVEL {lessonId}
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
              Lộ trình học tập
            </h1>

            <p className="text-muted-foreground mt-2 text-lg">
              Hoàn thành các bài học bên dưới để mở khóa cấp độ tiếp theo.
            </p>
          </div>

          {/* Card Tiến độ */}
          <div className="bg-card p-4 rounded-2xl min-w-[200px] shadow-sm">
            <div className="flex justify-between text-sm mb-2 font-medium">
              <span className="text-muted-foreground">Tiến độ</span>
              <span className="text-primary">{progress}%</span>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* --- DANH SÁCH BÀI HỌC --- */}
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
                  {topic.title}
                </h3>
                <p className="text-sm mt-1 line-clamp-1 text-muted-foreground">
                  {topic.desc}
                </p>
              </div>

              {/* Button */}
              <div className="hidden sm:block">
                {topic.status === 'active' ? (
                  <Link
                    href={`/learn/${lessonId.toLowerCase()}/${topic.id}`}
                    className="inline-block px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold transition shadow-lg shadow-blue-600/20 whitespace-nowrap"
                  >
                    Học ngay
                  </Link>
                ) : topic.status === 'done' ? (
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400 px-4 whitespace-nowrap">Đã xong</span>
                ) : (
                  <span className="text-xs font-medium text-muted-foreground bg-secondary px-3 py-1.5 rounded-md whitespace-nowrap">Khóa</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}