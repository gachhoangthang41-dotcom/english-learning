import { prisma } from './src/lib/prisma'; // adjusting path if needed

async function main() {
    try {
        const levelId = 'a2';
        const topicId = '1';

        console.log("Finding level");
        let level = await prisma.level.findUnique({
            where: { code: levelId.toUpperCase() as any }
        });

        if (!level) {
            console.log("Creating level");
            level = await prisma.level.create({
                data: {
                    code: levelId.toUpperCase() as any,
                    name: `Level ${levelId.toUpperCase()}`,
                    order: levelId === 'A1' ? 1 : levelId === 'A2' ? 2 : levelId === 'B1' ? 3 : 4,
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
        
    } catch (e) {
        console.error("ERROR CAUGHT:");
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
main();
