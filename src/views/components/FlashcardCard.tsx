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
  const [displayPronunciation, setDisplayPronunciation] = useState(pronunciation);
  const [displayPartOfSpeech, setDisplayPartOfSpeech] = useState(partOfSpeech);
  const [displayMeaning, setDisplayMeaning] = useState(meaning);

  React.useEffect(() => {
    setDisplayPronunciation(pronunciation);
    setDisplayPartOfSpeech(partOfSpeech);
    setDisplayMeaning(meaning);

    const isEnglishMeaning = meaning && /^[a-zA-Z0-9\s,\.\-'"!]+$/.test(meaning);
    if (!pronunciation || !partOfSpeech || isEnglishMeaning) {
      fetch(`/api/dictionary/autofill?word=${word}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success" && data.data) {
            if (!pronunciation && data.data.pronunciation) {
              setDisplayPronunciation(data.data.pronunciation);
            }
            if (!partOfSpeech && data.data.partOfSpeech) {
              setDisplayPartOfSpeech(data.data.partOfSpeech);
            }
            if (isEnglishMeaning && data.data.meaning) {
              setDisplayMeaning(data.data.meaning);
            }
          }
        })
        .catch(console.error);
    }
  }, [word, pronunciation, partOfSpeech, meaning]);

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

  const playAudio = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      console.debug("[playAudio] requesting pronunciation for:", word);
      const res = await fetch(`/api/pronunciation?text=${encodeURIComponent(word)}`);
      console.debug("[playAudio] /api/pronunciation status:", res.status);

      if (res.ok) {
        const contentType = (res.headers.get("content-type") || "").toLowerCase();
        console.debug("[playAudio] content-type:", contentType);

        if (contentType.startsWith("audio/") || contentType === "application/octet-stream") {
          const blob = await res.blob();
          console.debug("[playAudio] blob size:", blob.size, "type:", blob.type);

          if (!blob.size || blob.size < 200) {
            console.warn("[playAudio] audio blob empty or too small, falling back to TTS");
            throw new Error("empty-audio-blob");
          }

          const url = URL.createObjectURL(blob);
          const audio = new Audio();
          audio.src = url;
          audio.preload = "auto";

          audio.addEventListener("error", () => {
            console.error("[playAudio] audio element error:", audio.error);
          });

          try {
            await audio.play();
            // revoke after playback ends or after timeout
            audio.addEventListener("ended", () => URL.revokeObjectURL(url));
            setTimeout(() => URL.revokeObjectURL(url), 30000);
            return;
          } catch (err) {
            console.error("[playAudio] audio.play() failed:", err);
            throw err;
          }
        }

        // not an audio binary -> try parse JSON for a URL
        let json: any = null;
        try {
          json = await res.json();
        } catch (e) {
          const txt = await res.text().catch(() => "");
          console.debug("[playAudio] non-json response text:", txt);
          json = { text: txt };
        }

        console.debug("[playAudio] upstream JSON:", json);
        const audioUrl = json?.data?.url || json?.url || null;
        if (audioUrl) {
          try {
            const audio = new Audio(audioUrl);
            await audio.play();
            return;
          } catch (err) {
            console.error("[playAudio] playing upstream audioUrl failed:", err);
          }
        }
      } else {
        console.warn("[playAudio] /api/pronunciation returned non-ok status", res.status);
      }
    } catch (err) {
      console.error("[playAudio] pronunciation flow error:", err);
    }

    // final fallback: browser TTS
    try {
      console.debug("[playAudio] falling back to SpeechSynthesis for:", word);
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error("[playAudio] SpeechSynthesis fallback failed:", err);
    }
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

          <h2 className="text-[2.75rem] font-bold text-black break-words">
            {word}
          </h2>
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
            {displayPartOfSpeech && (
              <p className="text-xl font-semibold text-blue-600 mb-1">{displayPartOfSpeech}</p>
            )}
            
            {displayPronunciation && (
              <p className="text-xl text-gray-500 mb-4">
                {displayPronunciation.startsWith('/') ? displayPronunciation : `/${displayPronunciation}/`}
              </p>
            )}

            <h2 className="text-3xl font-bold text-black mb-4 break-words leading-snug">
              {displayMeaning}
            </h2>
            {renderExample()}
          </div>
        </div>
      </div>
    </div>
  );
}
