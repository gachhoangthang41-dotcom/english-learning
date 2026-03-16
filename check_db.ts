import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const data = await prisma.learningProgress.findMany({
        where: { word: "breakfast" }
    });
    console.log(JSON.stringify(data, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
