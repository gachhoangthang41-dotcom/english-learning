"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, FileText, Puzzle, Loader2, RefreshCw, CheckCircle, XCircle, Play, ArrowRight, Lock, SkipBack } from "lucide-react";
import { useParams } from "next/navigation";
import { LESSONS_BY_LEVEL, type LessonContent } from "../../../data/a1-lessons";

type RouteParams = {
  levelId?: string | string[];
  topicId?: string | string[];
};

type ClozeItem = {
  id: string;
  original: string;
  cloze: string;
  answer: string;
  hint?: string;
};

type GrammarAnalysis = {
  tenseName: string;
  recognitionSigns: string;
  tenseExplanation: string;
  formula: string;
  grammarNotes: string;
  userError?: string;
  comment?: string;
};

// Trạng thái của bài tập hiện tại
type ExerciseState = {
  status: "idle" | "loading" | "answering" | "submitting" | "graded";
  item: ClozeItem | null;
  userAnswer: string;
  isCorrect: boolean;
  analysis: GrammarAnalysis | null;
};

type ResultRecord = {
  isCorrect: boolean;
  userAnswer: string;
  analysis: GrammarAnalysis | null;
  item: ClozeItem;
};

function normalizeAnswer(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/[“”"]/g, '"')
    .replace(/[’‘]/g, "'")
    .replace(/[.,!?;:]/g, "");
}

export default function LearnPage() {
  const params = useParams<RouteParams>();
  const levelId = String(params?.levelId ?? "a1").toLowerCase();
  const topicId = Array.isArray(params?.topicId) ? params?.topicId?.[0] : params?.topicId;
  const topicIdStr = String(topicId ?? "1");

  const lessonsOfLevel = LESSONS_BY_LEVEL[levelId] ?? LESSONS_BY_LEVEL["a1"];

  const lesson = useMemo<LessonContent>(() => {
    return (
      lessonsOfLevel[topicIdStr] || {
        title: `Lesson ${topicIdStr}`,
        subtitle: `LESSON ${topicIdStr}`,
        videoSrc: `/videos/${levelId}/Lesson ${topicIdStr}.mp4`,
        transcript: "Chưa có transcript.",
        segments: [{ start: 0, end: 10 }],
      }
    );
  }, [lessonsOfLevel, topicIdStr, levelId]);

  // Video & Navigation State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [segIndex, setSegIndex] = useState<number>(0);
  const [isVideoPausedForQuestion, setIsVideoPausedForQuestion] = useState<boolean>(false);

  // Exercise State
  const [exercise, setExercise] = useState<ExerciseState>({
    status: "idle",
    item: null,
    userAnswer: "",
    isCorrect: false,
    analysis: null,
  });

  // Score State
  const [results, setResults] = useState<(ResultRecord | undefined)[]>([]); // Track result per segment
  const [isLessonComplete, setIsLessonComplete] = useState<boolean>(false);

  const resetLesson = () => {
    setSegIndex(0);
    setIsVideoPausedForQuestion(false);
    setExercise({
      status: "idle",
      item: null,
      userAnswer: "",
      isCorrect: false,
      analysis: null,
    });
    setResults([]);
    setIsLessonComplete(false);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  };

  // Video Time Update Logic - Pause at end of segment
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onTimeUpdate = () => {
      const seg = lesson.segments?.[segIndex];
      // Note: We only auto-pause if we haven't already finished this segment's question (status !== 'graded')
      // OR if we want to force them to click continue. 
      // Current logic: Always pause at end of segment if not already looking at question.
      if (!seg || isVideoPausedForQuestion || isLessonComplete) return;

      // Check if we reached the end of the segment (allow 0.5s buffer)
      if (v.currentTime >= seg.end - 0.2 && !v.paused) {
        v.pause();
        v.currentTime = seg.end;
        setIsVideoPausedForQuestion(true);

        // If we haven't answered this segment yet, fetch question OR restore if already done
        if (exercise.status === 'idle' || exercise.status === 'loading') {
          if (results[segIndex]) {
            // Restore previous result
            setExercise({
              status: 'graded',
              item: results[segIndex]!.item,
              userAnswer: results[segIndex]!.userAnswer,
              isCorrect: results[segIndex]!.isCorrect,
              analysis: results[segIndex]!.analysis
            });
          } else {
            fetchQuestion(segIndex);
          }
        }
      }
    };

    v.addEventListener("timeupdate", onTimeUpdate);
    return () => v.removeEventListener("timeupdate", onTimeUpdate);
  }, [segIndex, lesson.segments, isVideoPausedForQuestion, isLessonComplete, exercise.status]);

  // Fetch Question from API
  const fetchQuestion = async (index: number) => {
    setExercise((prev) => ({ ...prev, status: "loading", item: null }));

    try {
      const segmentText = getSegmentText(index);

      const res = await fetch("/api/groq/cloze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          segmentIndex: index,
          segmentText: segmentText,
        }),
      });

      const data = await res.json();

      if (data.item) {
        setExercise({
          status: "answering",
          item: data.item,
          userAnswer: "",
          isCorrect: false,
          analysis: null,
        });
      } else {
        // Fallback
        setExercise({
          status: "answering",
          item: {
            id: String(index),
            original: segmentText,
            cloze: segmentText + " (No question generated)",
            answer: "skip",
            hint: "Just click Submit"
          },
          userAnswer: "",
          isCorrect: false,
          analysis: null,
        });
      }
    } catch (error) {
      console.error("Failed to fetch question:", error);
    }
  };

  const getSegmentText = (segmentIdx: number): string => {
    const words = lesson.transcript.split(/\s+/);
    const totalSegments = lesson.segments.length;
    const wordsPerSegment = Math.ceil(words.length / totalSegments);
    const startWord = segmentIdx * wordsPerSegment;
    const endWord = Math.min((segmentIdx + 1) * wordsPerSegment, words.length);
    return words.slice(startWord, endWord).join(" ");
  };

  // Submit Answer & Grade
  const handleSubmit = async () => {
    if (!exercise.item) return;

    setExercise((prev) => ({ ...prev, status: "submitting" }));

    const isCorrect = normalizeAnswer(exercise.userAnswer) === normalizeAnswer(exercise.item.answer);

    // Call Analyze API
    let analysis: GrammarAnalysis | null = null;
    try {
      const res = await fetch("/api/groq/analyze-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sentence: exercise.item.original,
          userAnswer: exercise.userAnswer,
          correctAnswer: exercise.item.answer,
          isCorrect: isCorrect,
        }),
      });
      const data = await res.json();
      if (data.analysis) {
        analysis = data.analysis;
      }
    } catch (e) {
      console.error(e);
    }

    setExercise((prev) => ({
      ...prev,
      status: "graded",
      isCorrect,
      analysis,
    }));

    // Save result
    const newResults = [...results];
    newResults[segIndex] = {
      isCorrect,
      userAnswer: exercise.userAnswer,
      analysis,
      item: exercise.item
    };
    setResults(newResults);
  };

  // Continue to Next Segment
  const handleContinue = () => {
    // Only allowed if graded
    if (exercise.status !== 'graded') return;

    const nextIndex = segIndex + 1;

    // Check if we are done
    if (nextIndex >= lesson.segments.length) {
      setIsLessonComplete(true);
      setIsVideoPausedForQuestion(false);
      return;
    }

    setSegIndex(nextIndex);
    setIsVideoPausedForQuestion(false);

    // Reset exercise for next segment
    setExercise({
      status: "idle",
      item: null,
      userAnswer: "",
      isCorrect: false,
      analysis: null,
    });

    // Play video for next segment
    if (videoRef.current) {
      videoRef.current.currentTime = lesson.segments[nextIndex].start + 0.1;
      videoRef.current.play();
    }
  };

  const handlePlayCurrent = () => {
    const seg = lesson.segments[segIndex];
    if (videoRef.current && seg) {
      videoRef.current.currentTime = seg.start;
      videoRef.current.play();
      setIsVideoPausedForQuestion(false);
    }
  }

  // Retry Lesson
  const handleRetry = () => {
    resetLesson();
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  // Calculate Score
  const totalScore = Math.round((results.filter(r => r).length / lesson.segments.length) * 100) || 0;
  const passed = totalScore >= 70;

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 md:p-8 relative">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Navigation & Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href={`/lessons/${levelId}`}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
          >
            <ChevronLeft size={24} />
          </Link>
          <div>
            <div className="text-sm font-bold text-blue-400 uppercase tracking-wider">
              {lesson.subtitle || `Lesson ${topicIdStr}`}
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white">
              {lesson.title}
            </h1>
          </div>
          <div className="ml-auto bg-slate-800 px-4 py-2 rounded-lg border border-white/10">
            <span className="text-slate-400 text-sm mr-2">Score:</span>
            <span className={`font-bold text-lg ${results.length > 0 ? 'text-emerald-400' : 'text-slate-500'
              }`}>
              {Math.round((results.filter(r => r?.isCorrect).length / lesson.segments.length) * 100) || 0}
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        {/* Main Content Grid */}
        <div className="w-full grid lg:grid-cols-[200px_1fr] gap-10 items-start">

          {/* LEFT SIDEBAR: Progress */}
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl sticky top-4 h-[calc(100vh-40px)] flex flex-col overflow-hidden">
            <h3 className="font-bold text-slate-200 mb-3 text-sm uppercase tracking-wider flex-shrink-0">Tiến độ</h3>
            <div className="space-y-2 overflow-y-auto flex-1 pr-1 custom-scrollbar">
              {lesson.segments.map((_, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border flex-shrink-0 ${results[idx] === undefined
                    ? 'border-slate-700 bg-slate-800 text-slate-500'
                    : results[idx]?.isCorrect
                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                      : 'border-rose-500 bg-rose-500/20 text-rose-400'
                    }`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${results[idx] === undefined
                      ? 'w-0'
                      : 'w-full ' + (results[idx]?.isCorrect ? 'bg-emerald-500' : 'bg-rose-500')
                      }`} />
                  </div>
                  {idx === segIndex && !isLessonComplete && (
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 text-xs text-slate-500 text-center flex-shrink-0">
              {results.filter(r => r).length}/{lesson.segments.length} hoàn thành
            </div>
          </div>

          {/* RIGHT CONTENT: Video & Exercise Stacked */}
          <div className="space-y-6 w-full max-w-6xl mx-auto">

            {/* Video Player Container */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
              <div className="aspect-video w-full relative bg-black">
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-contain"
                  controls
                  onPlay={() => {
                    if (isVideoPausedForQuestion && exercise.status !== 'graded') {
                      videoRef.current?.pause();
                    }
                  }}
                >
                  <source src={lesson.videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Visual cue if paused */}
                {isVideoPausedForQuestion && exercise.status !== 'graded' && !isLessonComplete && (
                  <div className="absolute inset-0 pointer-events-none flex items-end justify-center pb-12 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-yellow-400 font-bold text-lg animate-bounce">
                      👇 Hãy trả lời câu hỏi bên dưới để tiếp tục!
                    </p>
                  </div>
                )}
              </div>

              {/* CONTROLS BAR */}
              <div className="p-4 flex flex-wrap gap-3 border-t border-white/10 bg-[#0b1220]">
                {segIndex > 0 && (
                  <button
                    onClick={() => {
                      const prevIndex = segIndex - 1;
                      setSegIndex(prevIndex);
                      setExercise({ status: 'idle', userAnswer: '', isCorrect: false, item: null, analysis: null });
                      setIsVideoPausedForQuestion(false);
                      setTimeout(() => videoRef.current?.play(), 100);
                    }}
                    disabled={isLessonComplete}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-white/10 transition disabled:opacity-50"
                  >
                    <SkipBack size={16} /> <span className="hidden sm:inline">Đoạn trước</span>
                  </button>
                )}

                <button
                  onClick={handlePlayCurrent}
                  disabled={isLessonComplete}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-white/10 transition disabled:opacity-50"
                >
                  <RefreshCw size={16} /> <span className="hidden sm:inline">Xem lại</span>
                </button>

                <div className="flex-1" />

                {isLessonComplete && (
                  <Link
                    href={`/learn/${levelId}/${topicIdStr}/transcript`}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-white/10 transition"
                  >
                    <FileText size={16} />
                    Transcript
                  </Link>
                )}
              </div>
            </div>

            {/* EXERCISE SECTION */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col min-h-[300px]">
              <h3 className="text-base font-bold text-slate-200 mb-4 flex items-center gap-2">
                <Puzzle size={18} className="text-orange-400" />
                Câu hỏi tương tác
              </h3>

              <div className="flex-1 bg-black/20 rounded-xl p-6 text-slate-300 border border-white/5 relative">
                {exercise.status === 'loading' && (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Loader2 size={24} className="animate-spin text-blue-500 mb-2" />
                    <p className="text-sm">Đang tạo câu hỏi...</p>
                  </div>
                )}

                {(exercise.status === 'idle') && !isLessonComplete && (
                  <p className="text-slate-500 italic text-center py-8 text-sm">
                    📺 Hãy xem video. Câu hỏi sẽ hiện ra khi kết thúc đoạn.
                  </p>
                )}

                {isLessonComplete && (
                  <div className="text-center py-8">
                    <p className="text-xl font-bold text-white mb-1">Chúc mừng bạn đã hoàn thành!</p>
                    <p className="text-slate-400 text-sm">Xem kết quả chi tiết ở bảng điểm.</p>
                  </div>
                )}

                {exercise.item && (exercise.status === 'answering' || exercise.status === 'submitting' || exercise.status === 'graded') && (
                  <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
                    {/* Question */}
                    <div className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-100 font-serif text-center">
                      {exercise.item.cloze.split("____").map((part, i, arr) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <span className={`inline-block px-3 py-0.5 mx-1 border-b-2 rounded min-w-[60px] text-center font-bold ${exercise.status === 'graded'
                              ? (exercise.isCorrect ? 'text-emerald-400 border-emerald-500 bg-emerald-500/10' : 'text-rose-400 border-rose-500 bg-rose-500/10')
                              : 'text-blue-300 border-blue-500 bg-blue-500/10'
                              }`}>
                              {exercise.status === 'graded' ? exercise.item?.answer : "?"}
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Interaction Area */}
                    {exercise.status !== 'graded' ? (
                      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
                        <div className="flex-1 relative">
                          <input
                            value={exercise.userAnswer}
                            onChange={(e) => setExercise(prev => ({ ...prev, userAnswer: e.target.value }))}
                            placeholder="Nhập từ còn thiếu..."
                            className="w-full px-5 py-3 rounded-xl bg-[#0f172a] border border-white/20 focus:border-blue-500 outline-none text-lg"
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                          />
                          {exercise.item.hint && (
                            <div className="absolute right-3 top-4 text-xs text-slate-500 pointer-events-none hidden sm:block">
                              Gợi ý: {exercise.item.hint}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={handleSubmit}
                          disabled={!exercise.userAnswer.trim() || exercise.status === 'submitting'}
                          className="px-8 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold transition disabled:opacity-50 flex items-center gap-2 justify-center"
                        >
                          {exercise.status === 'submitting' && <Loader2 className="animate-spin" size={16} />}
                          Trả lời
                        </button>
                      </div>
                    ) : (
                      // Analysis View
                      <div className="pt-6 border-t border-white/10 space-y-5">
                        <div className={`p-4 rounded-xl flex items-center gap-4 ${exercise.isCorrect ? 'bg-emerald-900/20 border border-emerald-500/30' : 'bg-rose-900/20 border border-rose-500/30'}`}>
                          {exercise.isCorrect ? <CheckCircle className="text-emerald-400 shrink-0 w-6 h-6" /> : <XCircle className="text-rose-400 shrink-0 w-6 h-6" />}
                          <div className="flex-1">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <h4 className={`font-bold text-lg ${exercise.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {exercise.isCorrect ? "Chính xác!" : "Chưa đúng."}
                              </h4>
                              <span className="text-base text-slate-300">
                                Đáp án đúng: <span className="font-bold text-white px-2 py-0.5 bg-white/10 rounded mx-1">{exercise.item.answer}</span>
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={handleContinue}
                            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition shadow-lg shadow-blue-900/20"
                          >
                            Tiếp tục
                          </button>
                        </div>

                        {exercise.analysis && (
                          <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-500">
                            {/* Teacher Comment */}
                            {exercise.analysis.comment && (
                              <div className="bg-indigo-900/20 border border-indigo-500/30 p-5 rounded-2xl flex gap-4 items-start">
                                <span className="text-3xl select-none">👩‍🏫</span>
                                <div>
                                  <h5 className="text-indigo-300 font-bold text-sm mb-2 uppercase tracking-wide">Giáo viên nhận xét</h5>
                                  <p className="text-slate-200 text-base leading-relaxed">
                                    {exercise.analysis.comment}
                                  </p>
                                </div>
                              </div>
                            )}

                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-[#0f172a] rounded-xl p-4 border border-blue-500/20">
                                <h5 className="text-blue-400 font-bold text-xs mb-3 uppercase flex items-center gap-2">
                                  <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
                                  Thì (Tense)
                                </h5>
                                <div className="space-y-2 text-sm">
                                  <p><span className="text-slate-500 inline-block w-20">Thì:</span> <span className="text-slate-200 font-medium">{exercise.analysis.tenseName}</span></p>
                                  <p><span className="text-slate-500 inline-block w-20">Dấu hiệu:</span> <span className="text-slate-300 italic">{exercise.analysis.recognitionSigns}</span></p>
                                </div>
                              </div>
                              <div className="bg-[#0f172a] rounded-xl p-4 border border-purple-500/20">
                                <h5 className="text-purple-400 font-bold text-xs mb-3 uppercase flex items-center gap-2">
                                  <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
                                  Ngữ pháp
                                </h5>
                                <div className="space-y-2 text-sm">
                                  <p className="flex items-start gap-2">
                                    <span className="text-slate-500 whitespace-nowrap">Công thức:</span>
                                    <code className="bg-slate-800 px-2 py-0.5 rounded text-purple-200 font-mono text-xs">{exercise.analysis.formula}</code>
                                  </p>
                                  {!exercise.isCorrect && exercise.analysis.userError && (
                                    <p className="text-rose-300 font-medium pt-1 text-sm bg-rose-900/10 p-2 rounded border border-rose-500/10">
                                      ⚠️ {exercise.analysis.userError}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>   {/* Final Result Modal */}
        {isLessonComplete && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-[#0f172a] border border-white/20 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
              {/* Background Glare */}
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${passed ? 'from-emerald-500 to-green-400' : 'from-rose-500 to-red-400'}`} />

              <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 border-4 ${passed ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-rose-500/10 border-rose-500 text-rose-400'}`}>
                {passed ? <CheckCircle size={48} /> : <XCircle size={48} />}
              </div>

              <h2 className="text-3xl font-black text-white mb-2">
                {passed ? "Chúc mừng! 🎉" : "Rất tiếc..."}
              </h2>
              <p className="text-slate-400 mb-6">
                {passed ? "Bạn đã hoàn thành bài học xuất sắc." : "Bạn cần cố gắng hơn một chút."}
              </p>

              <div className="py-6 border-y border-white/10 mb-8">
                <div className="text-sm text-slate-400 uppercase tracking-wider font-bold mb-1">Tổng điểm</div>
                <div className={`text-6xl font-black ${passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {Math.round((results.filter(r => r?.isCorrect).length / lesson.segments.length) * 100) || 0}
                </div>
                <div className="text-sm text-slate-500 mt-2 font-medium">BẠN CẦN 70 ĐIỂM ĐỂ ĐẠT</div>
              </div>

              <button
                onClick={handleRetry}
                className={`w-full py-4 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2 ${passed ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-white text-slate-900 hover:bg-slate-200'}`}
              >
                <RefreshCw size={20} />
                {passed ? "Học lại từ đầu" : "Làm lại bài học"}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
