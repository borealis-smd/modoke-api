import * as AttemptService from "../services/attemptService";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { extractUserId } from "../utils/extractUserId";
import { handleError } from "../utils/errorHandler";

export const registerAttempt = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const user_id = extractUserId(request, reply);

    const attemptParsedBody = z
      .object({
        question_id: z.string().uuid(),
        selected_option_id: z.string().uuid(),
      })
      .parse(request.body);

    const attempt = await AttemptService.registerAttempt({
      user_id: user_id,
      ...attemptParsedBody,
    });

    reply.code(201).send(attempt);
  } catch (error) {
    handleError(error, reply);
  }
};

export const getLastAttemptByQuestionId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { question_id } = z
      .object({
        question_id: z.string().uuid(),
      })
      .parse(request.query);

    const user_id = extractUserId(request, reply);

    const lastAttempt = await AttemptService.getLastAttemptByQuestionId(
      question_id,
      user_id,
    );

    reply.code(200).send(lastAttempt);
  } catch (error) {
    handleError(error, reply);
  }
};
