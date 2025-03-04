import * as CertificateController from "../controllers/certificateController";
import { FastifyInstance } from "fastify";
import {
  verifyRole,
  verifyTokenMiddleware,
} from "../middleware/authMiddleware";

export default function CertificateRoutes(
  app: FastifyInstance,
  options: any,
  done: Function,
) {
  app.get(
    "/user",
    {
      preHandler: verifyTokenMiddleware(),

    },
    CertificateController.getCertificatesByUserId,
  );

  app.post(
    "/",
    {
      preHandler: verifyRole("ADMIN"),

    },
    CertificateController.createCertificate,
  );

  app.post(
    "/assign",
    {
      preHandler: verifyTokenMiddleware(),

    },
    CertificateController.assignCertificateToUser,
  );

  done();
}
