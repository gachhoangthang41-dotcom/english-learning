export type ParsedExercise = {
  questionText: string;
  options: { label: string; text: string }[] | null;
  rawText: string;
};

export type ParsedAnswerResult = {
  isCorrect: boolean;
  explanation: string;
  rawText: string;
};

export function parseExercise(text: string): ParsedExercise {
  // Try to find options like A), B), C), D) or A., B., C., D.
  const optionRegex = /([A-D])[).]\s+([^\n]+)/g;
  
  const options: { label: string; text: string }[] = [];
  let match;
  
  while ((match = optionRegex.exec(text)) !== null) {
    options.push({
      label: match[1],
      text: match[2].trim()
    });
  }

  if (options.length === 0) {
    // If no options found, return null for options and the raw text for question
    return {
      questionText: text,
      options: null,
      rawText: text,
    };
  }

  // Find the text before the first option
  const firstOptionMatch = text.match(/([A-D])[).]\s+/);
  let questionText = text;
  if (firstOptionMatch && firstOptionMatch.index !== undefined) {
    questionText = text.substring(0, firstOptionMatch.index).trim();
  }

  // Clean up some common footers like "*Gõ A/B/C/D...*"
  const footerRegex = /\*Gõ.*?\*/gs;
  questionText = questionText.replace(footerRegex, '').trim();

  return {
    questionText,
    options,
    rawText: text,
  };
}

export function parseAnswerResult(text: string): ParsedAnswerResult {
  const normalized = text.toLowerCase();
  
  // Check for explicit wrong indicators FIRST (❌, "chưa đúng", "không đúng", "sai rồi", "chưa chính xác")
  const isExplicitlyWrong =
    normalized.includes("❌") ||
    normalized.includes("chưa đúng") ||
    normalized.includes("không đúng") ||
    normalized.includes("chưa chính xác") ||
    normalized.includes("incorrect") ||
    normalized.includes("not correct") ||
    normalized.includes("wrong");

  // Check for explicit correct indicators (✅, "chính xác", "đúng rồi", "correct")
  const isExplicitlyCorrect =
    normalized.includes("✅") ||
    normalized.includes("chính xác") ||
    normalized.includes("đúng rồi") ||
    normalized.includes("excellent") ||
    normalized.includes("correct");

  // Wrong indicators take priority over correct ones, because "đáp án đúng là..." appears in wrong responses
  const isCorrect = isExplicitlyWrong ? false : isExplicitlyCorrect;
  
  // Clean up footers if any
  const footerRegex = /💡?\s*\*Gõ.*?\*/gs;
  const explanation = text.replace(footerRegex, '').trim();

  return {
    isCorrect,
    explanation,
    rawText: text,
  };
}
