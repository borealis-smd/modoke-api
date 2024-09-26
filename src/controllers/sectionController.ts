import * as SectionService from "../services/sectionService";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { SectionCreateSchema } from "../validators/sectionsValidator";
import { handleError } from "../utils/errorHandler";
import { extractUserId } from "../utils/extractUserId";

export const getSections = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const sections = await SectionService.getSections();
    reply.code(200).send(sections);
  } catch (error) {
    if (error instanceof Error) {
      reply.code(400).send({ message: error.message });
    }
  }
};

export const getInProgressSectionByUserId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const user_id = extractUserId(request, reply);

    const section = await SectionService.getInProgressSectionByUserId(user_id);

    reply.code(200).send(section);
  } catch (error) {
    handleError(error, reply);
  }
};

export const createSection = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const sectionParsedBody = SectionCreateSchema.parse(request.body);

    const section = await SectionService.createSection(sectionParsedBody);

    reply.code(201).send(section);
  } catch (error) {
    handleError(error, reply);
  }
};

export const startSection = async (
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

    const section = await SectionService.startSection(section_id, user_id);

    reply.code(201).send(section);
  } catch (error) {
    handleError(error, reply);
  }
};

export const unlockSection = async (
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

    const section = await SectionService.unlockSection(cur_unit_id, user_id);

    reply.code(200).send(section);
  } catch (error) {
    handleError(error, reply);
  }
};

export const finishSection = async (
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

    const finishedSection = await SectionService.finishSection(
      unit_id,
      user_id,
    );

    reply.code(200).send(finishedSection);
  } catch (error) {
    handleError(error, reply);
  }
};
