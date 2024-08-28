import * as BadgeController from "../controllers/badgeController";
import { FastifyInstance } from "fastify";

export default function BadgeRoutes(
  app: FastifyInstance,
  options: any,
  done: Function,
) {
  app.get(
    "/",
    {
      schema: {
        description: "Buscar todas os emblemas",
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                badge_id: { type: "number", examples: [1] },
                unit_id: { type: "number", examples: [1] },
                badge_name: { type: "string", examples: ["Badge 1"] },
                badge_image_url: {
                  type: "string",
                  examples: ["http://example.com/image.png"],
                },
              },
            },
          },
        },
        tags: ["Badges"],
        security: [{ bearerAuth: [] }],
      },
    },
    BadgeController.getBadges,
  );

  app.get(
    "/unit:unit_id",
    {
      schema: {
        description: "Buscar emblema por ID de uma unidade",
        querystring: {
          unit_id: { type: "number", examples: [1] },
        },
        response: {
          200: {
            type: "object",
            properties: {
              badge_id: { type: "number", examples: [1] },
              // unit_id: { type: "number", examples: [1] },
              badge_name: { type: "string", examples: ["Badge 1"] },
              badge_image_url: {
                type: "string",
                examples: ["http://example.com/image.png"],
              },
              Unit: {
                type: "object",
                properties: {
                  unit_id: { type: "number", examples: [1] },
                  unit_title: { type: "string", examples: ["Unit 1"] },
                  unit_description: {
                    type: "string",
                    examples: ["Description"],
                  },
                  is_completed: { type: "boolean", examples: [false] },
                  completed_at: {
                    type: "string",
                    examples: ["2024-08-28T13:46:10.632Z"],
                  },
                  session_id: { type: "number", examples: [1] },
                },
              },
            },
          },
        },
        tags: ["Badges"],
        security: [{ bearerAuth: [] }],
      },
    },
    BadgeController.getBadgeByUnitId,
  );

  app.get(
    "/user:user_id",
    {
      schema: {
        description: "Buscar emblemas por ID de um usuário",
        querystring: {
          user_id: {
            type: "string",
            examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
          },
        },
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                user_has_badge_id: {
                  type: "string",
                  examples: ["f7cf3608-5069-3466-abee-9ec9d454e0c3"],
                },
                badge_id: { type: "number", examples: [1] },
                // user_id: {
                //   type: "string",
                //   examples: ["f7cf3608-5069-3466-abee-9ec9d454e0c3"],
                // },
                acquired_at: {
                  type: "string",
                  examples: ["2024-08-28T13:46:10.632Z"],
                },
                Badges: {
                  type: "object",
                  properties: {
                    badge_id: { type: "number", examples: [1] },
                    badge_name: { type: "string", examples: ["First Badge"] },
                    badge_image_url: {
                      type: "string",
                      examples: ["http://example.com/badge.png"],
                    },
                    // unit_id: { type: "number", examples: [1] },
                    Unit: {
                      type: "object",
                      properties: {
                        unit_id: { type: "number", examples: [1] },
                        unit_title: { type: "string", examples: ["Unit 1"] },
                        unit_description: {
                          type: "string",
                          examples: ["Description"],
                        },
                        is_completed: { type: "boolean", examples: [false] },
                        completed_at: {
                          type: "string",
                          examples: ["2024-08-28T13:46:10.632Z"],
                        },
                        session_id: { type: "number", examples: [1] },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        tags: ["Badges"],
        security: [{ bearerAuth: [] }],
      },
    },
    BadgeController.getBadgesByUserId,
  );

  app.post(
    "/",
    {
      schema: {
        description: "Cadastrar um emblema",
        body: {
          type: "object",
          properties: {
            badge_name: { type: "string", examples: ["Badge 1"] },
            badge_image_url: {
              type: "string",
              examples: ["http://example.com/image.png"],
            },
            unit_id: { type: "number", examples: [1] },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              badge_id: { type: "number", examples: [1] },
              badge_name: { type: "string", examples: ["Badge 1"] },
              badge_image_url: {
                type: "string",
                examples: ["http://example.com/image.png"],
              },
              unit_id: { type: "number", examples: [1] },
            },
          },
        },
        tags: ["Badges"],
        security: [{ bearerAuth: [] }],
      },
    },
    BadgeController.createBadge,
  );

  app.post(
    "/assign",
    {
      schema: {
        description: "Atribuir um emblema a um usuário",
        body: {
          type: "object",
          properties: {
            user_id: {
              type: "string",
              examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
            },
            badge_id: { type: "number", examples: [1] },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              message: {
                type: "string",
                examples: ["Emblema atribuído com sucesso."],
              },
            },
          },
        },
        tags: ["Badges"],
        security: [{ bearerAuth: [] }],
      },
    },
    BadgeController.assignBadgeToUser,
  );

  done();
}
