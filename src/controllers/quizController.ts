import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { QuizSession } from "../services/quizService";
import { handleError } from "../utils/errorHandler";

export const initializeQuiz = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { lesson_id } = z
      .object({
        lesson_id: z.number().int(),
      })
      .parse(request.query);

    const userId = request.user.user_id;
    const quizSession = new QuizSession(userId, lesson_id);
    await quizSession.initialize();

    const currentQuestion = quizSession.getCurrentQuestion();
    const progress = quizSession.getProgressSummary();

    reply.code(200).send({
      currentQuestion,
      progress,
      hasNext: quizSession.hasNextQuestion(),
      currentIndex: quizSession.getCurrentQuestionIndex(),
    });
  } catch (error) {
    handleError(error, reply);
  }
};

export const initializeUnitQuiz = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { unit_id } = z
      .object({
        unit_id: z.number().int(),
      })
      .parse(request.query);

    const userId = request.user.user_id;
    const quizSession = new QuizSession(userId, undefined, unit_id);
    await quizSession.initialize();

    const currentQuestion = quizSession.getCurrentQuestion();
    const progress = quizSession.getProgressSummary();

    reply.code(200).send({
      currentQuestion,
      progress,
      hasNext: quizSession.hasNextQuestion(),
      currentIndex: quizSession.getCurrentQuestionIndex(),
    });
  } catch (error) {
    handleError(error, reply);
  }
};

export const answerQuestion = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { lesson_id } = z
      .object({
        lesson_id: z.number().int(),
      })
      .parse(request.query);

    const { selected_option_id } = z
      .object({
        selected_option_id: z.string(),
      })
      .parse(request.body);

    const userId = request.user.user_id;
    const quizSession = new QuizSession(userId, lesson_id);
    await quizSession.initialize();

    await quizSession.answerCurrentQuestion(selected_option_id);
    const nextQuestion = quizSession.getNextQuestion();
    const progress = quizSession.getProgressSummary();

    reply.code(200).send({
      nextQuestion,
      progress,
      hasNext: quizSession.hasNextQuestion(),
      isComplete: quizSession.isComplete(),
      currentIndex: quizSession.getCurrentQuestionIndex(),
    });
  } catch (error) {
    handleError(error, reply);
  }
};

export const getQuizProgress = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { lesson_id } = z
      .object({
        lesson_id: z.number().int(),
      })
      .parse(request.query);

    const userId = request.user.user_id;
    const quizSession = new QuizSession(userId, lesson_id);
    await quizSession.initialize();

    const allQuestions = quizSession.getAllQuestionsWithAnswers();
    const progress = quizSession.getProgressSummary();

    reply.code(200).send({
      questions: allQuestions,
      progress,
      isComplete: quizSession.isComplete(),
      currentIndex: quizSession.getCurrentQuestionIndex(),
    });
  } catch (error) {
    handleError(error, reply);
  }
};

export const navigateQuiz = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { lesson_id } = z
      .object({
        lesson_id: z.number().int(),
      })
      .parse(request.query);

    const { direction } = z
      .object({
        direction: z.enum(["next", "previous"]),
      })
      .parse(request.body);

    const userId = request.user.user_id;
    const quizSession = new QuizSession(userId, lesson_id);
    await quizSession.initialize();

    const question = direction === "next" 
      ? quizSession.getNextQuestion()
      : quizSession.getPreviousQuestion();

    const progress = quizSession.getProgressSummary();

    reply.code(200).send({
      question,
      progress,
      hasNext: quizSession.hasNextQuestion(),
      isComplete: quizSession.isComplete(),
      currentIndex: quizSession.getCurrentQuestionIndex(),
    });
  } catch (error) {
    handleError(error, reply);
  }
};

export const initializeEntranceTestQuiz = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const userId = request.user.user_id;
    const quizSession = new QuizSession(userId, undefined, undefined, true);
    await quizSession.initialize();

    const currentQuestion = quizSession.getCurrentQuestion();
    const progress = quizSession.getProgressSummary();

    reply.code(200).send({
      currentQuestion,
      progress,
      hasNext: quizSession.hasNextQuestion(),
      currentIndex: quizSession.getCurrentQuestionIndex(),
    });
  } catch (error) {
    handleError(error, reply);
  }
}; 