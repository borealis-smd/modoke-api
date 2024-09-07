/*
  Warnings:

  - You are about to drop the column `session_id` on the `Certificates` table. All the data in the column will be lost.
  - You are about to drop the column `session_id` on the `Units` table. All the data in the column will be lost.
  - You are about to drop the `Sessions` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[section_id]` on the table `Certificates` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `section_id` to the `Certificates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `section_id` to the `Units` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Certificates" DROP CONSTRAINT "Certificates_session_id_fkey";

-- DropForeignKey
ALTER TABLE "Sessions" DROP CONSTRAINT "Sessions_level_id_fkey";

-- DropForeignKey
ALTER TABLE "Units" DROP CONSTRAINT "Units_session_id_fkey";

-- DropIndex
DROP INDEX "Certificates_session_id_key";

-- AlterTable
ALTER TABLE "Certificates" DROP COLUMN "session_id",
ADD COLUMN     "section_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Units" DROP COLUMN "session_id",
ADD COLUMN     "section_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Sessions";

-- CreateTable
CREATE TABLE "Sections" (
    "section_id" SERIAL NOT NULL,
    "section_title" TEXT NOT NULL,
    "section_description" TEXT NOT NULL,
    "is_completed" BOOLEAN NOT NULL,
    "completed_at" TIMESTAMP(3),
    "level_id" INTEGER NOT NULL,

    CONSTRAINT "Sections_pkey" PRIMARY KEY ("section_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sections_level_id_key" ON "Sections"("level_id");

-- CreateIndex
CREATE UNIQUE INDEX "Certificates_section_id_key" ON "Certificates"("section_id");

-- AddForeignKey
ALTER TABLE "Sections" ADD CONSTRAINT "Sections_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "Level"("level_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Units" ADD CONSTRAINT "Units_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Sections"("section_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificates" ADD CONSTRAINT "Certificates_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Sections"("section_id") ON DELETE RESTRICT ON UPDATE CASCADE;
