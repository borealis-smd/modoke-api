import * as QuestionService from "../services/questionService";
import { FastifyRequest, FastifyReply } from "fastify";
import { validateToken } from "../validators/tokenValidator";
import { z } from "zod";
import { QuestionCreateSchema } from "../validators/questionsValidator";

export const getQuestionsByLessonId = async (
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

    const questions = await QuestionService.getQuestionsByLessonId(lesson_id);

    reply.code(200).send(questions);
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

export const getEntranceTestQuestions = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await validateToken(request, reply);

    const questions = await QuestionService.getEntranceTestQuestions();

    reply.code(200).send(questions);
  } catch (error) {
    if (error instanceof Error) {
      reply.code(400).send({ message: error.message });
    }
  }
};

export const createQuestion = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  await validateToken(request, reply);

  try {
    const questionParsedBody = QuestionCreateSchema.parse(request.body);

    const question = await QuestionService.createQuestion(questionParsedBody);

    reply.code(201).send(question);
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
