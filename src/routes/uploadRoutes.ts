import { FastifyInstance } from "fastify";
import { uploadImage } from "../controllers/uploadController";

export default function UploadRoutes(
  fastify: FastifyInstance,
  options: any,
  done: Function,
) {
  fastify.post("/", uploadImage);

  done();
}
