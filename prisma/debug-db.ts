
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const exercises = await prisma.exercise.findMany({
        where: { type: 'PRONUNCIATION' },
        include: { lesson: true }
    });

    console.log(`📊 Found ${exercises.length} pronunciation exercises.`);

    if (exercises.length > 0) {
        console.log("First exercise:", JSON.stringify(exercises[0], null, 2));
    } else {
        console.log("⚠️ Database is empty for PRONUNCIATION exercises.");
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
