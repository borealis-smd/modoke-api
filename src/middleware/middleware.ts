import { FastifyReply, FastifyRequest } from "fastify";
import { verifyToken } from "../config/jwt";

interface RequestWithUser extends FastifyRequest {
  user: { sub: string; name: string };
}

export const authMiddleware = async (
  request: RequestWithUser,
  reply: FastifyReply,
) => {
  try {
    const TOKEN = request.headers.authorization;
    if (!TOKEN) {
      reply.code(401).send({ message: "Access denied." });
      return;
    }
    request.user = verifyToken(TOKEN) as { sub: string; name: string };
  } catch (error) {
    reply.code(401).send({ message: "Invalid token." });
  }
};
