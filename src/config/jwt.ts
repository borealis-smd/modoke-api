import jwt from "jsonwebtoken";
import { UserToken } from "../validators/userValidator";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET not defined.");
}

const SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || "1d";

export const generateToken = (user: UserToken) => {
  return jwt.sign(
    {
      user_id: user.user_id,
      first_name: user.first_name,
      coins: user.coins,
      xp: user.xp,
      role: user.role,
      level_id: user.level_id,
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
