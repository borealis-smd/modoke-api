import { prisma } from "../config/db";
import { UnitsCreate } from "../validators/unitsValidator";
import { UnitNotFoundError } from "../errors/UnitNotFoundError";

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
      in_progress: true,
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

export const unlockUnit = async (cur_unit_id: number, user_id: string) => {
  const curUnit = await prisma.unit.findUnique({
    where: {
      unit_id: cur_unit_id,
    },
  });

  const nextUnit = await prisma.unit.findUnique({
    where: {
      unit_sequence: curUnit!.unit_sequence + 1,
      section_id: curUnit!.section_id,
    },
  });

  if (!nextUnit) {
    throw new UnitNotFoundError("Não há unidade seguinte.");
  }

  return prisma.unitProgress.create({
    data: {
      unit_id: nextUnit.unit_id,
      user_id,
      in_progress: true,
      is_locked: false,
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
      in_progress: false,
      completed_at: new Date(),
    },
  });
};
