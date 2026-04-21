export type FlashcardReviewStatus = "known" | "unknown";

export const FLASHCARD_REVIEW_LEVELS: Record<FlashcardReviewStatus, string> = {
  known: "FLASHCARD_KNOWN",
  unknown: "FLASHCARD_UNKNOWN",
};

export function normalizeFlashcardWord(word: string) {
  return word
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getFlashcardWordId(word: string) {
  const normalizedWord = normalizeFlashcardWord(word) || word.trim().toLowerCase();
  let hash = 0;

  for (let index = 0; index < normalizedWord.length; index += 1) {
    hash = Math.imul(31, hash) + normalizedWord.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
}

export function getFlashcardReviewLevel(status: FlashcardReviewStatus) {
  return FLASHCARD_REVIEW_LEVELS[status];
}

export function getOppositeFlashcardReviewLevel(status: FlashcardReviewStatus) {
  return FLASHCARD_REVIEW_LEVELS[status === "known" ? "unknown" : "known"];
}

export type FlashcardReviewPayload = {
  status: FlashcardReviewStatus;
  word: string;
  meaning: string;
  pronunciation?: string | null;
  partOfSpeech?: string | null;
};

export async function recordFlashcardReview(payload: FlashcardReviewPayload) {
  const response = await fetch("/api/flashcards/review", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message || "Failed to record flashcard review");
  }

  return response.json();
}