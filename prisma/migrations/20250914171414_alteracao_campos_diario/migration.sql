/*
  Warnings:

  - Added the required column `category` to the `Diary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mood` to the `Diary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Diary" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "mood" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Mission" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;
