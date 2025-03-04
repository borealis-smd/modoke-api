import * as SectionController from "../controllers/sectionController";
import { FastifyInstance } from "fastify";
import {
  verifyRole,
  verifyTokenMiddleware,
} from "../middleware/authMiddleware";

export default function SectionRoutes(
  app: FastifyInstance,
  options: any,
  done: Function
) {
  app.get("/", {}, SectionController.getSections);

  app.get(
    "/user",
    {
      preHandler: verifyTokenMiddleware(),
    },
    SectionController.getInProgressSectionByUserId
  );

  app.post(
    "/",
    {
      preHandler: verifyRole("ADMIN"),
    },
    SectionController.createSection
  );

  app.put(
    "/unlock:section_id",
    {
      preHandler: verifyTokenMiddleware(),
    },
    SectionController.unlockSection
  );

  app.put(
    "/finish:section_id",
    {
      preHandler: verifyTokenMiddleware(),
    },
    SectionController.finishSection
  );

  done();
}
