import * as SessionService from "../services/sessionService";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { SessionCreateSchema } from "../validators/sessionsValidator";
import { handleError } from "../utils/errorHandler";

export const getSessions = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const sessions = await SessionService.getSessions();
    reply.code(200).send(sessions);
  } catch (error) {
    if (error instanceof Error) {
      reply.code(400).send({ message: error.message });
    }
  }
};

export const createSession = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const sessionParsedBody = SessionCreateSchema.parse(request.body);

    const session = await SessionService.createSession(sessionParsedBody);

    reply.code(201).send(session);
  } catch (error) {
    handleError(error, reply);
  }
};

export const finishSession = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { session_id } = z
      .object({
        session_id: z.number().int(),
      })
      .parse(request.query);

    const session = await SessionService.finishSession(session_id);

    reply.code(200).send(session);
  } catch (error) {
    handleError(error, reply);
  }
};
