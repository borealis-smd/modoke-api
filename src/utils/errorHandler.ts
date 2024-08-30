import { FastifyReply } from "fastify";
import { z } from "zod";

export const handleError = (error: unknown, reply: FastifyReply) => {
  if (error instanceof z.ZodError) {
    error.errors.forEach((err) =>
      reply
        .code(400)
        .send({ message: `${err.path.join(".")} - ${err.message}` }),
    );
  } else if (error instanceof Error) {
    reply.code(400).send({ message: error.message });
  } else {
    reply.code(500).send({ message: "Internal Server Error" });
  }
};
