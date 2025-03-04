import { prisma } from "../config/db";
import { UnitsCreate } from "../validators/unitsValidator";
import { ProgressStatus } from "@prisma/client";

export const getUnits = async () => {
  return prisma.unit.findMany({
    orderBy: [
      {
        section_id: "asc",
      },
      {
        unit_sequence: "asc",
      },
    ],
  });
};

// Só pode haver uma unidade em progresso por usuário
export const getInProgressUnitByUserId = async (user_id: string) => {
  return prisma.unitProgress.findFirst({
    where: {
      user_id,
      status: ProgressStatus.IN_PROGRESS,
    },
    include: {
      Unit: true,
    },
  });
};

export const getUnitById = async (unit_id: number) => {
  return prisma.unit.findUniqueOrThrow({
    where: { unit_id },
  });
};

export const getUnitsBySectionId = async (
  section_id: number,
  user_id: string,
) => {
  return prisma.unit.findMany({
    where: { section_id },
    orderBy: {
      unit_sequence: "asc",
    },
    include: {
      Lessons: {
        include: {
          LessonProgresses: {
            where: {
              user_id,
            },
          },
        },
      },
    },
  });
};

export const createUnit = async (unit: UnitsCreate) => {
  return prisma.unit.create({
    data: {
      unit_sequence: unit.unit_sequence,
      unit_title: unit.unit_title,
      unit_description: unit.unit_description,
      section_id: unit.section_id,
    },
  });
};

export const unlockUnit = async (unit_id: number, user_id: string) => {
  return prisma.unitProgress.update({
    where: {
      unit_id_user_id: {
        unit_id,
        user_id,
      },
    },
    data: {
      status: ProgressStatus.IN_PROGRESS,
    },
  });
};

export const finishUnit = async (unit_id: number, user_id: string) => {
  return prisma.unitProgress.update({
    where: {
      unit_id_user_id: {
        unit_id,
        user_id,
      },
    },
    data: {
      status: ProgressStatus.COMPLETED,
      completed_at: new Date(),
    },
  });
};
