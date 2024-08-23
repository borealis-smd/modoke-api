import Fastify from "fastify";
import { config } from "dotenv";
import UserRoutes from "./routes/userRoutes";
import LevelRoutes from "./routes/levelRoutes";
import LessonRoutes from "./routes/lessonRoutes";

config();

const fastify = Fastify({ logger: true });
const PORT = Number(process.env.PORT) || 3000;

fastify.register(UserRoutes, { prefix: "/user" });
fastify.register(LevelRoutes, { prefix: "/level" });
fastify.register(LessonRoutes, { prefix: "/lesson" });

fastify.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
