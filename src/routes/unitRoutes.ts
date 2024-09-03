import * as UnitController from "../controllers/unitController";
import { FastifyInstance } from "fastify";
import {
  verifyRole,
  verifyTokenMiddleware,
} from "../middleware/authMiddleware";

export default function UnitRoutes(
  app: FastifyInstance,
  options: any,
  done: Function,
) {
  app.get(
    "/",
    {
      preHandler: verifyTokenMiddleware(),
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
                section_id: { type: "number", examples: [1] },
              },
            },
          },
        },
        tags: ["Units"],
      },
    },
    UnitController.getUnits,
  );

  app.get(
    "/id:unit_id",
    {
      preHandler: verifyTokenMiddleware(),
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
              section_id: { type: "number", examples: [1] },
            },
          },
        },
        tags: ["Units"],
      },
    },
    UnitController.getUnitById,
  );

  app.get(
    "/section:section_id",
    {
      preHandler: verifyTokenMiddleware(),
      schema: {
        description: "Buscar unidades por ID de uma seção",
        querystring: {
          section_id: { type: "number", examples: [1] },
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
                section_id: { type: "number", examples: [1] },
              },
            },
          },
        },
        tags: ["Units"],
      },
    },
    UnitController.getUnitsBySeçionId,
  );

  app.post(
    "/",
    {
      preHandler: verifyRole("ADMIN"),
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
            section_id: { type: "number", examples: [1] },
          },
        },
        response: {
          201: {
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
              section_id: { type: "number", examples: [1] },
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
      preHandler: verifyTokenMiddleware(),
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
              section_id: { type: "number", examples: [1] },
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
