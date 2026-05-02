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
} from "lucide-react";

import { TENSE_QUIZ_QUESTIONS } from "@/models/data/tenses-quiz";
import { ThemeToggle } from "@/views/components/theme-toggle";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function TensesPracticePage() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, number>>({});

  const question = TENSE_QUIZ_QUESTIONS[currentIndex];
  const selectedIndex = answers[question.id] ?? null;
  const answered = selectedIndex !== null;
  const isCorrect = selectedIndex === question.correctIndex;
  const score = TENSE_QUIZ_QUESTIONS.reduce((total, item) => {
    return answers[item.id] === item.correctIndex ? total + 1 : total;
  }, 0);
  const completedCount = Object.keys(answers).length;
  const progressPct = Math.round((completedCount / TENSE_QUIZ_QUESTIONS.length) * 100);

  function selectAnswer(optionIndex: number) {
    setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }));
  }

  function goNext() {
    setCurrentIndex((prev) => Math.min(prev + 1, TENSE_QUIZ_QUESTIONS.length - 1));
  }

  function resetQuiz() {
    setAnswers({});
    setCurrentIndex(0);
  }

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
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-300">
                Grammar Practice
              </p>
              <h1 className="text-2xl font-black tracking-tight md:text-3xl">English Tenses Quiz</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-bold">
              {score}/{TENSE_QUIZ_QUESTIONS.length} correct
            </div>
            <ThemeToggle />
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="rounded-2xl border border-border bg-card shadow-xl">
            <div className="border-b border-border p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                    {question.level}
                  </span>
                  <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-bold text-foreground">
                    {question.tense}
                  </span>
                </div>
                <span className="text-sm font-semibold text-muted-foreground">
                  Question {currentIndex + 1} of {TENSE_QUIZ_QUESTIONS.length}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${progressPct}%` }} />
              </div>
            </div>

            <div className="p-5 md:p-7">
              <h2 className="text-2xl font-black leading-tight tracking-tight md:text-3xl">{question.prompt}</h2>

              <div className="mt-6 grid gap-3">
                {question.options.map((option, optionIndex) => {
                  const selected = selectedIndex === optionIndex;
                  const correct = question.correctIndex === optionIndex;
                  const showCorrect = answered && correct;
                  const showWrong = answered && selected && !correct;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => selectAnswer(optionIndex)}
                      className={cx(
                        "flex min-h-14 w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-base font-semibold transition",
                        "hover:border-blue-500 hover:bg-blue-500/10",
                        selected && "border-blue-500 bg-blue-500/10",
                        showCorrect && "border-emerald-500 bg-emerald-500/12 text-emerald-700 dark:text-emerald-200",
                        showWrong && "border-red-500 bg-red-500/12 text-red-700 dark:text-red-200",
                        !selected && !showCorrect && "border-border bg-background/50",
                      )}
                    >
                      <span>{option}</span>
                      {showCorrect ? <CheckCircle2 className="size-5 shrink-0" /> : null}
                      {showWrong ? <XCircle className="size-5 shrink-0" /> : null}
                    </button>
                  );
                })}
              </div>

              {answered ? (
                <div
                  className={cx(
                    "mt-6 rounded-xl border p-4",
                    isCorrect
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-100"
                      : "border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-100",
                  )}
                >
                  <div className="flex items-center gap-2 font-bold">
                    {isCorrect ? <CheckCircle2 className="size-5" /> : <HelpCircle className="size-5" />}
                    {isCorrect ? "Correct" : "Review this tense"}
                  </div>
                  <p className="mt-2 text-sm leading-6">{question.explanation}</p>
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={goNext}
                  disabled={currentIndex === TENSE_QUIZ_QUESTIONS.length - 1}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next question
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <section className="rounded-2xl border border-border bg-card p-5 shadow-xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">Result</p>
                  <div className="mt-2 text-4xl font-black">{score}</div>
                </div>
                <div className="grid size-12 place-items-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-300">
                  <Trophy className="size-6" />
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Finish all questions to review your score and identify which tenses need more practice.
              </p>
              <button
                type="button"
                onClick={resetQuiz}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-bold transition hover:brightness-95"
              >
                <RefreshCcw className="size-4" />
                Reset quiz
              </button>
            </section>

            <section className="rounded-2xl border border-border bg-card p-5 shadow-xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">Question Map</p>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {TENSE_QUIZ_QUESTIONS.map((item, index) => {
                  const answer = answers[item.id];
                  const done = answer !== undefined;
                  const correct = answer === item.correctIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCurrentIndex(index)}
                      className={cx(
                        "grid aspect-square place-items-center rounded-xl border text-sm font-black transition",
                        index === currentIndex && "ring-2 ring-blue-500",
                        !done && "border-border bg-secondary text-muted-foreground",
                        done && correct && "border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-200",
                        done && !correct && "border-red-500 bg-red-500/15 text-red-700 dark:text-red-200",
                      )}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
