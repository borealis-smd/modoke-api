import * as SessionService from "../services/sessionService";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { validateToken } from "../validators/tokenValidator";
import { SessionCreateSchema } from "../validators/sessionsValidator";

export const getSessions = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await validateToken(request, reply);

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
    await validateToken(request, reply);

    const sessionParsedBody = SessionCreateSchema.parse(request.body);

    const session = await SessionService.createSession(sessionParsedBody);

    reply.code(201).send(session);
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

export const finishSession = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await validateToken(request, reply);

    const { session_id } = z
      .object({
        session_id: z.number().int(),
      })
      .parse(request.query);

    const session = await SessionService.finishSession(session_id);

    reply.code(200).send(session);
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
