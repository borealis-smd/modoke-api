import { FastifyInstance } from "fastify";
import { uploadImage } from "../controllers/uploadController";
import { verifyTokenMiddleware } from "../middleware/authMiddleware";

export default function UploadRoutes(
  fastify: FastifyInstance,
  options: any,
  done: Function,
) {
  fastify.post("/", { preHandler: verifyTokenMiddleware() }, uploadImage);

  done();
}
