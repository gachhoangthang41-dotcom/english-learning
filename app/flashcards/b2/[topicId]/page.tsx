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
  abstract: [
    { id: 1, word: "Pragmatic", meaning: "Thực dụng / Dựa trên thực tế", pronunciation: "prag-ˈma-tik", example: "A pragmatic approach to solving problems is often effective." },
    { id: 2, word: "Ambivalent", meaning: "Lưỡng lự / Có hai cảm xúc mâu thuẫn", pronunciation: "am-ˈbi-və-lənt", example: "She felt ambivalent about moving to a new city." },
    { id: 3, word: "Paradigm", meaning: "Mô hình / Mẫu thức", pronunciation: "ˈper-ə-ˌdīm", example: "The internet created a new paradigm for business." },
    { id: 4, word: "Hegemony", meaning: "Thống lĩnh / Quyền ưu thế", pronunciation: "hi-ˈje-mə-nē", example: "Cultural hegemony influences global standards." },
    { id: 5, word: "Abstraction", meaning: "Trừu tượng / Sự trừu tượng hóa", pronunciation: "ab-ˈstrak-shən", example: "Philosophy deals with abstraction." },
    { id: 6, word: "Ideology", meaning: "Ý thức hình thái", pronunciation: "ˌī-dē-ˈä-lə-jē", example: "Different ideologies shape societies." },
    { id: 7, word: "Autonomy", meaning: "Tính độc lập / Quyền tự chủ", pronunciation: "ȯ-ˈtä-nə-mē", example: "Individual autonomy is important." },
    { id: 8, word: "Dichotomy", meaning: "Sự chia đôi / Hai cái đối lập", pronunciation: "dī-ˈkä-tə-mē", example: "There is a dichotomy between theory and practice." },
    { id: 9, word: "Ontology", meaning: "Bản chất / Qui luật tồn tại", pronunciation: "än-ˈtä-lə-jē", example: "Ontology is a branch of philosophy." },
    { id: 10, word: "Epistemology", meaning: "Học thuyết về tri thức", pronunciation: "ə-ˌpis-tə-ˈmä-lə-jē", example: "Epistemology explores how we know things." },
    { id: 11, word: "Semantics", meaning: "Ngữ nghĩa / Ý nghĩa từ", pronunciation: "sə-ˈman-tiks", example: "Semantics studies meaning in language." },
    { id: 12, word: "Phenomenology", meaning: "Hiện tượng học", pronunciation: "ˌfe-nə-ˌmä-ˈnä-lə-jē", example: "Phenomenology is a philosophical approach." },
  ],
  technology: [
    { id: 1, word: "Facilitate", meaning: "Tạo điều kiện / Giúp dễ dàng", pronunciation: "fə-ˈsi-lə-ˌtāt", example: "Technology can facilitate better communication." },
    { id: 2, word: "Ubiquitous", meaning: "Có mặt ở khắp nơi", pronunciation: "yü-ˈbi-kwə-təs", example: "Smartphones have become ubiquitous in modern society." },
    { id: 3, word: "Algorithm", meaning: "Thuật toán", pronunciation: "ˈal-gə-ˌri-ðəm", example: "This algorithm solves the problem efficiently." },
    { id: 4, word: "Interface", meaning: "Giao diện / Gầu nối", pronunciation: "ˈin-tər-ˌfās", example: "The user interface is intuitive." },
    { id: 5, word: "Proliferate", meaning: "Phát triển nhanh / Nhân rộng", pronunciation: "prə-ˈli-fə-ˌrāt", example: "Digital devices proliferate daily." },
    { id: 6, word: "Virtualization", meaning: "Ảo hóa / Tạo ảo", pronunciation: "ˌvər-chə-ə-ˈlī-zā-shən", example: "Cloud computing uses virtualization." },
    { id: 7, word: "Encryption", meaning: "Mã hóa", pronunciation: "en-ˈkrip-shən", example: "Encryption protects sensitive data." },
    { id: 8, word: "Cybersecurity", meaning: "An toàn mạng", pronunciation: "ˌsī-bər-si-ˈkyu̇r-ə-tē", example: "Cybersecurity is increasingly important." },
    { id: 9, word: "IoT", meaning: "Internet of Things - Vạn vật kết nối", pronunciation: "ˌī-ō-ˈtē", example: "IoT devices collect vast amounts of data." },
    { id: 10, word: "Blockchain", meaning: "Chuỗi khối / Công nghệ blockchain", pronunciation: "ˈblok-ˌchān", example: "Blockchain technology is revolutionary." },
    { id: 11, word: "API", meaning: "Giao diện lập trình ứng dụng", pronunciation: "ˌā-ˌpē-ˈī", example: "The API enables third-party integration." },
    { id: 12, word: "Scalability", meaning: "Khả năng mở rộng", pronunciation: "ˌskā-lə-ˈbi-lə-tē", example: "Scalability is crucial for startups." },
  ],
  environment: [
    { id: 1, word: "Sustainability", meaning: "Tính bền vững", pronunciation: "sə-ˌstā-nə-ˈbi-lə-tē", example: "Sustainability is critical for our future." },
    { id: 2, word: "Ecological", meaning: "Thuộc sinh thái", pronunciation: "ˌē-kə-ˈlä-ji-kəl", example: "Ecological systems are interconnected." },
    { id: 3, word: "Biodiversity", meaning: "Đa dạng sinh học", pronunciation: "ˌbī-ō-di-ˈvər-sə-tē", example: "Biodiversity is essential for ecosystem health." },
    { id: 4, word: "Carbon", meaning: "Carbon / Cacbon", pronunciation: "ˈkär-bən", example: "Carbon emissions contribute to climate change." },
    { id: 5, word: "Mitigation", meaning: "Giảm thiểu / Làm dịu nhẹ", pronunciation: "ˌmi-tə-ˈgā-shən", example: "Climate mitigation requires global action." },
    { id: 6, word: "Renewable", meaning: "Có thể tái sinh / Tái tạo được", pronunciation: "ri-ˈnü-ə-bəl", example: "Renewable energy is the future." },
    { id: 7, word: "Deforestation", meaning: "Mất rừng / Phá rừng", pronunciation: "ˌdē-ˌfȯr-ə-ˈstā-shən", example: "Deforestation threatens wildlife." },
    { id: 8, word: "Pollution", meaning: "Ô nhiễm", pronunciation: "pə-ˈlü-shən", example: "Air pollution affects public health." },
    { id: 9, word: "Climate", meaning: "Khí hậu", pronunciation: "ˈklī-mət", example: "Climate change is accelerating." },
    { id: 10, word: "Ecosystem", meaning: "Hệ sinh thái", pronunciation: "ˈē-kō-ˌsis-təm", example: "Ecosystem balance is fragile." },
    { id: 11, word: "Conservation", meaning: "Bảo tồn / Bảo vệ", pronunciation: "ˌkän-sər-ˈvā-shən", example: "Conservation efforts are essential." },
    { id: 12, word: "Habitat", meaning: "Môi trường sống", pronunciation: "ˈha-bə-ˌtat", example: "Species lose habitat due to development." },
  ],
  society: [
    { id: 1, word: "Meticulous", meaning: "Tỉ mỉ / Cẩn thận", pronunciation: "mə-ˈti-kyə-ləs", example: "She is meticulous in her work." },
    { id: 2, word: "Ameliorate", meaning: "Cải thiện / Làm tốt hơn", pronunciation: "ə-ˈmēl-yə-ˌrāt", example: "New policies aim to ameliorate working conditions." },
    { id: 3, word: "Esoteric", meaning: "Bí mật / Chỉ dành cho những người hiểu biết", pronunciation: "ˌe-sə-ˈter-ik", example: "Quantum physics is often considered esoteric." },
    { id: 4, word: "Circumvent", meaning: "Vượt qua / Tránh né", pronunciation: "ˌsər-kəm-ˈvent", example: "He tried to circumvent the rules." },
    { id: 5, word: "Stratification", meaning: "Sự phân tầng xã hội", pronunciation: "ˌstra-tə-fi-ˈkā-shən", example: "Social stratification affects opportunities." },
    { id: 6, word: "Marginalize", meaning: "Coi thường / Loại ra ngoài lề", pronunciation: "ˈmär-jə-nə-ˌlīz", example: "Minorities are often marginalized." },
    { id: 7, word: "Dissident", meaning: "Người bất đồng chính kiến", pronunciation: "di-ˈsi-dənt", example: "The dissident spoke against the regime." },
    { id: 8, word: "Equity", meaning: "Công bằng / Công lý", pronunciation: "ˈe-kwə-tē", example: "Equity in education is important." },
    { id: 9, word: "Demographic", meaning: "Nhân khẩu học", pronunciation: "ˌde-mə-ˈgra-fik", example: "Demographic shifts affect policy." },
    { id: 10, word: "Cohesion", meaning: "Sự kết dính / Sự đoàn kết", pronunciation: "kō-ˈhē-zhən", example: "Social cohesion is fragile." },
    { id: 11, word: "Pluralism", meaning: "Chủ nghĩa đa nguyên", pronunciation: "ˈplu̇r-ə-ˌli-zəm", example: "Pluralism values diverse perspectives." },
    { id: 12, word: "Subjugation", meaning: "Sự áp chế / Sự nô lệ", pronunciation: "ˌsəb-jə-ˈgā-shən", example: "The history of subjugation is tragic." },
  ],
};

const TOPIC_TITLES: Record<string, string> = {
  abstract: "Abstract Concepts",
  technology: "Technology & Innovation",
  environment: "Environment & Sustainability",
  society: "Society & Culture",
};

export default function B2TopicFlashcardPage() {
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
      recordLearningProgress("B2", currentCard.id, currentCard.word, currentCard.meaning);
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
            <p className="text-xs text-muted-foreground mt-1">B2 - Upper-Intermediate Level</p>
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
