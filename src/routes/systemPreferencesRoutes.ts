import * as SystemPreferencesController from "../controllers/systemPreferencesController";
import { FastifyInstance } from "fastify";
import { verifyTokenMiddleware } from "../middleware/authMiddleware";

export default function SystemPreferencesRoutes(
  app: FastifyInstance,
  options: any,
  done: Function,
) {
  app.get(
    "/",
    {
      preHandler: verifyTokenMiddleware(),
      schema: {
        description: "Buscar preferências de sistema de um usuário",
        response: {
          200: {
            type: "object",
            properties: {
              // user_id: {
              //   type: "string",
              //   examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
              // },
              theme: {
                type: "string",
                examples: ["light"],
              },
              font_size: {
                type: "number",
                examples: [16],
              },
              is_high_contrast: {
                type: "boolean",
                examples: [false],
              },
              sound: {
                type: "boolean",
                examples: [true],
              },
            },
          },
        },
        tags: ["System Preferences"],
        security: [{ bearerAuth: [] }],
      },
    },
    SystemPreferencesController.getSystemPreferencesByUserId,
  );

  app.post(
    "/",
    {
      preHandler: verifyTokenMiddleware(),
      schema: {
        description: "Registrar preferências de sistema de um usuário",
        body: {
          type: "object",
          properties: {
            theme: { type: "string", examples: ["light"] },
            font_size: { type: "number", examples: [16] },
            is_high_contrast: { type: "boolean", examples: [false] },
            sound: { type: "boolean", examples: [true] },
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
              // user_id: {
              //   type: "string",
              //   examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
              // },
              theme: {
                type: "string",
                examples: ["light"],
              },
              font_size: {
                type: "number",
                examples: [16],
              },
              is_high_contrast: {
                type: "boolean",
                examples: [false],
              },
              sound: {
                type: "boolean",
                examples: [true],
              },
            },
          },
        },
        tags: ["System Preferences"],
        security: [{ bearerAuth: [] }],
      },
    },
    SystemPreferencesController.createSystemPreferences,
  );

  app.put(
    "/",
    {
      preHandler: verifyTokenMiddleware(),
      schema: {
        description: "Atualizar preferências de sistema de um usuário",
        body: {
          type: "object",
          anyOf: [
            { required: ["theme"] },
            { required: ["font_size"] },
            { required: ["is_high_contrast"] },
            { required: ["sound"] },
          ],
          properties: {
            theme: { type: "string", examples: ["light"] },
            font_size: { type: "number", examples: [16] },
            is_high_contrast: { type: "boolean", examples: [false] },
            sound: { type: "boolean", examples: [true] },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              // user_id: {
              //   type: "string",
              //   examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
              // },
              theme: {
                type: "string",
                examples: ["light"],
              },
              font_size: {
                type: "number",
                examples: [16],
              },
              is_high_contrast: {
                type: "boolean",
                examples: [false],
              },
              sound: {
                type: "boolean",
                examples: [true],
              },
            },
          },
        },
        tags: ["System Preferences"],
        security: [{ bearerAuth: [] }],
      },
    },
    SystemPreferencesController.updateSystemPreferences,
  );

  done();
}
