import * as MascotService from "../services/mascotService";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { validateToken } from "../validators/tokenValidator";
import { extractUserId } from "../utils/extractUserId";

export const getMascotByUserId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await validateToken(request, reply);

    const user_id = extractUserId(request, reply);

    const mascot = await MascotService.getMascotByUserId(user_id);

    reply.code(200).send(mascot);
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

export const createMascot = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await validateToken(request, reply);

    const mascot = z.object({
      mascot_image_url: z.string().url(),
    });

    const mascotData = mascot.parse(request.body);

    const user_id = extractUserId(request, reply);

    const mascotCreated = await MascotService.createMascot({
      mascot_image_url: mascotData.mascot_image_url,
      user_id,
    });

    reply.code(201).send(mascotCreated);
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
