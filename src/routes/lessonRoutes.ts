import * as LessonController from "../controllers/lessonController";
import { FastifyInstance } from "fastify";

export default function LessonRoutes(
  app: FastifyInstance,
  options: any,
  done: Function,
) {
  app.get(
    ":lesson_id",
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
              title: { type: "string", examples: ["Aula 1"] },
              description: {
                type: "string",
                examples: ["Descrição da aula 1"],
              },
              lesson_principle: { type: "string", examples: ["P"] },
              is_completed: { type: "boolean", examples: [false] },
              completed_at: {
                type: "string",
                examples: ["2024-08-04 16:21:21.921"],
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
                title: { type: "string", examples: ["Aula 1"] },
                description: {
                  type: "string",
                  examples: ["Descrição da aula 1"],
                },
                lesson_principle: { type: "string", examples: ["P"] },
                is_completed: { type: "boolean", examples: [false] },
                completed_at: {
                  type: "string",
                  examples: ["2024-08-04 16:21:21.921"],
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
    "/session:session_id",
    {
      schema: {
        description: "Buscar lições por ID de uma sessão",
        querystring: {
          session_id: { type: "number", examples: [1] },
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
                lesson_principle: { type: "string", examples: ["P"] },
                is_completed: { type: "boolean", examples: [false] },
                completed_at: {
                  type: "string",
                  examples: ["2024-08-04 16:21:21.921"],
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
    LessonController.getLessonsBySessionId,
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
                lesson_principle: { type: "string", examples: ["P"] },
                is_completed: { type: "boolean", examples: [false] },
                completed_at: {
                  type: "string",
                  examples: ["2024-08-04 16:21:21.921"],
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

  app.post(
    "/",
    {
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
            lesson_principle: { type: "string", examples: ["P"] },
            unit_id: { type: "number", examples: [1] },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              lesson_id: { type: "number", examples: [1] },
              unit_id: { type: "number", examples: [1] },
              title: { type: "string", examples: ["Aula 1"] },
              description: {
                type: "string",
                examples: ["Descrição da aula 1"],
              },
              lesson_principle: { type: "string", examples: ["P"] },
              is_completed: { type: "boolean", examples: [false] },
              completed_at: {
                type: "string",
                examples: ["2024-08-04 16:21:21.921"],
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
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
    LessonController.createLesson,
  );

  app.put(
    "/finish:lesson_id",
    {
      schema: {
        description: "Finalizar uma lição",
        querystring: {
          lesson_id: { type: "number", examples: [1] },
        },
        response: {
          200: {
            type: "object",
            properties: {
              lesson_id: { type: "number", examples: [1] },
              unit_id: { type: "number", examples: [1] },
              title: { type: "string", examples: ["Aula 1"] },
              description: {
                type: "string",
                examples: ["Descrição da aula 1"],
              },
              lesson_principle: { type: "string", examples: ["P"] },
              is_completed: { type: "boolean", examples: [true] },
              completed_at: {
                type: "string",
                examples: ["2024-08-04 16:21:21.921"],
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
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
    LessonController.finishLesson,
  );

  done();
}
