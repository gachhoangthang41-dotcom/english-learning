import { config } from "dotenv";
config();
import { prisma } from "./src/lib/prisma";

async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to Prisma with dotenv.");
  } catch (error) {
    console.error("Prisma error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
