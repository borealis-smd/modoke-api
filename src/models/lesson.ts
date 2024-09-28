import { prisma } from "../config/db";
import { LessonsCreate } from "../validators/lessonsValidator";
import { NoLessonFoundError } from "../errors/NoLessonFoundError";
import { UnitNotFoundError } from "../errors/UnitNotFoundError";
import { assignBadgeToUser } from "./badge";
import { finishUnit } from "./units";

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
    orderBy: {
      completed_at: "desc",
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

export const unlockLesson = async (
  lesson_sequence: number,
  unit_id: number,
  user_id: string,
) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      unit_id_lesson_sequence: {
        lesson_sequence,
        unit_id,
      },
    },
  });

  if (!lesson) {
    throw new NoLessonFoundError("Lição não encontrada.");
  }

  return prisma.lessonProgress.create({
    data: {
      lesson_id: lesson.lesson_id,
      user_id,
      in_progress: true,
    },
  });
};

export const finishLesson = async (lesson_id: number, user_id: string) => {
  const finishedLesson = await prisma.lessonProgress.update({
    where: { lesson_id_user_id: { lesson_id, user_id } },
    data: {
      in_progress: false,
      completed_at: new Date(),
    },
  });

  const lesson = await prisma.lesson.findUnique({
    where: {
      lesson_id,
    },
  });

  if (!lesson) {
    throw new NoLessonFoundError("Lição não encontrada.");
  }

  const unit = await prisma.unit.findUnique({
    where: {
      unit_id: lesson.unit_id,
    },
  });

  if (!unit) {
    throw new UnitNotFoundError("Unidade não encontrada.");
  }

  // procura a próxima lição da mesma unidade
  let nextLesson = await prisma.lesson.findUnique({
    where: {
      unit_id_lesson_sequence: {
        lesson_sequence: lesson.lesson_sequence + 1,
        unit_id: unit.unit_id,
      },
    },
  });

  let badge = null;

  if (!nextLesson) {
    // procura a próxima unidade da mesma seção
    const nextUnit = await prisma.unit.findUnique({
      where: {
        section_id_unit_sequence: {
          unit_sequence: unit.unit_sequence + 1,
          section_id: unit.section_id,
        },
      },
    });

    if (!nextUnit) {
      throw new UnitNotFoundError("Seção finalizada.");
    }

    // finaliza a unidade atual
    await finishUnit(unit.unit_id, user_id);

    // atribui badge ao usuário
    badge = await assignBadgeToUser(user_id, unit.unit_id);

    // inicia a nova unidade
    await prisma.unitProgress.create({
      data: {
        unit_id: nextUnit.unit_id,
        user_id,
        in_progress: true,
        is_locked: false,
      },
    });

    nextLesson = await prisma.lesson.findUnique({
      where: {
        unit_id_lesson_sequence: {
          lesson_sequence: 1,
          unit_id: nextUnit.unit_id,
        },
      },
    });

    if (!nextLesson) {
      throw new NoLessonFoundError("Lição não encontrada.");
    }
  }

  await prisma.lessonProgress.create({
    data: {
      lesson_id: nextLesson.lesson_id,
      user_id,
      in_progress: true,
      is_locked: false,
    },
  });

  return { finishedLesson, badge };
};
