import * as UnitService from "../services/unitService";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { UnitsCreateSchema } from "../validators/unitsValidator";
import { handleError } from "../utils/errorHandler";
import { extractUserId } from "../utils/extractUserId";

export const getUnits = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const units = await UnitService.getUnits();
    reply.send(units);
  } catch (error) {
    if (error instanceof Error) {
      reply.code(400).send({ message: error.message });
    }
  }
};

export const getUnitById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { unit_id } = z
      .object({
        unit_id: z.number().int(),
      })
      .parse(request.query);

    const unit = await UnitService.getUnitById(unit_id);

    reply.code(200).send(unit);
  } catch (error) {
    handleError(error, reply);
  }
};

export const getUnitsBySectionId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { section_id } = z
      .object({
        section_id: z.number().int(),
      })
      .parse(request.query);
    const user_id = extractUserId(request, reply);

    const units = await UnitService.getUnitsBySectionId(section_id, user_id);

    reply.code(200).send(units);
  } catch (error) {
    handleError(error, reply);
  }
};

export const getInProgressUnitByUserId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const user_id = extractUserId(request, reply);

    const unit = await UnitService.getInProgressUnitByUserId(user_id);

    reply.code(200).send(unit);
  } catch (error) {
    handleError(error, reply);
  }
};

export const createUnit = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const unit = UnitsCreateSchema.parse(request.body);

    const newUnit = await UnitService.createUnit(unit);

    reply.code(201).send(newUnit);
  } catch (error) {
    handleError(error, reply);
  }
};

export const startUnit = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { unit_id } = z
      .object({
        unit_id: z.number().int(),
      })
      .parse(request.query);
    const user_id = extractUserId(request, reply);

    const unit = await UnitService.startUnit(unit_id, user_id);

    reply.code(201).send(unit);
  } catch (error) {
    handleError(error, reply);
  }
};

export const unlockUnit = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { cur_unit_id } = z
      .object({
        cur_unit_id: z.number().int(),
      })
      .parse(request.query);
    const user_id = extractUserId(request, reply);

    const unit = await UnitService.unlockUnit(cur_unit_id, user_id);

    reply.code(200).send(unit);
  } catch (error) {
    handleError(error, reply);
  }
};

export const finishUnit = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { unit_id } = z
      .object({
        unit_id: z.number().int(),
      })
      .parse(request.query);
    const user_id = extractUserId(request, reply);

    const finishedUnit = await UnitService.finishUnit(unit_id, user_id);

    reply.code(200).send(finishedUnit);
  } catch (error) {
    handleError(error, reply);
  }
};
