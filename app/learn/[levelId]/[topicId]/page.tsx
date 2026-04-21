"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, FileText, Loader2, PlayCircle, Mic, BookOpen, CheckCircle2, Sparkles, Volume2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ThemeToggle } from '@/views/components/theme-toggle';
import { useLanguage } from '@/views/components/language-provider';
import { LESSONS_BY_LEVEL } from '@/models/data/a1-lessons';
import { IPA_LESSONS, type IpaLesson } from '@/models/data/ipa-lessons';

function IpaLessonView({
  lesson,
  topicId,
  isEnglish,
  loadingAction,
  completeMsg,
  onBack,
  onComplete,
}: {
  lesson: IpaLesson;
  topicId: string;
  isEnglish: boolean;
  loadingAction: "transcript" | "complete" | null;
  completeMsg: string;
  onBack: () => void;
  onComplete: () => void;
}) {
  const locale = isEnglish ? "en" : "vi";
  const copy = isEnglish
    ? {
        courseLabel: `IPA UNIT ${topicId}`,
        lessonFocus: "What you will lock in",
        symbolSection: "Sound bank",
        quickTips: "Quick coaching tips",
        practiceDeck: "Practice deck",
        saveAndComplete: "Mark lesson complete",
        completionHint: "Use this screen as a pronunciation reference while you study new words.",
        word: "Word",
        note: "How to say it",
      }
    : {
        courseLabel: `IPA UNIT ${topicId}`,
        lessonFocus: "Mục tiêu cần nắm",
        symbolSection: "Kho âm cần nhớ",
        quickTips: "Mẹo luyện nhanh",
        practiceDeck: "Bộ từ luyện tập",
        saveAndComplete: "Đánh dấu hoàn thành",
        completionHint: "Hãy dùng màn hình này như bảng tham chiếu phát âm khi học từ mới.",
        word: "Từ",
        note: "Cách đọc",
      };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/70 text-muted-foreground hover:text-foreground transition"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <div className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-[0.24em]">{copy.courseLabel}</div>
              <h1 className="text-xl md:text-3xl font-black tracking-tight text-foreground">{lesson.title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-card p-1.5 pl-4 rounded-full shadow-sm border border-border">
            <ThemeToggle />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.45fr_0.95fr]">
          <section className="rounded-3xl border border-teal-500/20 bg-linear-to-br from-teal-500/18 via-cyan-500/10 to-background p-6 shadow-2xl shadow-cyan-950/10">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/12 px-4 py-2 text-sm font-bold text-teal-700 dark:text-teal-300">
              <Sparkles size={16} />
              {lesson.subtitle[locale]}
            </div>

            <p className="mt-5 max-w-3xl text-sm md:text-base leading-7 text-foreground/85">
              {lesson.intro[locale]}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {lesson.goals.map((goal) => (
                <div key={goal.en} className="rounded-2xl border border-white/10 bg-card/70 p-4 shadow-sm backdrop-blur-sm">
                  <div className="mb-3 inline-flex size-9 items-center justify-center rounded-full bg-teal-500/12 text-teal-600 dark:text-teal-300">
                    <BookOpen size={18} />
                  </div>
                  <p className="text-sm leading-6 text-foreground/90">{goal[locale]}</p>
                </div>
              ))}
            </div>
          </section>

          <aside className="rounded-3xl border border-border bg-card p-6 shadow-xl">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-teal-600 dark:text-teal-400" />
              {copy.lessonFocus}
            </h2>

            <div className="space-y-3">
              {lesson.recap.map((item) => (
                <div key={item.en} className="rounded-2xl border border-border/70 bg-secondary/40 px-4 py-3 text-sm leading-6 text-foreground/85">
                  {item[locale]}
                </div>
              ))}
            </div>

            <p className="mt-5 text-sm leading-6 text-muted-foreground">{copy.completionHint}</p>

            <button
              onClick={onComplete}
              disabled={loadingAction === "complete"}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-500 disabled:opacity-60 shadow-lg shadow-teal-700/20"
            >
              {loadingAction === "complete" ? <Loader2 size={18} className="animate-spin" /> : <PlayCircle size={18} />}
              {copy.saveAndComplete}
            </button>

            {completeMsg ? (
              <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                {completeMsg}
              </div>
            ) : null}
          </aside>
        </div>

        <div className="space-y-6">
          {lesson.sections.map((section) => (
            <section key={section.title.en} className="rounded-3xl border border-border bg-card p-6 shadow-xl">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-teal-600 dark:text-teal-400">{copy.symbolSection}</div>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground">{section.title[locale]}</h2>
                </div>
                <Volume2 size={20} className="mt-1 text-muted-foreground" />
              </div>

              <p className="mb-5 max-w-3xl text-sm md:text-base leading-7 text-muted-foreground">
                {section.intro[locale]}
              </p>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {section.cards.map((card) => (
                  <article key={`${section.title.en}-${card.symbol}-${card.word}`} className="rounded-2xl border border-border bg-secondary/35 p-5 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-3xl font-black tracking-tight text-foreground">{card.symbol}</div>
                      <div className="rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs font-bold text-teal-700 dark:text-teal-300">
                        {card.ipa}
                      </div>
                    </div>

                    <div className="mt-4 text-lg font-bold text-foreground">{card.word}</div>
                    <p className="mt-2 text-sm leading-6 text-foreground/85">{card.sound[locale]}</p>
                    <p className="mt-4 rounded-2xl border border-border/80 bg-background/70 px-4 py-3 text-sm leading-6 text-muted-foreground">
                      {card.tip[locale]}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-3xl border border-border bg-card p-6 shadow-xl">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-teal-600 dark:text-teal-400" />
              {copy.quickTips}
            </h2>

            <div className="space-y-3">
              {lesson.quickTips.map((tip, index) => (
                <div key={tip.en} className="rounded-2xl border border-border/70 bg-secondary/35 px-4 py-3 text-sm leading-6 text-foreground/85">
                  <span className="mr-2 font-bold text-teal-600 dark:text-teal-400">0{index + 1}</span>
                  {tip[locale]}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-card p-6 shadow-xl">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <BookOpen size={18} className="text-teal-600 dark:text-teal-400" />
              {copy.practiceDeck}
            </h2>

            <div className="overflow-hidden rounded-2xl border border-border">
              <div className="grid grid-cols-[1fr_auto] gap-4 bg-secondary/60 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                <span>{copy.word}</span>
                <span>{copy.note}</span>
              </div>

              <div className="divide-y divide-border/80">
                {lesson.practiceWords.map((item) => (
                  <div key={`${item.word}-${item.ipa}`} className="grid grid-cols-[1fr_auto] gap-4 px-4 py-4 items-start">
                    <div>
                      <div className="text-base font-bold text-foreground">{item.word}</div>
                      <div className="mt-1 text-sm font-semibold text-teal-700 dark:text-teal-300">{item.ipa}</div>
                    </div>
                    <div className="max-w-xs text-right text-sm leading-6 text-muted-foreground">{item.note[locale]}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function LearnPage() {
  const params = useParams(); // Lấy ID từ URL
  const router = useRouter();
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const copy = isEnglish
    ? {
        seconds: "sec",
        minutes: "min",
        noVideoContent: "No content is available for this video yet.",
        progressSaved: "Progress saved successfully",
        progressSaveError: "Unable to save your progress.",
        serverError: "Unable to connect to the server.",
        getTranscript: "Get transcript",
        practice: "Practice Dictation & Shadowing",
        saveAndComplete: "Save & Complete",
        transcriptEmpty: "No transcript yet. Click the button above.",
        saveToFlashcards: "Save to flashcards",
        saving: "Saving...",
        saved: "Saved ✓",
        unsupportedVideo: "Your browser does not support the video tag.",
        mode: "Mode",
        unitTitle: `Unit ${params.topicId}`,
        defaultTitle: `Unit ${params.topicId}`,
      }
    : {
        seconds: "giây",
        minutes: "phút",
        noVideoContent: "Chưa có nội dung cho video này.",
        progressSaved: "Đã lưu tiến trình học thành công",
        progressSaveError: "Không thể lưu tiến trình học.",
        serverError: "Không thể kết nối đến máy chủ.",
        getTranscript: "Lấy Transcript",
        practice: "Luyện Dictation & Shadowing",
        saveAndComplete: "Lưu & Hoàn thành",
        transcriptEmpty: "Chưa có transcript. Hãy bấm nút phía trên.",
        saveToFlashcards: "Lưu vào thẻ ghi nhớ",
        saving: "Đang lưu...",
        saved: "Đã lưu ✓",
        unsupportedVideo: "Trình duyệt của bạn không hỗ trợ thẻ video.",
        mode: "Chế độ",
        unitTitle: `Bài ${params.topicId}`,
        defaultTitle: `Bài ${params.topicId}`,
      };

  // Localized Titles Mapper
  const titleViMap: Record<string, string> = {
    "Introducing Myself": "Giới thiệu bản thân",
    "My Family": "Gia đình của tôi",
    "My Daily Routine": "Thói quen hàng ngày",
    "My Home": "Ngôi nhà của tôi",
    "My Pet": "Thú cưng của tôi",
    "The weather today": "Thời tiết hôm nay",
    "My School": "Trường học của tôi",
    "Shopping": "Mua sắm",
    "What's in my bag/backpack": "Có gì trong balo của tôi",
    "Daily Routine": "Thói quen hàng ngày",
    "Travel & Transport": "Du lịch & Di chuyển"
  };

  // Load lesson data from file based on URL params
  const levelIdStr = String(params.levelId).toLowerCase();
  const topicIdStr = String(params.topicId);
  const levelData = LESSONS_BY_LEVEL[levelIdStr];
  const lessonData = levelData ? levelData[topicIdStr] : null;

  const englishTitle = lessonData?.title || `Unit ${params.topicId}`;
  const localizedTitle = isEnglish ? englishTitle : (lessonData?.title ? (titleViMap[lessonData.title] || lessonData.title) : copy.defaultTitle);

  const ipaLesson = levelIdStr === "ipa" ? (IPA_LESSONS[topicIdStr] || IPA_LESSONS["1"]) : null;
  const videoSrc = lessonData?.videoSrc || `/videos/Lesson ${params.topicId}.mp4`;

  // --- 2. STATES ---
  const [transcript, setTranscript] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState<"transcript" | "complete" | null>(null);

  // --- FLASHCARD SAVING STATE ---
  const [selectedWord, setSelectedWord] = useState<{ word: string; x: number; y: number } | null>(null);
  const [savingWord, setSavingWord] = useState(false);
  const [wordSaved, setWordSaved] = useState(false);

  // --- TIMER STATE ---
  const [studyTimeSeconds, setStudyTimeSeconds] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStudyTimeSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
      setTranscript(lessonData?.transcript || copy.noVideoContent);
      setLoadingAction(null);
    }, 1000);
  };

  // Hàm "Hoàn thành bài học" (Lưu lại thời gian học thực tế)
  const [completeMsg, setCompleteMsg] = useState("");
  const handleCompleteLesson = async () => {
    setLoadingAction("complete");
    setCompleteMsg("");

    if (levelIdStr === "ipa") {
      setTimeout(() => {
        setCompleteMsg(isEnglish ? "IPA lesson marked as completed." : "Đã đánh dấu hoàn thành bài học IPA.");
        setLoadingAction(null);
      }, 400);
      return;
    }

    const timeSpentMin = Math.max(1, Math.round(studyTimeSeconds / 60));

    try {
      // Gọi API để lưu thời gian học thực tế
      const res = await fetch("/api/learning/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          levelId: params.levelId,
          topicId: params.topicId,
          timeSpentMin: timeSpentMin
        })
      });

      const data = await res.json();
      if (res.ok) {
        setCompleteMsg(isEnglish ? `Progress saved successfully (${timeSpentMin} min)!` : `🎉 Đã lưu tiến trình học (${timeSpentMin} phút) thành công!`);
      } else {
        setCompleteMsg(isEnglish ? `Error: ${copy.progressSaveError}` : `❌ Lỗi: ${data.message}`);
      }
    } catch {
      setCompleteMsg(isEnglish ? `Error: ${copy.serverError}` : "❌ Lỗi: Không thể kết nối đến máy chủ.");
    } finally {
      setLoadingAction(null);
    }
  };

  if (ipaLesson) {
    return (
      <IpaLessonView
        lesson={ipaLesson}
        topicId={topicIdStr}
        isEnglish={isEnglish}
        loadingAction={loadingAction}
        completeMsg={completeMsg}
        onBack={() => router.back()}
        onComplete={handleCompleteLesson}
      />
    );
  }

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
              <div className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{isEnglish ? `Unit ${params.topicId}` : copy.unitTitle}</div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">{localizedTitle}</h1>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-card p-1.5 pl-4 rounded-full shadow-sm border border-border">
            <ThemeToggle />
          </div>
        </div>

        {/* --- VIDEO PLAYER SECTION --- */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
          <div className="aspect-video w-full relative bg-black">
            <video
              className="absolute inset-0 w-full h-full"
              controls
              playsInline
              src={videoSrc}
            >
              {copy.unsupportedVideo}
            </video>
          </div>

          {/* CONTROL BUTTONS */}
          <div className="p-4 md:p-6 flex flex-wrap gap-4 border-t border-border bg-secondary/50 dark:bg-[#0b1220]">

            <button
              onClick={handleGetTranscript}
              disabled={loadingAction === "transcript"}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary dark:bg-slate-800 hover:bg-secondary/70 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-semibold border border-border transition disabled:opacity-50"
            >
              {loadingAction === "transcript" ? <Loader2 size={18} className="animate-spin" /> : <FileText size={18} />}
              {copy.getTranscript}
            </button>

            <Link
              href={`/learn/${params.levelId}/${params.topicId}/dictation`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition shadow-lg shadow-purple-500/20"
            >
              <Mic size={18} />
              {copy.practice}
            </Link>

            <button
              onClick={handleCompleteLesson}
              disabled={loadingAction === "complete"}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition disabled:opacity-50 shadow-lg shadow-blue-500/20 ml-auto"
            >
              {loadingAction === "complete" ? <Loader2 size={18} className="animate-spin" /> : <PlayCircle size={18} />}
              {copy.saveAndComplete}
            </button>

            {completeMsg && (
              <div className="w-full mt-2 text-sm font-semibold text-green-600 dark:text-green-400">
                {completeMsg}
              </div>
            )}
          </div>
        </div>

        {/* --- OUTPUT SECTIONS --- */}
        <div className="w-full">
          <div className="bg-card border border-border rounded-2xl p-6 flex flex-col">
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
                          <span className="flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> {copy.saving}</span>
                        ) : wordSaved ? (
                          copy.saved
                        ) : (
                          copy.saveToFlashcards
                        )}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-muted-foreground italic">{copy.transcriptEmpty}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
