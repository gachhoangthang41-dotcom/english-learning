import { NextResponse } from "next/server";
import Groq from "groq-sdk";

type ClozeItem = {
  id: string;
  original: string;
  cloze: string;
  answer: string;
  hint?: string;
};

type GroqClozeResponse = {
  items: ClozeItem[];
};

function getErrorMessage(err: unknown) {
  if (err instanceof Error) return err.message;
  return String(err);
}

// ✅ tách câu đơn giản nhưng hiệu quả cho transcript phổ thông
function splitSentences(text: string): string[] {
  const cleaned = text
    .replace(/\r\n/g, "\n")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return [];

  // tách sau . ! ? (có khoảng trắng phía sau)
  const parts = cleaned.split(/(?<=[.!?])\s+/g).map((s) => s.trim());

  // lọc câu quá ngắn
  return parts.filter((s) => s.length >= 3);
}

function pickJson(text: string) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start >= 0 && end >= start) return text.slice(start, end + 1);
  return text;
}

// ✅ fallback: tự tạo cloze nếu Groq thiếu câu
function fallbackCloze(sentence: string, id: string): ClozeItem {
  const words = sentence.split(/\s+/).filter(Boolean);

  // tìm word hợp lý để đục (tránh đục từ quá ngắn)
  let idx = -1;
  for (let i = 0; i < words.length; i++) {
    const w = words[i].replace(/[.,!?;:()"']/g, "");
    if (w.length >= 3) {
      idx = i;
      break;
    }
  }
  if (idx === -1) idx = 0;

  const raw = words[idx];
  const answer = raw.replace(/[.,!?;:()"']/g, "");

  // giữ dấu câu cuối từ (nếu có)
  const replaced = raw.replace(answer, "____");
  words[idx] = replaced;

  return {
    id,
    original: sentence,
    cloze: words.join(" "),
    answer,
    hint: "Fill in the missing word",
  };
}

// ✅ Request body type
type RequestBody = {
  transcript?: string;
  segmentIndex?: number; // nếu có => chỉ tạo 1 câu hỏi cho segment này
  segmentText?: string;  // text của segment cụ thể (nếu có)
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RequestBody;
    const transcript = body?.transcript?.trim();
    const segmentIndex = body?.segmentIndex;
    const segmentText = body?.segmentText?.trim();

    // ✅ MODE 1: Tạo câu hỏi cho 1 segment cụ thể
    if (segmentIndex !== undefined && segmentText) {
      return await generateSingleQuestion(segmentIndex, segmentText);
    }

    // ✅ MODE 2: Tạo tất cả câu hỏi (legacy mode)
    if (!transcript) {
      return NextResponse.json({ error: "Missing transcript" }, { status: 400 });
    }

    return await generateAllQuestions(transcript);
  } catch (err: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(err) },
      { status: 500 }
    );
  }
}

// ✅ Tạo 1 câu hỏi cho segment cụ thể
async function generateSingleQuestion(segmentIndex: number, segmentText: string) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { error: "Missing GROQ_API_KEY in .env" },
      { status: 500 }
    );
  }

  const sentences = splitSentences(segmentText);

  if (sentences.length === 0) {
    return NextResponse.json(
      { error: "Segment text cannot be split into sentences" },
      { status: 400 }
    );
  }

  // Chọn 1 câu từ segment để tạo cloze
  // Ưu tiên câu dài nhất (thường có nhiều thông tin hơn)
  const targetSentence = sentences.reduce((longest, current) =>
    current.length > longest.length ? current : longest
  );

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const model = "llama-3.3-70b-versatile";

  const system = `
You are a JSON generator. Output ONLY valid JSON. No explanation.

Return format:
{
  "item": {
    "id": "${segmentIndex + 1}",
    "original": "Original sentence",
    "cloze": "Sentence with ____ blank",
    "answer": "missingWord",
    "hint": "optional hint"
  }
}

STRICT RULES:
- You will receive 1 sentence.
- Blank exactly ONE important word (prefer nouns, verbs, adjectives over articles).
- Replace the blanked word with "____" in "cloze".
- "answer" must be EXACTLY the removed word (no punctuation).
- Keep sentence punctuation.
`;

  const user = `Sentence: ${targetSentence}`;

  try {
    const completion = await groq.chat.completions.create({
      model,
      temperature: 0.15,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });

    const content = completion.choices?.[0]?.message?.content ?? "";

    let parsed: { item?: ClozeItem } | null = null;

    try {
      parsed = JSON.parse(content) as { item?: ClozeItem };
    } catch {
      parsed = JSON.parse(pickJson(content)) as { item?: ClozeItem };
    }

    if (parsed?.item) {
      return NextResponse.json({
        item: {
          ...parsed.item,
          id: String(segmentIndex + 1),
          original: parsed.item.original || targetSentence,
        },
        segmentIndex,
      });
    }

    // Fallback nếu Groq fail
    const fallbackItem = fallbackCloze(targetSentence, String(segmentIndex + 1));
    return NextResponse.json({ item: fallbackItem, segmentIndex });
  } catch (err) {
    // Fallback nếu API call fail
    const fallbackItem = fallbackCloze(targetSentence, String(segmentIndex + 1));
    return NextResponse.json({ item: fallbackItem, segmentIndex });
  }
}

// ✅ Tạo tất cả câu hỏi (giữ nguyên logic cũ)
async function generateAllQuestions(transcript: string) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { error: "Missing GROQ_API_KEY in .env" },
      { status: 500 }
    );
  }

  const sentences = splitSentences(transcript);

  if (sentences.length === 0) {
    return NextResponse.json(
      { error: "Transcript cannot be split into sentences" },
      { status: 400 }
    );
  }

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const model = "llama-3.3-70b-versatile";

  const N = sentences.length;

  const system = `
You are a JSON generator. Output ONLY valid JSON. No explanation.

Return format:
{
  "items": [
    {
      "id": "1",
      "original": "Original sentence",
      "cloze": "Sentence with ____ blank",
      "answer": "missingWord",
      "hint": "optional"
    }
  ]
}

STRICT RULES:
- You will receive EXACTLY ${N} sentences.
- You MUST return EXACTLY ${N} items in the "items" array.
- Item i must correspond to sentence i.
- Blank exactly ONE word in each sentence.
- Replace the blanked word with "____" in "cloze".
- "answer" must be EXACTLY the removed word (no punctuation).
- Keep sentence punctuation.
`;

  const numbered = sentences
    .map((s, i) => `${i + 1}. ${s}`)
    .join("\n");

  const user = `Sentences (${N}):\n${numbered}`;

  const completion = await groq.chat.completions.create({
    model,
    temperature: 0.15,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  });

  const content = completion.choices?.[0]?.message?.content ?? "";

  let parsed: GroqClozeResponse | null = null;

  try {
    parsed = JSON.parse(content) as GroqClozeResponse;
  } catch {
    parsed = JSON.parse(pickJson(content)) as GroqClozeResponse;
  }

  let items = parsed?.items;

  if (!items || !Array.isArray(items)) {
    const fallback = sentences.map((s, i) =>
      fallbackCloze(s, String(i + 1))
    );
    return NextResponse.json({ items: fallback });
  }

  if (items.length < N) {
    const missingFrom = items.length;
    for (let i = missingFrom; i < N; i++) {
      items.push(fallbackCloze(sentences[i], String(i + 1)));
    }
  }

  if (items.length > N) {
    items = items.slice(0, N);
  }

  items = items.map((it, i) => ({
    ...it,
    id: String(i + 1),
    original: it.original || sentences[i],
  }));

  return NextResponse.json({ items });
}
