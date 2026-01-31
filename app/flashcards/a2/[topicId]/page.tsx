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

const TOPIC_DATA: Record<string, Flashcard[]> = {
  description: [
    { id: 1, word: "Beautiful", meaning: "Xinh đẹp", pronunciation: "ˈbyü-tə-fəl", example: "She has a beautiful smile." },
    { id: 2, word: "Expensive", meaning: "Đắt", pronunciation: "ik-ˈspen-siv", example: "This restaurant is expensive." },
    { id: 3, word: "Difficult", meaning: "Khó", pronunciation: "ˈdi-fi-kəlt", example: "This exam is difficult." },
    { id: 4, word: "Interesting", meaning: "Thú vị", pronunciation: "ˈin-trə-stəŋ", example: "That movie is interesting." },
    { id: 5, word: "Busy", meaning: "Bận rộn", pronunciation: "ˈbi-zē", example: "I am busy today." },
    { id: 6, word: "Happy", meaning: "Hạnh phúc", pronunciation: "ˈha-pē", example: "I am very happy." },
    { id: 7, word: "Sad", meaning: "Buồn", pronunciation: "ˈsad", example: "He looks sad today." },
    { id: 8, word: "Tired", meaning: "Mệt", pronunciation: "ˈtī(-ə)rd", example: "I am tired after work." },
    { id: 9, word: "Angry", meaning: "Tức giận", pronunciation: "ˈaŋ-ɡrē", example: "He is angry now." },
    { id: 10, word: "Calm", meaning: "Yên tĩnh", pronunciation: "ˈkälm", example: "Stay calm please." },
  ],
  food: [
    { id: 1, word: "Apple", meaning: "Táo", pronunciation: "ˈa-pəl", example: "I eat an apple daily." },
    { id: 2, word: "Bread", meaning: "Bánh mì", pronunciation: "ˈbred", example: "Bread is my favorite food." },
    { id: 3, word: "Cheese", meaning: "Pho mát", pronunciation: "ˈchēz", example: "This cheese is delicious." },
    { id: 4, word: "Chicken", meaning: "Gà", pronunciation: "ˈchi-kən", example: "Chicken is healthy." },
    { id: 5, word: "Coffee", meaning: "Cà phê", pronunciation: "ˈkȯ-fē", example: "I drink coffee every morning." },
    { id: 6, word: "Egg", meaning: "Trứng", pronunciation: "ˈeg", example: "Eggs are nutritious." },
    { id: 7, word: "Fish", meaning: "Cá", pronunciation: "ˈfish", example: "Fish is healthy food." },
    { id: 8, word: "Fruit", meaning: "Trái cây", pronunciation: "ˈfrüt", example: "Eat more fruit." },
    { id: 9, word: "Milk", meaning: "Sữa", pronunciation: "ˈmilk", example: "Milk is good for children." },
    { id: 10, word: "Rice", meaning: "Cơm", pronunciation: "ˈrīs", example: "Rice is my staple food." },
    { id: 11, word: "Tea", meaning: "Trà", pronunciation: "ˈtē", example: "Tea is relaxing." },
    { id: 12, word: "Water", meaning: "Nước", pronunciation: "ˈwȯ-tər", example: "Drink plenty of water." },
  ],
  shopping: [
    { id: 1, word: "Buy", meaning: "Mua", pronunciation: "ˈbī", example: "I want to buy a new shirt." },
    { id: 2, word: "Cheap", meaning: "Rẻ", pronunciation: "ˈchēp", example: "This is cheap." },
    { id: 3, word: "Cost", meaning: "Giá cả", pronunciation: "ˈkȯst", example: "How much does it cost?" },
    { id: 4, word: "Money", meaning: "Tiền", pronunciation: "ˈmə-nē", example: "I have no money." },
    { id: 5, word: "Price", meaning: "Giá", pronunciation: "ˈprīs", example: "The price is too high." },
    { id: 6, word: "Sell", meaning: "Bán", pronunciation: "ˈsel", example: "They sell clothes here." },
    { id: 7, word: "Shop", meaning: "Cửa hàng", pronunciation: "ˈshäp", example: "I went to the shop." },
    { id: 8, word: "Store", meaning: "Cửa hàng / Kho", pronunciation: "ˈstȯr", example: "This store is big." },
    { id: 9, word: "Dollar", meaning: "Đô la", pronunciation: "ˈdä-lər", example: "How many dollars?" },
    { id: 10, word: "Pay", meaning: "Trả tiền", pronunciation: "ˈpā", example: "I need to pay now." },
  ],
  hobbies: [
    { id: 1, word: "Art", meaning: "Nghệ thuật", pronunciation: "ˈärt", example: "I love art." },
    { id: 2, word: "Book", meaning: "Sách", pronunciation: "ˈbuk", example: "I am reading a book." },
    { id: 3, word: "Dance", meaning: "Múa / Nhảy", pronunciation: "ˈdan(t)s", example: "She likes to dance." },
    { id: 4, word: "Draw", meaning: "Vẽ", pronunciation: "ˈdrȯ", example: "I like to draw." },
    { id: 5, word: "Game", meaning: "Trò chơi", pronunciation: "ˈɡām", example: "Let's play a game." },
    { id: 6, word: "Music", meaning: "Âm nhạc", pronunciation: "ˈmyü-zik", example: "I love music." },
    { id: 7, word: "Paint", meaning: "Vẽ / Sơn", pronunciation: "ˈpānt", example: "She paints beautifully." },
    { id: 8, word: "Sing", meaning: "Hát", pronunciation: "ˈsiŋ", example: "I like to sing." },
    { id: 9, word: "Sport", meaning: "Thể thao", pronunciation: "ˈspȯrt", example: "Football is my favorite sport." },
    { id: 10, word: "Watch", meaning: "Xem", pronunciation: "ˈwȯch", example: "I watch movies on weekends." },
  ],
};

const TOPIC_TITLES: Record<string, string> = {
  description: "Adjectives & Description",
  food: "Food & Drinks",
  shopping: "Shopping & Money",
  hobbies: "Hobbies & Interests",
};

export default function A2TopicFlashcardPage() {
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
      recordLearningProgress("A2", currentCard.id, currentCard.word, currentCard.meaning);
    }
    
    if (currentIndex === flashcards.length - 1) {
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
            <p className="text-xs text-muted-foreground mt-1">A2 - Elementary Level</p>
          </div>

          <div className="w-16 text-right">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {currentIndex + 1}/{flashcards.length}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 py-8">
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

          <div className="flex flex-col items-center gap-8">
            <div className="w-full max-w-2xl">
              <FlashcardCard
                word={currentCard.word}
                meaning={currentCard.meaning}
                pronunciation={currentCard.pronunciation}
                example={currentCard.example}
              />
            </div>

            <button
              onClick={() => speakWord(currentCard.word)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition shadow-lg shadow-blue-500/20"
            >
              <Volume2 className="w-5 h-5" />
              Hear Pronunciation
            </button>

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
