import * as UnitService from "../services/unitService";
import { FastifyRequest, FastifyReply } from "fastify";
import { validateToken } from "../validators/tokenValidator";
import { z } from "zod";

export const getUnits = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  await validateToken(request, reply);

  const units = await UnitService.getUnits();
  reply.send(units);
};

export const getUnitById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  await validateToken(request, reply);

  try {
    const { unit_id } = z
      .object({
        unit_id: z.number().int(),
      })
      .parse(request.query);

    const unit = await UnitService.getUnitById(unit_id);

    reply.code(200).send(unit);
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

export const getUnitsBySessionId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  await validateToken(request, reply);

  try {
    const { session_id } = z
      .object({
        session_id: z.number().int(),
      })
      .parse(request.query);

    const units = await UnitService.getUnitsBySessionId(session_id);

    reply.code(200).send(units);
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

export const createUnit = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  await validateToken(request, reply);

  try {
    const unit = z
      .object({
        unit_title: z.string(),
        unit_description: z.string(),
        session_id: z.number().int(),
      })
      .parse(request.body);

    const newUnit = await UnitService.createUnit(unit);

    reply.code(201).send(newUnit);
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

export const finishUnit = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  await validateToken(request, reply);

  try {
    const { unit_id } = z
      .object({
        unit_id: z.number().int(),
      })
      .parse(request.query);

    const finishedUnit = await UnitService.finishUnit(unit_id);

    reply.code(200).send(finishedUnit);
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
