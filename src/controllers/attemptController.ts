import * as AttemptService from "../services/attemptService";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { validateToken } from "../validators/tokenValidator";
import { extractUserId } from "../utils/extractUserId";

export const registerAttempt = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await validateToken(request, reply);

    const user_id = extractUserId(request, reply);

    const attemptParsedBody = z
      .object({
        question_id: z.number().int(),
        selected_option_id: z.number().int(),
      })
      .parse(request.body);

    const attempt = await AttemptService.registerAttempt({
      user_id: user_id,
      ...attemptParsedBody,
    });

    reply.code(201).send(attempt);
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

export const getLastAttemptByQuestionId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await validateToken(request, reply);

    const { question_id } = z
      .object({
        question_id: z.number().int(),
      })
      .parse(request.query);

    const user_id = extractUserId(request, reply);

    const lastAttempt = await AttemptService.getLastAttemptByQuestionId(
      question_id,
      user_id,
    );

    reply.code(200).send(lastAttempt);
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
