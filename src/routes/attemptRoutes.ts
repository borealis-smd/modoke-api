import * as AttemptController from "../controllers/attemptController";
import { FastifyInstance } from "fastify";
import { verifyTokenMiddleware } from "../middleware/authMiddleware";

export default function AttemptRoutes(
  app: FastifyInstance,
  options: any,
  done: Function
) {
  app.post(
    "/",
    {
      preHandler: verifyTokenMiddleware(),
    },
    AttemptController.registerAttempt
  );

  app.get(
    "/last:question_id",
    {
      preHandler: verifyTokenMiddleware(),
    },
    AttemptController.getLastAttemptByQuestionId
  );
  done();
}
