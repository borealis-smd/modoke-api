import { prisma } from "../config/db";
import { BadgeCreate } from "../validators/badgesValidator";

export const getBadges = async () => {
  return prisma.badges.findMany();
};

export const getBadgeByUnitId = async (unit_id: number) => {
  return prisma.badges.findUnique({
    where: { unit_id },
    include: { Unit: true },
  });
};

export const getBadgesByUserId = async (user_id: string) => {
  return prisma.userHasBadge.findMany({
    where: { user_id },
    include: {
      Badges: {
        include: {
          Unit: true,
        },
      },
    },
  });
};

export const createBadge = async (badge: BadgeCreate) => {
  return prisma.badges.create({
    data: {
      badge_name: badge.badge_name,
      badge_image_url: badge.badge_image_url,
      unit_id: badge.unit_id,
    },
  });
};

export const assignBadgeToUser = async (user_id: string, badge_id: number) => {
  return prisma.userHasBadge.create({
    data: {
      user_id,
      badge_id,
    },
  });
};
