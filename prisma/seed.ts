import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("❌ DATABASE_URL is missing in .env");
}

// ✅ Prisma v7 cần adapter
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding levels...");

  const levels = [
    { code: "A1", name: " Beginner", order: 1, description: "Cơ bản" },
    { code: "A2", name: " Elementary", order: 2, description: "Sơ cấp" },
    { code: "B1", name: "Intermediate", order: 3, description: "Trung cấp" },
    { code: "B2", name: "Upper Intermediate", order: 4, description: "Trung-cao cấp" },
    { code: "C1", name: "Advanced", order: 5, description: "Nâng cao" },
    { code: "C2", name: "Proficient", order: 6, description: "Thành thạo" },
  ] as const;

  for (const lv of levels) {
    await prisma.level.upsert({
      where: { code: lv.code as any },
      update: {
        name: lv.name,
        order: lv.order,
        description: lv.description,
      },
      create: {
        code: lv.code as any,
        name: lv.name,
        order: lv.order,
        description: lv.description,
        recommendedMinPerLesson: 10,
      },
    });
  }

  console.log("✅ Done: seeded Level A1..C2");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
