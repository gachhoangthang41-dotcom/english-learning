"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, FileText, Puzzle, Loader2, PlayCircle, Mic } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LearnPage() {
  const params = useParams(); // Lấy ID từ URL
  const router = useRouter();

  // --- 1. CONFIG GIẢ LẬP (MOCK DATA) ---
  // ID video YouTube (Bạn có thể thay đổi tùy bài học sau này)
  const VIDEO_ID = "t205A51S07A";
  const MOCK_TRANSCRIPT = `Hello everyone! My name is Anna. I come from New York. Today, I want to talk about my daily routine. I usually wake up at 7:00 AM. Then I have breakfast with coffee and toast.`;
  const MOCK_EXERCISE = `Hello everyone! My name ___ Anna. I come ___ New York. Today, I want to talk ___ my daily routine.`;

  // --- 2. STATES ---
  const [transcript, setTranscript] = useState<string | null>(null);
  const [exercise, setExercise] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState<"transcript" | "exercise" | "complete" | null>(null);

  // --- FLASHCARD SAVING STATE ---
  const [selectedWord, setSelectedWord] = useState<{ word: string; x: number; y: number } | null>(null);
  const [savingWord, setSavingWord] = useState(false);
  const [wordSaved, setWordSaved] = useState(false);

  // --- 3. ACTIONS ---

  const handleWordSelection = (e: React.MouseEvent<HTMLDivElement>) => {
    // 1. Check if user selected text
    const selection = window.getSelection();
    let text = selection?.toString() || "";

    // 2. If no text is selected, check if user just clicked on a word
    if (!text && e.target instanceof HTMLElement && e.target.tagName === 'SPAN') {
        text = e.target.textContent || "";
    }

    // 3. Clean the text: remove leading/trailing punctuation but keep internal spaces/hyphens
    const cleaned = text.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "").trim();
    if (!cleaned) {
        if (!selection?.toString()) {
             // Only clear selected word if they clicked empty space
            setSelectedWord(null);
        }
        return;
    }

    const container = e.currentTarget;
    const containerRect = container.getBoundingClientRect();

    let rect = null;

    if (selection && selection.rangeCount > 0 && selection.toString().trim() !== "") {
        const range = selection.getRangeAt(0);
        rect = range.getBoundingClientRect();
    } else if (e.target instanceof HTMLElement && e.target.tagName === 'SPAN') {
        rect = e.target.getBoundingClientRect();
    }

    if (!rect || rect.width === 0) return;

    let leftPos = rect.left - containerRect.left;
    if (leftPos > containerRect.width - 200) {
      leftPos = containerRect.width - 200;
    }

    setSelectedWord({
      word: cleaned,
      x: leftPos,
      y: rect.bottom - containerRect.top
    });
    setWordSaved(false);
  };

  const handleSaveWord = async () => {
    if (!selectedWord) return;
    setSavingWord(true);
    try {
      const res = await fetch("/api/dictionary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: selectedWord.word })
      });
      if (res.ok) setWordSaved(true);
    } catch {
      // alert err
    } finally {
      setSavingWord(false);
    }
  };

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

  // Hàm "Hoàn thành bài học" (Giả lập việc học xong bài tập và lưu lại 15 phút)
  const [completeMsg, setCompleteMsg] = useState("");
  const handleCompleteLesson = async () => {
    setLoadingAction("complete");
    setCompleteMsg("");

    try {
      // Gọi API mới tạo để lưu thời gian học. Gửi tạm thời gian là 15 phút.
      const res = await fetch("/api/learning/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          levelId: params.levelId,
          topicId: params.topicId,
          timeSpentMin: 15
        })
      });

      const data = await res.json();
      if (res.ok) {
        setCompleteMsg("🎉 Đã lưu tiến trình học (15 phút) thành công!");
      } else {
        setCompleteMsg(`❌ Lỗi: ${data.message}`);
      }
    } catch (e) {
      setCompleteMsg("❌ Lỗi: Không thể kết nối đến máy chủ.");
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* --- HEADER --- */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/70 text-muted-foreground hover:text-foreground transition"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <div className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Unit {params.topicId}</div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">Introducing Myself</h1>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center gap-3 bg-card p-1.5 pl-4 rounded-full shadow-sm border border-border">
            <span className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider">
              Chế độ
            </span>
            <ThemeToggle />
          </div>
        </div>

        {/* --- VIDEO PLAYER SECTION --- */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
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
          <div className="p-4 md:p-6 flex flex-wrap gap-4 border-t border-border bg-secondary/50 dark:bg-[#0b1220]">

            {/* Nút Lấy Transcript */}
            <button
              onClick={handleGetTranscript}
              disabled={loadingAction === "transcript"}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary dark:bg-slate-800 hover:bg-secondary/70 dark:hover:bg-slate-700 text-foreground font-semibold border border-border transition disabled:opacity-50"
            >
              {loadingAction === "transcript" ? <Loader2 size={18} className="animate-spin" /> : <FileText size={18} />}
              Lấy Transcript
            </button>

            {/* Nút Đi tới Dictation */}
            <Link
              href={`/learn/${params.levelId}/${params.topicId}/dictation`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition shadow-lg shadow-purple-500/20"
            >
              <Mic size={18} />
              Luyện Dictation & Shadowing
            </Link>

            {/* Nút Hoàn thành => Lưu DB */}
            <button
              onClick={handleCompleteLesson}
              disabled={loadingAction === "complete"}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition disabled:opacity-50 shadow-lg shadow-blue-500/20 ml-auto"
            >
              {loadingAction === "complete" ? <Loader2 size={18} className="animate-spin" /> : <PlayCircle size={18} />}
              Lưu & Hoàn thành (15 phút)
            </button>

            {completeMsg && (
              <div className="w-full mt-2 text-sm font-semibold text-green-600 dark:text-green-400">
                {completeMsg}
              </div>
            )}
          </div>
        </div>

        {/* --- OUTPUT SECTIONS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card: Transcript */}
          <div className="bg-card border border-border rounded-2xl p-6 h-full flex flex-col">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <FileText size={20} className="text-blue-600 dark:text-blue-400" /> Transcript
            </h3>
            <div 
              className="flex-1 bg-secondary/50 dark:bg-black/20 rounded-xl p-4 text-foreground leading-relaxed text-sm md:text-base border border-border transcript-container relative"
              onMouseUp={handleWordSelection}
            >
              {transcript ? (
                <>
                  <p>
                    {transcript.split(" ").map((word, i) => (
                      <span
                        key={i}
                        className="cursor-pointer hover:bg-blue-500/20 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 rounded px-0.5 transition"
                      >
                        {word}{" "}
                      </span>
                    ))}
                  </p>

                  {/* Popover cho từ vựng */}
                  {selectedWord && (
                    <div
                      className="absolute z-20 bg-card border border-border shadow-xl rounded-xl p-3 w-48 animate-in fade-in zoom-in-95"
                      style={{ top: selectedWord.y + 10, left: selectedWord.x }}
                    >
                      <div className="flex justify-between items-center mb-3 border-b border-border/50 pb-2">
                        <span className="font-bold text-lg text-blue-600 dark:text-blue-400">{selectedWord.word}</span>
                        <button onClick={() => setSelectedWord(null)} className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-secondary">✕</button>
                      </div>
                      <button
                        onClick={handleSaveWord}
                        disabled={savingWord || wordSaved}
                        className={`w-full py-2.5 rounded-lg text-sm font-bold transition shadow-sm
                          ${wordSaved ? 'bg-green-600/10 text-green-600 dark:text-green-400 pointer-events-none' : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/20'}`}
                      >
                        {savingWord ? (
                          <span className="flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Đang lưu...</span>
                        ) : wordSaved ? (
                          "Đã lưu ✓"
                        ) : (
                          "Lưu vào thẻ ghi nhớ"
                        )}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-muted-foreground italic">Chưa có transcript. Hãy bấm nút phía trên.</p>
              )}
            </div>
          </div>

          {/* Card: Bài tập */}
          <div className="bg-card border border-border rounded-2xl p-6 h-full flex flex-col">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Puzzle size={20} className="text-orange-600 dark:text-orange-400" /> Bài tập điền từ
            </h3>
            <div className="flex-1 bg-secondary/50 dark:bg-black/20 rounded-xl p-4 text-foreground leading-relaxed text-sm md:text-base border border-border">
              {exercise ? (
                <p className="font-mono">{exercise}</p>
              ) : (
                <p className="text-muted-foreground italic">Chưa tạo bài tập. Hãy bấm nút phía trên.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}