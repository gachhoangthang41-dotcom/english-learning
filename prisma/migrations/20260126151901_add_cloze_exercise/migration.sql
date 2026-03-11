-- CreateTable
CREATE TABLE "ClozeExercise" (
    "id" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "transcriptHash" TEXT NOT NULL,
    "items" JSONB NOT NULL,
    "model" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClozeExercise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ClozeExercise_levelId_topicId_idx" ON "ClozeExercise"("levelId", "topicId");

-- CreateIndex
CREATE UNIQUE INDEX "ClozeExercise_levelId_topicId_transcriptHash_key" ON "ClozeExercise"("levelId", "topicId", "transcriptHash");
