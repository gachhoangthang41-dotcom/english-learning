"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Volume2, Loader2, Edit2, X, Save } from "lucide-react";
import FlashcardCard from "@/components/FlashcardCard";

interface SavedWord {
    id: string;
    wordId: number;
    word: string;
    meaning: string;
    pronunciation?: string;
    partOfSpeech?: string;
    learnedAt: string;
}

export default function SavedFlashcardsPage() {
    const router = useRouter();
    const [flashcards, setFlashcards] = useState<SavedWord[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ meaning: "", pronunciation: "", partOfSpeech: "" });
    const [isSaving, setIsSaving] = useState(false);
    const [isAutofilling, setIsAutofilling] = useState(false);

    useEffect(() => {
        fetch("/api/dictionary")
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "success") {
                    setFlashcards(data.data || []);
                }
            })
            .catch((err) => console.error("Error fetching saved words:", err))
            .finally(() => setLoading(false));
    }, []);

    const handleNext = () => {
        if (currentIndex < flashcards.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const speakWord = (word: string) => {
        if ("speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = "en-US";
            window.speechSynthesis.speak(utterance);
        }
    };

    const handleEditClick = async () => {
        const current = flashcards[currentIndex];
        
        setEditForm({
            meaning: current.meaning || "",
            pronunciation: current.pronunciation || "",
            partOfSpeech: current.partOfSpeech || ""
        });
        setIsEditing(true);

        const isEnglishMeaning = current.meaning && /^[a-zA-Z0-9\s,\.\-'"!]+$/.test(current.meaning);
        const needsAutofill = !current.pronunciation || !current.partOfSpeech || !current.meaning || isEnglishMeaning;

        if (needsAutofill) {
            setIsAutofilling(true);
            try {
                const res = await fetch(`/api/dictionary/autofill?word=${current.word}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.status === "success" && data.data) {
                        setEditForm(prev => ({
                            meaning: (prev.meaning && !isEnglishMeaning) ? prev.meaning : (data.data.meaning || prev.meaning),
                            pronunciation: prev.pronunciation || data.data.pronunciation || prev.pronunciation,
                            partOfSpeech: prev.partOfSpeech || data.data.partOfSpeech || prev.partOfSpeech
                        }));
                    }
                }
            } catch (error) {
                console.error("Autofill error:", error);
            } finally {
                setIsAutofilling(false);
            }
        }
    };

    const handleSaveEdit = async () => {
        setIsSaving(true);
        const current = flashcards[currentIndex];
        try {
            const res = await fetch("/api/dictionary", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    wordId: current.wordId,
                    meaning: editForm.meaning,
                    pronunciation: editForm.pronunciation,
                    partOfSpeech: editForm.partOfSpeech
                })
            });
            const data = await res.json();
            if (data.status === "success") {
                const updatedFlashcards = [...flashcards];
                updatedFlashcards[currentIndex] = {
                    ...current,
                    meaning: editForm.meaning,
                    pronunciation: editForm.pronunciation,
                    partOfSpeech: editForm.partOfSpeech
                };
                setFlashcards(updatedFlashcards);
                setIsEditing(false);
            } else {
                alert("Lỗi cập nhật: " + data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Lỗi kết nối");
        } finally {
            setIsSaving(false);
        }
    };
    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
                <p className="text-muted-foreground font-semibold">Đang tải thẻ ghi nhớ của bạn...</p>
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
                        className="flex items-center gap-2 text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="font-semibold hidden sm:inline">Trở Về</span>
                    </button>

                    <div className="flex-1 text-center">
                        <h1 className="text-xl font-bold text-foreground">Từ vựng đã lưu</h1>
                        <p className="text-xs text-muted-foreground mt-1">Ôn tập các từ vựng bạn đã đánh dấu</p>
                    </div>

                    <div className="w-16 text-right">
                        {flashcards.length > 0 && (
                            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                {currentIndex + 1}/{flashcards.length}
                            </span>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                <div className="mx-auto max-w-4xl px-5 lg:px-8 py-10 md:py-16">
                    {flashcards.length === 0 ? (
                        <div className="text-center py-20 bg-card border border-border rounded-xl">
                            <span className="text-6xl mb-4 block">📚</span>
                            <h2 className="text-2xl font-bold text-foreground mb-2">Chưa có từ vựng nào</h2>
                            <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                                Bạn chưa lưu từ vựng nào trong quá trình học. Hãy click vào các từ mới trong bài học để lưu vào đây nhé!
                            </p>
                            <button
                                onClick={() => router.push("/home")}
                                className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition shadow-lg shadow-blue-500/20"
                            >
                                Trở về Trang Chủ
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-8">

                            {/* Current Card */}
                            <div className="w-full max-w-2xl">
                                <FlashcardCard
                                    word={flashcards[currentIndex].word}
                                    meaning={flashcards[currentIndex].meaning}
                                    pronunciation={flashcards[currentIndex].pronunciation}
                                    partOfSpeech={flashcards[currentIndex].partOfSpeech}
                                    example=""
                                />
                            </div>

                            {/* Actions Group: Audio and Edit */}
                            <div className="flex items-center justify-center gap-4 w-full max-w-2xl">
                                <button
                                    onClick={() => speakWord(flashcards[currentIndex].word)}
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition shadow-lg shadow-blue-500/20"
                                >
                                    <Volume2 className="w-5 h-5" />
                                    Phát âm
                                </button>
                                <button
                                    onClick={handleEditClick}
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold transition border border-border shadow-sm"
                                >
                                    <Edit2 className="w-5 h-5" />
                                    Chỉnh sửa
                                </button>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex gap-4 w-full max-w-2xl">
                                <button
                                    onClick={handlePrev}
                                    disabled={currentIndex === 0}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-secondary hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                    Trước
                                </button>

                                <button
                                    onClick={handleNext}
                                    disabled={currentIndex === flashcards.length - 1}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-secondary hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
                                >
                                    Tiếp
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>

                        </div>
                    )}
                </div>
            </main>

            {/* Edit Modal */}
            {isEditing && flashcards.length > 0 && (
                <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-card w-full max-w-md rounded-2xl p-6 shadow-2xl border border-border">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-foreground">
                                Chỉnh sửa từ: <span className="text-blue-500">{flashcards[currentIndex].word}</span>
                                {isAutofilling && <Loader2 className="inline-block w-4 h-4 ml-2 animate-spin text-muted-foreground" />}
                            </h3>
                            <button onClick={() => setIsEditing(false)} className="text-muted-foreground hover:text-foreground">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Nghĩa tiếng Việt</label>
                                <input
                                    type="text"
                                    value={editForm.meaning}
                                    onChange={(e) => setEditForm({...editForm, meaning: e.target.value})}
                                    className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Phiên âm</label>
                                <input
                                    type="text"
                                    value={editForm.pronunciation}
                                    onChange={(e) => setEditForm({...editForm, pronunciation: e.target.value})}
                                    className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-blue-500"
                                    placeholder="Ví dụ: /ˈbrɛkfəst/"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Loại từ</label>
                                <input
                                    type="text"
                                    value={editForm.partOfSpeech}
                                    onChange={(e) => setEditForm({...editForm, partOfSpeech: e.target.value})}
                                    className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-blue-500"
                                    placeholder="Danh từ, Động từ..."
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end gap-3">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-5 py-2.5 rounded-xl bg-secondary text-foreground hover:bg-secondary/80 font-semibold transition"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition shadow-lg shadow-blue-500/20 disabled:opacity-50"
                            >
                                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                Lưu thay đổi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
