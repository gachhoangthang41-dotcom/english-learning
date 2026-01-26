import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts", // ✅ CÁCH 1: dùng tsx
  },

  datasource: {
    url: env("DATABASE_URL"),
  },
});
