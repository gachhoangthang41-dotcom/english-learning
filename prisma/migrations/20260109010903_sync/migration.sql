/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `tokenHash` on the `Token` table. All the data in the column will be lost.
  - Added the required column `codeHash` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "TokenType" ADD VALUE 'LOGIN_2FA';

-- DropIndex
DROP INDEX "Token_tokenHash_key";

-- DropIndex
DROP INDEX "Token_userId_type_idx";

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "createdAt",
DROP COLUMN "tokenHash",
ADD COLUMN     "codeHash" TEXT NOT NULL,
ADD COLUMN     "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';

-- CreateIndex
CREATE INDEX "Token_userId_type_expiresAt_idx" ON "Token"("userId", "type", "expiresAt");

-- CreateIndex
CREATE INDEX "Token_userId_type_sentAt_idx" ON "Token"("userId", "type", "sentAt");
