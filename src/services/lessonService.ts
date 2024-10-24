import * as LessonRepo from "../models/lesson";
import { LessonsCreate } from "../validators/lessonsValidator";
import { NoLessonFoundError } from "../errors/NoLessonFoundError";
import { LessonAlreadyInProgressError } from "../errors/LessonAlreadyInProgressError";

export const getLessonById = async (lesson_id: number) => {
  const lesson = await LessonRepo.getLessonById(lesson_id);
  if (!lesson) {
    throw new NoLessonFoundError("Nenhuma lição encontrada.");
  }
  return lesson;
};

export const getLessonsByUnitId = async (unit_id: number, user_id: string) => {
  const lessons = await LessonRepo.getLessonsByUnitId(unit_id, user_id);
  if (!lessons) {
    throw new NoLessonFoundError("Nenhuma lição encontrada.");
  }
  return lessons;
};

export const getLessonsBySectionId = async (section_id: number) => {
  const lessons = await LessonRepo.getLessonsBySectionId(section_id);
  if (!lessons) {
    throw new NoLessonFoundError("Nenhuma lição encontrada.");
  }
  return lessons;
};

export const getLessonsByLevelId = async (level_id: number) => {
  const lessons = await LessonRepo.getLessonsByLevelId(level_id);
  if (!lessons) {
    throw new NoLessonFoundError("Nenhuma lição encontrada.");
  }
  return lessons;
};

export const getInProgressLessonByUserId = async (user_id: string) => {
  return LessonRepo.getInProgressLessonByUserId(user_id);
};

export const getFinishedLessonsByUserId = async (user_id: string) => {
  return LessonRepo.getFinishedLessonsByUserId(user_id);
};

export const createLesson = async (lesson: LessonsCreate) => {
  return LessonRepo.createLesson(lesson);
};

export const unlockLesson = async (lesson_id: number, user_id: string) => {
  const lessonInProgress =
    await LessonRepo.getInProgressLessonByUserId(user_id);
  if (lessonInProgress) {
    throw new LessonAlreadyInProgressError(
      "Só é possível ter uma lição em progresso por vez.",
    );
  }
  return LessonRepo.unlockLesson(lesson_id, user_id);
};

export const finishLesson = async (lesson_id: number, user_id: string) => {
  return LessonRepo.finishLesson(lesson_id, user_id);
};
