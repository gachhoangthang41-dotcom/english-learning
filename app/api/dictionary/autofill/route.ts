import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type DictionaryApiPhonetic = {
    text?: string;
};

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

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const word = searchParams.get("word");

    if (!word) {
        return NextResponse.json({ message: "Word is required" }, { status: 400 });
    }

    const cleanWord = word.replace(/[^\w\s-]/gi, '').toLowerCase().trim();

    let meaning = "";
    let pronunciation = "";
    let partOfSpeech = "";

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
            
            // Lấy phiên âm
            const phonetics = data[0]?.phonetics;
            if (phonetics && phonetics.length > 0) {
                const validPhonetic = (phonetics as DictionaryApiPhonetic[]).find((phonetic) => phonetic.text);
                if (validPhonetic?.text) pronunciation = validPhonetic.text;
            }
            
            // Lấy loại từ
            const meanings = data[0]?.meanings;
            if (meanings && meanings.length > 0) {
                const enPos = meanings[0]?.partOfSpeech;
                partOfSpeech = posMap[enPos?.toLowerCase()] || enPos || "";
            }
        }
    } catch {
        // Bỏ qua nếu lỗi fetch
    }

    return NextResponse.json({
        status: "success",
        data: {
            meaning,
            pronunciation,
            partOfSpeech
        }
    });
}
