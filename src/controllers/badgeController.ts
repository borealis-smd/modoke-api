import * as BadgeService from "../services/badgeService";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { BadgeCreateSchema } from "../validators/badgesValidator";
import { extractUserId } from "../utils/extractUserId";
import { handleError } from "../utils/errorHandler";

export const getBadges = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const badges = await BadgeService.getBadges();

    reply.code(200).send(badges);
  } catch (error) {
    handleError(error, reply);
  }
};

export const getBadgeByUnitId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { unit_id } = z
      .object({
        unit_id: z.number().int(),
      })
      .parse(request.query);

    const badge = await BadgeService.getBadgeByUnitId(unit_id);

    reply.code(200).send(badge);
  } catch (error) {
    handleError(error, reply);
  }
};

export const getBadgesByUserId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const user_id = extractUserId(request, reply);

    const badges = await BadgeService.getBadgesByUserId(user_id);

    reply.code(200).send(badges);
  } catch (error) {
    handleError(error, reply);
  }
};

export const createBadge = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const badgeParsedBody = BadgeCreateSchema.parse(request.body);

    const badge = await BadgeService.createBadge(badgeParsedBody);

    reply.code(201).send(badge);
  } catch (error) {
    handleError(error, reply);
  }
};

export const assignBadgeToUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { user_id, badge_id } = z
      .object({
        user_id: z.string().uuid(),
        badge_id: z.number().int(),
      })
      .parse(request.body);

    await BadgeService.assignBadgeToUser(user_id, badge_id);

    reply.code(200).send({ message: "Emblema atribuído com sucesso." });
  } catch (error) {
    handleError(error, reply);
  }
};
