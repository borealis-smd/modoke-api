import * as QuestionService from "../services/questionService";
import { FastifyRequest, FastifyReply } from "fastify";
import {
  FullQuestionCreateSchema,
  QuestionCreateSchema,
} from "../validators/questionsValidator";
import { handleError } from "../utils/errorHandler";

export const createQuestion = async (
  request: FastifyRequest,
  reply: FastifyReply
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
  reply: FastifyReply
) => {
  try {
    const questionParsedBody = FullQuestionCreateSchema.parse(request.body);

    const question = await QuestionService.createQuestionWithOptions(
      questionParsedBody
    );

    reply.code(201).send(question);
  } catch (error) {
    handleError(error, reply);
  }
};
