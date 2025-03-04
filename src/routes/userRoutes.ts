import * as UserController from "../controllers/userController";
import { FastifyInstance } from "fastify";
import { verifyTokenMiddleware } from "../middleware/authMiddleware";

export default function UserRoutes(
  app: FastifyInstance,
  options: any,
  done: Function
) {
  app.post("/", UserController.registerUser);

  app.post("/login", UserController.logIn);

  app.get(
    "/",
    {
      preHandler: verifyTokenMiddleware(),
    },
    UserController.getUserById
  );

  app.get(
    ":email",
    {
      preHandler: verifyTokenMiddleware(),
    },
    UserController.getUserByEmail
  );

  app.put(
    "/",
    {
      preHandler: verifyTokenMiddleware(),
    },
    UserController.updateUser
  );

  app.put(
    "/level",
    {
      preHandler: verifyTokenMiddleware(),
    },
    UserController.levelUp
  );

  app.put(
    "/password",
    {
      preHandler: verifyTokenMiddleware(),
    },
    UserController.updatePassword
  );

  done();
}
