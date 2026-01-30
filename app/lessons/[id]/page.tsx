import React from "react";
import Link from "next/link";
import { ChevronLeft, Play, Lock, CheckCircle, Star } from "lucide-react";

// --- 1. DỮ LIỆU GIẢ (MOCK DATA) ---
const coursesData: Record<string, any[]> = {
  "PRE-A1": [
    { id: 1, title: "Unit 1: Luyện Phát Âm Cơ Bản", desc: "Luyện tập phát âm với các câu đơn giản.", status: "active", href: "/pronunciation" },
    { id: 2, title: "Unit 2: Bảng Chữ Cái & Âm", desc: "Học phát âm từng chữ cái tiếng Anh.", status: "active" },
    { id: 3, title: "Unit 3: Số Đếm 1-20", desc: "Đếm số và nói số bằng tiếng Anh.", status: "active" },
    { id: 4, title: "Unit 4: Màu Sắc", desc: "Học từ vựng về màu sắc.", status: "active" },
    { id: 5, title: "Unit 5: Chào Hỏi Đơn Giản", desc: "Hello, Hi, Goodbye, Thank you.", status: "active" },
  ],
  A1: [
    { id: 1, title: "Unit 1: Greetings & Introductions", desc: "Chào hỏi, giới thiệu bản thân cơ bản.", status: "active" }, // Đang học
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

export default async function LessonDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params;
  const lessonId = resolvedParams.id.toUpperCase();

  const topics = coursesData[lessonId] || coursesData["DEFAULT"];

  // Tính toán tiến độ
  const totalTopics = topics.length;
  const completedTopics = topics.filter(t => t.status === 'done').length;
  const progress = totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100);

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Nút Quay lại */}
        <Link
          href="/home"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-8 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition" />
          Quay lại Dashboard
        </Link>

        {/* --- HEADER SECTION (Tiêu đề + Progress Bar) --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-white/10 pb-8">

          {/* Cột trái: Thông tin Level */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30 text-sm mb-3">
              <Star size={14} className="fill-blue-300" /> Level {lessonId}
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Lộ trình học tập
            </h1>
            <p className="text-slate-400 mt-2 text-lg">
              Hoàn thành các bài học bên dưới để mở khóa cấp độ tiếp theo.
            </p>
          </div>

          {/* Cột phải: Progress Bar */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 min-w-[200px] w-full md:w-auto">
            <div className="flex justify-between text-sm mb-2 font-medium">
              <span className="text-slate-300">Tiến độ</span>
              <span className="text-blue-400">{progress}%</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        {/* --- DANH SÁCH BÀI HỌC (TOPICS LIST) --- */}
        <div className="space-y-4">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className={`
                group relative flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300
                ${topic.status === 'locked'
                  ? 'bg-slate-900/40 border-white/5 opacity-70 cursor-not-allowed'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-500/30 hover:shadow-lg cursor-pointer'
                }
              `}
            >
              {/* Icon trạng thái */}
              <div className={`
                shrink-0 size-12 rounded-full grid place-items-center border
                ${topic.status === 'done' ? 'bg-green-500/20 border-green-500/50 text-green-400' : ''}
                ${topic.status === 'active' ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : ''}
                ${topic.status === 'locked' ? 'bg-slate-800 border-white/10 text-slate-500' : ''}
              `}>
                {topic.status === 'done' && <CheckCircle size={24} className="fill-green-500/20" />}
                {topic.status === 'active' && <Play size={24} className="ml-1 fill-white" />}
                {topic.status === 'locked' && <Lock size={20} />}
              </div>

              {/* Nội dung text */}
              <div className="flex-1">
                <h3 className={`text-lg font-bold ${topic.status === 'active' ? 'text-white' : 'text-slate-200'}`}>
                  {topic.title}
                </h3>
                <p className="text-sm text-slate-400 mt-1 line-clamp-1">
                  {topic.desc}
                </p>
              </div>

              {/* Nút hành động */}
              <div className="hidden sm:block">
                {topic.status === 'active' ? (
                  <Link
                    href={topic.href || `/learn/${lessonId.toLowerCase()}/${topic.id}`}
                    className="inline-block px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition shadow-lg shadow-blue-900/20"
                  >
                    Học ngay
                  </Link>
                ) : topic.status === 'done' ? (
                  <span className="text-sm font-semibold text-green-400 px-4">Đã xong</span>
                ) : (
                  <span className="text-xs font-medium text-slate-600 bg-slate-800 px-3 py-1.5 rounded-md border border-white/5">Khóa</span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}