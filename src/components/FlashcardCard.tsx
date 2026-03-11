"use client";

import React, { useState } from "react";

interface FlashcardCardProps {
  word: string;
  meaning: string;
  pronunciation?: string;
  example?: string;
}

export default function FlashcardCard({
  word,
  meaning,
  pronunciation,
  example,
}: FlashcardCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="h-72 w-full cursor-pointer perspective"
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
          className={`absolute w-full h-full bg-gradient-to-br from-blue-600 to-blue-900 rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg border border-blue-500/30 ${
            isFlipped ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div className="text-center">
            <p className="text-sm text-blue-200 mb-4 font-medium uppercase tracking-wide">
              English Word
            </p>
            <h2 className="text-5xl font-bold text-white mb-4 break-words">
              {word}
            </h2>
            {pronunciation && (
              <p className="text-lg text-blue-100 italic">/{pronunciation}/</p>
            )}
            <p className="text-xs text-blue-300 mt-8">Click to flip</p>
          </div>
        </div>

        {/* Back side - Meaning */}
        <div
          className={`absolute w-full h-full bg-gradient-to-br from-purple-600 to-purple-900 rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg border border-purple-500/30 ${
            isFlipped ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="text-center">
            <p className="text-sm text-purple-200 mb-4 font-medium uppercase tracking-wide">
              Vietnamese Meaning
            </p>
            <h2 className="text-3xl font-bold text-white mb-6 break-words leading-relaxed">
              {meaning}
            </h2>
            {example && (
              <div className="mt-6 pt-6 border-t border-purple-400">
                <p className="text-xs text-purple-300 mb-2 font-semibold">
                  Example:
                </p>
                <p className="text-sm text-purple-100 italic">"{example}"</p>
              </div>
            )}
            <p className="text-xs text-purple-300 mt-8">Click to flip</p>
          </div>
        </div>
      </div>
    </div>
  );
}
