require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

async function main() {
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    try {
        const allLevels = await prisma.level.findMany({
            include: { _count: { select: { lessons: true } } }
        });
        console.log('--- All Levels ---');
        console.log(allLevels);

        const a2 = await prisma.level.findUnique({
            where: { code: 'A2' },
            include: { lessons: { include: { exercises: true } } }
        });
        console.log('--- Level A2 Detail ---');
        if (a2) {
            console.log('A2 Lessons count:', a2.lessons.length);
            a2.lessons.forEach(l => {
                console.log(`  Lesson: ${l.title}, Published: ${l.isPublished}, Exercises: ${l.exercises.length}`);
            });
        } else {
            console.log('Level A2 not found in DB');
        }

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
        await pool.end();
        process.exit(0);
    }
}

main();
