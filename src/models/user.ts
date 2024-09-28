import { prisma } from "../config/db";
import {
  UserRegister,
  UserRegisterSchema,
  UserUpdate,
} from "../validators/userValidator";
import { Login, LoginSchema } from "../validators/loginValidator";
import { MissingFieldError } from "../errors/MissingFieldError";
import { ValidationError } from "../errors/ValidationError";
import { hash } from "bcrypt";
import { UnitNotFoundError } from "../errors/UnitNotFoundError";
import { NoLessonFoundError } from "../errors/NoLessonFoundError";
import { UserNotFoundError } from "../errors/UserNotFoundError";

export const registerUser = async (user: UserRegister, login: Login) => {
  if (!user.first_name) {
    throw new MissingFieldError("Nome é obrigatório.");
  }

  if (user.level_id === undefined || user.level_id === null) {
    throw new MissingFieldError("Nível é obrigatório.");
  }

  const userValidationResult = UserRegisterSchema.safeParse(user);
  if (!userValidationResult.success) {
    throw new ValidationError("Dados de usuário inválidos.");
  }

  if (!login.is_google_user) {
    if (!login.email || !login.password) {
      throw new MissingFieldError("E-mail e senha são obrigatórios.");
    }
  }

  const loginValidationResult = LoginSchema.safeParse(login);
  if (!loginValidationResult.success) {
    throw new ValidationError("Dados de login inválidos.");
  }

  const password_hash = login.password
    ? await hash(login.password, 10)
    : undefined;

  const newUser = await prisma.user.create({
    data: {
      ...user,
      xp: 0,
      Login: {
        create: {
          email: login.email,
          password_hash: password_hash,
          is_google_user: login.is_google_user,
        },
      },
    },
  });

  const sectionInProgress = await prisma.sectionProgress.create({
    data: {
      user_id: newUser.user_id,
      section_id: newUser.level_id,
      in_progress: true,
    },
  });

  const unit = await prisma.unit.findUnique({
    where: {
      section_id_unit_sequence: {
        section_id: sectionInProgress.section_id,
        unit_sequence: 1,
      },
    },
  });

  if (!unit) {
    throw new UnitNotFoundError("Unidade não encontrada.");
  }

  const unitInProgress = await prisma.unitProgress.create({
    data: {
      user_id: newUser.user_id,
      unit_id: unit.unit_id,
      in_progress: true,
      is_locked: false,
    },
  });

  const lesson = await prisma.lesson.findUnique({
    where: {
      unit_id_lesson_sequence: {
        unit_id: unitInProgress.unit_id,
        lesson_sequence: 1,
      },
    },
  });

  if (!lesson) {
    throw new NoLessonFoundError("Lição não encontrada.");
  }

  await prisma.lessonProgress.create({
    data: {
      user_id: newUser.user_id,
      lesson_id: lesson.unit_id,
      in_progress: true,
      is_locked: false,
    },
  });

  return newUser;
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

export const increaseLevel = async (user_id: string) => {
  const user = await prisma.user.findUnique({
    where: { user_id },
  });

  if (!user) {
    throw new UserNotFoundError("Usuário não encontrado.");
  }

  if (user.level_id === 3 || user.xp >= 6000) {
    return user;
  }

  const newLevelId = user.xp >= 2000 ? (user.xp >= 4000 ? 3 : 2) : 1;

  return prisma.user.update({
    where: { user_id },
    data: {
      level_id: newLevelId,
    },
  });
};

export const updatePassword = async (email: string, password_hash: string) => {
  return prisma.login.update({
    where: { email },
    data: { password_hash },
  });
};
