"use client";

import React, { useState } from "react";
import { Volume2 } from "lucide-react";

interface FlashcardCardProps {
  word: string;
  meaning: string;
  pronunciation?: string;
  example?: string;
  partOfSpeech?: string;
}

export default function FlashcardCard({
  word,
  meaning,
  pronunciation,
  example,
  partOfSpeech,
}: FlashcardCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const renderExample = () => {
    if (!example) return null;
    if (!word) return <p className="text-2xl text-black">{example}</p>;

    const regex = new RegExp(`(${word})`, "gi");
    const parts = example.split(regex);

    return (
      <p className="text-2xl text-black">
        {parts.map((part, i) =>
          part.toLowerCase() === word.toLowerCase() ? (
            <strong key={i} className="font-bold text-black">
              {part}
            </strong>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </p>
    );
  };

  const playAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="h-[28rem] w-full max-w-2xl mx-auto cursor-pointer perspective"
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-gpu ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front side - Word */}
        <div
          className={`absolute w-full h-full bg-white rounded-[2.5rem] p-10 flex flex-col items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 ${
            isFlipped ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <button
            onClick={playAudio}
            className="w-16 h-16 bg-[#1877F2] rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition shadow-md mb-8"
          >
            <Volume2 className="w-8 h-8 ml-[-2px]" />
          </button>

          <h2 className="text-[2.75rem] font-bold text-black mb-3 break-words">
            {word}
          </h2>

          {partOfSpeech && (
            <p className="text-2xl text-black mb-2">{partOfSpeech}</p>
          )}

          {pronunciation && (
            <p className="text-2xl text-black">/{pronunciation}/</p>
          )}
        </div>

        {/* Back side - Meaning */}
        <div
          className={`absolute w-full h-full bg-white rounded-[2.5rem] p-10 flex flex-col items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 ${
            isFlipped ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="text-center w-full">
            <h2 className="text-3xl font-bold text-black mb-4 break-words leading-snug">
              {meaning}
            </h2>
            {renderExample()}
          </div>
        </div>
      </div>
    </div>
  );
}
