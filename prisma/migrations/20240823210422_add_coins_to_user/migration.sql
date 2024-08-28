/*
  Warnings:

  - Added the required column `coins` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Explanations_part_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "coins" INTEGER NOT NULL;
