
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const exerciseId = searchParams.get("exerciseId");

        let exercise = null;

        // 1. Nếu có exerciseId, thử tìm trong DB
        if (exerciseId) {
            exercise = await prisma.exercise.findUnique({
                where: { id: exerciseId },
                include: { lesson: true }
            });
        }
        // 2. Nếu không có ID, lấy bài mới nhất làm mặc định
        else {
            exercise = await prisma.exercise.findFirst({
                where: {
                    type: "PRONUNCIATION",
                    isPublished: true
                },
                orderBy: { createdAt: "desc" },
                include: { lesson: true }
            });
        }

        // 3. Nếu tìm thấy trong DB, trả về ngay
        if (exercise) {
            return NextResponse.json(exercise);
        }

        // --- FALLBACK MOCK DATA (Nếu DB chưa có gì) ---
        if (!exercise) {
            console.log("⚠️ Database empty! Returning mock data.");

            // Mock Data cho Lesson 2
            if (exerciseId === 'mock-2' || exerciseId === '2') {
                return NextResponse.json({
                    id: "mock-2",
                    title: "Lesson 2: How to say ‘kit’, ‘bid’ & ‘him’",
                    mediaUrl: "/videos/pronunciation/lesson-2.mp4",
                    contentJson: {
                        sentences: [
                            { id: 1, text: "kit", ipa: "/kɪt/" },
                            { id: 2, text: "bid", ipa: "/bɪd/" },
                            { id: 3, text: "him", ipa: "/hɪm/" },
                            // { id: 4, text: "I have a kit.", ipa: "/aɪ hæv ə kɪt/" },
                            // { id: 5, text: "He makes a bid.", ipa: "/hiː meɪks ə bɪd/" },
                            // { id: 6, text: "I know him.", ipa: "/aɪ nəʊ hɪm/" }
                        ]
                    }
                });
            }

            // Mock Data cho Lesson 3
            if (exerciseId === 'mock-3' || exerciseId === '3') {
                return NextResponse.json({
                    id: "mock-3",
                    title: "Lesson 3: How to say ‘foot’, ‘put’ & ‘good’",
                    mediaUrl: "/videos/pronunciation/lesson-3.mp4",
                    contentJson: {
                        sentences: [
                            { id: 1, text: "foot", ipa: "/fʊt/" },
                            { id: 2, text: "put", ipa: "/pʊt/" },
                            { id: 3, text: "good", ipa: "/gʊd/" },
                            { id: 4, text: "My left foot.", ipa: "/maɪ left fʊt/" },
                            { id: 5, text: "Put it down.", ipa: "/pʊt ɪt daʊn/" },
                            { id: 6, text: "Very good.", ipa: "/ˈveri gʊd/" }
                        ]
                    }
                });
            }

            // Mock Data cho Lesson 4
            if (exerciseId === 'mock-4' || exerciseId === '4') {
                return NextResponse.json({
                    id: "mock-4",
                    title: "Lesson 4: How to say ‘dress’, ‘head’ & ‘bed’",
                    mediaUrl: "/videos/pronunciation/lesson-4.mp4",
                    contentJson: {
                        sentences: [
                            { id: 1, text: "dress", ipa: "/dres/" },
                            { id: 2, text: "head", ipa: "/hed/" },
                            { id: 3, text: "bed", ipa: "/bed/" },
                            { id: 4, text: "Red dress.", ipa: "/red dres/" },
                            { id: 5, text: "My head hurts.", ipa: "/maɪ hed hɜːts/" },
                            { id: 6, text: "Go to bed.", ipa: "/gəʊ tu bed/" }
                        ]
                    }
                });
            }

            // Mock Data cho Lesson 5
            if (exerciseId === 'mock-5' || exerciseId === '5') {
                return NextResponse.json({
                    id: "mock-5",
                    title: "Lesson 5: How to say ‘bad’, ‘cat’ & ‘map’",
                    mediaUrl: "/videos/pronunciation/lesson-5.mp4",
                    contentJson: {
                        sentences: [
                            { id: 1, text: "bad", ipa: "/bæd/" },
                            { id: 2, text: "cat", ipa: "/kæt/" },
                            { id: 3, text: "map", ipa: "/mæp/" },
                            { id: 4, text: "Not bad.", ipa: "/nɒt bæd/" },
                            { id: 5, text: "Black cat.", ipa: "/blæk kæt/" },
                            { id: 6, text: "Look at the map.", ipa: "/lʊk æt ðə mæp/" }
                        ]
                    }
                });
            }

            return NextResponse.json({
                id: "mock-1",
                title: "Unit 1: Luyện Phát Âm (Mẫu)",
                mediaUrl: "/videos/pronunciation/lesson-1.mp4",
                contentJson: {
                    sentences: [
                        { id: 1, text: "fleece", ipa: "/fliːs/" },
                        { id: 2, text: "sea", ipa: "/siː/" },
                        { id: 3, text: "machine", ipa: "/məˈʃiːn/" },
                        { id: 4, text: "litter", ipa: "/ˈlɪtər/" },
                        { id: 5, text: "cheap", ipa: "/tʃiːp/" },
                        { id: 6, text: "feet", ipa: "/fiːt/" },
                        { id: 7, text: "peach", ipa: "/piːtʃ/" },
                        { id: 8, text: "sheep", ipa: "/ʃiːp/" }
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
