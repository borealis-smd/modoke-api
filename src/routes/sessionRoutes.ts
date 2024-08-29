import * as SessionController from "../controllers/sessionController";
import { FastifyInstance } from "fastify";

export default function SessionRoutes(
  app: FastifyInstance,
  options: any,
  done: Function,
) {
  app.get(
    "/",
    {
      schema: {
        description: "Buscar todas as sessões",
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                session_id: { type: "number", examples: [1] },
                session_title: { type: "string", examples: ["Sessão 1"] },
                session_description: {
                  type: "string",
                  examples: ["Descrição da sessão 1"],
                },
                level_id: { type: "number", examples: [1] },
                is_completed: { type: "boolean", examples: [false] },
                completed_at: {
                  type: "string",
                  examples: ["2024-08-04 16:21:21.921"],
                },
              },
            },
          },
        },
        tags: ["Sessions"],
      },
    },
    SessionController.getSessions,
  );

  app.post(
    "/",
    {
      schema: {
        description: "Criar uma nova sessão",
        body: {
          type: "object",
          properties: {
            session_title: { type: "string", examples: ["Sessão 1"] },
            session_description: {
              type: "string",
              examples: ["Descrição da sessão 1"],
            },
            level_id: { type: "number", examples: [1] },
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
              session_id: { type: "number", examples: [1] },
              session_title: { type: "string", examples: ["Sessão 1"] },
              session_description: {
                type: "string",
                examples: ["Descrição da sessão 1"],
              },
              level_id: { type: "number", examples: [1] },
              is_completed: { type: "boolean", examples: [false] },
              completed_at: {
                type: "string",
                examples: ["2024-08-04 16:21:21.921"],
              },
            },
          },
        },
        tags: ["Sessions"],
        security: [{ bearerAuth: [] }],
      },
    },
    SessionController.createSession,
  );

  app.put(
    "/finish:session_id",
    {
      schema: {
        description: "Finalizar uma sessão",
        querystring: {
          session_id: { type: "number", examples: [1] },
        },
        response: {
          200: {
            type: "object",
            properties: {
              session_id: { type: "number", examples: [1] },
              session_title: { type: "string", examples: ["Sessão 1"] },
              session_description: {
                type: "string",
                examples: ["Descrição da sessão 1"],
              },
              level_id: { type: "number", examples: [1] },
              is_completed: { type: "boolean", examples: [true] },
              completed_at: {
                type: "string",
                examples: ["2024-08-04 16:21:21.921"],
              },
            },
          },
        },
        tags: ["Sessions"],
        security: [{ bearerAuth: [] }],
      },
    },
    SessionController.finishSession,
  );

  done();
}
