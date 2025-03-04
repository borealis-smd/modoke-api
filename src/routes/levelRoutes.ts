import * as LevelController from "../controllers/levelController";
import { FastifyInstance } from "fastify";

export default function LevelRoutes(
  app: FastifyInstance,
  options: any,
  done: Function
) {
  app.get("/id:level_id", {}, LevelController.getLevelById);

  app.get("/", {}, LevelController.getLevels);

  done();
}
