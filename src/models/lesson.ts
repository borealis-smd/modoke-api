import { prisma } from "../config/db";
import { LessonsCreate } from "../validators/lessonsValidator";

export const getLessonById = async (lesson_id: number) => {
  return prisma.lesson.findUniqueOrThrow({
    where: { lesson_id },
  });
};

export const getLessonsByUnitId = async (unit_id: number) => {
  return prisma.lesson.findMany({
    where: { unit_id },
    orderBy: {
      lesson_sequence: "asc",
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
      in_progress: true,
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
      in_progress: false,
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

export const startLesson = async (lesson_id: number, user_id: string) => {
  // [] verificar se não existe uma lição em progresso
  return prisma.lessonProgress.create({
    data: {
      lesson_id,
      user_id,
      in_progress: true,
    },
  });
};

export const unlockLesson = async (lesson_id: number, user_id: string) => {
  // [] verificar se não existe uma lição em progresso
  return prisma.lessonProgress.create({
    data: {
      lesson_id,
      user_id,
      in_progress: true,
      is_locked: false,
    },
  });
};

export const finishLesson = async (lesson_id: number, user_id: string) => {
  return prisma.lessonProgress.update({
    where: { lesson_id_user_id: { lesson_id, user_id } },
    data: {
      in_progress: false,
      completed_at: new Date(),
    },
  });
};
