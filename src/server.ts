import Fastify from "fastify";
import { config } from "dotenv";
import UserRoutes from "./routes/userRoutes";

config();

const server = Fastify({ logger: true });
const PORT = Number(process.env.PORT) || 3000;
const fastify = Fastify();

fastify.register(UserRoutes, { prefix: "/user" });

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
