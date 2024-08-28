import * as ExplanationService from "../services/explanationService";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { validateToken } from "../validators/tokenValidator";
import { ExplanationsCreate } from "../validators/explanationsValidator";

export const getExplanationsByLessonId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await validateToken(request, reply);

    const { lesson_id } = z
      .object({
        lesson_id: z.number().int(),
      })
      .parse(request.query);

    const explanations =
      await ExplanationService.getExplanationsByLessonId(lesson_id);
    console.log(explanations);

    reply.code(200).send(explanations);
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

export const createExplanation = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  await validateToken(request, reply);

  try {
    const explanationParsedBody = ExplanationsCreate.parse(request.body);

    const explanation = await ExplanationService.createExplanation(
      explanationParsedBody,
    );

    reply.code(201).send(explanation);
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
