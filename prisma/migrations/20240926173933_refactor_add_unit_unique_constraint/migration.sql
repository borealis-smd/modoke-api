/*
  Warnings:

  - A unique constraint covering the columns `[section_id,unit_sequence]` on the table `Unit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Unit_section_id_unit_sequence_key" ON "Unit"("section_id", "unit_sequence");
