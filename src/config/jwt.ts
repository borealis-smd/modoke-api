import jwt from "jsonwebtoken";
import { LoginDB } from "../validators/loginValidator";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET not defined.");
}

const SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || "1d";

export const generateToken = (login: LoginDB) => {
  return jwt.sign(
    {
      login_id: login.login_id,
      user_id: login.user_id,
      email: login.email,
    },
    SECRET,
    { expiresIn: TOKEN_EXPIRATION },
  );
};

export const verifyToken = (token: string) => {
  try {
    token = token.replace("Bearer ", "");
    return jwt.verify(token, SECRET);
  } catch (error) {
    throw new Error("Token inválido ou expirado.");
  }
};
