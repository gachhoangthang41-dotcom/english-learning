"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  RefreshCcw,
  Trophy,
  XCircle,
  Loader2,
  Send
} from "lucide-react";
import { ThemeToggle } from "@/views/components/theme-toggle";
import { parseExercise, parseAnswerResult, ParsedExercise, ParsedAnswerResult } from "@/lib/exercise-parser";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// Generate random ID for the session to maintain conversation state with AI
function generateSessionId() {
  return "tenses-session-" + Math.random().toString(36).substring(2, 11);
}

export default function AITensesPracticePage() {
  const [sessionId, setSessionId] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [exercise, setExercise] = React.useState<ParsedExercise | null>(null);
  const [currentTense, setCurrentTense] = React.useState("Present Simple");
  const [selectedLabel, setSelectedLabel] = React.useState<string | null>(null);
  const [textInput, setTextInput] = React.useState("");
  const [result, setResult] = React.useState<ParsedAnswerResult | null>(null);
  
  // Stats
  const [questionsCount, setQuestionsCount] = React.useState(0);
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    setSessionId(generateSessionId());
  }, []);

  const fetchNewQuestion = React.useCallback(async (currentSession: string) => {
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
        body: JSON.stringify({ action: "new_quiz", tense: randomTense, sessionId: currentSession })
      });
      const data = await res.json();
      if (data.status === "success" && data.text) {
        setExercise(parseExercise(data.text));
      } else {
        alert("Có lỗi khi tạo bài tập. Vui lòng thử lại.");
      }
    } catch (err) {
      console.error(err);
      alert("Không thể kết nối đến máy chủ.");
    } finally {
      setLoading(false);
    }
  }, []);

  // First load
  React.useEffect(() => {
    if (sessionId) {
      fetchNewQuestion(sessionId);
    }
  }, [sessionId, fetchNewQuestion]);

  async function submitAnswer() {
    if (!exercise) return;
    
    // For radio options, we use selectedLabel. For text fallback, we use textInput.
    const answer = exercise.options ? selectedLabel : textInput;
    if (!answer) return;

    setLoading(true);
    try {
      const res = await fetch("/api/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "answer", message: answer, sessionId })
      });
      const data = await res.json();
      if (data.status === "success" && data.text) {
        const parsedResult = parseAnswerResult(data.text);
        setResult(parsedResult);
        setQuestionsCount(prev => prev + 1);
        if (parsedResult.isCorrect) setScore(prev => prev + 1);
      } else {
        alert("Có lỗi khi chấm bài.");
      }
    } catch (err) {
      console.error(err);
      alert("Không thể kết nối đến máy chủ.");
    } finally {
      setLoading(false);
    }
  }

  function resetSession() {
    setScore(0);
    setQuestionsCount(0);
    const newSession = generateSessionId();
    setSessionId(newSession);
  }

  function goNext() {
    fetchNewQuestion(sessionId);
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
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-purple-600 dark:text-purple-300">
                AI Powered Practice
              </p>
              <h1 className="text-2xl font-black tracking-tight md:text-3xl">AI Tenses Quiz</h1>
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
          <div className="rounded-2xl border border-border bg-card shadow-xl overflow-hidden flex flex-col min-h-[400px]">
            <div className="border-b border-border p-5 bg-card/50">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-purple-600 px-3 py-1 text-xs font-bold text-white shadow-sm flex items-center gap-1">
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
                  <p className="font-medium animate-pulse">AI is generating your question...</p>
                </div>
              ) : exercise ? (
                <>
                  <div className="prose dark:prose-invert max-w-none">
                    <h2 className="text-xl font-bold leading-relaxed tracking-tight md:text-2xl break-words whitespace-pre-wrap">
                      {exercise.questionText.replace(/\*\*/g, '')}
                    </h2>
                  </div>

                  <div className="mt-8 grid gap-3">
                    {exercise.options ? (
                      exercise.options.map((option) => {
                        const isSelected = selectedLabel === option.label;
                        const isOptionCorrect = answered && result.isCorrect && isSelected;
                        const isOptionWrong = answered && !result.isCorrect && isSelected;
                        
                        return (
                          <button
                            key={option.label}
                            type="button"
                            disabled={answered || loading}
                            onClick={() => setSelectedLabel(option.label)}
                            className={cx(
                              "flex min-h-14 w-full items-center gap-4 rounded-xl border px-4 py-3 text-left text-base font-semibold transition-all duration-200",
                              !answered && "hover:border-purple-500 hover:bg-purple-500/5 hover:shadow-sm active:scale-[0.99]",
                              isSelected && !answered && "border-purple-500 bg-purple-500/10 ring-1 ring-purple-500",
                              isOptionCorrect && "border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-200 ring-1 ring-emerald-500",
                              isOptionWrong && "border-red-500 bg-red-500/15 text-red-700 dark:text-red-200 ring-1 ring-red-500",
                              !isSelected && !isOptionCorrect && "border-border bg-background/50",
                              (answered || loading) && !isSelected && "opacity-60 cursor-not-allowed"
                            )}
                          >
                            <span className={cx(
                              "flex size-8 shrink-0 items-center justify-center rounded-lg border-2 text-sm font-black",
                              isSelected && !answered ? "border-purple-500 text-purple-600 dark:text-purple-400" : "border-muted-foreground/30 text-muted-foreground",
                              isOptionCorrect && "border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-background",
                              isOptionWrong && "border-red-500 text-red-600 dark:text-red-400 bg-white dark:bg-background"
                            )}>
                              {option.label}
                            </span>
                            <span className="flex-1">{option.text}</span>
                            {isOptionCorrect ? <CheckCircle2 className="size-5 shrink-0 text-emerald-500" /> : null}
                            {isOptionWrong ? <XCircle className="size-5 shrink-0 text-red-500" /> : null}
                          </button>
                        );
                      })
                    ) : (
                      <div className="flex gap-2">
                         <input 
                           type="text" 
                           disabled={answered || loading}
                           placeholder="Type your answer here..."
                           value={textInput}
                           onChange={(e) => setTextInput(e.target.value)}
                           className="flex-1 min-h-14 rounded-xl border border-border bg-background px-4 py-3 text-base font-semibold transition focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                           onKeyDown={(e) => e.key === 'Enter' && textInput && !answered && !loading && submitAnswer()}
                         />
                      </div>
                    )}
                  </div>

                  {!answered ? (
                    <div className="mt-8 flex justify-end">
                      <button
                        type="button"
                        onClick={submitAnswer}
                        disabled={loading || (!selectedLabel && !textInput)}
                        className={cx(
                          "inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white transition-all shadow-md active:scale-[0.98]",
                          loading || (!selectedLabel && !textInput)
                            ? "bg-muted text-muted-foreground shadow-none cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-500 hover:shadow-lg"
                        )}
                      >
                        {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                        {loading ? "Checking..." : "Submit Answer"}
                      </button>
                    </div>
                  ) : null}

                  {answered && result ? (
                    <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div
                        className={cx(
                          "rounded-2xl border p-5 sm:p-6",
                          result.isCorrect
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]"
                            : "border-red-500/30 bg-red-500/10 text-red-900 dark:text-red-100 shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cx(
                            "mt-0.5 rounded-full p-1",
                            result.isCorrect ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-red-500/20 text-red-600 dark:text-red-400"
                          )}>
                            {result.isCorrect ? <CheckCircle2 className="size-6" /> : <XCircle className="size-6" />}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">
                              {result.isCorrect ? "Excellent!" : "Not quite right"}
                            </h3>
                            <div className="mt-3 prose prose-sm dark:prose-invert max-w-none leading-relaxed whitespace-pre-wrap opacity-90">
                              {result.explanation.replace(/\*\*/g, '')}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end">
                        <button
                          type="button"
                          onClick={goNext}
                          disabled={loading}
                          className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3.5 text-sm font-bold text-white transition-all shadow-md hover:bg-purple-500 hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
                          Next Question
                          <ChevronRight className="size-4" />
                        </button>
                      </div>
                    </div>
                  ) : null}
                </>
              ) : null}
            </div>
          </div>

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
                You've answered <strong>{questionsCount}</strong> questions in this session. Keep practicing to improve your grammar!
              </p>
              <button
                type="button"
                onClick={resetSession}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-bold transition hover:bg-secondary/80 hover:border-muted-foreground/30"
              >
                <RefreshCcw className="size-4" />
                Start New Session
              </button>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
