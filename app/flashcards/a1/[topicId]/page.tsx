"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Volume2, Home } from "lucide-react";
import FlashcardCard from "@/components/FlashcardCard";

interface Flashcard {
  id: number;
  word: string;
  meaning: string;
  pronunciation: string;
  example: string;
}

// Data for each topic
const TOPIC_DATA: Record<string, Flashcard[]> = {
  basics: [
    { id: 1, word: "Hello", meaning: "Xin chào", pronunciation: "hə-ˈlō", example: "Hello, how are you?" },
    { id: 2, word: "Thank you", meaning: "Cảm ơn", pronunciation: "ˈθaŋk ˌyü", example: "Thank you for helping me." },
    { id: 3, word: "Please", meaning: "Vui lòng / Xin", pronunciation: "ˈplēz", example: "Please sit down." },
    { id: 4, word: "Goodbye", meaning: "Tạm biệt", pronunciation: "ˌɡud-ˈbī", example: "Goodbye, see you tomorrow." },
    { id: 5, word: "Yes", meaning: "Có / Vâng", pronunciation: "ˈyes", example: "Yes, I agree." },
    { id: 6, word: "No", meaning: "Không", pronunciation: "ˈnō", example: "No, thank you." },
    { id: 7, word: "Sorry", meaning: "Xin lỗi / Tôi xin lỗi", pronunciation: "ˈsɑr-ē", example: "Sorry, I made a mistake." },
    { id: 8, word: "Excuse me", meaning: "Xin lỗi / Tôi cần...", pronunciation: "ik-ˈskyüz ˈmē", example: "Excuse me, where is the toilet?" },
    { id: 9, word: "Nice to meet you", meaning: "Rất vui được gặp bạn", pronunciation: "ˈnīs tə ˈmēt ˌyü", example: "Nice to meet you!" },
    { id: 10, word: "How are you?", meaning: "Bạn khỏe không?", pronunciation: "ˈhau ˈar ˌyü", example: "How are you today?" },
  ],
  family: [
    { id: 1, word: "Mother", meaning: "Mẹ", pronunciation: "ˈmə-t͟hər", example: "My mother is very kind." },
    { id: 2, word: "Father", meaning: "Bố / Cha", pronunciation: "ˈfä-t͟hər", example: "My father works hard." },
    { id: 3, word: "Sister", meaning: "Chị / Em gái", pronunciation: "ˈsis-tər", example: "I have one sister." },
    { id: 4, word: "Brother", meaning: "Anh / Em trai", pronunciation: "ˈbru̇-t͟hər", example: "My brother is younger than me." },
    { id: 5, word: "Grandmother", meaning: "Bà ngoại / Bà nội", pronunciation: "ˈɡran-ˌmu̇-t͟hər", example: "I love my grandmother." },
    { id: 6, word: "Grandfather", meaning: "Ông ngoại / Ông nội", pronunciation: "ˈɡran-ˌfä-t͟hər", example: "My grandfather is very old." },
    { id: 7, word: "Son", meaning: "Con trai", pronunciation: "ˈsən", example: "They have a son and a daughter." },
    { id: 8, word: "Daughter", meaning: "Con gái", pronunciation: "ˈdȯ-tər", example: "Their daughter is a doctor." },
  ],
  numbers: [
    { id: 1, word: "One", meaning: "Một", pronunciation: "ˈwən", example: "I have one book." },
    { id: 2, word: "Two", meaning: "Hai", pronunciation: "ˈtü", example: "I have two apples." },
    { id: 3, word: "Three", meaning: "Ba", pronunciation: "ˈt͟hrē", example: "Three is my lucky number." },
    { id: 4, word: "Red", meaning: "Đỏ", pronunciation: "ˈred", example: "The car is red." },
    { id: 5, word: "Blue", meaning: "Xanh dương", pronunciation: "ˈblü", example: "The sky is blue." },
    { id: 6, word: "Green", meaning: "Xanh lá", pronunciation: "ˈɡrēn", example: "Green is my favorite color." },
    { id: 7, word: "Yellow", meaning: "Vàng", pronunciation: "ˈye-ō", example: "The sun is yellow." },
    { id: 8, word: "Big", meaning: "Lớn", pronunciation: "ˈbiɡ", example: "That is a big house." },
    { id: 9, word: "Small", meaning: "Nhỏ", pronunciation: "ˈsmȯl", example: "The cat is small." },
    { id: 10, word: "White", meaning: "Trắng", pronunciation: "ˈ(h)wīt", example: "The wall is white." },
    { id: 11, word: "Black", meaning: "Đen", pronunciation: "ˈblak", example: "He is wearing black shoes." },
    { id: 12, word: "Long", meaning: "Dài", pronunciation: "ˈlȯŋ", example: "She has long hair." },
  ],
  daily: [
    { id: 1, word: "Wake up", meaning: "Thức dậy", pronunciation: "ˈwāk ˈəp", example: "I wake up at 7 AM." },
    { id: 2, word: "Sleep", meaning: "Ngủ", pronunciation: "ˈslēp", example: "I sleep 8 hours every night." },
    { id: 3, word: "Eat", meaning: "Ăn", pronunciation: "ˈēt", example: "We eat breakfast at 7 AM." },
    { id: 4, word: "Drink", meaning: "Uống", pronunciation: "ˈdriŋk", example: "Drink plenty of water." },
    { id: 5, word: "Work", meaning: "Làm việc", pronunciation: "ˈwərk", example: "I work at a company." },
    { id: 6, word: "Play", meaning: "Chơi", pronunciation: "ˈplā", example: "Children play in the park." },
    { id: 7, word: "Study", meaning: "Học / Học tập", pronunciation: "ˈstə-dē", example: "I study English every day." },
    { id: 8, word: "Walk", meaning: "Đi bộ", pronunciation: "ˈwȯk", example: "I like to walk in the morning." },
    { id: 9, word: "Run", meaning: "Chạy", pronunciation: "ˈrən", example: "He runs every morning." },
    { id: 10, word: "Sit", meaning: "Ngồi", pronunciation: "ˈsit", example: "Please sit down." },
  ],
};

