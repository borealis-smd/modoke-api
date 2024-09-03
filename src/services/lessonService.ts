import * as LessonRepo from "../models/lesson";
import { LessonsCreate } from "../validators/lessonsValidator";
import { NoLessonFoundError } from "../errors/NoLessonFoundError";

export const getLessonById = async (lesson_id: number) => {
  const lesson = await LessonRepo.getLessonById(lesson_id);
  if (!lesson) {
    throw new NoLessonFoundError("Nenhuma lição encontrada.");
  }
  return lesson;
};

export const getLessonsByUnitId = async (unit_id: number) => {
  const lessons = await LessonRepo.getLessonsByUnitId(unit_id);
  if (!lessons) {
    throw new NoLessonFoundError("Nenhuma lição encontrada.");
  }
  return lessons;
};

export const getLessonsBySeçionId = async (section_id: number) => {
  const lessons = await LessonRepo.getLessonsBySeçionId(section_id);
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

export const createLesson = async (lesson: LessonsCreate) => {
  return LessonRepo.createLesson(lesson);
};

export const finishLesson = async (lesson_id: number) => {
  return LessonRepo.finishLesson(lesson_id);
};
