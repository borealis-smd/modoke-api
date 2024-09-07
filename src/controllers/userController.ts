import * as UserService from "../services/userService";
import { FastifyRequest, FastifyReply } from "fastify";
import {
  User,
  UserRegisterSchema,
  UserUpdateSchema,
} from "../validators/userValidator";
import { Login, LoginSchema } from "../validators/loginValidator";
import { sendGreetingEmail } from "../config/nodemailer";
import { z } from "zod";
import { extractUserId } from "../utils/extractUserId";
import { handleError } from "../utils/errorHandler";

export const registerUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { user, login } = request.body as { user: User; login: Login };
    const userParsedBody = UserRegisterSchema.parse(user);
    const loginParsedBody = LoginSchema.parse(login);

    await UserService.registerUser(userParsedBody, loginParsedBody);

    await sendGreetingEmail(login.email, user.first_name);

    const { token } = await UserService.logIn(login.email, login.password!);

    reply.code(201).send(JSON.stringify(token));
  } catch (error) {
    handleError(error, reply);
  }
};

export const logIn = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email, password } = LoginSchema.parse(request.body);

    const { token } = await UserService.logIn(email, password!);

    reply.code(200).send(JSON.stringify(token));
  } catch (error) {
    handleError(error, reply);
  }
};

export const getUserById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const user_id = extractUserId(request, reply);

    const user = await UserService.getUserById(user_id);

    reply.code(200).send(user);
  } catch (error) {
    handleError(error, reply);
  }
};

export const getUserByEmail = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const querySchema = z.object({
      email: z.string().email(),
    });
    const { email } = querySchema.parse(request.query);

    const user = await UserService.getUserByEmail(email);

    reply.code(200).send(user);
  } catch (error) {
    handleError(error, reply);
  }
};

export const updateUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const user_id = extractUserId(request, reply);

    const user = UserUpdateSchema.parse(request.body);

    const updatedUser = await UserService.updateUser(user_id, user);

    reply.code(200).send(updatedUser);
  } catch (error) {
    handleError(error, reply);
  }
};

export const updatePassword = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
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
    handleError(error, reply);
  }
};
