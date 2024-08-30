import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { verifyToken } from "../config/jwt";

declare module "fastify" {
  interface FastifyRequest {
    user?: any;
  }
}

export function verifyRole(role: string) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const token = request.headers.authorization?.split(" ")[1];
      if (!token) {
        return reply.status(401).send({ message: "Nenhum token fornecido." });
      }

      const decoded: string | jwt.JwtPayload = verifyToken(token);
      if (typeof decoded === "string" || decoded.role !== role) {
        return reply.status(403).send({ message: "Proibido." });
      }

      request.user = decoded;
    } catch (error) {
      return reply.status(401).send({ message: "Não autorizado." });
    }
  };
}

export function verifyTokenMiddleware() {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const token = request.headers.authorization?.split(" ")[1];
      if (!token) {
        return reply.status(401).send({ message: "Nenhum token fornecido." });
      }

      request.user = verifyToken(token);
    } catch (error) {
      return reply.status(401).send({ message: "Não autorizado." });
    }
  };
}
