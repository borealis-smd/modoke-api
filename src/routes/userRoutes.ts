import * as UserController from "../controllers/userController";
import { FastifyInstance } from "fastify";

export default function UserRoutes(
  app: FastifyInstance,
  options: any,
  done: Function,
) {
  // Rota de cadastro de usuário
  app.post("/user", UserController.registerUser);

  // Rota de login de usuário
  app.post("/login", UserController.logIn);

  // Rota de listagem de usuário por email
  app.get("/user/:email", UserController.getUserByEmail);

  // Rota de atualização de usuário
  app.put("/user/:user_id", UserController.updateUser);

  // Rota de atualização de senha
  app.put("/user/password", UserController.updatePassword);

  done();
}
