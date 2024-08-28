import * as UnitController from "../controllers/unitController";
import { FastifyInstance } from "fastify";

export default function UnitRoutes(
  app: FastifyInstance,
  options: any,
  done: Function,
) {
  app.get(
    "/",
    {
      schema: {
        description: "Buscar todas as unidades",
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                unit_id: { type: "number", examples: [1] },
                unit_title: { type: "string", examples: ["Unidade 1"] },
                unit_description: {
                  type: "string",
                  examples: ["Descrição da unidade 1"],
                },
                is_completed: { type: "boolean", examples: [false] },
                completed_at: {
                  type: "string",
                  examples: ["2024-08-04 16:21:21.921"],
                },
                session_id: { type: "number", examples: [1] },
              },
            },
          },
        },
        tags: ["Units"],
        security: [{ bearerAuth: [] }],
      },
    },
    UnitController.getUnits,
  );

  app.get(
    "/id:unit_id",
    {
      schema: {
        description: "Buscar unidade por ID",
        querystring: {
          unit_id: { type: "number", examples: [1] },
        },
        response: {
          200: {
            type: "object",
            properties: {
              unit_id: { type: "number", examples: [1] },
              unit_title: { type: "string", examples: ["Unidade 1"] },
              unit_description: {
                type: "string",
                examples: ["Descrição da unidade 1"],
              },
              is_completed: { type: "boolean", examples: [false] },
              completed_at: {
                type: "string",
                examples: ["2024-08-04 16:21:21.921"],
              },
              session_id: { type: "number", examples: [1] },
            },
          },
        },
        tags: ["Units"],
        security: [{ bearerAuth: [] }],
      },
    },
    UnitController.getUnitById,
  );

  app.get(
    "/session:session_id",
    {
      schema: {
        description: "Buscar unidades por ID de uma sessão",
        querystring: {
          session_id: { type: "number", examples: [1] },
        },
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                unit_id: { type: "number", examples: [1] },
                unit_title: { type: "string", examples: ["Unidade 1"] },
                unit_description: {
                  type: "string",
                  examples: ["Descrição da unidade 1"],
                },
                is_completed: { type: "boolean", examples: [false] },
                completed_at: {
                  type: "string",
                  examples: ["2024-08-04 16:21:21.921"],
                },
                session_id: { type: "number", examples: [1] },
              },
            },
          },
        },
        tags: ["Units"],
        security: [{ bearerAuth: [] }],
      },
    },
    UnitController.getUnitsBySessionId,
  );

  app.post(
    "/",
    {
      schema: {
        description: "Criar uma unidade",
        body: {
          type: "object",
          properties: {
            unit_title: { type: "string", examples: ["Unidade 1"] },
            unit_description: {
              type: "string",
              examples: ["Descrição da unidade 1"],
            },
            session_id: { type: "number", examples: [1] },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              unit_id: { type: "number", examples: [1] },
              unit_title: { type: "string", examples: ["Unidade 1"] },
              unit_description: {
                type: "string",
                examples: ["Descrição da unidade 1"],
              },
              is_completed: { type: "boolean", examples: [false] },
              completed_at: {
                type: "string",
                examples: ["2024-08-04 16:21:21.921"],
              },
              session_id: { type: "number", examples: [1] },
            },
          },
        },
        tags: ["Units"],
        security: [{ bearerAuth: [] }],
      },
    },
    UnitController.createUnit,
  );

  app.put(
    "/finish:unit_id",
    {
      schema: {
        description: "Finalizar uma unidade",
        querystring: {
          unit_id: { type: "number", examples: [1] },
        },
        response: {
          200: {
            type: "object",
            properties: {
              unit_id: { type: "number", examples: [1] },
              unit_title: { type: "string", examples: ["Unidade 1"] },
              unit_description: {
                type: "string",
                examples: ["Descrição da unidade 1"],
              },
              is_completed: { type: "boolean", examples: [true] },
              completed_at: {
                type: "string",
                examples: ["2024-08-04 16:21:21.921"],
              },
              session_id: { type: "number", examples: [1] },
            },
          },
        },
        tags: ["Units"],
        security: [{ bearerAuth: [] }],
      },
    },
    UnitController.finishUnit,
  );

  done();
}
