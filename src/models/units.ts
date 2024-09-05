import { prisma } from "../config/db";
import { UnitsCreate } from "../validators/unitsValidator";

export const getUnits = async () => {
  return prisma.units.findMany();
};

// Só pode haver uma unidade em progresso por usuário
export const getInProgressUnitByUserId = async (user_id: string) => {
  return prisma.unitProgress.findFirst({
    where: {
      user_id,
      in_progress: true,
    },
  });
};

export const getUnitById = async (unit_id: number) => {
  return prisma.units.findUniqueOrThrow({
    where: { unit_id },
  });
};

export const getUnitsBySectionId = async (section_id: number) => {
  return prisma.units.findMany({
    where: { section_id },
  });
};

export const createUnit = async (unit: UnitsCreate) => {
  return prisma.units.create({
    data: {
      unit_title: unit.unit_title,
      unit_description: unit.unit_description,
      section_id: unit.section_id,
    },
  });
};

export const startUnit = async (unit_id: number, user_id: string) => {
  return prisma.unitProgress.create({
    data: {
      unit_id,
      user_id,
      in_progress: true,
    },
  });
};

export const unlockUnit = async (unit_id: number, user_id: string) => {
  return prisma.unitProgress.create({
    data: {
      unit_id,
      user_id,
      in_progress: true,
      is_locked: false,
    },
  });
};

export const finishUnit = async (unit_id: number, user_id: string) => {
  return prisma.unitProgress.update({
    where: {
      unit_id,
      user_id,
    },
    data: {
      in_progress: false,
      completed_at: new Date(),
    },
  });
};
