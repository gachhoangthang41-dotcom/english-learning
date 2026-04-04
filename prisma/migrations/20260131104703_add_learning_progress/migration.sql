-- CreateTable
CREATE TABLE "LearningProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "wordId" INTEGER NOT NULL,
    "word" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "learnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LearningProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LearningProgress_userId_learnedAt_idx" ON "LearningProgress"("userId", "learnedAt");

-- CreateIndex
CREATE INDEX "LearningProgress_userId_level_idx" ON "LearningProgress"("userId", "level");

-- CreateIndex
CREATE UNIQUE INDEX "LearningProgress_userId_level_wordId_key" ON "LearningProgress"("userId", "level", "wordId");

-- AddForeignKey
ALTER TABLE "LearningProgress" ADD CONSTRAINT "LearningProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
