require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

async function main() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.error("DATABASE_URL missing");
        process.exit(1);
    }

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    try {
        const levels = await prisma.level.findMany({
            where: { code: { in: ['A1', 'A2'] } },
            include: {
                lessons: {
                    where: { isPublished: true },
                    include: {
                        exercises: {
                            where: { isPublished: true }
                        }
                    }
                }
            }
        });

        console.log('--- Database Level Info ---');
        for (const level of levels) {
            const exercises = level.lessons.flatMap(l => l.exercises);
            console.log(`Level ${level.code}:`);
            console.log(`  Lessons: ${level.lessons.length}`);
            console.log(`  Published Exercises: ${exercises.length}`);

            const exIds = exercises.map(e => e.id);
            const progress = await prisma.userExerciseProgress.findMany({
                where: {
                    exerciseId: { in: exIds },
                    status: 'COMPLETED'
                }
            });
            console.log(`  User Completed Exercises: ${progress.length}`);
            progress.forEach(p => {
                console.log(`    - Compied Exercise ID: ${p.exerciseId}, User: ${p.userId}`);
            });
        }

        const allExercises = await prisma.exercise.findMany({
            where: { isPublished: true },
            select: { id: true, title: true, lessonId: true }
        });
        console.log('--- All Published Exercises ---');
        console.log(allExercises);

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
        await pool.end();
        process.exit(0);
    }
}

main();
