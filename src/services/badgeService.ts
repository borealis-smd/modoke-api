import * as BadgeRepo from "../models/badge";
import { BadgeCreate } from "../validators/badgesValidator";

export const getBadges = async () => {
  return BadgeRepo.getBadges();
};

export const getBadgeByUnitId = async (unit_id: number) => {
  return BadgeRepo.getBadgeByUnitId(unit_id);
};

export const getBadgesByUserId = async (user_id: string) => {
  return BadgeRepo.getBadgesByUserId(user_id);
};

export const createBadge = async (badge: BadgeCreate) => {
  return BadgeRepo.createBadge(badge);
};

export const assignBadgeToUser = async (user_id: string, badge_id: number) => {
  return BadgeRepo.assignBadgeToUser(user_id, badge_id);
};
