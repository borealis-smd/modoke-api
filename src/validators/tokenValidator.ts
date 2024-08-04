import { FastifyRequest, FastifyReply } from "fastify";
import { verifyToken } from "../config/jwt";

export const validateToken = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const token = request.headers.authorization;
  if (!token) {
    reply.code(401).send({ message: "Não autorizado." });
    return;
  }
  try {
    const decoded = verifyToken(token);
    if (typeof decoded !== 'string' && 'user_id' in decoded) {
      if (typeof request.body === 'object' && request.body !== null) {
        request.body = { ...request.body, user_id: decoded.user_id };
      } else {
        request.body = { user_id: decoded.user_id };
      }
    }
  } catch (error) {
    reply.code(401).send({ message: "Não autorizado." });
  }
};
