import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export type GrammarAnalysis = {
    // Phần tense analysis
    tenseName: string;
    recognitionSigns: string;
    tenseExplanation: string; // Giải thích chi tiết hơn

    // Phần grammar structure
    formula: string;
    grammarNotes: string;

    // Phần đánh giá
    comment: string; // Nhận xét, động viên hoặc lời khuyên chi tiết

    // Phần lỗi (nếu sai)
    userError?: string;
};

type RequestBody = {
    sentence: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
};

function getErrorMessage(err: unknown) {
    if (err instanceof Error) return err.message;
    return String(err);
}

function pickJson(text: string) {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start >= 0 && end >= start) return text.slice(start, end + 1);
    return text;
}

export async function POST(req: Request) {
    try {
        if (!process.env.GROQ_API_KEY) {
            return NextResponse.json(
                { error: "Missing GROQ_API_KEY in .env" },
                { status: 500 }
            );
        }

        const body = (await req.json()) as RequestBody;
        const { sentence, userAnswer, correctAnswer, isCorrect } = body;

        if (!sentence || !correctAnswer) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const model = "llama-3.3-70b-versatile";

        const system = `
Bạn là một giáo viên tiếng Anh nhiệt huyết và chuyên nghiệp. Nhiệm vụ của bạn là phân tích ngữ pháp, thì và giải thích đáp án một cách CHI TIẾT, DỄ HIỂU cho học viên.

Bạn PHẢI trả về CHÍNH XÁC định dạng JSON sau:

{
  "tenseName": "Tên thì (VD: Quá khứ đơn, Hiện tại hoàn thành...)",
  "recognitionSigns": "Dấu hiệu nhận biết",
  "tenseExplanation": "Giải thích kỹ tại sao dùng thì này ở đây. Phân tích ngữ cảnh, hành động xảy ra khi nào, kết quả ra sao...",
  "formula": "Công thức áp dụng",
  "grammarNotes": "Lưu ý ngữ pháp liên quan",
  "comment": "Nhận xét về câu trả lời của học viên. Nếu đúng, hãy khen ngợi và mở rộng thêm kiến thức. Nếu sai, hãy động viên và chỉ dẫn cách khắc phục.",
  "userError": "Chỉ lỗi sai cụ thể (nếu có)"
}

QUY TẮC:
1. Giải thích phải RÕ RÀNG, CỤ THỂ, tránh chung chung.
2. Mục "comment" nên mang tính xây dựng, thân thiện.
3. Output JSON valid.
`;

        const userPrompt = `
Câu gốc: "${sentence}"
Đáp án đúng: "${correctAnswer}"
Câu trả lời của học viên: "${userAnswer}"
Trả lời đúng hay sai: ${isCorrect ? "ĐÚNG" : "SAI"}

Hãy phân tích ngữ pháp và thì của câu này, trả về JSON theo format đã cho.
`;

        const completion = await groq.chat.completions.create({
            model,
            temperature: 0.2,
            messages: [
                { role: "system", content: system },
                { role: "user", content: userPrompt },
            ],
        });

        const content = completion.choices?.[0]?.message?.content ?? "";

        let parsed: GrammarAnalysis | null = null;

        try {
            parsed = JSON.parse(content) as GrammarAnalysis;
        } catch {
            parsed = JSON.parse(pickJson(content)) as GrammarAnalysis;
        }

        if (!parsed) {
            throw new Error("Failed to parse grammar analysis from Groq");
        }

        return NextResponse.json({ analysis: parsed });
    } catch (err: unknown) {
        console.error("Error in analyze-answer API:", err);
        return NextResponse.json(
            { error: getErrorMessage(err) },
            { status: 500 }
        );
    }
}
