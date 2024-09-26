/*
  Warnings:

  - A unique constraint covering the columns `[unit_id,lesson_sequence]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Lesson_lesson_sequence_key";

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_unit_id_lesson_sequence_key" ON "Lesson"("unit_id", "lesson_sequence");
