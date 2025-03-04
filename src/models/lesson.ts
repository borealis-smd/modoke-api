import { prisma } from "../config/db";
import { LessonsCreate } from "../validators/lessonsValidator";
import { ProgressStatus } from "@prisma/client";

export const getLessonById = async (lesson_id: number) => {
  return prisma.lesson.findUniqueOrThrow({
    where: { lesson_id },
  });
};

export const getLessonsByUnitId = async (unit_id: number, user_id: string) => {
  return prisma.lesson.findMany({
    where: { unit_id },
    orderBy: {
      lesson_sequence: "asc",
    },
    include: {
      LessonProgresses: {
        where: {
          user_id: user_id,
        },
      },
      Explanations: true,
    },
  });
};

export const getLessonsBySectionId = async (section_id: number) => {
  return prisma.lesson.findMany({
    where: { Unit: { section_id } },
    orderBy: {
      lesson_sequence: "asc",
    },
  });
};

export const getLessonsByLevelId = async (level_id: number) => {
  return prisma.lesson.findMany({
    where: { Unit: { Section: { level_id } } },
    orderBy: {
      lesson_sequence: "asc",
    },
  });
};

// Só pode haver uma lição em progresso por usuário
export const getInProgressLessonByUserId = async (user_id: string) => {
  return prisma.lessonProgress.findFirst({
    where: {
      user_id,
      status: ProgressStatus.IN_PROGRESS,
    },
    include: {
      Lesson: true,
    },
  });
};

export const getFinishedLessonsByUserId = async (user_id: string) => {
  return prisma.lessonProgress.findMany({
    where: {
      user_id,
      status: ProgressStatus.COMPLETED,
    },
    include: {
      Lesson: true,
    },
  });
};

export const createLesson = async (lesson: LessonsCreate) => {
  return prisma.lesson.create({
    data: {
      lesson_sequence: lesson.lesson_sequence,
      lesson_title: lesson.lesson_title,
      lesson_description: lesson.lesson_description,
      unit_id: lesson.unit_id,
    },
  });
};

export const unlockLesson = async (lesson_id: number, user_id: string) => {
  return prisma.lessonProgress.update({
    where: {
      lesson_id_user_id: {
        lesson_id,
        user_id,
      },
    },
    data: {
      status: ProgressStatus.IN_PROGRESS,
    },
  });
};

export const finishLesson = async (lesson_id: number, user_id: string) => {
  return prisma.lessonProgress.update({
    where: {
      lesson_id_user_id: {
        lesson_id,
        user_id,
      },
    },
    data: {
      status: ProgressStatus.COMPLETED,
      completed_at: new Date(),
    },
  });
};
