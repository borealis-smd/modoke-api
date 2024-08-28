import * as UserService from "../services/userService";
import { FastifyRequest, FastifyReply } from "fastify";
import {
  User,
  UserRegisterSchema,
  UserUpdateSchema,
} from "../validators/userValidator";
import { Login, LoginSchema } from "../validators/loginValidator";
import { validateToken } from "../validators/tokenValidator";
import { sendGreetingEmail } from "../config/nodemailer";
import { z } from "zod";

export const registerUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { user, login } = request.body as { user: User; login: Login };
    const userParsedBody = UserRegisterSchema.parse(user);
    const loginParsedBody = LoginSchema.parse(login);

    const newUser = await UserService.registerUser(
      userParsedBody,
      loginParsedBody,
    );

    await sendGreetingEmail(login.email, user.first_name);

    reply.code(201).send(newUser);
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

export const logIn = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email, password } = LoginSchema.parse(request.body);

    const { token } = await UserService.logIn(email, password);

    reply.code(200).send(JSON.stringify(token));
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

export const getUserByEmail = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await validateToken(request, reply);

    const querySchema = z.object({
      email: z.string().email(),
    });
    const { email } = querySchema.parse(request.query);

    const user = await UserService.getUserByEmail(email);

    reply.code(200).send(user);
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

export const updateUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await validateToken(request, reply);

    const querySchema = z.object({
      user_id: z.string().uuid(),
    });
    const { user_id } = querySchema.parse(request.query);

    const user = UserUpdateSchema.parse(request.body);

    const updatedUser = await UserService.updateUser(user_id, user);

    reply.code(200).send(updatedUser);
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

export const updatePassword = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await validateToken(request, reply);

    const { email, oldPassword, newPassword } = z
      .object({
        email: z.string().email(),
        oldPassword: z.string(),
        newPassword: z.string(),
      })
      .parse(request.body);

    await UserService.updatePassword(email, oldPassword, newPassword);

    reply.code(204).send();
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
