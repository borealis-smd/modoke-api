import * as OptionController from "../controllers/optionController";
import { FastifyInstance } from "fastify";
import { verifyRole } from "../middleware/authMiddleware";

export default function OptionRoutes(
  app: FastifyInstance,
  options: any,
  done: Function,
) {
  app.post(
    "/",
    {
      preHandler: verifyRole("ADMIN"),
      schema: {
        description: "Criar opção",
        body: {
          type: "object",
          properties: {
            option_text: { type: "string", examples: ["Texto da opção"] },
            is_correct: { type: "boolean", examples: [false] },
            question_id: {
                type: "string",
                examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
              },
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
              option_id: {
                type: "string",
                examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
              },
              option_text: { type: "string", examples: ["Texto da opção"] },
              is_correct: { type: "boolean", examples: [false] },
              question_id: {
                type: "string",
                examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
              },
            },
          },
        },
        tags: ["Options"],
        security: [{ bearerAuth: [] }],
      },
    },
    OptionController.createOption,
  );

  done();
}
