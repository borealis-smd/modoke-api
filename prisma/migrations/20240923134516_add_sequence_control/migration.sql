/*
  Warnings:

  - A unique constraint covering the columns `[lesson_sequence]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[unit_sequence]` on the table `Unit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lesson_sequence` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_sequence` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE lesson_lesson_id_seq;
ALTER TABLE "Lesson" ADD COLUMN     "lesson_sequence" INTEGER NOT NULL,
ALTER COLUMN "lesson_id" SET DEFAULT nextval('lesson_lesson_id_seq');
ALTER SEQUENCE lesson_lesson_id_seq OWNED BY "Lesson"."lesson_id";

-- AlterTable
CREATE SEQUENCE unit_unit_id_seq;
ALTER TABLE "Unit" ADD COLUMN     "unit_sequence" INTEGER NOT NULL,
ALTER COLUMN "unit_id" SET DEFAULT nextval('unit_unit_id_seq');
ALTER SEQUENCE unit_unit_id_seq OWNED BY "Unit"."unit_id";

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_lesson_sequence_key" ON "Lesson"("lesson_sequence");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_unit_sequence_key" ON "Unit"("unit_sequence");
