import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/models/prisma';
import { getUserIdFromSessionCookies } from '@/controllers/server-session-user';

export const runtime = "nodejs";

function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = Math.imul(31, hash) + str.charCodeAt(i) | 0;
    }
    return hash;
}

type DictionaryApiPhonetic = {
    text?: string;
};

export async function POST(req: NextRequest) {
    try {
        const userId = await getUserIdFromSessionCookies();
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { word } = await req.json();
        if (!word) {
            return NextResponse.json({ message: "Word is required" }, { status: 400 });
        }

        const cleanWord = word.replace(/[^\w\s-]/gi, '').toLowerCase().trim();
        if (!cleanWord) {
            return NextResponse.json({ message: "Invalid word" }, { status: 400 });
        }

        let meaning = "Đang cập nhật nghĩa...";
        let pronunciation: string | null = null;
        let partOfSpeech: string | null = null;
        
        try {
            const transRes = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(cleanWord)}`);
            const transData = await transRes.json();
            if (transData && transData[0] && transData[0][0]) {
                meaning = transData[0][0][0];
            }
        } catch {
            // ignore
        }

        try {
            const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord}`);
            if (res.ok) {
                const data = await res.json();
                const def = data[0]?.meanings[0]?.definitions[0]?.definition;
                if (!meaning || meaning === "Đang cập nhật nghĩa..." || meaning === cleanWord) {
                    if (def) meaning = def;
                }
                
                // Lấy phiên âm
                const phonetics = data[0]?.phonetics;
                if (phonetics && phonetics.length > 0) {
                    const validPhonetic = (phonetics as DictionaryApiPhonetic[]).find((phonetic) => phonetic.text);
                    if (validPhonetic) pronunciation = validPhonetic.text ?? null;
                }
                
                // Lấy loại từ và dịch sang tiếng Việt
                const meanings = data[0]?.meanings;
                if (meanings && meanings.length > 0) {
                    const enPos = meanings[0]?.partOfSpeech;
                    const posMap: Record<string, string> = {
                        "noun": "danh từ",
                        "verb": "động từ",
                        "adjective": "tính từ",
                        "adverb": "trạng từ",
                        "pronoun": "đại từ",
                        "preposition": "giới từ",
                        "conjunction": "liên từ",
                        "interjection": "thán từ",
                    };
                    partOfSpeech = enPos ? (posMap[enPos.toLowerCase()] || enPos) : null;
                }
            }
        } catch {
            // Bỏ qua nếu lỗi fetch
        }

        const wordId = hashString(cleanWord);

        const saved = await prisma.learningProgress.upsert({
            where: {
                userId_level_wordId: { userId, level: "SAVED", wordId }
            },
            update: {
                word: cleanWord,
                meaning,
                pronunciation,
                partOfSpeech
            },
            create: {
                userId,
                level: "SAVED",
                wordId,
                word: cleanWord,
                meaning,
                pronunciation,
                partOfSpeech
            }
        });

        return NextResponse.json({ status: "success", data: saved });
    } catch (error) {
        console.error("[API /dictionary POST] Error:", error);
        return NextResponse.json({ message: "Lỗi lưu từ vựng" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const userId = await getUserIdFromSessionCookies();
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const items = await prisma.learningProgress.findMany({
            where: { userId, level: "SAVED" },
            orderBy: { learnedAt: 'desc' }
        });

        return NextResponse.json({ status: "success", data: items });
    } catch (error) {
        console.error("[API /dictionary GET] Error:", error);
        return NextResponse.json({ message: "Lỗi tải từ vựng" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const userId = await getUserIdFromSessionCookies();
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { wordId, meaning, pronunciation, partOfSpeech } = body;

        if (!wordId) {
            return NextResponse.json({ message: "wordId is required" }, { status: 400 });
        }

        const updated = await prisma.learningProgress.update({
            where: {
                userId_level_wordId: { userId, level: "SAVED", wordId: Number(wordId) }
            },
            data: {
                meaning: meaning || undefined,
                pronunciation: pronunciation || undefined,
                partOfSpeech: partOfSpeech || undefined,
            }
        });

        return NextResponse.json({ status: "success", data: updated });
    } catch (error) {
        console.error("[API /dictionary PUT] Error:", error);
        return NextResponse.json({ message: "Lỗi cập nhật từ vựng" }, { status: 500 });
    }
}
