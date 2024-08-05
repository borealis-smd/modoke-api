import { prisma } from "../config/db";

export const getLevelById = async (level_id: number) => {
  return prisma.level.findUniqueOrThrow({
    where: { level_id },
  });
};

export const getLevels = async () => {
  return prisma.level.findMany();
};