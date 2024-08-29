import * as GoogleAuthController from "../controllers/googleAuthController";
import { FastifyInstance } from "fastify";

export default function GoogleAuthRoutes(
  app: FastifyInstance,
  options: any,
  done: Function,
) {
  app.post("/login", GoogleAuthController.login);

  app.post("/register", GoogleAuthController.register);

  done();
}
