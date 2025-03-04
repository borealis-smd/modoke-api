import * as LessonController from "../controllers/lessonController";
import { FastifyInstance } from "fastify";
import {
  verifyRole,
  verifyTokenMiddleware,
} from "../middleware/authMiddleware";

export default function LessonRoutes(
  app: FastifyInstance,
  options: any,
  done: Function
) {
  app.get("/id:lesson_id", {}, LessonController.getLessonById);

  app.get(
    "/unit:unit_id",
    {
      preHandler: verifyTokenMiddleware(),
    },
    LessonController.getLessonsByUnitId
  );

  app.get(
    "/section:section_id",
    {
      preHandler: verifyTokenMiddleware(),
    },
    LessonController.getLessonsBySectionId
  );

  app.get("/level:level_id", {}, LessonController.getLessonsByLevelId);

  app.get(
    "/user",
    {
      preHandler: verifyTokenMiddleware(),
    },
    LessonController.getInProgressLessonByUserId
  );

  app.get(
    "/finished",
    {
      preHandler: verifyTokenMiddleware(),
    },
    LessonController.getFinishedLessonsByUserId
  );

  app.post(
    "/",
    {
      preHandler: verifyRole("ADMIN"),
    },
    LessonController.createLesson
  );

  app.put(
    "/unlock:lesson_id",
    {
      preHandler: verifyTokenMiddleware(),
    },
    LessonController.unlockLesson
  );

  app.put(
    "/finish:lesson_id",
    {
      preHandler: verifyTokenMiddleware(),
    },
    LessonController.finishLesson
  );

  done();
}
