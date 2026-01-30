
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const exerciseId = searchParams.get("exerciseId");

        // Nếu có exerciseId, trả về bài tập cụ thể
        if (exerciseId) {
            const exercise = await prisma.exercise.findUnique({
                where: { id: exerciseId },
                include: { lesson: true }
            });
            return NextResponse.json(exercise);
        }

        // Mặc định lấy bài tập PRONUNCIATION đầu tiên (để test)
        // Mặc định lấy bài tập PRONUNCIATION đầu tiên (để test)
        let exercise = await prisma.exercise.findFirst({
            where: {
                type: "PRONUNCIATION",
                isPublished: true
            },
            orderBy: { createdAt: "desc" },
            include: { lesson: true }
        });

        // --- FALLBACK MOCK DATA (Nếu DB chưa có gì) ---
        if (!exercise) {
            console.log("⚠️ Database empty! Returning mock data.");
            return NextResponse.json({
                id: "mock-1",
                title: "Unit 1: Luyện Phát Âm (Mẫu)",
                mediaUrl: "/videos/pronunciation/lesson-1.mp4",
                contentJson: {
                    sentences: [
                        { id: 1, text: "fleece", ipa: "/fliːs/" },
                        { id: 2, text: "sea", ipa: "/siː/" },
                        { id: 3, text: "machine", ipa: "/məˈʃiːn/" },
                        { id: 4, text: "The fleece is soft.", ipa: "/ðə fliːs ɪz sɒft/" },
                        { id: 5, text: "I see the sea.", ipa: "/aɪ siː ðə siː/" },
                        { id: 6, text: "This machine works well.", ipa: "/ðɪs məˈʃiːn wɜːks wɛl/" }
                    ]
                }
            });
        }

        return NextResponse.json(exercise);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
