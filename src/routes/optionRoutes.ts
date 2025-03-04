import * as OptionController from "../controllers/optionController";
import { FastifyInstance } from "fastify";
import { verifyRole } from "../middleware/authMiddleware";

export default function OptionRoutes(
  app: FastifyInstance,
  options: any,
  done: Function
) {
  app.post(
    "/",
    {
      preHandler: verifyRole("ADMIN"),
    },
    OptionController.createOption
  );

  done();
}
