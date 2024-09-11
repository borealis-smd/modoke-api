import * as ExplanationService from "../services/explanationService";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { ExplanationsCreate } from "../validators/explanationsValidator";
import { handleError } from "../utils/errorHandler";

export const getExplanationsByLessonId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { lesson_id, part } = z
      .object({
        lesson_id: z.number().int(),
        part: z.enum(["PART_1", "PART_2", "PART_3"]).optional(),
      })
      .parse(request.query);

    const explanations = await ExplanationService.getExplanationsByLessonId(
      lesson_id,
      part,
    );

    reply.code(200).send(explanations);
  } catch (error) {
    handleError(error, reply);
  }
};

export const createExplanation = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const explanationParsedBody = ExplanationsCreate.parse(request.body);

    const explanation = await ExplanationService.createExplanation(
      explanationParsedBody,
    );

    reply.code(201).send(explanation);
  } catch (error) {
    handleError(error, reply);
  }
};
