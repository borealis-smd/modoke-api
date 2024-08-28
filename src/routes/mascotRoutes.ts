import * as MascotController from "../controllers/mascotController";
import { FastifyInstance } from "fastify";

export default function MascotRoutes(
  app: FastifyInstance,
  options: any,
  done: Function,
) {
  app.get(
    "/user:user_id",
    {
      schema: {
        description: "Buscar mascote por usuário",
        querystring: {
          user_id: {
            type: "string",
            examples: ["123e4567-e89b-12d3-a456-426614174000"],
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              mascot_id: { type: "number", examples: [1] },
              mascot_image_url: {
                type: "string",
                examples: ["https://www.example.com/mascot.jpg"],
              },
              // user_id: {
              //   type: "string",
              //   examples: ["123e4567-e89b-12d3-a456-426614174000"],
              // },
            },
          },
        },
        tags: ["Mascot"],
        security: [{ bearerAuth: [] }],
      },
    },
    MascotController.getMascotByUserId,
  );

  app.post(
    "/",
    {
      schema: {
        description: "Criar mascote",
        body: {
          type: "object",
          properties: {
            mascot_image_url: {
              type: "string",
              examples: ["https://www.example.com/mascot.jpg"],
            },
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
              mascot_id: { type: "number", examples: [1] },
              mascot_image_url: {
                type: "string",
                examples: ["https://www.example.com/mascot.jpg"],
              },
              // user_id: {
              //   type: "string",
              //   examples: ["123e4567-e89b-12d3-a456-426614174000"],
              // },
            },
          },
        },
        tags: ["Mascot"],
        security: [{ bearerAuth: [] }],
      },
    },
    MascotController.createMascot,
  );

  done();
}
