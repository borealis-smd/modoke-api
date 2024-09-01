import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { registerUser } from "../models/user";
import { generateToken } from "../config/jwt";
import * as UserService from "../services/userService";
import { handleError } from "../utils/errorHandler";
import { User, UserRegisterSchema } from "../validators/userValidator";
import { Login, LoginSchema } from "../validators/loginValidator";

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email } = z
      .object({ email: z.string().email() })
      .parse(request.body);

    const { token } = await UserService.logInWithGoogle(email);

    reply.code(200).send(JSON.stringify(token));
  } catch (error) {
    handleError(error, reply);
  }
};

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { user, login } = request.body as { user: User; login: Login };
    const userParsedBody = UserRegisterSchema.parse(user);
    const loginParsedBody = LoginSchema.parse(login);

    const newUser = await registerUser(userParsedBody, loginParsedBody);

    const token = generateToken({
      user_id: newUser.user_id,
      first_name: newUser.first_name,
      role: newUser.role,
    });
    reply.status(201).send(JSON.stringify(token));
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) =>
        reply
          .code(400)
          .send({ message: `${err.path.join(".")} - ${err.message}` }),
      );
    }
    if (error instanceof Error) {
      reply.code(400).send({ message: error.message });
    }
  }
};
