"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, RotateCcw, Loader2, Calendar, CheckCircle2, Clock, PlayCircle } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface HistoryItem {
    id: string;
    status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
    progressPct: number;
    timeSpentMin: number;
    score: number | null;
    updatedAt: string;
    exercise: {
        title: string;
        type: string;
        lesson: {
            order: number;
            title: string;
            levelId: string;
            level?: {
                code: string;
                name: string;
            };
        };
    };
}

export default function HistoryPage() {
    const router = useRouter();
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/learning/history")
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "success" && data.data) {
                    setHistory(data.data);
                }
            })
            .catch((err) => console.error("Error fetching history:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
                <p className="text-muted-foreground font-semibold">Đang tải lịch sử học tập...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
                <div className="mx-auto max-w-4xl px-5 lg:px-8 h-16 flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition whitespace-nowrap flex-shrink-0"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="font-semibold hidden sm:inline">Trở Về Dashboard</span>
                    </button>

                    <div className="flex-1 text-center">
                        <h1 className="text-xl font-bold text-foreground">Lịch Sử Làm Bài</h1>
                    </div>

                    <div className="w-24"></div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                <div className="mx-auto max-w-4xl px-5 lg:px-8 py-10">

                    <div className="mb-8">
                        <h2 className="text-2xl font-black mb-2">Các bài tập đã hoàn thành</h2>
                        <p className="text-muted-foreground">Theo dõi tiến độ và làm lại các bài tập chưa đạt điểm cao.</p>
                    </div>

                    {history.length === 0 ? (
                        <div className="text-center py-20 bg-card border border-border rounded-xl">
                            <span className="text-6xl mb-4 block">📝</span>
                            <h2 className="text-2xl font-bold text-foreground mb-2">Chưa có lịch sử</h2>
                            <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                                Bạn chưa hoàn thành bài tập nào. Hãy bắt đầu bài học đầu tiên ngay nhé!
                            </p>
                            <button
                                onClick={() => router.push("/home")}
                                className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition shadow-lg shadow-blue-500/20"
                            >
                                Về Trang Chủ
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {history.map((item) => {
                                const isCompleted = item.status === "COMPLETED";
                                // Color formatting based on progress
                                let statusColor = "text-muted-foreground bg-secondary";
                                let borderColor = "border-border";

                                if (isCompleted) {
                                    if (item.progressPct >= 80) {
                                        statusColor = "text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/10";
                                        borderColor = "border-emerald-500/20";
                                    } else if (item.progressPct >= 50) {
                                        statusColor = "text-yellow-700 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-500/10";
                                        borderColor = "border-yellow-500/20";
                                    } else {
                                        statusColor = "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-500/10";
                                        borderColor = "border-red-500/20";
                                    }
                                }

                                // Format Time
                                const formattedDate = format(new Date(item.updatedAt), "dd/MM/yyyy • HH:mm", { locale: vi });

                                // Redo Links
                                const topicId = item.exercise?.lesson?.order || 1;
                                const lvlCode = item.exercise?.lesson?.level?.code || item.exercise?.lesson?.levelId || 'a1';
                                const levelCode = lvlCode.toLowerCase();
                                const redoLink = `/learn/${levelCode}/${topicId}`;
                                const dictationLink = `/learn/${levelCode}/${topicId}/dictation`;

                                return (
                                    <div key={item.id} className={`bg-card border rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all hover:shadow-md ${borderColor}`}>

                                        {/* Left Info */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${statusColor}`}>
                                                    {item.progressPct}% {isCompleted ? "Hoàn thành" : "Đang học"}
                                                </span>
                                                <span className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-1">
                                                    <Clock size={12} /> {item.timeSpentMin} phút
                                                </span>
                                            </div>

                                            <h3 className="text-lg font-bold text-foreground mb-1">
                                                {item.exercise?.title === "Mock Exercise" ? "Bài tập" : (item.exercise?.title || "Bài tập")}
                                            </h3>

                                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1 font-medium">
                                                    <span className="text-blue-500 font-bold">{item.exercise?.lesson?.level?.code || item.exercise?.lesson?.levelId}</span>
                                                    {" • "}{item.exercise?.lesson?.title}
                                                </span>
                                                <span>|</span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={14} /> {formattedDate}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Right Actions */}
                                        <div className="flex items-center gap-3 shrink-0">
                                            <Link
                                                href={redoLink}
                                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary/70 text-foreground font-semibold border border-border transition min-w-[140px]"
                                            >
                                                <PlayCircle size={18} /> Ôn tập chữ
                                            </Link>
                                            <Link
                                                href={dictationLink}
                                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition shadow-lg shadow-purple-500/20 min-w-[140px]"
                                            >
                                                <RotateCcw size={18} /> Shadowing
                                            </Link>
                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
