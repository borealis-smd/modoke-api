import Fastify from "fastify";
import { config } from "dotenv";
import multipart from "@fastify/multipart";
import UserRoutes from "./routes/userRoutes";
import LevelRoutes from "./routes/levelRoutes";
import LessonRoutes from "./routes/lessonRoutes";
import ExplanationRoutes from "./routes/explanationRoutes";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import UnitRoutes from "./routes/unitRoutes";
import SessionRoutes from "./routes/sessionRoutes";
import QuestionRoutes from "./routes/questionRoutes";
import AttemptRoutes from "./routes/attemptRoutes";
import OptionRoutes from "./routes/optionRoutes";
import BadgeRoutes from "./routes/badgeRoutes";
import CertificateRoutes from "./routes/certificateRoutes";
import MascotRoutes from "./routes/mascotRoutes";
import MascotItemRoutes from "./routes/mascotItemRoutes";
import GoogleAuthRoutes from "./routes/googleAuthRoutes";
import UploadRoutes from "./routes/uploadRoutes";

config();

const fastify = Fastify({ logger: true });
const PORT = Number(process.env.PORT) || 3000;

fastify.register(multipart);

fastify.register(fastifyCors, {
  origin: "*",
});

fastify.register(fastifySwagger, {
  openapi: {
    info: {
      title: "API Documentation",
      description: "API documentation with Swagger",
      version: "1.0.0",
    },
    servers: [
      { url: "http://localhost:3000" },
      { url: "https://api-projeto-production-2ac4.up.railway.app" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
});

fastify.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "none",
    deepLinking: false,
  },
  staticCSP: true,
  transformSpecification: (swaggerObject) => swaggerObject,
  transformSpecificationClone: true,
});

fastify.register(UploadRoutes, { prefix: "/upload" })
fastify.register(UserRoutes, { prefix: "/user" });
fastify.register(LevelRoutes, { prefix: "/level" });
fastify.register(SessionRoutes, { prefix: "/session" });
fastify.register(UnitRoutes, { prefix: "/unit" });
fastify.register(LessonRoutes, { prefix: "/lesson" });
fastify.register(ExplanationRoutes, { prefix: "/explanation" });
fastify.register(QuestionRoutes, { prefix: "/question" });
fastify.register(AttemptRoutes, { prefix: "/attempt" });
fastify.register(OptionRoutes, { prefix: "/option" });
fastify.register(BadgeRoutes, { prefix: "/badge" });
fastify.register(CertificateRoutes, { prefix: "/certificate" });
fastify.register(MascotRoutes, { prefix: "/mascot" });
fastify.register(MascotItemRoutes, { prefix: "/mascotItem" });
fastify.register(GoogleAuthRoutes, { prefix: "/auth/google" });

fastify.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
