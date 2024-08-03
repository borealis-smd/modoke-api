/*
  Warnings:

  - You are about to drop the column `created_at` on the `Certificates` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Certificates` table. All the data in the column will be lost.
  - You are about to drop the column `acquired_at` on the `MascotItems` table. All the data in the column will be lost.
  - You are about to drop the `BadgesOnUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MascotItemsOnMascot` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `lesson_principle` on the `Lessons` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Principle" AS ENUM ('P', 'O', 'U', 'R');

-- DropForeignKey
ALTER TABLE "BadgesOnUser" DROP CONSTRAINT "BadgesOnUser_badge_id_fkey";

-- DropForeignKey
ALTER TABLE "BadgesOnUser" DROP CONSTRAINT "BadgesOnUser_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Certificates" DROP CONSTRAINT "Certificates_user_id_fkey";

-- DropForeignKey
ALTER TABLE "MascotItemsOnMascot" DROP CONSTRAINT "MascotItemsOnMascot_mascot_id_fkey";

-- DropForeignKey
ALTER TABLE "MascotItemsOnMascot" DROP CONSTRAINT "MascotItemsOnMascot_mascot_items_id_fkey";

-- AlterTable
ALTER TABLE "Certificates" DROP COLUMN "created_at",
DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "Explanations" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Lessons" ALTER COLUMN "completed_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT,
DROP COLUMN "lesson_principle",
ADD COLUMN     "lesson_principle" "Principle" NOT NULL;

-- AlterTable
ALTER TABLE "Login" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "MascotItems" DROP COLUMN "acquired_at";

-- AlterTable
ALTER TABLE "Questions" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Sessions" ALTER COLUMN "completed_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Units" ALTER COLUMN "completed_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updated_at" DROP DEFAULT;

-- DropTable
DROP TABLE "BadgesOnUser";

-- DropTable
DROP TABLE "MascotItemsOnMascot";

-- DropEnum
DROP TYPE "LessonPrinciple";

-- CreateTable
CREATE TABLE "MascotHasMascotItems" (
    "mascot_has_mascot_items_id" TEXT NOT NULL,
    "mascot_id" INTEGER NOT NULL,
    "mascot_items_id" INTEGER NOT NULL,
    "acquired_at" TIMESTAMP(3),

    CONSTRAINT "MascotHasMascotItems_pkey" PRIMARY KEY ("mascot_has_mascot_items_id")
);

-- CreateTable
CREATE TABLE "UserHasBadge" (
    "user_has_badge_id" TEXT NOT NULL,
    "badge_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "acquired_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserHasBadge_pkey" PRIMARY KEY ("user_has_badge_id")
);

-- CreateTable
CREATE TABLE "UserHasCertificate" (
    "user_has_certificate_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "certificate_id" INTEGER NOT NULL,
    "acquired_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserHasCertificate_pkey" PRIMARY KEY ("user_has_certificate_id")
);

-- AddForeignKey
ALTER TABLE "MascotHasMascotItems" ADD CONSTRAINT "MascotHasMascotItems_mascot_id_fkey" FOREIGN KEY ("mascot_id") REFERENCES "Mascot"("mascot_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MascotHasMascotItems" ADD CONSTRAINT "MascotHasMascotItems_mascot_items_id_fkey" FOREIGN KEY ("mascot_items_id") REFERENCES "MascotItems"("mascot_items_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasBadge" ADD CONSTRAINT "UserHasBadge_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasBadge" ADD CONSTRAINT "UserHasBadge_badge_id_fkey" FOREIGN KEY ("badge_id") REFERENCES "Badges"("badge_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasCertificate" ADD CONSTRAINT "UserHasCertificate_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasCertificate" ADD CONSTRAINT "UserHasCertificate_certificate_id_fkey" FOREIGN KEY ("certificate_id") REFERENCES "Certificates"("certificate_id") ON DELETE RESTRICT ON UPDATE CASCADE;
