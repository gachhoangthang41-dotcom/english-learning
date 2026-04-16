"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useLanguage } from '@/views/components/language-provider';
import { LESSONS_BY_LEVEL, type LessonContent } from '@/models/data/a1-lessons';

type RouteParams = {
    levelId?: string | string[];
    topicId?: string | string[];
};

export default function TranscriptPage() {
    const params = useParams<RouteParams>();
    const { language } = useLanguage();
    const isEnglish = language === "en";
    const copy = isEnglish
        ? {
            missingTranscript: "No transcript available.",
            noTranscriptContent: "No transcript content available.",
            transcriptLabel: "TRANSCRIPT",
            defaultTitle: `Lesson ${params?.topicId}`,
        }
        : {
            missingTranscript: "Chưa có transcript.",
            noTranscriptContent: "Chưa có nội dung transcript.",
            transcriptLabel: "BẢN DỊCH",
            defaultTitle: `Bài ${params?.topicId}`,
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

    const levelId = String(params?.levelId ?? "a1").toLowerCase();
    const topicId = Array.isArray(params?.topicId)
        ? params?.topicId?.[0]
        : params?.topicId;

    const topicIdStr = String(topicId ?? "1");

    // ✅ Lấy lesson theo level
    const lessonsOfLevel = LESSONS_BY_LEVEL[levelId] ?? LESSONS_BY_LEVEL["a1"];

    const lesson = useMemo<LessonContent>(() => {
        return (
            lessonsOfLevel[topicIdStr] || {
                title: copy.defaultTitle,
                subtitle: `LESSON ${topicIdStr}`,
                videoSrc: "",
                transcript: copy.missingTranscript,
                segments: [],
            }
        );
    }, [copy.missingTranscript, copy.defaultTitle, lessonsOfLevel, topicIdStr]);

    const englishTitle = lesson.title || copy.defaultTitle;
    const localizedTitle = isEnglish ? englishTitle : (lesson.title ? (titleViMap[lesson.title] || lesson.title) : copy.defaultTitle);

    // ✅ Helper: Format giây -> MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    // ✅ Helper: Chia text theo segment (giống logic ở trang Learn)
    const segmentsWithText = useMemo(() => {
        if (!lesson.transcript || !lesson.segments.length) return [];

        // Tách transcript thành mảng từ
        // Giữ lại dấu câu để hiển thị đẹp hơn
        const words = lesson.transcript.trim().split(/\s+/);
        const totalSegments = lesson.segments.length;

        // Số từ trung bình mỗi đoạn
        const wordsPerSegment = Math.ceil(words.length / totalSegments);

        return lesson.segments.map((seg, index) => {
            const startWord = index * wordsPerSegment;
            const endWord = Math.min((index + 1) * wordsPerSegment, words.length);
            const text = words.slice(startWord, endWord).join(" ");

            return {
                ...seg,
                text,
                index,
            };
        });
    }, [lesson]);

    return (
        <div className="min-h-screen bg-[#020617] text-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* HEADER */}
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href={`/learn/${levelId}/${topicIdStr}`}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
                    >
                        <ChevronLeft size={24} />
                    </Link>

                    <div>
                        <div className="text-sm font-bold text-blue-400 uppercase tracking-wider">
                            {copy.transcriptLabel}
                        </div>
                        <h1 className="text-xl md:text-2xl font-bold text-white">
                            {localizedTitle}
                        </h1>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    {segmentsWithText.length > 0 ? (
                        <div className="divide-y divide-white/5 max-h-[80vh] overflow-y-auto">
                            {segmentsWithText.map((item) => (
                                <div
                                    key={item.index}
                                    className="group flex flex-col md:flex-row gap-4 p-4 md:p-6 hover:bg-white/5 transition"
                                >
                                    {/* Cột thời gian */}
                                    <div className="shrink-0 w-32 pt-1">
                                        <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-mono border border-blue-500/20 group-hover:bg-blue-500/20 transition">
                                            {formatTime(item.start)} - {formatTime(item.end)}
                                        </div>
                                    </div>

                                    {/* Cột nội dung */}
                                    <div className="flex-1 text-slate-300 text-base md:text-lg leading-relaxed">
                                        {item.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-10 text-center text-slate-400 italic">
                            {lesson.transcript || copy.noTranscriptContent}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
