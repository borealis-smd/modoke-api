import * as UserRepo from "../models/user";
import {User, UserRegister, UserUpdate} from "../validators/userValidator";
import { Login } from "../validators/loginValidator";
import { compare, hash } from "bcrypt";
import { generateToken } from "../config/jwt";
import { EmailAlreadyExistsError } from "../errors/EmailAlreadyExistsError";
import { InvalidCredentialsError } from "../errors/InvalidCredentialsError";
import { UserNotFoundError } from "../errors/UserNotFoundError";

export const registerUser = async (user: UserRegister, login: Login) => {
  const existingEmail = await UserRepo.getUserByEmail(login.email);
  if (existingEmail) {
    throw new EmailAlreadyExistsError("E-mail já cadastrado.");
  }

  return UserRepo.registerUser(user, login);
};

export const logIn = async (email: string, password: string) => {
  const user = await UserRepo.getUserByEmail(email);

  if (!user) {
    throw new UserNotFoundError("Usuário não encontrado.");
  }

  const login = await UserRepo.getCredentialsByEmail(email);

  const passwordMatch = await compare(password, login.password_hash);
  if (!passwordMatch) {
    throw new InvalidCredentialsError("Credenciais inválidas.");
  }

  const token = generateToken(user);
  return { token };
};

export const getUserByEmail = async (email: string) => {
  const user = await UserRepo.getUserByEmail(email);
  if (!user) {
    throw new UserNotFoundError("Usuário não encontrado.");
  }

  return user;
};

export const updateUser = async (user_id: string, user: UserUpdate) => {
  const existingUser = await UserRepo.getUserById(user_id);
  if (!existingUser) {
    throw new UserNotFoundError("Usuário não encontrado.");
  }

  return UserRepo.updateUser(user_id, user);
};

export const updatePassword = async (
  email: string,
  oldPassword: string,
  newPassword: string,
) => {
  const existingUser = await UserRepo.getUserByEmail(email);
  if (!existingUser) {
    throw new UserNotFoundError("Usuário não encontrado.");
  }

  const login = await UserRepo.getCredentialsByEmail(email);
  const passwordMatch = await compare(oldPassword, login.password_hash);
  if (!passwordMatch) {
    throw new InvalidCredentialsError("Credenciais inválidas.");
  }

  const newPasswordHash = await hash(newPassword, 10);
  return UserRepo.updatePassword(email, newPasswordHash);
};
