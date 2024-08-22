import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import UserRoutes from "./routes/userRoutes";
import LevelRoutes from "./routes/levelRoutes";
import LessonRoutes from "./routes/lessonRoutes";

const fastify = Fastify();

fastify.register(fastifySwagger, {
  openapi: {
    info: {
      title: "API Documentation",
      description: "API documentation with Swagger",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
});

fastify.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  staticCSP: true,
  transformSpecification: (swaggerObject) => swaggerObject,
  transformSpecificationClone: true,
});

fastify.register(UserRoutes, { prefix: "/user" });
fastify.register(LevelRoutes, { prefix: "/level" });
fastify.register(LessonRoutes, { prefix: "/lesson" });

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
