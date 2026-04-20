-- Migration: add facebookSub field to User and create unique index
ALTER TABLE "User" ADD COLUMN "facebookSub" TEXT;
CREATE UNIQUE INDEX "User_facebookSub_key" ON "User" ("facebookSub");
