import * as CertificateController from "../controllers/certificateController";
import { FastifyInstance } from "fastify";
import { verifyRole } from "../middleware/authMiddleware";

export default function CertificateRoutes(
  app: FastifyInstance,
  options: any,
  done: Function,
) {
  app.get(
    "/user",
    {
      schema: {
        description: "Buscar certificados por usuário",
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                // user_has_certificate_id: {
                //   type: "string",
                //   examples: ["123e4567-e89b-12d3-a456-426614174000"],
                // },
                // user_id: {
                //   type: "string",
                //   examples: ["123e4567-e89b-12d3-a456-426614174000"],
                // },
                // certificate_id: { type: "number", examples: [1] },
                acquired_at: {
                  type: "string",
                  examples: ["2024-08-28T14:49:45.162Z"],
                },
                Certificate: {
                  type: "object",
                  properties: {
                    certificate_id: { type: "number", examples: [1] },
                    certificate_text: {
                      type: "string",
                      examples: ["Certificate of Completion"],
                    },
                    session_id: { type: "number", examples: [1] },
                  },
                },
              },
            },
          },
        },
        tags: ["Certificates"],
        security: [{ bearerAuth: [] }],
      },
    },
    CertificateController.getCertificatesByUserId,
  );

  app.post(
    "/",
    {
      preHandler: verifyRole("ADMIN"),
      schema: {
        description: "Criar certificado",
        body: {
          type: "object",
          properties: {
            certificate_id: { type: "number", examples: [1] },
            certificate_text: {
              type: "string",
              examples: ["Certificado de participação"],
            },
            session_id: { type: "number", examples: [1] },
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
              certificate_id: { type: "number", examples: [1] },
              certificate_text: {
                type: "string",
                examples: ["Certificado de participação"],
              },
              session_id: { type: "number", examples: [1] },
            },
          },
        },
        tags: ["Certificates"],
        security: [{ bearerAuth: [] }],
      },
    },
    CertificateController.createCertificate,
  );

  app.post(
    "/assign",
    {
      schema: {
        description: "Atribuir certificado a um usuário",
        body: {
          type: "object",
          properties: {
            message: {
              type: "string",
              examples: ["Certificado atribuído com sucesso!"],
            },
            certificate_id: { type: "number", examples: [1] },
          },
        },
        tags: ["Certificates"],
        security: [{ bearerAuth: [] }],
      },
    },
    CertificateController.assignCertificateToUser,
  );

  done();
}
