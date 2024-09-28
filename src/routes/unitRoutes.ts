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
                unit_icon: {
                  type: "string",
                  examples: ["Plane"],
                  nullable: true,
                },
                unit_sequence: { type: "number", examples: [1] },
                unit_title: { type: "string", examples: ["Unidade 1"] },
                unit_description: {
                  type: "string",
                  examples: ["Descrição da unidade 1"],
                },
                section_id: { type: "number", examples: [1] },
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
              unit_icon: {
                type: "string",
                examples: ["Plane"],
                nullable: true,
              },
              unit_sequence: { type: "number", examples: [1] },
              unit_title: { type: "string", examples: ["Unidade 1"] },
              unit_description: {
                type: "string",
                examples: ["Descrição da unidade 1"],
              },
              section_id: { type: "number", examples: [1] },
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
                unit_icon: {
                  type: "string",
                  examples: ["Plane"],
                  nullable: true,
                },
                unit_sequence: { type: "number", examples: [1] },
                unit_title: { type: "string", examples: ["Unidade 1"] },
                unit_description: {
                  type: "string",
                  examples: ["Descrição da unidade 1"],
                },
                section_id: { type: "number", examples: [1] },
                Lessons: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      LessonProgresses: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            lesson_progress_id: {
                              type: "string",
                              examples: ["000f21"],
                            },
                            lesson_id: { type: "number", examples: [1] },
                            in_progress: { type: "boolean", examples: [true] },
                            is_locked: { type: "boolean", examples: [false] },
                            completed_at: {
                              type: "string",
                              nullable: true,
                              examples: [null],
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        tags: ["Units"],
        security: [{ bearerAuth: [] }],
      },
    },
    UnitController.getUnitsBySectionId,
  );

  app.get(
    "/user",
    {
      preHandler: verifyTokenMiddleware(),
      schema: {
        description: "Buscar unidade em progresso por ID de usuário",
        response: {
          200: {
            type: "object",
            properties: {
              in_progress: { type: "boolean", examples: [true] },
              is_locked: { type: "boolean", examples: [false] },
              completed_at: {
                type: "string",
                examples: [""],
              },
              Unit: {
                type: "object",
                properties: {
                  unit_id: { type: "number", examples: [1] },
                  unit_icon: {
                    type: "string",
                    examples: ["Plane"],
                    nullable: true,
                  },
                  unit_sequence: { type: "number", examples: [1] },
                  unit_title: { type: "string", examples: ["Unidade 1"] },
                  unit_description: {
                    type: "string",
                    examples: ["Descrição da unidade 1"],
                  },
                  section_id: { type: "number", examples: [1] },
                },
              },
            },
          },
        },
        tags: ["Units"],
        security: [{ bearerAuth: [] }],
      },
    },
    UnitController.getInProgressUnitByUserId,
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
            unit_icon: {
              type: "string",
              examples: ["Plane"],
              nullable: true,
            },
            unit_sequence: { type: "number", examples: [1] },
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
              unit_icon: {
                type: "string",
                examples: ["Plane"],
                nullable: true,
              },
              unit_sequence: { type: "number", examples: [1] },
              unit_title: { type: "string", examples: ["Unidade 1"] },
              unit_description: {
                type: "string",
                examples: ["Descrição da unidade 1"],
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
    "/unlock:unit_id",
    {
      preHandler: verifyTokenMiddleware(),
      schema: {
        description:
          "Desbloquear uma unidade por ID de unidade e ID de usuário",
        querystring: {
          unit_id: { type: "number", examples: [1] },
        },
        response: {
          200: {
            type: "object",
            properties: {
              unit_progress_id: {
                type: "string",
                examples: ["d979de1d-3fde-4b4f-8869-46491aba8d08"],
              },
              in_progress: { type: "boolean", examples: [true] },
              is_locked: { type: "boolean", examples: [false] },
              completed_at: {
                type: "string",
                examples: [""],
              },
            },
          },
        },
        tags: ["Units"],
        security: [{ bearerAuth: [] }],
      },
    },
    UnitController.unlockUnit,
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
              unit_progress_id: { type: "number", examples: [1] },
              in_progress: { type: "boolean", examples: [false] },
              is_locked: { type: "boolean", examples: [false] },
              completed_at: {
                type: "string",
                examples: ["2021-08-04T00:00:00.000Z"],
              },
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
