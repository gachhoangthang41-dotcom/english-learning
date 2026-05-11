"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Loader2,
  RefreshCcw,
  Send,
  Sparkles,
  Trophy,
  XCircle,
} from "lucide-react";

import { ThemeToggle } from "@/views/components/theme-toggle";
import { parseExercise, parseAnswerResult, ParsedExercise, ParsedAnswerResult } from "@/lib/exercise-parser";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function generateSessionId() {
  return "tenses-" + Math.random().toString(36).substring(2, 11);
}

export default function TensesPracticePage() {
  const [sessionId, setSessionId] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [exercise, setExercise] = React.useState<ParsedExercise | null>(null);
  const [currentTense, setCurrentTense] = React.useState("Grammar Tenses");
  const [selectedLabel, setSelectedLabel] = React.useState<string | null>(null);
  const [textInput, setTextInput] = React.useState("");
  const [result, setResult] = React.useState<ParsedAnswerResult | null>(null);
  const [questionsCount, setQuestionsCount] = React.useState(0);
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    setSessionId(generateSessionId());
  }, []);

  const fetchNewQuestion = React.useCallback(async (sid: string) => {
    setLoading(true);
    setExercise(null);
    setResult(null);
    setSelectedLabel(null);
    setTextInput("");

    const tenses = [
      "Present Simple",
      "Present Continuous", 
      "Present Perfect",
      "Past Simple",
      "Past Continuous",
      "Future Simple"
    ];
    const randomTense = tenses[Math.floor(Math.random() * tenses.length)];
    setCurrentTense(randomTense);

    try {
      const res = await fetch("/api/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "new_quiz", tense: randomTense, sessionId: sid }),
      });
      const data = await res.json();
      if (data.status === "success" && data.text) {
        setExercise(parseExercise(data.text));
      }
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (sessionId) fetchNewQuestion(sessionId);
  }, [sessionId, fetchNewQuestion]);

  async function submitAnswer() {
    if (!exercise) return;
    const answer = exercise.options ? selectedLabel : textInput;
    if (!answer) return;
    setLoading(true);
    try {
      const res = await fetch("/api/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "answer", message: answer, sessionId }),
      });
      const data = await res.json();
      if (data.status === "success" && data.text) {
        const parsed = parseAnswerResult(data.text);
        setResult(parsed);
        setQuestionsCount((p) => p + 1);
        if (parsed.isCorrect) setScore((p) => p + 1);
      }
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }

  function resetSession() {
    setScore(0);
    setQuestionsCount(0);
    const ns = generateSessionId();
    setSessionId(ns);
  }

  const answered = result !== null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:px-8 md:py-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/home"
              className="grid size-10 place-items-center rounded-xl border border-border bg-card text-muted-foreground transition hover:text-foreground"
              aria-label="Back to home"
            >
              <ArrowLeft className="size-5" />
            </Link>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-purple-600 dark:text-purple-300 flex items-center gap-1.5">
                <Sparkles className="size-3.5" />
                AI Grammar Practice
              </p>
              <h1 className="text-2xl font-black tracking-tight md:text-3xl">English Tenses Quiz</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-bold">
              {score}/{questionsCount} correct
            </div>
            <ThemeToggle />
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* Main card */}
          <div className="rounded-2xl border border-border bg-card shadow-xl overflow-hidden flex flex-col min-h-[420px]">
            <div className="border-b border-border p-5 bg-gradient-to-r from-purple-600/5 to-blue-600/5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1 text-xs font-bold text-white shadow-sm flex items-center gap-1">
                    <Sparkles className="size-3" />
                    AI Generated
                  </span>
                  <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-bold text-foreground">
                    {currentTense}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 md:p-7 flex-1 flex flex-col">
              {loading && !exercise && !result ? (
                <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-3">
                  <Loader2 className="size-8 animate-spin text-purple-500" />
                  <p className="font-medium animate-pulse">AI đang sinh câu hỏi...</p>
                </div>
              ) : exercise ? (
                <>
                  <h2 className="text-xl font-black leading-relaxed tracking-tight md:text-2xl whitespace-pre-wrap">
                    {exercise.questionText.replace(/\*\*/g, "")}
                  </h2>

                  <div className="mt-8 grid gap-3">
                    {exercise.options ? (
                      exercise.options.map((opt) => {
                        const sel = selectedLabel === opt.label;
                        const optCorrect = answered && result.isCorrect && sel;
                        const optWrong = answered && !result.isCorrect && sel;

                        return (
                          <button
                            key={opt.label}
                            type="button"
                            disabled={answered || loading}
                            onClick={() => setSelectedLabel(opt.label)}
                            className={cx(
                              "flex min-h-14 w-full items-center gap-4 rounded-xl border px-4 py-3 text-left text-base font-semibold transition-all duration-200",
                              !answered && "hover:border-purple-500 hover:bg-purple-500/5 active:scale-[0.99]",
                              sel && !answered && "border-purple-500 bg-purple-500/10 ring-1 ring-purple-500",
                              optCorrect && "border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-200 ring-1 ring-emerald-500",
                              optWrong && "border-red-500 bg-red-500/15 text-red-700 dark:text-red-200 ring-1 ring-red-500",
                              !sel && !optCorrect && "border-border bg-background/50",
                              (answered || loading) && !sel && "opacity-60 cursor-not-allowed",
                            )}
                          >
                            <span
                              className={cx(
                                "flex size-8 shrink-0 items-center justify-center rounded-lg border-2 text-sm font-black",
                                sel && !answered ? "border-purple-500 text-purple-600 dark:text-purple-400" : "border-muted-foreground/30 text-muted-foreground",
                                optCorrect && "border-emerald-500 text-emerald-600",
                                optWrong && "border-red-500 text-red-600",
                              )}
                            >
                              {opt.label}
                            </span>
                            <span className="flex-1">{opt.text}</span>
                            {optCorrect ? <CheckCircle2 className="size-5 shrink-0 text-emerald-500" /> : null}
                            {optWrong ? <XCircle className="size-5 shrink-0 text-red-500" /> : null}
                          </button>
                        );
                      })
                    ) : (
                      <input
                        type="text"
                        disabled={answered || loading}
                        placeholder="Nhập câu trả lời..."
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && textInput && !answered && !loading && submitAnswer()}
                        className="min-h-14 rounded-xl border border-border bg-background px-4 py-3 text-base font-semibold transition focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    )}
                  </div>

                  {!answered ? (
                    <div className="mt-8 flex justify-end">
                      <button
                        type="button"
                        onClick={submitAnswer}
                        disabled={loading || (!selectedLabel && !textInput)}
                        className={cx(
                          "inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition-all shadow-md active:scale-[0.98]",
                          loading || (!selectedLabel && !textInput)
                            ? "bg-muted text-muted-foreground shadow-none cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-500 hover:shadow-lg",
                        )}
                      >
                        {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                        {loading ? "Đang chấm..." : "Kiểm tra"}
                      </button>
                    </div>
                  ) : null}

                  {answered && result ? (
                    <div className="mt-8">
                      <div
                        className={cx(
                          "rounded-2xl border p-5",
                          result.isCorrect
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100"
                            : "border-red-500/30 bg-red-500/10 text-red-900 dark:text-red-100",
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={cx(
                              "mt-0.5 rounded-full p-1",
                              result.isCorrect ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-red-500/20 text-red-600 dark:text-red-400",
                            )}
                          >
                            {result.isCorrect ? <CheckCircle2 className="size-6" /> : <XCircle className="size-6" />}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{result.isCorrect ? "Chính xác! 🎉" : "Chưa đúng rồi 😅"}</h3>
                            <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap opacity-90">
                              {result.explanation.replace(/\*\*/g, "")}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end">
                        {questionsCount >= 5 ? (
                          <button
                            type="button"
                            onClick={resetSession}
                            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white transition-all shadow-md hover:bg-purple-500 hover:shadow-lg active:scale-[0.98]"
                          >
                            <RefreshCcw className="size-4" />
                            Làm lại bài tập
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => fetchNewQuestion(sessionId)}
                            disabled={loading}
                            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white transition-all shadow-md hover:bg-purple-500 hover:shadow-lg active:scale-[0.98] disabled:opacity-50"
                          >
                            {loading ? <Loader2 className="size-4 animate-spin" /> : null}
                            Câu tiếp theo ({questionsCount}/5)
                            <ChevronRight className="size-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-3">
                  <p className="font-medium">Không thể kết nối tới AI server.</p>
                  <button
                    onClick={() => fetchNewQuestion(sessionId)}
                    className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-sm font-bold text-white"
                  >
                    <RefreshCcw className="size-4" />
                    Thử lại
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <section className="rounded-2xl border border-border bg-card p-5 shadow-xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">Score</p>
                  <div className="mt-2 text-4xl font-black text-purple-600 dark:text-purple-400">{score}</div>
                </div>
                <div className="grid size-12 place-items-center rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-300">
                  <Trophy className="size-6" />
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Đã trả lời <strong>{questionsCount}/5</strong> câu hỏi. {questionsCount >= 5 ? "Bạn đã hoàn thành bài luyện tập!" : "Tiếp tục luyện tập để cải thiện ngữ pháp!"}
              </p>
              <button
                type="button"
                onClick={resetSession}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-bold transition hover:brightness-95"
              >
                <RefreshCcw className="size-4" />
                Bắt đầu lại
              </button>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
