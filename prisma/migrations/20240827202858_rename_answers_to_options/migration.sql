/*
  Warnings:

  - You are about to drop the column `selected_answer_id` on the `Attempts` table. All the data in the column will be lost.
  - You are about to drop the `Answers` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[selected_option_id]` on the table `Attempts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `selected_option_id` to the `Attempts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_question_id_fkey";

-- DropForeignKey
ALTER TABLE "Attempts" DROP CONSTRAINT "Attempts_selected_answer_id_fkey";

-- DropIndex
DROP INDEX "Attempts_selected_answer_id_key";

-- AlterTable
ALTER TABLE "Attempts" DROP COLUMN "selected_answer_id",
ADD COLUMN     "selected_option_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Answers";

-- CreateTable
CREATE TABLE "Options" (
    "option_id" SERIAL NOT NULL,
    "option_text" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "question_id" INTEGER NOT NULL,

    CONSTRAINT "Options_pkey" PRIMARY KEY ("option_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attempts_selected_option_id_key" ON "Attempts"("selected_option_id");

-- AddForeignKey
ALTER TABLE "Options" ADD CONSTRAINT "Options_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Questions"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempts" ADD CONSTRAINT "Attempts_selected_option_id_fkey" FOREIGN KEY ("selected_option_id") REFERENCES "Options"("option_id") ON DELETE RESTRICT ON UPDATE CASCADE;
