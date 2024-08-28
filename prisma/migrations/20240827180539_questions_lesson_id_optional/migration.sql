-- DropForeignKey
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_lesson_id_fkey";

-- AlterTable
ALTER TABLE "Questions" ALTER COLUMN "lesson_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lessons"("lesson_id") ON DELETE SET NULL ON UPDATE CASCADE;
