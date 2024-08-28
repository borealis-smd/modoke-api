import * as AttemptController from "../controllers/attemptController";
import { FastifyInstance } from "fastify";

export default function AttemptRoutes(
  app: FastifyInstance,
  options: any,
  done: Function,
) {
  app.post(
    "/",
    {
      schema: {
        description: "Registrar tentativa",
        body: {
          type: "object",
          properties: {
            question_id: { type: "number", examples: [1] },
            selected_option_id: { type: "number", examples: [1] },
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
              attempt_id: { type: "number", examples: [1] },
              question_id: { type: "number", examples: [1] },
              option_id: { type: "number", examples: [1] },
              user_id: {
                type: "string",
                examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
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
        tags: ["Attempts"],
        security: [{ bearerAuth: [] }],
      },
    },
    AttemptController.registerAttempt,
  );

  app.get(
    "/last:question_id",
    {
      schema: {
        description: "Buscar última tentativa por ID da questão",
        querystring: {
          question_id: { type: "number", examples: [1] },
        },
        response: {
          200: {
            type: "object",
            properties: {
              attempt_id: { type: "number", examples: [1] },
              question_id: { type: "number", examples: [1] },
              selected_option_id: { type: "number", examples: [1] },
              // user_id: {
              //   type: "string",
              //   examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
              // },
              attempted_at: {
                type: "string",
                examples: ["2024-08-04 16:21:21.921"],
              },
              Option: {
                type: "object",
                properties: {
                  option_id: { type: "number", examples: [1] },
                  option_text: { type: "string", examples: ["Texto da opção"] },
                  is_correct: { type: "boolean", examples: [false] },
                  question_id: { type: "number", examples: [1] },
                },
              },
            },
          },
        },
        tags: ["Attempts"],
        security: [{ bearerAuth: [] }],
      },
    },
    AttemptController.getLastAttemptByQuestionId,
  );
  done();
}
