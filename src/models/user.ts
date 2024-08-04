import { prisma } from "../config/db";
import {
  UserDB,
  UserRegister,
  UserRegisterSchema, UserUpdate,
} from "../validators/userValidator";
import { Login, LoginSchema } from "../validators/loginValidator";
import { MissingFieldError } from "../errors/MissingFieldError";
import { ValidationError } from "../errors/ValidationError";
import { hash } from "bcrypt";

export const registerUser = async (user: UserRegister, login: Login) => {
  if (!user.first_name || !user.last_name) {
    throw new MissingFieldError("Nome e sobrenome são obrigatórios.");
  }

  if (user.level_id === undefined || user.level_id === null) {
    throw new MissingFieldError("Level é obrigatório.");
  }

  const userValidationResult = UserRegisterSchema.safeParse(user);
  if (!userValidationResult.success) {
    throw new ValidationError("Dados de usuário inválidos.");
  }

  if (!login.email || !login.password) {
    throw new MissingFieldError("E-mail e senha são obrigatórios.");
  }

  const loginValidationResult = LoginSchema.safeParse(login);
  if (!loginValidationResult.success) {
    throw new ValidationError("Dados de login inválidos.");
  }

  const password_hash = await hash(login.password, 10);

  return prisma.user.create({
    data: {
      ...user,
      xp: 0,
      Login: {
        create: {
          email: login.email,
          password_hash,
        },
      },
    },
  });
};

export const getUserById = async (user_id: string) => {
  return prisma.user.findUniqueOrThrow({
    where: { user_id },
  });
};

export const getUserByEmail = async (email: string) => {
  const login = await prisma.login.findUnique({
    where: { email },
  });

  if (!login) {
    return null;
  }

  return prisma.user.findUnique({
    where: { user_id: login.user_id },
  });
};

export const getCredentialsByEmail = async (email: string) => {
  return prisma.login.findUniqueOrThrow({
    where: { email },
  });
};

export const updateUser = async (user_id: string, user: UserUpdate) => {
  return prisma.user.update({
    where: { user_id },
    data: user,
  });
};

export const updatePassword = async (email: string, password_hash: string) => {
  return prisma.login.update({
    where: { email },
    data: { password_hash },
  });
};
