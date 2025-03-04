import * as LessonRepo from "../models/lesson";
import { LessonsCreate } from "../validators/lessonsValidator";
import { NoLessonFoundError } from "../errors/NoLessonFoundError";
import { LessonAlreadyInProgressError } from "../errors/LessonAlreadyInProgressError";
import { ProgressStatus } from "@prisma/client";
import { prisma } from "../config/db";
import { LessonLinkedList } from "../data-structures/LessonLinkedList";

// Cache for storing lesson linked lists
const unitLessonsCache = new Map<number, LessonLinkedList>();
const sectionLessonsCache = new Map<number, LessonLinkedList>();
const levelLessonsCache = new Map<number, LessonLinkedList>();

export const getLessonById = async (lesson_id: number) => {
  const lesson = await LessonRepo.getLessonById(lesson_id);
  if (!lesson) {
    throw new NoLessonFoundError("Nenhuma lição encontrada.");
  }
  return lesson;
};

export const getLessonsByUnitId = async (unit_id: number, user_id: string) => {
  // Check cache first
  if (!unitLessonsCache.has(unit_id)) {
    const lessons = await LessonRepo.getLessonsByUnitId(unit_id, user_id);
    if (!lessons) {
      throw new NoLessonFoundError("Nenhuma lição encontrada.");
    }

    // Create new linked list and populate it
    const lessonList = new LessonLinkedList();
    lessons.forEach((lesson) => lessonList.append(lesson));
    unitLessonsCache.set(unit_id, lessonList);
  }

  return unitLessonsCache.get(unit_id)!.toArray();
};

export const getLessonsBySectionId = async (section_id: number) => {
  // Check cache first
  if (!sectionLessonsCache.has(section_id)) {
    const lessons = await LessonRepo.getLessonsBySectionId(section_id);
    if (!lessons) {
      throw new NoLessonFoundError("Nenhuma lição encontrada.");
    }

    // Create new linked list and populate it
    const lessonList = new LessonLinkedList();
    lessons.forEach((lesson) => lessonList.append(lesson));
    sectionLessonsCache.set(section_id, lessonList);
  }

  return sectionLessonsCache.get(section_id)!.toArray();
};

export const getLessonsByLevelId = async (level_id: number) => {
  // Check cache first
  if (!levelLessonsCache.has(level_id)) {
    const lessons = await LessonRepo.getLessonsByLevelId(level_id);
    if (!lessons) {
      throw new NoLessonFoundError("Nenhuma lição encontrada.");
    }

    // Create new linked list and populate it
    const lessonList = new LessonLinkedList();
    lessons.forEach((lesson) => lessonList.append(lesson));
    levelLessonsCache.set(level_id, lessonList);
  }

  return levelLessonsCache.get(level_id)!.toArray();
};

export const getInProgressLessonByUserId = async (user_id: string) => {
  return LessonRepo.getInProgressLessonByUserId(user_id);
};

export const getFinishedLessonsByUserId = async (user_id: string) => {
  return LessonRepo.getFinishedLessonsByUserId(user_id);
};

export const createLesson = async (lesson: LessonsCreate) => {
  const newLesson = await LessonRepo.createLesson(lesson);

  // Update caches if they exist for the related unit, section, and level
  if (unitLessonsCache.has(lesson.unit_id)) {
    unitLessonsCache.get(lesson.unit_id)!.append(newLesson);
  }
  if (sectionLessonsCache.has(lesson.unit_id)) {
    sectionLessonsCache.get(lesson.unit_id)!.append(newLesson);
  }
  if (levelLessonsCache.has(lesson.unit_id)) {
    levelLessonsCache.get(lesson.unit_id)!.append(newLesson);
  }

  return newLesson;
};

export const unlockLesson = async (lesson_id: number, user_id: string) => {
  const lessonInProgress = await LessonRepo.getInProgressLessonByUserId(
    user_id
  );
  if (lessonInProgress) {
    throw new LessonAlreadyInProgressError(
      "Só é possível ter uma lição em progresso por vez."
    );
  }
  return LessonRepo.unlockLesson(lesson_id, user_id);
};

