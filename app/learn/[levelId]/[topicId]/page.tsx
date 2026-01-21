"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, FileText, Puzzle, Loader2, PlayCircle } from "lucide-react";
import { useParams } from "next/navigation";

export default function LearnPage() {
  const params = useParams(); // Lấy ID từ URL

  // --- 1. CONFIG GIẢ LẬP (MOCK DATA) ---
  // ID video YouTube (Bạn có thể thay đổi tùy bài học sau này)
  const VIDEO_ID = "t205A51S07A"; 
  const MOCK_TRANSCRIPT = `Hello everyone! My name is Anna. I come from New York. Today, I want to talk about my daily routine. I usually wake up at 7:00 AM. Then I have breakfast with coffee and toast.`;
  const MOCK_EXERCISE = `Hello everyone! My name ___ Anna. I come ___ New York. Today, I want to talk ___ my daily routine.`;

  // --- 2. STATES ---
  const [transcript, setTranscript] = useState<string | null>(null);
  const [exercise, setExercise] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState<"transcript" | "exercise" | null>(null);

  // --- 3. ACTIONS ---
  
  // Hàm giả lập lấy Transcript (chờ 1 giây)
  const handleGetTranscript = () => {
    setLoadingAction("transcript");
    setTimeout(() => {
      setTranscript(MOCK_TRANSCRIPT);
      setLoadingAction(null);
    }, 1000);
  };

  // Hàm giả lập tạo bài tập (chờ 1.5 giây)
  const handleCreateExercise = () => {
    setLoadingAction("exercise");
    setTimeout(() => {
      setExercise(MOCK_EXERCISE);
      setLoadingAction(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* --- HEADER --- */}
        <div className="flex items-center gap-4 mb-6">
          <Link 
            href={`/lessons/${params.levelId}`} 
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
          >
            <ChevronLeft size={24} />
          </Link>
          <div>
            <div className="text-sm font-bold text-blue-400 uppercase tracking-wider">Unit {params.topicId}</div>
            <h1 className="text-xl md:text-2xl font-bold text-white">Introducing Myself</h1>
          </div>
        </div>

        {/* --- VIDEO PLAYER SECTION --- */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="aspect-video w-full relative bg-black">
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/${VIDEO_ID}`} 
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="absolute inset-0"
            />
          </div>
          
          {/* CONTROL BUTTONS */}
          <div className="p-4 md:p-6 flex flex-wrap gap-4 border-t border-white/10 bg-[#0b1220]">
            
            {/* Nút Lấy Transcript */}
            <button 
              onClick={handleGetTranscript}
              disabled={loadingAction === "transcript"}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-white/10 transition disabled:opacity-50"
            >
              {loadingAction === "transcript" ? <Loader2 size={18} className="animate-spin" /> : <FileText size={18} />}
              Lấy Transcript
            
            </button>
          </div>
        </div>

        {/* --- OUTPUT SECTIONS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card: Transcript */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full flex flex-col">
            <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
              <FileText size={20} className="text-blue-400" /> Transcript
            </h3>
            <div className="flex-1 bg-black/20 rounded-xl p-4 text-slate-300 leading-relaxed text-sm md:text-base border border-white/5">
              {transcript ? (
                <p>{transcript}</p>
              ) : (
                <p className="text-slate-500 italic">Chưa có transcript. Hãy bấm nút phía trên.</p>
              )}
            </div>
          </div>

          {/* Card: Bài tập */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full flex flex-col">
            <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
              <Puzzle size={20} className="text-orange-400" /> Bài tập điền từ
            </h3>
            <div className="flex-1 bg-black/20 rounded-xl p-4 text-slate-300 leading-relaxed text-sm md:text-base border border-white/5">
              {exercise ? (
                <p className="font-mono">{exercise}</p>
              ) : (
                <p className="text-slate-500 italic">Chưa tạo bài tập. Hãy bấm nút phía trên.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}