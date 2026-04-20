-- Migration: add partOfSpeech and pronunciation columns to LearningProgress
ALTER TABLE "LearningProgress" ADD COLUMN "partOfSpeech" TEXT;
ALTER TABLE "LearningProgress" ADD COLUMN "pronunciation" TEXT;
