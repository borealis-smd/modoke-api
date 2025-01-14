import * as LevelController from "../controllers/levelController";
import { FastifyInstance } from "fastify";

export default function LevelRoutes(
  app: FastifyInstance,
  options: any,
  done: Function,
) {
  app.get(
    "/id:level_id",
    {
      schema: {
        description: "Buscar nível por id",
        querystring: {
          type: "object",
          properties: {
            level_id: {
              type: "number",
              examples: [1],
            },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              level_id: {
                type: "number",
                examples: [1, 2, 3],
              },
              name: {
                type: "string",
                enum: ["A", "AA", "AAA"],
              },
              description: {
                type: "string",
                examples: ["Iniciante", "Intermediário", "Avançado"],
              },
            },
          },
        },
        tags: ["Levels"],
      },
    },
    LevelController.getLevelById,
  );

  app.get(
    "/",
    {
      schema: {
        description: "Buscar todos os níveis.",
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                level_id: {
                  type: "number",
                  examples: [1, 2, 3],
                },
                name: {
                  type: "string",
                  enum: ["A", "AA", "AAA"],
                },
                description: {
                  type: "string",
                  examples: ["Iniciante", "Intermediário", "Avançado"],
                },
              },
            },
          },
        },
        tags: ["Levels"],
      },
    },
    LevelController.getLevels,
  );

  done();
}
