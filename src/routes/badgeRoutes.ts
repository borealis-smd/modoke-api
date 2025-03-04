import * as BadgeController from "../controllers/badgeController";
import { FastifyInstance } from "fastify";
import {
  verifyRole,
  verifyTokenMiddleware,
} from "../middleware/authMiddleware";

export default function BadgeRoutes(
  app: FastifyInstance,
  options: any,
  done: Function
) {
  app.get(
    "/",
    {
      preHandler: verifyTokenMiddleware(),
    },
    BadgeController.getBadges
  );

  app.get(
    "/unit:unit_id",
    {
      preHandler: verifyTokenMiddleware(),
    },
    BadgeController.getBadgeByUnitId
  );

  app.get(
    "/user",
    {
      preHandler: verifyTokenMiddleware(),
    },
    BadgeController.getBadgesByUserId
  );

  app.post(
    "/",
    {
      preHandler: verifyRole("ADMIN"),
    },
    BadgeController.createBadge
  );

  app.post(
    "/assign",
    {
      preHandler: verifyTokenMiddleware(),
    },
    BadgeController.assignBadgeToUser
  );

  done();
}
