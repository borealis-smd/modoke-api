import * as QuestionController from "../controllers/questionController";
import { FastifyInstance } from "fastify";
import { verifyRole } from "../middleware/authMiddleware";

export default function QuestionRoutes(
  app: FastifyInstance,
  options: any,
  done: Function
) {
  app.post(
    "/",
    {
      preHandler: verifyRole("ADMIN"),
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
          201: {
            type: "object",
            properties: {
              question_id: {
                type: "string",
                examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
              },
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
    QuestionController.createQuestion
  );

  app.post(
    "/options",
    {
      preHandler: verifyRole("ADMIN"),
      schema: {
        description: "Criar questão com opções",
        body: {
          type: "object",
          properties: {
            question: {
              type: "object",
              required: ["question_text", "is_entrance_question", "xp"],
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
            options: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  option_text: {
                    type: "string",
                    examples: ["Azul"],
                  },
                  is_correct: { type: "boolean", examples: [true] },
                },
              },
            },
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
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
              Options: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    option_id: {
                      type: "string",
                      examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
                    },
                    option_text: {
                      type: "string",
                      examples: ["Azul"],
                    },
                    is_correct: { type: "boolean", examples: [true] },
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
    QuestionController.createQuestionWithOptions
  );

  done();
}
