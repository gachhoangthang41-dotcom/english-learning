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
  business: [
    { id: 1, word: "Perseverance", meaning: "Sự kiên trì / Bền chí", pronunciation: "ˌpər-sə-ˈvir-ən(t)s", example: "Success requires perseverance and hard work." },
    { id: 2, word: "Consequence", meaning: "Hậu quả / Kết quả", pronunciation: "ˈkän-si-ˌkwen(t)s", example: "Every action has consequences." },
    { id: 3, word: "Contribute", meaning: "Đóng góp / Góp phần", pronunciation: "kən-ˈtri-ˌbyüt", example: "You can contribute to society through volunteering." },
    { id: 4, word: "Ambition", meaning: "Tham vọng / Lý tưởng", pronunciation: "am-ˈbi-shən", example: "His ambition is to become a successful entrepreneur." },
    { id: 5, word: "Strategy", meaning: "Chiến lược / Kế hoạch", pronunciation: "ˈstra-tə-jē", example: "We need a good business strategy." },
    { id: 6, word: "Negotiate", meaning: "Đàm phán / Thương lượng", pronunciation: "ni-ˈgō-shē-ˌāt", example: "We need to negotiate a better deal." },
    { id: 7, word: "Profit", meaning: "Lợi nhuận / Lợi tức", pronunciation: "ˈprä-fət", example: "The profit increased this year." },
    { id: 8, word: "Budget", meaning: "Ngân sách / Chi phí", pronunciation: "ˈbə-jət", example: "We need to create a budget." },
    { id: 9, word: "Deadline", meaning: "Hạn chót / Thời hạn", pronunciation: "ˈded-ˌlīn", example: "The deadline is next Friday." },
    { id: 10, word: "Teamwork", meaning: "Làm việc nhóm", pronunciation: "ˈtēm-ˌwərk", example: "Teamwork makes the dream work." },
    { id: 11, word: "Marketing", meaning: "Marketing / Tiếp thị", pronunciation: "ˈmär-kə-tiŋ", example: "Good marketing is essential for sales." },
    { id: 12, word: "Efficient", meaning: "Hiệu quả / Hiệu suất cao", pronunciation: "i-ˈfi-shənt", example: "We need efficient work processes." },
  ],
  travel: [
    { id: 1, word: "Adventure", meaning: "Cuộc phiêu lưu / Mạo hiểm", pronunciation: "əd-ˈven-chər", example: "I love adventure travel." },
    { id: 2, word: "Destination", meaning: "Điểm đến / Mục đích", pronunciation: "ˌdes-tə-ˈnā-shən", example: "Paris is a popular destination." },
    { id: 3, word: "Itinerary", meaning: "Lịch trình / Tuyến đường", pronunciation: "ī-ˈti-nə-ˌrer-ē", example: "I planned our travel itinerary." },
    { id: 4, word: "Resort", meaning: "Khu nghỉ dưỡng / Miền quê", pronunciation: "ri-ˈzȯrt", example: "We stayed at a beach resort." },
    { id: 5, word: "Culture", meaning: "Văn hóa / Nền văn minh", pronunciation: "ˈkəl-chər", example: "Japan has a rich culture." },
    { id: 6, word: "Museum", meaning: "Bảo tàng", pronunciation: "myü-ˈzē-əm", example: "Let's visit the museum." },
    { id: 7, word: "Monument", meaning: "Tượng đài / Di tích", pronunciation: "ˈmän-yə-mənt", example: "We visited the historical monuments." },
    { id: 8, word: "Passport", meaning: "Hộ chiếu", pronunciation: "ˈpa-ˌspȯrt", example: "I need my passport for international travel." },
    { id: 9, word: "Currency", meaning: "Đơn vị tiền tệ / Tiền", pronunciation: "ˈkər-ən-sē", example: "What is the local currency?" },
    { id: 10, word: "Accommodation", meaning: "Chỗ ở / Nơi lưu trú", pronunciation: "ə-ˌkä-mə-ˈdā-shən", example: "The accommodation was comfortable." },
    { id: 11, word: "Souvenir", meaning: "Kỷ niệm vật / Quà lưu niệm", pronunciation: "ˌsü-və-ˈnir", example: "I bought souvenirs for my friends." },
    { id: 12, word: "Explore", meaning: "Khám phá / Thám hiểm", pronunciation: "ik-ˈsplȯr", example: "Let's explore this city." },
  ],
  education: [
    { id: 1, word: "Academic", meaning: "Học tập / Học viện", pronunciation: "ə-ˈka-də-mik", example: "Academic performance is important." },
    { id: 2, word: "Scholar", meaning: "Nhà học giả / Sinh viên", pronunciation: "ˈskä-lər", example: "She is a brilliant scholar." },
    { id: 3, word: "Research", meaning: "Nghiên cứu", pronunciation: "ˈrē-ˌsərch", example: "He conducted important research." },
    { id: 4, word: "Laboratory", meaning: "Phòng thí nghiệm", pronunciation: "ˈla-brə-ˌtȯr-ē", example: "We work in the chemistry laboratory." },
    { id: 5, word: "Curriculum", meaning: "Chương trình học", pronunciation: "kə-ˈri-kyə-ləm", example: "The curriculum is comprehensive." },
    { id: 6, word: "Thesis", meaning: "Luận văn / Luận án", pronunciation: "ˈthē-səs", example: "I am writing my thesis." },
    { id: 7, word: "Seminar", meaning: "Hội thảo / Khóa học", pronunciation: "ˈse-mə-ˌnär", example: "We attended an academic seminar." },
    { id: 8, word: "Lecture", meaning: "Bài giảng / Buổi giảng", pronunciation: "ˈlek-chər", example: "The lecture was very informative." },
    { id: 9, word: "Scholarship", meaning: "Học bổng / Giải thưởng", pronunciation: "ˈskä-lər-ˌship", example: "She received a scholarship." },
    { id: 10, word: "Exam", meaning: "Kỳ thi / Bài kiểm tra", pronunciation: "ig-ˈzam", example: "The exam was difficult." },
    { id: 11, word: "Certify", meaning: "Chứng nhận / Cấp chứng chỉ", pronunciation: "ˈsər-tə-ˌfī", example: "This course will certify your skills." },
    { id: 12, word: "Discipline", meaning: "Ngành học / Kỉ luật", pronunciation: "ˈdi-sə-plən", example: "Medicine is a challenging discipline." },
  ],
  health: [
    { id: 1, word: "Patient", meaning: "Bệnh nhân", pronunciation: "ˈpā-shənt", example: "The patient is recovering well." },
    { id: 2, word: "Treatment", meaning: "Điều trị / Chữa trị", pronunciation: "ˈtrēt-mənt", example: "The treatment was successful." },
    { id: 3, word: "Medicine", meaning: "Thuốc / Y học", pronunciation: "ˈme-də-sən", example: "Take this medicine twice a day." },
    { id: 4, word: "Therapy", meaning: "Liệu pháp / Trị liệu", pronunciation: "ˈther-ə-pē", example: "Physical therapy helped a lot." },
    { id: 5, word: "Symptom", meaning: "Triệu chứng / Dấu hiệu", pronunciation: "ˈsim-təm", example: "What are your symptoms?" },
    { id: 6, word: "Diagnosis", meaning: "Chẩn đoán", pronunciation: "ˌdī-əg-ˈnō-səs", example: "The diagnosis was accurate." },
    { id: 7, word: "Surgery", meaning: "Phẫu thuật / Cuộc mổ", pronunciation: "ˈsər-jə-rē", example: "She needs surgery." },
    { id: 8, word: "Vaccine", meaning: "Vắc xin", pronunciation: "ˈvak-ˌsēn", example: "Get vaccinated for health." },
    { id: 9, word: "Hospital", meaning: "Bệnh viện", pronunciation: "ˈhä-spə-təl", example: "He went to the hospital." },
    { id: 10, word: "Wellness", meaning: "Sức khỏe / Trạng thái tốt", pronunciation: "ˈwel-nəs", example: "Wellness is a priority." },
    { id: 11, word: "Fitness", meaning: "Sức khỏe thể chất", pronunciation: "ˈfit-nəs", example: "Fitness requires regular exercise." },
    { id: 12, word: "Nutrition", meaning: "Dinh dưỡng", pronunciation: "nü-ˈtri-shən", example: "Good nutrition is essential." },
  ],
};

const TOPIC_TITLES: Record<string, string> = {
  business: "Business & Work",
  travel: "Travel & Culture",
  education: "Education & Academic",
  health: "Health & Wellness",
};

export default function B1TopicFlashcardPage() {
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
      recordLearningProgress("B1", currentCard.id, currentCard.word, currentCard.meaning);
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
            <p className="text-xs text-muted-foreground mt-1">B1 - Intermediate Level</p>
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
