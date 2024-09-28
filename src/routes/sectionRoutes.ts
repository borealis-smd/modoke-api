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
              },
            },
          },
        },
        tags: ["Sections"],
      },
    },
    SectionController.getSections,
  );

  app.get(
    "/user",
    {
      preHandler: verifyTokenMiddleware(),
      schema: {
        description: "Buscar seção em progresso por ID de usuário",
        response: {
          200: {
            type: "object",
            properties: {
              in_progress: { type: "boolean", examples: [true] },
              is_locked: { type: "boolean", examples: [false] },
              completed_at: {
                type: "string",
                examples: [""],
              },
              Section: {
                type: "object",
                properties: {
                  section_id: { type: "number", examples: [1] },
                  section_title: { type: "string", examples: ["Seção 1"] },
                  section_description: {
                    type: "string",
                    examples: ["Descrição da seção 1"],
                  },
                  level_id: { type: "number", examples: [1] },
                },
              },
            },
          },
        },
        tags: ["Sections"],
        security: [{ bearerAuth: [] }],
      },
    },
    SectionController.getInProgressSectionByUserId,
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
            session_id: {
              type: "string",
              examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
            },
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
    "/unlock:cur_unit_id",
    {
      preHandler: verifyTokenMiddleware(),
      schema: {
        description: "Desbloquear uma seção por ID de seção e ID de usuário",
        querystring: {
          cur_unit_id: { type: "number", examples: [1] },
        },
        response: {
          200: {
            type: "object",
            properties: {
              section_progress_id: { type: "number", examples: [1] },
              in_progress: { type: "boolean", examples: [true] },
              is_locked: { type: "boolean", examples: [false] },
              completed_at: {
                type: "string",
                examples: [""],
              },
            },
          },
        },
        tags: ["Sections"],
        security: [{ bearerAuth: [] }],
      },
    },
    SectionController.unlockSection,
  );

  app.put(
    "/finish:unit_id",
    {
      preHandler: verifyTokenMiddleware(),
      schema: {
        description: "Finalizar uma seção",
        querystring: {
          unit_id: { type: "number", examples: [1] },
        },
        response: {
          200: {
            type: "object",
            properties: {
              section_progress_id: { type: "number", examples: [1] },
              in_progress: { type: "boolean", examples: [false] },
              is_locked: { type: "boolean", examples: [false] },
              completed_at: {
                type: "string",
                examples: ["2021-08-04T00:00:00.000Z"],
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
