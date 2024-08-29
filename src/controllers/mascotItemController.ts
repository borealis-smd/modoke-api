import * as MascotItemService from "../services/mascotItemService";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { validateToken } from "../validators/tokenValidator";
import { extractUserId } from "../utils/extractUserId";
import { MascotItemsCreateSchema } from "../validators/mascotItemsValidator";

export const getAllMascotItems = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await validateToken(request, reply);

    const mascotItems = await MascotItemService.getAllMascotItems();

    reply.code(200).send(mascotItems);
  } catch (error) {
    if (error instanceof Error) {
      reply.code(400).send({ message: error.message });
    }
  }
};

export const getMascotItemsAcquiredByUserId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await validateToken(request, reply);

    const user_id = extractUserId(request, reply);

    const mascotItems =
      await MascotItemService.getMascotItemsAcquiredByUserId(user_id);

    reply.code(200).send(mascotItems);
  } catch (error) {
    if (error instanceof Error) {
      reply.code(400).send({ message: error.message });
    }
  }
};

export const getMascotItemById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await validateToken(request, reply);

    const { mascot_items_id } = z
      .object({
        mascot_items_id: z.number().int(),
      })
      .parse(request.query);

    const mascotItem =
      await MascotItemService.getMascotItemById(mascot_items_id);

    reply.code(200).send(mascotItem);
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) =>
        reply
          .code(400)
          .send({ message: `${err.path.join(".")} - ${err.message}` }),
      );
    }
    if (error instanceof Error) {
      reply.code(400).send({ message: error.message });
    }
  }
};

export const createMascotItem = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await validateToken(request, reply);

    const mascotItemData = MascotItemsCreateSchema.parse(request.body);

    const mascotItemCreated =
      await MascotItemService.createMascotItem(mascotItemData);

    reply.code(201).send(mascotItemCreated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) =>
        reply
          .code(400)
          .send({ message: `${err.path.join(".")} - ${err.message}` }),
      );
    }
    if (error instanceof Error) {
      reply.code(400).send({ message: error.message });
    }
  }
};

export const buyMascotItem = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await validateToken(request, reply);

    const { mascot_items_id } = z
      .object({
        mascot_items_id: z.number().int(),
      })
      .parse(request.body);

    const user_id = extractUserId(request, reply);

    const mascotItem = await MascotItemService.buyMascotItem(
      user_id,
      mascot_items_id,
    );

    reply.code(201).send(mascotItem);
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) =>
        reply
          .code(400)
          .send({ message: `${err.path.join(".")} - ${err.message}` }),
      );
    }
    if (error instanceof Error) {
      reply.code(400).send({ message: error.message });
    }
  }
};

export const equipMascotItem = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await validateToken(request, reply);

    const { mascot_items_id, mascot_image_url, mascot_id } = z
      .object({
        mascot_items_id: z.number().int(),
        mascot_image_url: z.string().url(),
        mascot_id: z.number().int(),
      })
      .parse(request.body);

    await MascotItemService.equipMascotItem(
      mascot_items_id,
      mascot_image_url,
      mascot_id,
    );

    reply.code(200).send({ message: "Item equipado com sucesso!" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) =>
        reply
          .code(400)
          .send({ message: `${err.path.join(".")} - ${err.message}` }),
      );
    }
    if (error instanceof Error) {
      reply.code(400).send({ message: error.message });
    }
  }
};
