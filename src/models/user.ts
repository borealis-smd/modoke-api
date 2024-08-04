import { prisma } from "../config/db";
import { User, UserDB, UserSchema } from "../validators/userValidator";
import { Login, LoginSchema } from "../validators/loginValidator";
import { hash } from "bcrypt";

export const registerUser = async (user: User, login: Login) => {
  if (!user.first_name || !user.last_name || !user.xp) {
    throw new MissingFieldError("Nome, sobrenome e XP são obrigatórios.");
  }

  const userValidationResult = UserSchema.safeParse(user);
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

  return prisma.$transaction(async (prisma) => {
    const createdUser = await prisma.user.create({
      data: {
        ...user,
        level_id: 1, // Por padrão, definir como nível 1 (A)
      },
    });

    await prisma.login.create({
      data: {
        email: login.email,
        password_hash,
        user_id: createdUser.user_id,
      },
    });
  });
};

export const getUserById = async (user_id: string) => {
  return prisma.user.findUniqueOrThrow({
    where: { user_id },
  });
};

export const getUserByEmail = async (email: string) => {
  const login = await prisma.login.findUniqueOrThrow({
    where: { email },
  });

  return prisma.user.findUniqueOrThrow({
    where: { user_id: login.user_id },
  });
};

export const getCredentialsByEmail = async (email: string) => {
  return prisma.login.findUniqueOrThrow({
    where: { email },
  });
};

export const updateUser = async (user_id: string, user: Partial<UserDB>) => {
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
