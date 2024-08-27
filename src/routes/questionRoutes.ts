import * as QuestionController from "../controllers/questionController";
import { FastifyInstance } from "fastify";

export default function QuestionRoutes(
  app: FastifyInstance,
  options: any,
  done: Function,
) {
  app.get(
    "/lesson:lesson_id",
    {
      schema: {
        description: "Buscar questões (enunciados e alternativas) por ID da lição",
        querystring: {
          lesson_id: { type: "number", examples: [1] },
        },
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                question_id: { type: "number", examples: [1] },
                question_text: {
                  type: "string",
                  examples: ["Qual a cor do céu?"],
                },
                is_entrance_question: { type: "boolean", examples: [false] },
                xp: { type: "number", examples: [10] },
                lesson_id: { type: "number", examples: [1] },
                created_at: {
                  type: "string",
                  examples: ["2024-08-04 16:21:21.921"],
                },
                updated_at: {
                  type: "string",
                  examples: ["2024-08-04 16:21:21.921"],
                },
                Answers: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      answer_id: { type: "number", examples: [1] },
                      answer_text: {
                        type: "string",
                        examples: ["Azul"],
                      },
                      is_correct: { type: "boolean", examples: [true] },
                      question_id: { type: "number", examples: [1] },
                      answered_at: {
                        type: "string",
                        examples: ["2024-08-04 16:21:21.921"],
                      },
                    },
                  },
                },
              },
            },
          },
        },
        tags: ["Questions"],
        security: [{ bearerAuth: [] }],
      },
    },
    QuestionController.getQuestionsByLessonId,
  );

  app.get(
    "/entranceTest",
    {
      schema: {
        description: "Buscar questões (enunciados e alternativas) do teste de entrada",
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                question_id: { type: "number", examples: [1] },
                question_text: {
                  type: "string",
                  examples: ["Qual a cor do céu?"],
                },
                is_entrance_question: { type: "boolean", examples: [true] },
                xp: { type: "number", examples: [10] },
                lesson_id: { type: "number", examples: [1] },
                created_at: {
                  type: "string",
                  examples: ["2024-08-04 16:21:21.921"],
                },
                updated_at: {
                  type: "string",
                  examples: ["2024-08-04 16:21:21.921"],
                },
                Answers: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      answer_id: { type: "number", examples: [1] },
                      answer_text: {
                        type: "string",
                        examples: ["Azul"],
                      },
                      is_correct: { type: "boolean", examples: [true] },
                      question_id: { type: "number", examples: [1] },
                      answered_at: {
                        type: "string",
                        examples: ["2024-08-04 16:21:21.921"],
                      },
                    },
                  },
                },
              },
            },
          },
        },
        tags: ["Questions"],
        security: [{ bearerAuth: [] }],
      },
    },
    QuestionController.getEntranceTestQuestions,
  );

  app.post(
    "/",
    {
      schema: {
        description: "Criar questão",
        body: {
          type: "object",
          properties: {
            question_text: {
              type: "string",
              examples: ["Qual a cor do céu?"],
            },
            is_entrance_question: { type: "boolean", examples: [true] },
            xp: { type: "number", examples: [10] },
            lesson_id: { type: "number", examples: [1] },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              question_id: { type: "number", examples: [1] },
              question_text: {
                type: "string",
                examples: ["Qual a cor do céu?"],
              },
              is_entrance_question: { type: "boolean", examples: [true] },
              xp: { type: "number", examples: [10] },
              lesson_id: { type: "number", examples: [1] },
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
        tags: ["Questions"],
        security: [{ bearerAuth: [] }],
      },
    },
    QuestionController.createQuestion,
  );

  done();
}
