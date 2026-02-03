-- CreateEnum
CREATE TYPE "CefrLevel" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2');

-- CreateEnum
CREATE TYPE "SkillType" AS ENUM ('LISTENING', 'SPEAKING');

-- CreateEnum
CREATE TYPE "ExerciseType" AS ENUM ('SHADOWING', 'DICTATION', 'PRONUNCIATION', 'ROLEPLAY');

-- CreateEnum
CREATE TYPE "ProgressStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dailyGoalMin" INTEGER NOT NULL DEFAULT 15,
ADD COLUMN     "levelId" TEXT;

-- CreateTable
CREATE TABLE "Level" (
    "id" TEXT NOT NULL,
    "code" "CefrLevel" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL,
    "recommendedMinPerLesson" INTEGER NOT NULL DEFAULT 10,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "estimatedMin" INTEGER NOT NULL DEFAULT 10,
    "primarySkill" "SkillType" NOT NULL DEFAULT 'LISTENING',
    "order" INTEGER NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "type" "ExerciseType" NOT NULL,
    "skill" "SkillType" NOT NULL,
    "title" TEXT NOT NULL,
    "instruction" TEXT,
    "mediaUrl" TEXT,
    "contentJson" JSONB,
    "estimatedMin" INTEGER NOT NULL DEFAULT 5,
    "order" INTEGER NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserExerciseProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "status" "ProgressStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "progressPct" INTEGER NOT NULL DEFAULT 0,
    "timeSpentMin" INTEGER NOT NULL DEFAULT 0,
    "score" DOUBLE PRECISION,
    "lastAccessedAt" TIMESTAMP(3),
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserExerciseProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Level_code_key" ON "Level"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Level_order_key" ON "Level"("order");

-- CreateIndex
CREATE INDEX "Lesson_levelId_isPublished_idx" ON "Lesson"("levelId", "isPublished");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_levelId_order_key" ON "Lesson"("levelId", "order");

-- CreateIndex
CREATE INDEX "Exercise_lessonId_isPublished_idx" ON "Exercise"("lessonId", "isPublished");

-- CreateIndex
CREATE INDEX "Exercise_type_skill_idx" ON "Exercise"("type", "skill");

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_lessonId_order_key" ON "Exercise"("lessonId", "order");

-- CreateIndex
CREATE INDEX "UserExerciseProgress_userId_status_idx" ON "UserExerciseProgress"("userId", "status");

-- CreateIndex
CREATE INDEX "UserExerciseProgress_exerciseId_idx" ON "UserExerciseProgress"("exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "UserExerciseProgress_userId_exerciseId_key" ON "UserExerciseProgress"("userId", "exerciseId");

-- CreateIndex
CREATE INDEX "User_levelId_idx" ON "User"("levelId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExerciseProgress" ADD CONSTRAINT "UserExerciseProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExerciseProgress" ADD CONSTRAINT "UserExerciseProgress_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
