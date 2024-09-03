import * as SectionController from "../controllers/sectionController";
import { FastifyInstance } from "fastify";
import {
  verifyRole,
  verifyTokenMiddleware,
} from "../middleware/authMiddleware";

export default function SectionRoutes(
  app: FastifyInstance,
  options: any,
  done: Function,
) {
  app.get(
    "/",
    {
      schema: {
        description: "Buscar todas as seções",
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                section_id: { type: "number", examples: [1] },
                section_title: { type: "string", examples: ["Seção 1"] },
                section_description: {
                  type: "string",
                  examples: ["Descrição da seção 1"],
                },
                level_id: { type: "number", examples: [1] },
                is_completed: { type: "boolean", examples: [false] },
                completed_at: {
                  type: "string",
                  examples: ["2024-08-04 16:21:21.921"],
                },
              },
            },
          },
        },
        tags: ["Sections"],
      },
    },
    SectionController.getSections,
  );

  app.post(
    "/",
    {
      preHandler: verifyRole("ADMIN"),
      schema: {
        description: "Criar uma nova seção",
        body: {
          type: "object",
          properties: {
            section_title: { type: "string", examples: ["Seção 1"] },
            section_description: {
              type: "string",
              examples: ["Descrição da seção 1"],
            },
            level_id: { type: "number", examples: [1] },
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
              section_id: { type: "number", examples: [1] },
              section_title: { type: "string", examples: ["Seção 1"] },
              section_description: {
                type: "string",
                examples: ["Descrição da seção 1"],
              },
              level_id: { type: "number", examples: [1] },
              is_completed: { type: "boolean", examples: [false] },
              completed_at: {
                type: "string",
                examples: ["2024-08-04 16:21:21.921"],
              },
            },
          },
        },
        tags: ["Sections"],
        security: [{ bearerAuth: [] }],
      },
    },
    SectionController.createSection,
  );

  app.put(
    "/finish:section_id",
    {
      preHandler: verifyTokenMiddleware(),
      schema: {
        description: "Finalizar uma seção",
        querystring: {
          section_id: { type: "number", examples: [1] },
        },
        response: {
          200: {
            type: "object",
            properties: {
              section_id: { type: "number", examples: [1] },
              section_title: { type: "string", examples: ["Seção 1"] },
              section_description: {
                type: "string",
                examples: ["Descrição da seção 1"],
              },
              level_id: { type: "number", examples: [1] },
              is_completed: { type: "boolean", examples: [true] },
              completed_at: {
                type: "string",
                examples: ["2024-08-04 16:21:21.921"],
              },
            },
          },
        },
        tags: ["Sections"],
        security: [{ bearerAuth: [] }],
      },
    },
    SectionController.finishSection,
  );

  done();
}