const TOPIC_TITLES: Record<string, string> = {
  basics: "Greetings & Basics",
  family: "Family & People",
  numbers: "Numbers & Colors",
  daily: "Daily Activities",
};

export default function A1TopicFlashcardPage() {
  const router = useRouter();
  const params = useParams();
  const topicId = params.topicId as string;
  
  const flashcards = TOPIC_DATA[topicId] || [];
  const topicTitle = TOPIC_TITLES[topicId] || "Flashcards";
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedCards, setCompletedCards] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentCard = flashcards[currentIndex];
  const progress = Math.round(((currentIndex + 1) / flashcards.length) * 100);

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

  const handleMarkComplete = (isLearned: boolean) => {
    if (isLearned && !completedCards.includes(currentCard.id)) {
      setCompletedCards([...completedCards, currentCard.id]);
      recordLearningProgress("A1", currentCard.id, currentCard.word, currentCard.meaning);
    }
    
    if (currentIndex === flashcards.length - 1) {
      // Finished - show "Go to Home" button
      setIsFinished(true);
    } else {
      handleNext();
    }
  };

  const recordLearningProgress = async (level: string, wordId: number, word: string, meaning: string) => {
    try {
      const res = await fetch("/api/learning/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ level, wordId, word, meaning }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        console.error("Failed to record learning progress:", res.status, data);
      } else {
        console.log("Word learned recorded:", data);
      }
    } catch (e) {
      console.error("Error recording learning progress:", e);
    }
  };

  const speakWord = (word: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!currentCard) {
    return <div>Loading...</div>;
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
            <span className="font-semibold hidden sm:inline">Back</span>
          </button>

          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold">{topicTitle}</h1>
            <p className="text-xs text-muted-foreground mt-1">A1 - Beginner Level</p>
          </div>

          <div className="w-16 text-right">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {currentIndex + 1}/{flashcards.length}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 py-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-foreground">Progress</span>
              <span className="text-xs text-muted-foreground">
                {progress}% ({completedCards.length}/{flashcards.length})
              </span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Flashcard Container */}
          <div className="flex flex-col items-center gap-8">
            {/* Current Card */}
            <div className="w-full max-w-2xl">
              <FlashcardCard
                word={currentCard.word}
                meaning={currentCard.meaning}
                pronunciation={currentCard.pronunciation}
                example={currentCard.example}
              />
            </div>

            {/* Audio Button */}
            <button
              onClick={() => speakWord(currentCard.word)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition shadow-lg shadow-blue-500/20"
            >
              <Volume2 className="w-5 h-5" />
              Hear Pronunciation
            </button>

            {/* Navigation Buttons */}
            <div className="flex gap-4 w-full max-w-2xl">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-secondary hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              <button
                onClick={() => handleMarkComplete(true)}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-semibold transition shadow-lg shadow-green-500/20"
              >
                Đã thuộc
              </button>

              <button
                onClick={() => handleMarkComplete(false)}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-semibold transition shadow-lg shadow-purple-500/20"
              >
                Chưa thuộc
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === flashcards.length - 1}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-secondary hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Finished State - Show Go to Home Button */}
            {isFinished && (
              <div className="w-full max-w-2xl mt-8">
                <button
                  onClick={() => router.push("/home")}
                  className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-lg transition shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Trở về trang chủ
                </button>
              </div>
            )}

            {/* Stats */}
            <div className="w-full max-w-2xl grid grid-cols-3 gap-4 mt-8">
              <div className="rounded-xl bg-card p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground font-semibold mb-1">COMPLETED</p>
                <p className="text-2xl font-bold text-green-600">{completedCards.length}</p>
              </div>
              <div className="rounded-xl bg-card p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground font-semibold mb-1">CURRENT</p>
                <p className="text-2xl font-bold text-blue-600">{currentIndex + 1}</p>
              </div>
              <div className="rounded-xl bg-card p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground font-semibold mb-1">TOTAL</p>
                <p className="text-2xl font-bold text-purple-600">{flashcards.length}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
