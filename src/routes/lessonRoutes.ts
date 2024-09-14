import * as LessonController from "../controllers/lessonController";
import { FastifyInstance } from "fastify";
import {
  verifyRole,
  verifyTokenMiddleware,
} from "../middleware/authMiddleware";

export default function LessonRoutes(
  app: FastifyInstance,
  options: any,
  done: Function,
) {
  app.get(
    "/id:lesson_id",
    {
      schema: {
        description: "Buscar lição por ID",
        querystring: {
          lesson_id: { type: "number", examples: [1] },
        },
        response: {
          200: {
            type: "object",
            properties: {
              lesson_id: { type: "number", examples: [1] },
              unit_id: { type: "number", examples: [1] },
              lesson_title: { type: "string", examples: ["Aula 1"] },
              description: {
                type: "string",
                examples: ["Descrição da aula 1"],
              },
              created_at: {
                type: "string",
                examples: ["2024-08-04 16:21:21.921"],
              },
              updated_at: {
                type: "string",
                examples: ["2024-08-04 16:21:21.921"],
              },
            },
          },
        },
        tags: ["Lessons"],
      },
    },
    LessonController.getLessonById,
  );

  app.get(
    "/unit:unit_id",
    {
      schema: {
        description: "Buscar lições por ID de uma unidade",
        querystring: {
          unit_id: { type: "number", examples: [1] },
        },
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                lesson_id: { type: "number", examples: [1] },
                unit_id: { type: "number", examples: [1] },
                lesson_title: { type: "string", examples: ["Aula 1"] },
                lesson_description: {
                  type: "string",
                  examples: ["Descrição da aula 1"],
                },
                created_at: {
                  type: "string",
                  examples: ["2024-08-04 16:21:21.921"],
                },
                updated_at: {
                  type: "string",
                  examples: ["2024-08-04 16:21:21.921"],
                },
              },
            },
          },
        },
        tags: ["Lessons"],
      },
    },
    LessonController.getLessonsByUnitId,
  );

  app.get(
    "/section:section_id",
    {
      schema: {
        description: "Buscar lições por ID de uma seção",
        querystring: {
          section_id: { type: "number", examples: [1] },
        },
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                lesson_id: { type: "number", examples: [1] },
                unit_id: { type: "number", examples: [1] },
                title: { type: "string", examples: ["Aula 1"] },
                description: {
                  type: "string",
                  examples: ["Descrição da aula 1"],
                },
                created_at: {
                  type: "string",
                  examples: ["2024-08-04 16:21:21.921"],
                },
                updated_at: {
                  type: "string",
                  examples: ["2024-08-04 16:21:21.921"],
                },
              },
            },
          },
        },
        tags: ["Lessons"],
      },
    },
    LessonController.getLessonsBySectionId,
  );

  app.get(
    "/level:level_id",
    {
      schema: {
        description: "Buscar lições por ID de um nível",
        querystring: {
          level_id: { type: "number", examples: [1] },
        },
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                lesson_id: { type: "number", examples: [1] },
                unit_id: { type: "number", examples: [1] },
                title: { type: "string", examples: ["Aula 1"] },
                description: {
                  type: "string",
                  examples: ["Descrição da aula 1"],
                },
                created_at: {
                  type: "string",
                  examples: ["2024-08-04 16:21:21.921"],
                },
                updated_at: {
                  type: "string",
                  examples: ["2024-08-04 16:21:21.921"],
                },
              },
            },
          },
        },
        tags: ["Lessons"],
      },
    },
    LessonController.getLessonsByLevelId,
  );

  app.get(
    "/user",
    {
      preHandler: verifyTokenMiddleware(),
      schema: {
        description: "Buscar lição em progresso por ID de usuário",
        response: {
          200: {
            type: "object",
            properties: {
              lesson_progress_id: { type: "number", examples: [1] },
              in_progress: { type: "boolean", examples: [true] },
              is_locked: { type: "boolean", examples: [false] },
              completed_at: {
                type: "string",
                examples: [""],
              },
              Lesson: {
                type: "object",
                properties: {
                  lesson_id: { type: "number", examples: [1] },
                  lesson_title: { type: "string", examples: ["Lição 1"] },
                  lesson_description: {
                    type: "string",
                    examples: ["Descrição da lição 1"],
                  },
                  unit_id: { type: "number", examples: [1] },
                },
              },
            },
          },
        },
        tags: ["Lessons"],
        security: [{ bearerAuth: [] }],
      },
    },
    LessonController.getInProgressLessonByUserId,
  );

  app.post(
    "/",
    {
      preHandler: verifyRole("ADMIN"),
      schema: {
        description: "Criar uma lição",
        body: {
          type: "object",
          properties: {
            lesson_title: { type: "string", examples: ["Aula 1"] },
            lesson_description: {
              type: "string",
              examples: ["Descrição da aula 1"],
            },
            unit_id: { type: "number", examples: [1] },
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
              lesson_id: { type: "number", examples: [1] },
              unit_id: { type: "number", examples: [1] },
              title: { type: "string", examples: ["Aula 1"] },
              description: {
                type: "string",
                examples: ["Descrição da aula 1"],
              },
              created_at: {
                type: "string",
                examples: ["2024-08-04 16:21:21.921"],
              },
              updated_at: {
                type: "string",
                examples: ["2024-08-04 16:21:21.921"],
              },
            },
          },
        },
        tags: ["Lessons"],
        security: [{ bearerAuth: [] }],
      },
    },
    LessonController.createLesson,
  );

  app.post(
    "/start:lesson_id",
    {
      preHandler: verifyTokenMiddleware(),
      schema: {
        description: "Iniciar uma lição por ID de lição e ID de usuário",
        querystring: {
          lesson_id: { type: "number", examples: [1] },
        },
        response: {
          201: {
            type: "object",
            properties: {
              lesson_progress_id: { type: "number", examples: [1] },
              in_progress: { type: "boolean", examples: [true] },
              is_locked: { type: "boolean", examples: [false] },
              completed_at: {
                type: "string",
                examples: [""],
              },
            },
          },
        },
        tags: ["Lessons"],
        security: [{ bearerAuth: [] }],
      },
    },
    LessonController.startLesson,
  );

  app.put(
    "/unlock:lesson_id",
    {
      preHandler: verifyTokenMiddleware(),
      schema: {
        description: "Desbloquear uma lição por ID de lição e ID de usuário",
        querystring: {
          lesson_id: { type: "number", examples: [1] },
        },
        response: {
          200: {
            type: "object",
            properties: {
              lesson_progress_id: { type: "number", examples: [1] },
              in_progress: { type: "boolean", examples: [true] },
              is_locked: { type: "boolean", examples: [false] },
              completed_at: {
                type: "string",
                examples: [""],
              },
            },
          },
        },
        tags: ["Lessons"],
        security: [{ bearerAuth: [] }],
      },
    },
    LessonController.unlockLesson,
  );

  app.put(
    "/finish:lesson_id",
    {
      preHandler: verifyTokenMiddleware(),
      schema: {
        description: "Finalizar uma lição",
        querystring: {
          lesson_id: { type: "number", examples: [1] },
        },
        response: {
          200: {
            type: "object",
            properties: {
              lesson_progress_id: { type: "number", examples: [1] },
              in_progress: { type: "boolean", examples: [false] },
              is_locked: { type: "boolean", examples: [false] },
              completed_at: {
                type: "string",
                examples: ["2021-08-04T00:00:00.000Z"],
              },
            },
          },
        },
        tags: ["Lessons"],
        security: [{ bearerAuth: [] }],
      },
    },
    LessonController.finishLesson,
  );

  done();
}
