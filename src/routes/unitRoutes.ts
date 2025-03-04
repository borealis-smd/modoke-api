import * as UnitController from "../controllers/unitController";
import { FastifyInstance } from "fastify";
import {
  verifyRole,
  verifyTokenMiddleware,
} from "../middleware/authMiddleware";

export default function UnitRoutes(
  app: FastifyInstance,
  options: any,
  done: Function
) {
  app.get(
    "/",
    {
      preHandler: verifyTokenMiddleware(),
    },
    UnitController.getUnits
  );

  app.get(
    "/id:unit_id",
    {
      preHandler: verifyTokenMiddleware(),
    },
    UnitController.getUnitById
  );

  app.get(
    "/section:section_id",
    {
      preHandler: verifyTokenMiddleware(),
    },
    UnitController.getUnitsBySectionId
  );

  app.get(
    "/user",
    {
      preHandler: verifyTokenMiddleware(),
    },
    UnitController.getInProgressUnitByUserId
  );

  app.post(
    "/",
    {
      preHandler: verifyRole("ADMIN"),
    },
    UnitController.createUnit
  );

  app.put(
    "/unlock:unit_id",
    {
      preHandler: verifyTokenMiddleware(),
    },
    UnitController.unlockUnit
  );

  app.put(
    "/finish:unit_id",
    {
      preHandler: verifyTokenMiddleware(),
    },
    UnitController.finishUnit
  );

  done();
}
