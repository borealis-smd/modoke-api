/*
  Warnings:

  - You are about to alter the column `section_title` on the `Sections` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Sections" ALTER COLUMN "section_title" SET DATA TYPE VARCHAR(255);
