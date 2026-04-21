import { prisma } from "./src/models/prisma";

async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to Prisma.");
    const users = await prisma.user.findMany({ take: 1 });
    console.log("Users:", users);
  } catch (error) {
    console.error("Prisma error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
