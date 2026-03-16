import { PrismaClient } from "@prisma/client";

const testPrisma = new PrismaClient();

async function main() {
  try {
    await testPrisma.$connect();
    console.log("Connected natively to Prisma.");
    const users = await testPrisma.user.findMany({ take: 1 });
    console.log("Users natively:", users);
  } catch (error) {
    console.error("Prisma native error:", error);
  } finally {
    await testPrisma.$disconnect();
  }
}

main();
