import * as LessonController from "../controllers/lessonController";
import { FastifyInstance } from "fastify";

export default function LessonRoutes(
  app: FastifyInstance,
  options: any,
  done: Function,
) {
  app.get(
    "/:lesson_id",
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
      },
    },
    LessonController.getLessonsByLevelId,
  );

  done();
}
