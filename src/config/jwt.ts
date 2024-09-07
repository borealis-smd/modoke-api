import jwt from "jsonwebtoken";
import { UserToken } from "../validators/userValidator";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET não definido.");
}

const SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || "7d";

export const generateToken = (user: UserToken) => {
  return jwt.sign(
    {
      user_id: user.user_id,
      first_name: user.first_name,
      role: user.role,
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
