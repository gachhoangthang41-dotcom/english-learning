import { CefrLevel } from "@prisma/client";
import { prisma } from "./src/models/prisma";

const LEVEL_ORDER: Record<CefrLevel, number> = {
    PRE_A1: 0,
    A1: 1,
    A2: 2,
    B1: 3,
    B2: 4,
    C1: 5,
    C2: 6,
};

async function main() {
    try {
        const levelId: CefrLevel = "A2";
        const topicId = "1";

        console.log("Finding level");
        let level = await prisma.level.findUnique({
            where: { code: levelId }
        });

        if (!level) {
            console.log("Creating level");
            level = await prisma.level.create({
                data: {
                    code: levelId,
                    name: `Level ${levelId}`,
                    order: LEVEL_ORDER[levelId] || 1,
                    description: `Automatically created level for ${levelId}`,
                    recommendedMinPerLesson: 15
                }
            });
        }

        console.log("Level OK:", level.id);

        let lesson = await prisma.lesson.findFirst({
            where: { levelId: level.id, title: `Unit ${topicId}` }
        });

        if (!lesson) {
            console.log("Creating lesson");
            const maxOrder = await prisma.lesson.aggregate({
                where: { levelId: level.id },
                _max: { order: true }
            });
            const nextOrder = (maxOrder._max.order || 0) + 1;

            lesson = await prisma.lesson.create({
                data: {
                    levelId: level.id,
                    title: `Unit ${topicId}`,
                    description: `Automatically created lesson ${topicId}`,
                    order: nextOrder,
                    isPublished: true,
                    estimatedMin: 15,
                    primarySkill: "LISTENING"
                }
            });
        }
        console.log("Lesson OK:", lesson.id);

        let exercise = await prisma.exercise.findFirst({
            where: { lessonId: lesson.id }
        });

        if (!exercise) {
            console.log("Creating exercise");
            exercise = await prisma.exercise.create({
                data: {
                    lessonId: lesson.id,
                    title: "Mock Exercise",
                    type: "DICTATION",
                    skill: "LISTENING",
                    order: 1,
                    isPublished: true
                }
            });
        }
        console.log("Exercise OK:", exercise.id);

    } catch (e: unknown) {
        console.error("ERROR CAUGHT:");
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
main();
