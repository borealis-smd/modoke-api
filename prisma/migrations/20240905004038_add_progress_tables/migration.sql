/*
  Warnings:

  - You are about to drop the column `completed_at` on the `Lessons` table. All the data in the column will be lost.
  - You are about to drop the column `is_completed` on the `Lessons` table. All the data in the column will be lost.
  - You are about to drop the column `lesson_principle` on the `Lessons` table. All the data in the column will be lost.
  - You are about to drop the column `completed_at` on the `Sections` table. All the data in the column will be lost.
  - You are about to drop the column `is_completed` on the `Sections` table. All the data in the column will be lost.
  - You are about to drop the column `completed_at` on the `Units` table. All the data in the column will be lost.
  - You are about to drop the column `is_completed` on the `Units` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lessons" DROP COLUMN "completed_at",
DROP COLUMN "is_completed",
DROP COLUMN "lesson_principle";

-- AlterTable
ALTER TABLE "Sections" DROP COLUMN "completed_at",
DROP COLUMN "is_completed";

-- AlterTable
ALTER TABLE "Units" DROP COLUMN "completed_at",
DROP COLUMN "is_completed";

-- DropEnum
DROP TYPE "Principle";

-- CreateTable
CREATE TABLE "SectionProgress" (
    "section_progress_id" SERIAL NOT NULL,
    "section_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "in_progress" BOOLEAN NOT NULL DEFAULT false,
    "is_locked" BOOLEAN NOT NULL DEFAULT true,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "SectionProgress_pkey" PRIMARY KEY ("section_progress_id")
);

-- CreateTable
CREATE TABLE "UnitProgress" (
    "unit_progress_id" SERIAL NOT NULL,
    "unit_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "in_progress" BOOLEAN NOT NULL DEFAULT false,
    "is_locked" BOOLEAN NOT NULL DEFAULT true,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "UnitProgress_pkey" PRIMARY KEY ("unit_progress_id")
);

-- CreateTable
CREATE TABLE "LessonProgress" (
    "lesson_progress_id" SERIAL NOT NULL,
    "lesson_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "in_progress" BOOLEAN NOT NULL DEFAULT false,
    "is_locked" BOOLEAN NOT NULL DEFAULT true,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "LessonProgress_pkey" PRIMARY KEY ("lesson_progress_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SectionProgress_user_id_key" ON "SectionProgress"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UnitProgress_user_id_key" ON "UnitProgress"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "LessonProgress_user_id_key" ON "LessonProgress"("user_id");

-- AddForeignKey
ALTER TABLE "SectionProgress" ADD CONSTRAINT "SectionProgress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionProgress" ADD CONSTRAINT "SectionProgress_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Sections"("section_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitProgress" ADD CONSTRAINT "UnitProgress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitProgress" ADD CONSTRAINT "UnitProgress_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "Units"("unit_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lessons"("lesson_id") ON DELETE RESTRICT ON UPDATE CASCADE;
