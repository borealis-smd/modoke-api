import { FastifyReply, FastifyRequest } from "fastify";
import { verifyToken } from "../config/jwt";

export const extractUserId = (
  request: FastifyRequest,
  reply: FastifyReply,
): string => {
  const token = request.headers.authorization?.split(" ")[1];
  if (!token) {
    reply.code(401).send({ message: "Authorization token is missing" });
    return "";
  }

  const decodedToken = verifyToken(token);
  if (typeof decodedToken !== "string" && "user_id" in decodedToken) {
    return decodedToken.user_id;
  }

  reply.code(401).send({ message: "Invalid token" });
  return "";
};
