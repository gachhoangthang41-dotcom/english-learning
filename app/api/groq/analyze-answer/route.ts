import { NextResponse } from "next/server";

export type GrammarAnalysis = {
    // Pháº§n tense analysis
    tenseName: string;
    recognitionSigns: string;
    tenseExplanation: string; // Giáº£i thĂ­ch chi tiáº¿t hÆ¡n

    // Pháº§n grammar structure
    formula: string;
    grammarNotes: string;

    // Pháº§n Ä‘Ă¡nh giĂ¡
    comment: string; // Nháº­n xĂ©t, Ä‘á»™ng viĂªn hoáº·c lá»i khuyĂªn chi tiáº¿t

    // Pháº§n lá»—i (náº¿u sai)
    userError?: string;
};

type RequestBody = {
    sentence: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
};

type GroqMessage = {
    role: "system" | "user";
    content: string;
};

type GroqChatResponse = {
    choices?: Array<{
        message?: {
            content?: string | null;
        };
    }>;
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

async function createGroqCompletion(messages: GroqMessage[], model: string, temperature: number) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        throw new Error("Missing GROQ_API_KEY in .env");
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model,
            temperature,
            messages,
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Groq API error (${response.status}): ${errorText}`);
    }

    return (await response.json()) as GroqChatResponse;
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

        const model = "llama-3.3-70b-versatile";

        const system = `
Báº¡n lĂ  má»™t giĂ¡o viĂªn tiáº¿ng Anh nhiá»‡t huyáº¿t vĂ  chuyĂªn nghiá»‡p. Nhiá»‡m vá»¥ cá»§a báº¡n lĂ  phĂ¢n tĂ­ch ngá»¯ phĂ¡p, thĂ¬ vĂ  giáº£i thĂ­ch Ä‘Ă¡p Ă¡n má»™t cĂ¡ch CHI TIáº¾T, Dá»„ HIá»‚U cho há»c viĂªn.

Báº¡n PHáº¢I tráº£ vá» CHĂNH XĂC Ä‘á»‹nh dáº¡ng JSON sau:

{
  "tenseName": "TĂªn thĂ¬ (VD: QuĂ¡ khá»© Ä‘Æ¡n, Hiá»‡n táº¡i hoĂ n thĂ nh...)",
  "recognitionSigns": "Dáº¥u hiá»‡u nháº­n biáº¿t",
  "tenseExplanation": "Giáº£i thĂ­ch ká»¹ táº¡i sao dĂ¹ng thĂ¬ nĂ y á»Ÿ Ä‘Ă¢y. PhĂ¢n tĂ­ch ngá»¯ cáº£nh, hĂ nh Ä‘á»™ng xáº£y ra khi nĂ o, káº¿t quáº£ ra sao...",
  "formula": "CĂ´ng thá»©c Ă¡p dá»¥ng",
  "grammarNotes": "LÆ°u Ă½ ngá»¯ phĂ¡p liĂªn quan",
  "comment": "Nháº­n xĂ©t vá» cĂ¢u tráº£ lá»i cá»§a há»c viĂªn. Náº¿u Ä‘Ăºng, hĂ£y khen ngá»£i vĂ  má»Ÿ rá»™ng thĂªm kiáº¿n thá»©c. Náº¿u sai, hĂ£y Ä‘á»™ng viĂªn vĂ  chá»‰ dáº«n cĂ¡ch kháº¯c phá»¥c.",
  "userError": "Chá»‰ lá»—i sai cá»¥ thá»ƒ (náº¿u cĂ³)"
}

QUY Táº®C:
1. Giáº£i thĂ­ch pháº£i RĂ• RĂ€NG, Cá»¤ THá»‚, trĂ¡nh chung chung.
2. Má»¥c "comment" nĂªn mang tĂ­nh xĂ¢y dá»±ng, thĂ¢n thiá»‡n.
3. Output JSON valid.
`;

        const userPrompt = `
CĂ¢u gá»‘c: "${sentence}"
ÄĂ¡p Ă¡n Ä‘Ăºng: "${correctAnswer}"
CĂ¢u tráº£ lá»i cá»§a há»c viĂªn: "${userAnswer}"
Tráº£ lá»i Ä‘Ăºng hay sai: ${isCorrect ? "ÄĂNG" : "SAI"}

HĂ£y phĂ¢n tĂ­ch ngá»¯ phĂ¡p vĂ  thĂ¬ cá»§a cĂ¢u nĂ y, tráº£ vá» JSON theo format Ä‘Ă£ cho.
`;

        const completion = await createGroqCompletion(
            [
                { role: "system", content: system },
                { role: "user", content: userPrompt },
            ],
            model,
            0.2
        );

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
