import * as QuizController from "../controllers/quizController";
import { FastifyInstance } from "fastify";
import { verifyTokenMiddleware } from "../middleware/authMiddleware";

export default function QuizRoutes(
  app: FastifyInstance,
  options: any,
  done: Function
) {
  app.get(
    "/initialize/lesson",
    {
      preHandler: verifyTokenMiddleware(),
    },
    QuizController.initializeQuiz
  );

  app.get(
    "/initialize/unit",
    {
      preHandler: verifyTokenMiddleware(),
    },
    QuizController.initializeUnitQuiz
  );

  app.get(
    "/initialize/entranceTest",
    {
      preHandler: verifyTokenMiddleware(),
    },
    QuizController.initializeEntranceTestQuiz
  );

  app.post(
    "/answer",
    {
      preHandler: verifyTokenMiddleware(),
    },
    QuizController.answerQuestion
  );

  app.get(
    "/progress",
    {
      preHandler: verifyTokenMiddleware(),
    },
    QuizController.getQuizProgress
  );

  app.post(
    "/navigate",
    {
      preHandler: verifyTokenMiddleware(),
    },
    QuizController.navigateQuiz
  );

  done();
}
