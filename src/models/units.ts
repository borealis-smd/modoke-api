import { prisma } from "../config/db";
import { UnitsCreate } from "../validators/unitsValidator";

export const getUnits = async () => {
  return prisma.units.findMany();
};

export const getUnitById = async (unit_id: number) => {
  return prisma.units.findUniqueOrThrow({
    where: { unit_id },
  });
};

export const getUnitsBySessionId = async (session_id: number) => {
  return prisma.units.findMany({
    where: { session_id },
  });
};

export const createUnit = async (unit: UnitsCreate) => {
  return prisma.units.create({
    data: {
      unit_title: unit.unit_title,
      unit_description: unit.unit_description,
      session_id: unit.session_id,
      is_completed: false,
    },
  });
};

export const finishUnit = async (unit_id: number) => {
  return prisma.units.update({
    where: { unit_id },
    data: { is_completed: true, completed_at: new Date() },
  });
};
