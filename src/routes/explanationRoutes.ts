import * as ExplanationController from "../controllers/explanationController";
import { FastifyInstance } from "fastify";
import {
  verifyRole,
  verifyTokenMiddleware,
} from "../middleware/authMiddleware";

export default function ExplanationRoutes(
  app: FastifyInstance,
  options: any,
  done: Function
) {
  app.get(
    ":lesson_id",
    {
      preHandler: verifyTokenMiddleware(),
    },
    ExplanationController.getExplanationsByLessonId
  );

  app.post(
    "/",
    {
      preHandler: verifyRole("ADMIN"),
    },
    ExplanationController.createExplanation
  );

  done();
}
