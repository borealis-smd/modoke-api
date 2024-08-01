-- CreateEnum
CREATE TYPE "LevelName" AS ENUM ('A', 'AA', 'AAA');

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tries" INTEGER NOT NULL,
    "xp" INTEGER NOT NULL,
    "level_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Login" (
    "login_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Login_pkey" PRIMARY KEY ("login_id")
);

-- CreateTable
CREATE TABLE "Level" (
    "level_id" SERIAL NOT NULL,
    "name" "LevelName" NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("level_id")
);

-- CreateTable
CREATE TABLE "Sessions" (
    "session_id" SERIAL NOT NULL,
    "session_title" TEXT NOT NULL,
    "session_description" TEXT NOT NULL,
    "is_completed" BOOLEAN NOT NULL,
    "completed_at" TIMESTAMP(3) NOT NULL,
    "level_id" INTEGER NOT NULL,

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "Units" (
    "unit_id" SERIAL NOT NULL,
    "unit_title" TEXT NOT NULL,
    "unit_description" TEXT NOT NULL,
    "is_completed" BOOLEAN NOT NULL,
    "completed_at" TIMESTAMP(3) NOT NULL,
    "session_id" INTEGER NOT NULL,

    CONSTRAINT "Units_pkey" PRIMARY KEY ("unit_id")
);

-- CreateTable
CREATE TABLE "Lessons" (
    "lesson_id" SERIAL NOT NULL,
    "lesson_title" TEXT NOT NULL,
    "lesson_description" TEXT NOT NULL,
    "is_completed" BOOLEAN NOT NULL,
    "unit_id" INTEGER NOT NULL,
    "completed_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lessons_pkey" PRIMARY KEY ("lesson_id")
);

-- CreateTable
CREATE TABLE "Explanations" (
    "explanation_id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "lesson_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Explanations_pkey" PRIMARY KEY ("explanation_id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "question_id" SERIAL NOT NULL,
    "question_text" TEXT NOT NULL,
    "is_entrance_question" BOOLEAN NOT NULL,
    "xp" INTEGER NOT NULL,
    "lesson_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "Answers" (
    "answer_id" SERIAL NOT NULL,
    "answer_text" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "question_id" INTEGER NOT NULL,
    "answered_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("answer_id")
);

-- CreateTable
CREATE TABLE "Attempts" (
    "attempt_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "question_id" INTEGER NOT NULL,
    "selected_answer_id" INTEGER NOT NULL,
    "attempted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attempts_pkey" PRIMARY KEY ("attempt_id")
);

-- CreateTable
CREATE TABLE "Mascot" (
    "mascot_id" SERIAL NOT NULL,
    "mascot_image_url" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Mascot_pkey" PRIMARY KEY ("mascot_id")
);

-- CreateTable
CREATE TABLE "MascotItems" (
    "mascot_items_id" SERIAL NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_image_url" TEXT NOT NULL,
    "isEquipped" BOOLEAN NOT NULL,
    "acquired_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MascotItems_pkey" PRIMARY KEY ("mascot_items_id")
);

-- CreateTable
CREATE TABLE "MascotItemsOnMascot" (
    "mascot_id" INTEGER NOT NULL,
    "mascot_items_id" INTEGER NOT NULL,

    CONSTRAINT "MascotItemsOnMascot_pkey" PRIMARY KEY ("mascot_id","mascot_items_id")
);

-- CreateTable
CREATE TABLE "Badges" (
    "badge_id" SERIAL NOT NULL,
    "badge_name" TEXT NOT NULL,
    "badge_image_url" TEXT NOT NULL,
    "unit_id" INTEGER NOT NULL,

    CONSTRAINT "Badges_pkey" PRIMARY KEY ("badge_id")
);

-- CreateTable
CREATE TABLE "BadgesOnUser" (
    "badge_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "BadgesOnUser_pkey" PRIMARY KEY ("badge_id","user_id")
);

-- CreateTable
CREATE TABLE "Certificates" (
    "certificate_id" SERIAL NOT NULL,
    "certificate_text" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "session_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Certificates_pkey" PRIMARY KEY ("certificate_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Login_email_key" ON "Login"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Sessions_level_id_key" ON "Sessions"("level_id");

-- CreateIndex
CREATE UNIQUE INDEX "Explanations_lesson_id_key" ON "Explanations"("lesson_id");

-- CreateIndex
CREATE UNIQUE INDEX "Attempts_selected_answer_id_key" ON "Attempts"("selected_answer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Mascot_user_id_key" ON "Mascot"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Badges_unit_id_key" ON "Badges"("unit_id");

-- CreateIndex
CREATE UNIQUE INDEX "Certificates_session_id_key" ON "Certificates"("session_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "Level"("level_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Login" ADD CONSTRAINT "Login_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "Level"("level_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Units" ADD CONSTRAINT "Units_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Sessions"("session_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lessons" ADD CONSTRAINT "Lessons_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "Units"("unit_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Explanations" ADD CONSTRAINT "Explanations_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lessons"("lesson_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lessons"("lesson_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Questions"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempts" ADD CONSTRAINT "Attempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempts" ADD CONSTRAINT "Attempts_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Questions"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempts" ADD CONSTRAINT "Attempts_selected_answer_id_fkey" FOREIGN KEY ("selected_answer_id") REFERENCES "Answers"("answer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mascot" ADD CONSTRAINT "Mascot_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MascotItemsOnMascot" ADD CONSTRAINT "MascotItemsOnMascot_mascot_id_fkey" FOREIGN KEY ("mascot_id") REFERENCES "Mascot"("mascot_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MascotItemsOnMascot" ADD CONSTRAINT "MascotItemsOnMascot_mascot_items_id_fkey" FOREIGN KEY ("mascot_items_id") REFERENCES "MascotItems"("mascot_items_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badges" ADD CONSTRAINT "Badges_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "Units"("unit_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgesOnUser" ADD CONSTRAINT "BadgesOnUser_badge_id_fkey" FOREIGN KEY ("badge_id") REFERENCES "Badges"("badge_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgesOnUser" ADD CONSTRAINT "BadgesOnUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificates" ADD CONSTRAINT "Certificates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificates" ADD CONSTRAINT "Certificates_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Sessions"("session_id") ON DELETE RESTRICT ON UPDATE CASCADE;
