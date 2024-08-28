import * as OptionController from "../controllers/optionController";
import { FastifyInstance } from "fastify";

export default function OptionRoutes(
  app: FastifyInstance,
  options: any,
  done: Function,
) {
  app.post(
    "/",
    {
      schema: {
        description: "Criar opção",
        body: {
          type: "object",
          properties: {
            option_text: { type: "string", examples: ["Texto da opção"] },
            is_correct: { type: "boolean", examples: [false] },
            question_id: { type: "number", examples: [1] },
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
              option_id: { type: "number", examples: [1] },
              option_text: { type: "string", examples: ["Texto da opção"] },
              is_correct: { type: "boolean", examples: [false] },
              question_id: { type: "number", examples: [1] },
            },
          },
        },
        tags: ["Options"],
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
    OptionController.createOption,
  );

  done();
}
