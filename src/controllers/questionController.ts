import * as QuestionService from "../services/questionService";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import {
  FullQuestionCreateSchema,
  QuestionCreateSchema,
} from "../validators/questionsValidator";
import { handleError } from "../utils/errorHandler";

export const getQuestionsByLessonId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { lesson_id } = z
      .object({
        lesson_id: z.number().int(),
      })
      .parse(request.query);

    const questions = await QuestionService.getQuestionsByLessonId(lesson_id);

    reply.code(200).send(questions);
  } catch (error) {
    handleError(error, reply);
  }
};

export const getQuestionsByUnitId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { unit_id } = z
      .object({
        unit_id: z.number().int(),
      })
      .parse(request.query);

    const questions = await QuestionService.getQuestionsByUnitId(unit_id);

    reply.code(200).send(questions);
  } catch (error) {
    handleError(error, reply);
  }
};

export const getEntranceTestQuestions = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
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
  try {
    const questionParsedBody = QuestionCreateSchema.parse(request.body);

    const question = await QuestionService.createQuestion(questionParsedBody);

    reply.code(201).send(question);
  } catch (error) {
    handleError(error, reply);
  }
};

export const createQuestionWithOptions = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const questionParsedBody = FullQuestionCreateSchema.parse(request.body);

    const question =
      await QuestionService.createQuestionWithOptions(questionParsedBody);

    reply.code(201).send(question);
  } catch (error) {
    handleError(error, reply);
  }
};
