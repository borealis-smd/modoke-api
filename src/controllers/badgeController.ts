import * as BadgeService from "../services/badgeService";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { validateToken } from "../validators/tokenValidator";
import { BadgeCreateSchema } from "../validators/badgesValidator";
import { extractUserId } from "../utils/extractUserId";

export const getBadges = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await validateToken(request, reply);

    const badges = await BadgeService.getBadges();

    reply.code(200).send(badges);
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) =>
        reply
          .code(400)
          .send({ message: `${err.path.join(".")} - ${err.message}` }),
      );
    }
    if (error instanceof Error) {
      reply.code(400).send({ message: error.message });
    }
  }
};

export const getBadgeByUnitId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await validateToken(request, reply);

    const { unit_id } = z
      .object({
        unit_id: z.number().int(),
      })
      .parse(request.query);

    const badge = await BadgeService.getBadgeByUnitId(unit_id);

    reply.code(200).send(badge);
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) =>
        reply
          .code(400)
          .send({ message: `${err.path.join(".")} - ${err.message}` }),
      );
    }
    if (error instanceof Error) {
      reply.code(400).send({ message: error.message });
    }
  }
};

export const getBadgesByUserId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await validateToken(request, reply);

    const user_id = extractUserId(request, reply);

    const badges = await BadgeService.getBadgesByUserId(user_id);

    reply.code(200).send(badges);
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) =>
        reply
          .code(400)
          .send({ message: `${err.path.join(".")} - ${err.message}` }),
      );
    }
    if (error instanceof Error) {
      reply.code(400).send({ message: error.message });
    }
  }
};

export const createBadge = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  await validateToken(request, reply);

  try {
    const badgeParsedBody = BadgeCreateSchema.parse(request.body);

    const badge = await BadgeService.createBadge(badgeParsedBody);

    reply.code(201).send(badge);
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) =>
        reply
          .code(400)
          .send({ message: `${err.path.join(".")} - ${err.message}` }),
      );
    }
    if (error instanceof Error) {
      reply.code(400).send({ message: error.message });
    }
  }
};

export const assignBadgeToUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  await validateToken(request, reply);

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
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) =>
        reply
          .code(400)
          .send({ message: `${err.path.join(".")} - ${err.message}` }),
      );
    }
    if (error instanceof Error) {
      reply.code(400).send({ message: error.message });
    }
  }
};
