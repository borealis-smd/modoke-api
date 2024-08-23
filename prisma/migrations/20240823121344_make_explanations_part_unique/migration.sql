/*
  Warnings:

  - A unique constraint covering the columns `[part]` on the table `Explanations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Explanations_part_key" ON "Explanations"("part");