export const finishLesson = async (lesson_id: number, user_id: string) => {
  const finishedLesson = await LessonRepo.finishLesson(lesson_id, user_id);

  // Get the current lesson to find its unit
  const currentLesson = await LessonRepo.getLessonById(lesson_id);

  // Get all lessons in the unit to check if this was the last one
  const unitLessons = await LessonRepo.getLessonsByUnitId(
    currentLesson.unit_id,
    user_id
  );

  // Find the next lesson in sequence
  const nextLesson = unitLessons.find(
    (lesson) => lesson.lesson_sequence === currentLesson.lesson_sequence + 1
  );

  if (nextLesson) {
    // If there's a next lesson, unlock it
    await LessonRepo.unlockLesson(nextLesson.lesson_id, user_id);
  } else {
    // If this was the last lesson in the unit, mark the unit as completed
    await prisma.unitProgress.update({
      where: {
        unit_id_user_id: {
          unit_id: currentLesson.unit_id,
          user_id,
        },
      },
      data: {
        status: ProgressStatus.COMPLETED,
        completed_at: new Date(),
      },
    });

    // Get the current unit to find its section
    const currentUnit = await prisma.unit.findUnique({
      where: { unit_id: currentLesson.unit_id },
      include: { Section: true },
    });

    if (currentUnit) {
      // Find the next unit in the section
      const nextUnit = await prisma.unit.findFirst({
        where: {
          section_id: currentUnit.section_id,
          unit_sequence: currentUnit.unit_sequence + 1,
        },
      });

      if (nextUnit) {
        // If there's a next unit, unlock it and its first lesson
        await prisma.unitProgress.upsert({
          where: {
            unit_id_user_id: {
              unit_id: nextUnit.unit_id,
              user_id,
            },
          },
          create: {
            unit_id: nextUnit.unit_id,
            user_id,
            status: ProgressStatus.IN_PROGRESS,
          },
          update: {
            status: ProgressStatus.IN_PROGRESS,
          },
        });

        // Get and unlock the first lesson of the next unit
        const firstLesson = await prisma.lesson.findFirst({
          where: {
            unit_id: nextUnit.unit_id,
            lesson_sequence: 1,
          },
        });

        if (firstLesson) {
          await prisma.lessonProgress.upsert({
            where: {
              lesson_id_user_id: {
                lesson_id: firstLesson.lesson_id,
                user_id,
              },
            },
            create: {
              lesson_id: firstLesson.lesson_id,
              user_id,
              status: ProgressStatus.IN_PROGRESS,
            },
            update: {
              status: ProgressStatus.IN_PROGRESS,
            },
          });
        }
      } else {
        // If this was the last unit in the section, mark the section as completed
        await prisma.sectionProgress.update({
          where: {
            section_id_user_id: {
              section_id: currentUnit.section_id,
              user_id,
            },
          },
          data: {
            status: ProgressStatus.COMPLETED,
            completed_at: new Date(),
          },
        });

        // Find and unlock the next section if it exists
        const nextSection = await prisma.section.findFirst({
          where: {
            level_id: currentUnit.Section.level_id,
            section_id: { gt: currentUnit.section_id },
          },
          orderBy: { section_id: "asc" },
        });

        if (nextSection) {
          // Unlock the next section and its first unit
          await prisma.sectionProgress.upsert({
            where: {
              section_id_user_id: {
                section_id: nextSection.section_id,
                user_id,
              },
            },
            create: {
              section_id: nextSection.section_id,
              user_id,
              status: ProgressStatus.IN_PROGRESS,
            },
            update: {
              status: ProgressStatus.IN_PROGRESS,
            },
          });
        }
      }
    }
  }

  return finishedLesson;
};

// Helper function to invalidate caches when needed
export const invalidateCache = (
  unit_id?: number,
  section_id?: number,
  level_id?: number
) => {
  if (unit_id) unitLessonsCache.delete(unit_id);
  if (section_id) sectionLessonsCache.delete(section_id);
  if (level_id) levelLessonsCache.delete(level_id);
};
