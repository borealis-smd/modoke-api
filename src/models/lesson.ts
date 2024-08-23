import { prisma } from "../config/db";
import { LessonsCreate } from "../validators/lessonsValidator";

export const getLessonById = async (lesson_id: number) => {
  return prisma.lessons.findUniqueOrThrow({
    where: { lesson_id },
  });
};

export const getLessonsByUnitId = async (unit_id: number) => {
  return prisma.lessons.findMany({
    where: { unit_id },
  });
};

export const getLessonsBySessionId = async (session_id: number) => {
  return prisma.lessons.findMany({
    where: { Unit: { session_id } },
  });
};

export const getLessonsByLevelId = async (level_id: number) => {
  // Lessons has unit_id, Units has session_id, Sessions has level_id
  return prisma.lessons.findMany({
    where: { Unit: { Session: { level_id } } },
  });
};

export const createLesson = async (lesson: LessonsCreate) => {
  return prisma.lessons.create({
    data: {
      lesson_title: lesson.lesson_title,
      lesson_description: lesson.lesson_description,
      lesson_principle: lesson.lesson_principle,
      unit_id: lesson.unit_id,
      is_completed: false,
    },
  });
};

export const finishLesson = async (lesson_id: number) => {
  return prisma.lessons.update({
    where: { lesson_id },
    data: { is_completed: true, completed_at: new Date() },
  });
};
