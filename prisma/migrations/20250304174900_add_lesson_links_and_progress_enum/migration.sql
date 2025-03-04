/*
  Warnings:

  - You are about to drop the column `in_progress` on the `LessonProgress` table. All the data in the column will be lost.
  - You are about to drop the column `is_locked` on the `LessonProgress` table. All the data in the column will be lost.
  - You are about to drop the column `in_progress` on the `SectionProgress` table. All the data in the column will be lost.
  - You are about to drop the column `is_locked` on the `SectionProgress` table. All the data in the column will be lost.
  - You are about to drop the column `in_progress` on the `UnitProgress` table. All the data in the column will be lost.
  - You are about to drop the column `is_locked` on the `UnitProgress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[next_lesson_id]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[prev_lesson_id]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ProgressStatus" AS ENUM ('LOCKED', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "next_lesson_id" INTEGER,
ADD COLUMN     "prev_lesson_id" INTEGER;

-- AlterTable
ALTER TABLE "LessonProgress" DROP COLUMN "in_progress",
DROP COLUMN "is_locked",
ADD COLUMN     "status" "ProgressStatus" NOT NULL DEFAULT 'LOCKED';

-- AlterTable
ALTER TABLE "SectionProgress" DROP COLUMN "in_progress",
DROP COLUMN "is_locked",
ADD COLUMN     "status" "ProgressStatus" NOT NULL DEFAULT 'LOCKED';

-- AlterTable
ALTER TABLE "UnitProgress" DROP COLUMN "in_progress",
DROP COLUMN "is_locked",
ADD COLUMN     "status" "ProgressStatus" NOT NULL DEFAULT 'LOCKED';

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_next_lesson_id_key" ON "Lesson"("next_lesson_id");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_prev_lesson_id_key" ON "Lesson"("prev_lesson_id");

-- CreateIndex
CREATE INDEX "Lesson_unit_id_idx" ON "Lesson"("unit_id");

-- CreateIndex
CREATE INDEX "Lesson_next_lesson_id_idx" ON "Lesson"("next_lesson_id");

-- CreateIndex
CREATE INDEX "Lesson_prev_lesson_id_idx" ON "Lesson"("prev_lesson_id");

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_next_lesson_id_fkey" FOREIGN KEY ("next_lesson_id") REFERENCES "Lesson"("lesson_id") ON DELETE SET NULL ON UPDATE CASCADE;
