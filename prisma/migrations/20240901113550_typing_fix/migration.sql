/*
  Warnings:

  - You are about to alter the column `badge_image_url` on the `Badges` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `lesson_title` on the `Lessons` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `mascot_image_url` on the `Mascot` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `item_image_url` on the `MascotItems` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `session_title` on the `Sessions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `unit_title` on the `Units` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `avatar_url` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Badges" ALTER COLUMN "badge_image_url" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Lessons" ALTER COLUMN "lesson_title" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Mascot" ALTER COLUMN "mascot_image_url" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "MascotItems" ALTER COLUMN "item_image_url" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Sessions" ALTER COLUMN "session_title" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Units" ALTER COLUMN "unit_title" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatar_url" SET DATA TYPE VARCHAR(255);
