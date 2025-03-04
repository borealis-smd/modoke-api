import * as SectionController from "../controllers/sectionController";
import { FastifyInstance } from "fastify";
import {
  verifyRole,
  verifyTokenMiddleware,
} from "../middleware/authMiddleware";
import { ProgressStatus } from "@prisma/client";

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
              section_progress_id: { type: "string", examples: ["000f21"] },
              status: { 
                type: "string", 
                enum: Object.values(ProgressStatus),
                examples: ["IN_PROGRESS"] 
              },
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
    "/unlock:section_id",
    {
      preHandler: verifyTokenMiddleware(),
      schema: {
        description: "Desbloquear uma seção por ID de seção e ID de usuário",
        querystring: {
          section_id: { type: "number", examples: [1] },
        },
        response: {
          200: {
            type: "object",
            properties: {
              section_progress_id: { type: "string", examples: ["000f21"] },
              status: { 
                type: "string", 
                enum: Object.values(ProgressStatus),
                examples: ["IN_PROGRESS"] 
              },
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
              finishedSection: {
                type: "object",
                properties: {
                  section_progress_id: {
                    type: "string",
                    examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
                  },
                  section_id: { type: "number", examples: [1] },
                  user_id: {
                    type: "string",
                    examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
                  },
                  status: { 
                    type: "string", 
                    enum: Object.values(ProgressStatus),
                    examples: ["COMPLETED"] 
                  },
                  completed_at: {
                    type: "string",
                    examples: ["2021-08-04T00:00:00.000Z"],
                  },
                },
              },
              badge: {
                type: "object",
                nullable: true,
                properties: {
                  badge_id: { type: "number", examples: [1] },
                  acquired_at: {
                    type: "string",
                    examples: ["2021-08-04T00:00:00.000Z"],
                  },
                },
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
