import * as LevelService from "../services/levelService";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export const getLevelById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { level_id } = z
      .object({
        level_id: z.number().int(),
      })
      .parse(request.query);

    const level = await LevelService.getLevelById(level_id);

    reply.code(200).send(level);
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

export const getLevels = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const levels = await LevelService.getLevels();

    reply.code(200).send(levels);
  } catch (error) {
    if (error instanceof Error) {
      reply.code(400).send({ message: error.message });
    }
  }
};
