/*
  Warnings:

  - Added the required column `lesson_principle` to the `Lessons` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LessonPrinciple" AS ENUM ('P', 'O', 'U', 'R');

-- AlterTable
ALTER TABLE "Lessons" ADD COLUMN     "lesson_principle" "LessonPrinciple" NOT NULL;
