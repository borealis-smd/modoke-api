import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

export function verifyRole(role: string) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const token = request.headers.authorization?.split(" ")[1];
      if (!token) {
        return reply.status(401).send({ message: "Nenhum token fornecido." });
      }

      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      if (decoded.role !== role) {
        return reply.status(403).send({ message: "Proibido." });
      }

      request.user = decoded;
    } catch (error) {
      return reply.status(401).send({ message: "Não autorizado." });
    }
  };
}
