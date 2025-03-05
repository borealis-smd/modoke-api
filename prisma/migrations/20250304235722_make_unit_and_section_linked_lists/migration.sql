/*
  Warnings:

  - You are about to drop the column `unit_sequence` on the `Unit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[next_section_id]` on the table `Section` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[prev_section_id]` on the table `Section` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[next_unit_id]` on the table `Unit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[prev_unit_id]` on the table `Unit` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Unit_section_id_unit_sequence_key";

-- AlterTable
CREATE SEQUENCE section_section_id_seq;
ALTER TABLE "Section" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "next_section_id" INTEGER,
ADD COLUMN     "prev_section_id" INTEGER,
ALTER COLUMN "section_id" SET DEFAULT nextval('section_section_id_seq');
ALTER SEQUENCE section_section_id_seq OWNED BY "Section"."section_id";

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "unit_sequence",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "next_unit_id" INTEGER,
ADD COLUMN     "prev_unit_id" INTEGER,
ALTER COLUMN "unit_icon" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "Section_next_section_id_key" ON "Section"("next_section_id");

-- CreateIndex
CREATE UNIQUE INDEX "Section_prev_section_id_key" ON "Section"("prev_section_id");

-- CreateIndex
CREATE INDEX "Section_next_section_id_idx" ON "Section"("next_section_id");

-- CreateIndex
CREATE INDEX "Section_prev_section_id_idx" ON "Section"("prev_section_id");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_next_unit_id_key" ON "Unit"("next_unit_id");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_prev_unit_id_key" ON "Unit"("prev_unit_id");

-- CreateIndex
CREATE INDEX "Unit_section_id_idx" ON "Unit"("section_id");

-- CreateIndex
CREATE INDEX "Unit_next_unit_id_idx" ON "Unit"("next_unit_id");

-- CreateIndex
CREATE INDEX "Unit_prev_unit_id_idx" ON "Unit"("prev_unit_id");

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_next_section_id_fkey" FOREIGN KEY ("next_section_id") REFERENCES "Section"("section_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_next_unit_id_fkey" FOREIGN KEY ("next_unit_id") REFERENCES "Unit"("unit_id") ON DELETE SET NULL ON UPDATE CASCADE;
