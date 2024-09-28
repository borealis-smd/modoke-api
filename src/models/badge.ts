import { prisma } from "../config/db";
import { BadgeCreate } from "../validators/badgesValidator";

export const getBadges = async () => {
  return prisma.badge.findMany();
};

export const getBadgeByUnitId = async (unit_id: number) => {
  return prisma.badge.findUnique({
    where: { unit_id },
    include: { Unit: true },
  });
};

export const getBadgesByUserId = async (user_id: string) => {
  return prisma.userHasBadge.findMany({
    where: { user_id },
    include: {
      Badge: {
        include: {
          Unit: true,
        },
      },
    },
  });
};

export const createBadge = async (badge: BadgeCreate) => {
  return prisma.badge.create({
    data: {
      badge_name: badge.badge_name,
      badge_image_url: badge.badge_image_url,
      unit_id: badge.unit_id,
    },
  });
};

export const assignBadgeToUser = async (user_id: string, unit_id: number) => {
  const badge = await prisma.badge.findUnique({
    where: { unit_id },
  });

  if (!badge) {
    throw new Error("Badge not found");
  }

  return prisma.userHasBadge.create({
    data: {
      user_id,
      badge_id: badge.badge_id,
    },
  });
};
