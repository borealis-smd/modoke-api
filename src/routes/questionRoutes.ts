import * as QuestionController from "../controllers/questionController";
import { FastifyInstance } from "fastify";
import { verifyRole } from "../middleware/authMiddleware";

export default function QuestionRoutes(
  app: FastifyInstance,
  options: any,
  done: Function
) {
  app.post(
    "/",
    {
      preHandler: verifyRole("ADMIN"),
    },
    QuestionController.createQuestion
  );

  app.post(
    "/options",
    {
      preHandler: verifyRole("ADMIN"),
    },
    QuestionController.createQuestionWithOptions
  );

  done();
}
