import React from 'react';
import Link from 'next/link'; // Đừng quên import Link

interface LessonCardProps {
  level: string;
  time: string;
  title: string;
  desc: string;
  gradient: string;
}

const LessonCard: React.FC<LessonCardProps> = ({
  level,
  time,
  title,
  desc,
  gradient,
}) => {
  return (
    <Link
      href="#"
      className={`
        relative overflow-hidden rounded-2xl p-6 
        flex flex-col justify-between shrink-0
        h-[220px] w-[280px] sm:w-[320px]
        cursor-pointer transition-all duration-300 
        hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-900/20
        border border-white/10
        ${gradient}
      `}
    >
      {/* Phần trên: Badge Level và Thời gian */}
      <div className="flex justify-between items-start z-10">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
          <span className="text-sm font-bold text-white">{level}</span>
        </div>
        <span className="text-xs font-medium text-gray-300 bg-black/20 px-2 py-1 rounded-md backdrop-blur-sm">
          {time}
        </span>
      </div>

      {/* Phần dưới: Tiêu đề và Mô tả */}
      <div className="mt-auto z-10">
        <h3 className="text-xl font-bold text-white mb-2 tracking-wide">
          {title}
        </h3>
        <p className="text-sm text-gray-400 font-medium line-clamp-2 leading-relaxed">
          {desc}
        </p>
      </div>

      {/* Hiệu ứng trang trí */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-black/20 rounded-full blur-2xl pointer-events-none"></div>
    </Link>
  );
};

// --- QUAN TRỌNG: Dòng này giúp file khác import được ---
export default LessonCard;