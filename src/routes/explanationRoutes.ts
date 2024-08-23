import * as ExplanationController from "../controllers/explanationController";
import { FastifyInstance } from "fastify";

export default function ExplanationRoutes(
  app: FastifyInstance,
  options: any,
  done: Function,
) {
  app.get(
    ":lesson_id",
    {
      schema: {
        description: "Buscar explicações por ID de uma lição",
        querystring: {
          lesson_id: { type: "number", examples: [1] },
        },
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                explanation_id: { type: "number", examples: [1] },
                content: { type: "string", examples: ["Conteúdo 1"] },
                part: { type: "string", examples: ["PART_1"] },
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
        },
        tags: ["Explanations"],
        security: [{ bearerAuth: [] }],
      },
    },
    ExplanationController.getExplanationsByLessonId,
  );

  app.post(
    "/",
    {
      schema: {
        description: "Criar uma explicação",
        body: {
          type: "object",
          properties: {
            lesson_id: { type: "number", examples: [1] },
            content: { type: "string", examples: ["Conteúdo 1"] },
            part: { type: "string", examples: ["PART_1"] },
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
              explanation_id: { type: "number", examples: [1] },
              content: { type: "string", examples: ["Conteúdo 1"] },
              part: { type: "string", examples: ["PART_1"] },
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
        tags: ["Explanations"],
        security: [{ bearerAuth: [] }],
      },
    },
    ExplanationController.createExplanation,
  );

  done();
}
