-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('LIGHT', 'DARK');

-- CreateEnum
CREATE TYPE "FontSize" AS ENUM ('VERY_SMALL', 'SMALL', 'MEDIUM', 'LARGE', 'VERY_LARGE');

-- CreateTable
CREATE TABLE "SystemPreferences" (
    "system_preferences_id" SERIAL NOT NULL,
    "theme" "Theme" NOT NULL,
    "font_size" "FontSize" NOT NULL,
    "is_high_contrast" BOOLEAN NOT NULL,
    "sound" BOOLEAN NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "SystemPreferences_pkey" PRIMARY KEY ("system_preferences_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SystemPreferences_user_id_key" ON "SystemPreferences"("user_id");

-- AddForeignKey
ALTER TABLE "SystemPreferences" ADD CONSTRAINT "SystemPreferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
