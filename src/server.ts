import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { config } from "dotenv";

config();

const server = Fastify({ logger: true });
const PORT = Number(process.env.PORT) || 3000;

server.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
  return { hello: "world" };
});

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
