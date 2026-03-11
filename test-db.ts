import { prisma } from "./src/lib/prisma";

async function main() {
    console.log("Connecting to database...");
    try {
        const result = await prisma.$queryRaw`SELECT 1`;
        console.log("Query successful:", result);
    } catch (e) {
        console.error("Query failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
