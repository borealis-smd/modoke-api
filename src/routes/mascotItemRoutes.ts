import * as MascotItemController from "../controllers/mascotItemController";
import { FastifyInstance } from "fastify";

export default function MascotItemRoutes(
  app: FastifyInstance,
  options: any,
  done: Function,
) {
  app.get(
    "/",
    {
      schema: {
        description: "Buscar todos os itens de mascote",
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                mascot_items_id: { type: "number", examples: [1] },
                item_name: { type: "string", examples: ["Espada"] },
                item_image_url: {
                  type: "string",
                  examples: ["https://www.example.com/sword.jpg"],
                },
                isEquipped: { type: "boolean", examples: [false] },
              },
            },
          },
        },
        tags: ["Mascot Item"],
        security: [{ bearerAuth: [] }],
      },
    },
    MascotItemController.getAllMascotItems,
  );

  app.get(
    "/user",
    {
      schema: {
        description: "Buscar itens adquiridos pelo usuário",
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                mascot_has_mascot_items_id: {
                  type: "string",
                  examples: ["5aa5c1d1-9ac4-4cb0-a469-742d90a7f70e"],
                },
                mascot_id: { type: "number", examples: [2] },
                mascot_items_id: { type: "number", examples: [2] },
                acquired_at: {
                  type: "string",
                  examples: ["2024-08-28T21:47:55.692Z"],
                },
                MascotItems: {
                  type: "object",
                  properties: {
                    mascot_items_id: { type: "number", examples: [2] },
                    item_name: { type: "string", examples: ["Espada"] },
                    item_image_url: {
                      type: "string",
                      examples: ["https://www.example.com/sword.jpg"],
                    },
                    isEquipped: { type: "boolean", examples: [true] },
                  },
                },
              },
            },
          },
        },
        tags: ["Mascot Item"],
        security: [{ bearerAuth: [] }],
      },
    },
    MascotItemController.getMascotItemsAcquiredByUserId,
  );

  app.get(
      "/item:mascot_items_id",
      {
        schema: {
          description: "Buscar item de mascote por ID",
          querystring: {
            mascot_items_id: { type: "number", examples: [1] },
          },
          response: {
            200: {
              type: "object",
              properties: {
                mascot_items_id: { type: "number", examples: [1] },
                item_name: { type: "string", examples: ["Espada"] },
                item_image_url: {
                  type: "string",
                  examples: ["https://www.example.com/sword.jpg"],
                },
                isEquipped: { type: "boolean", examples: [false] },
              },
            },
          },
          tags: ["Mascot Item"],
        },
      },
      MascotItemController.getMascotItemById,
  );

  app.post(
    "/",
    {
      schema: {
        description: "Criar item de mascote",
        body: {
          type: "object",
          properties: {
            item_name: { type: "string", examples: ["Espada"] },
            item_image_url: {
              type: "string",
              examples: ["https://www.example.com/sword.jpg"],
            },
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
              mascot_items_id: { type: "number", examples: [1] },
              item_name: { type: "string", examples: ["Espada"] },
              item_image_url: {
                type: "string",
                examples: ["https://www.example.com/sword.jpg"],
              },
              isEquipped: { type: "boolean", examples: [false] },
            },
          },
        },
        tags: ["Mascot Item"],
        security: [{ bearerAuth: [] }],
      },
    },
    MascotItemController.createMascotItem,
  );

  app.post(
    "/buy",
    {
      schema: {
        description: "Comprar item de mascote",
        body: {
          type: "object",
          properties: {
            mascot_items_id: { type: "number", examples: [1] },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              mascot_items_id: { type: "number", examples: [1] },
              item_name: { type: "string", examples: ["Espada"] },
              item_image_url: {
                type: "string",
                examples: ["https://www.example.com/sword.jpg"],
              },
              isEquipped: { type: "boolean", examples: [false] },
            },
          },
        },
        tags: ["Mascot Item"],
        security: [{ bearerAuth: [] }],
      },
    },
    MascotItemController.buyMascotItem,
  );

  app.post(
    "/equip",
    {
      schema: {
        description: "Equipar item de mascote",
        body: {
          type: "object",
          properties: {
            mascot_items_id: { type: "number", examples: [1] },
            mascot_image_url: {
              type: "string",
              examples: ["https://www.example.com/mascot.jpg"],
            },
            mascot_id: { type: "number", examples: [1] },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              message: {
                type: "string",
                examples: ["Item equipado com sucesso!"],
              },
            },
          },
        },
        tags: ["Mascot Item"],
        security: [{ bearerAuth: [] }],
      },
    },
    MascotItemController.equipMascotItem,
  );

  done();
}
