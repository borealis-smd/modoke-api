-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "LevelName" AS ENUM ('A', 'AA', 'AAA');

-- CreateEnum
CREATE TYPE "ExplanationPart" AS ENUM ('PART_1', 'PART_2', 'PART_3');

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,
    "avatar_url" VARCHAR(255) NOT NULL,
    "xp" INTEGER NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "level_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Login" (
    "login_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT,
    "user_id" TEXT NOT NULL,
    "is_google_user" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Login_pkey" PRIMARY KEY ("login_id")
);

-- CreateTable
CREATE TABLE "Level" (
    "level_id" INTEGER NOT NULL,
    "name" "LevelName" NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("level_id")
);

-- CreateTable
CREATE TABLE "Section" (
    "section_id" INTEGER NOT NULL,
    "section_title" VARCHAR(255) NOT NULL,
    "section_description" TEXT NOT NULL,
    "level_id" INTEGER NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("section_id")
);

-- CreateTable
CREATE TABLE "SectionProgress" (
    "section_progress_id" TEXT NOT NULL,
    "section_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "in_progress" BOOLEAN NOT NULL DEFAULT false,
    "is_locked" BOOLEAN NOT NULL DEFAULT true,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "SectionProgress_pkey" PRIMARY KEY ("section_progress_id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "unit_id" INTEGER NOT NULL,
    "unit_title" VARCHAR(255) NOT NULL,
    "unit_description" TEXT NOT NULL,
    "section_id" INTEGER NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("unit_id")
);

-- CreateTable
CREATE TABLE "UnitProgress" (
    "unit_progress_id" TEXT NOT NULL,
    "unit_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "in_progress" BOOLEAN NOT NULL DEFAULT false,
    "is_locked" BOOLEAN NOT NULL DEFAULT true,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "UnitProgress_pkey" PRIMARY KEY ("unit_progress_id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "lesson_id" INTEGER NOT NULL,
    "lesson_title" VARCHAR(255) NOT NULL,
    "lesson_description" TEXT NOT NULL,
    "unit_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("lesson_id")
);

-- CreateTable
CREATE TABLE "LessonProgress" (
    "lesson_progress_id" TEXT NOT NULL,
    "lesson_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "in_progress" BOOLEAN NOT NULL DEFAULT false,
    "is_locked" BOOLEAN NOT NULL DEFAULT true,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "LessonProgress_pkey" PRIMARY KEY ("lesson_progress_id")
);

-- CreateTable
CREATE TABLE "Explanation" (
    "explanation_id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "part" "ExplanationPart" NOT NULL,
    "lesson_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Explanation_pkey" PRIMARY KEY ("explanation_id")
);

-- CreateTable
CREATE TABLE "Question" (
    "question_id" TEXT NOT NULL,
    "question_text" TEXT NOT NULL,
    "is_entrance_question" BOOLEAN NOT NULL,
    "xp" INTEGER NOT NULL,
    "lesson_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "Option" (
    "option_id" TEXT NOT NULL,
    "option_text" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "question_id" TEXT NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("option_id")
);

-- CreateTable
CREATE TABLE "Attempt" (
    "attempt_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "selected_option_id" TEXT NOT NULL,
    "attempted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attempt_pkey" PRIMARY KEY ("attempt_id")
);

-- CreateTable
CREATE TABLE "Badge" (
    "badge_id" SERIAL NOT NULL,
    "badge_name" TEXT NOT NULL,
    "badge_image_url" VARCHAR(255) NOT NULL,
    "unit_id" INTEGER NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("badge_id")
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
CREATE TABLE "Certificate" (
    "certificate_id" SERIAL NOT NULL,
    "certificate_text" TEXT NOT NULL,
    "section_id" INTEGER NOT NULL,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("certificate_id")
);

-- CreateTable
CREATE TABLE "UserHasCertificate" (
    "user_has_certificate_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "certificate_id" INTEGER NOT NULL,
    "acquired_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserHasCertificate_pkey" PRIMARY KEY ("user_has_certificate_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Login_email_key" ON "Login"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Section_level_id_key" ON "Section"("level_id");

-- CreateIndex
CREATE UNIQUE INDEX "SectionProgress_section_id_user_id_key" ON "SectionProgress"("section_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UnitProgress_unit_id_user_id_key" ON "UnitProgress"("unit_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "LessonProgress_lesson_id_user_id_key" ON "LessonProgress"("lesson_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_unit_id_key" ON "Badge"("unit_id");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_section_id_key" ON "Certificate"("section_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "Level"("level_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Login" ADD CONSTRAINT "Login_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "Level"("level_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionProgress" ADD CONSTRAINT "SectionProgress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionProgress" ADD CONSTRAINT "SectionProgress_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Section"("section_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Section"("section_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitProgress" ADD CONSTRAINT "UnitProgress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitProgress" ADD CONSTRAINT "UnitProgress_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "Unit"("unit_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "Unit"("unit_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lesson"("lesson_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Explanation" ADD CONSTRAINT "Explanation_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lesson"("lesson_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lesson"("lesson_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_selected_option_id_fkey" FOREIGN KEY ("selected_option_id") REFERENCES "Option"("option_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "Unit"("unit_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasBadge" ADD CONSTRAINT "UserHasBadge_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasBadge" ADD CONSTRAINT "UserHasBadge_badge_id_fkey" FOREIGN KEY ("badge_id") REFERENCES "Badge"("badge_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Section"("section_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasCertificate" ADD CONSTRAINT "UserHasCertificate_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasCertificate" ADD CONSTRAINT "UserHasCertificate_certificate_id_fkey" FOREIGN KEY ("certificate_id") REFERENCES "Certificate"("certificate_id") ON DELETE RESTRICT ON UPDATE CASCADE;
