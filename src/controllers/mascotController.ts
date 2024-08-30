import * as MascotService from "../services/mascotService";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { extractUserId } from "../utils/extractUserId";
import {handleError} from "../utils/errorHandler";

export const getMascotByUserId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const user_id = extractUserId(request, reply);

    const mascot = await MascotService.getMascotByUserId(user_id);

    reply.code(200).send(mascot);
  } catch (error) {
    handleError(error, reply);
  }
};

export const createMascot = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
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
    handleError(error, reply);
  }
};
