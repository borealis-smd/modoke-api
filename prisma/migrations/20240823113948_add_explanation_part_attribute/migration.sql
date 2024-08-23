/*
  Warnings:

  - Added the required column `part` to the `Explanations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ExplanationPart" AS ENUM ('PART_1', 'PART_2', 'PART_3');

-- AlterTable
ALTER TABLE "Explanations" ADD COLUMN     "part" "ExplanationPart" NOT NULL;
