import * as SectionService from "../services/sectionService";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { SectionCreateSchema } from "../validators/sectionsValidator";
import { handleError } from "../utils/errorHandler";

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

export const finishSection = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { section_id } = z
      .object({
        section_id: z.number().int(),
      })
      .parse(request.query);

    const section = await SectionService.finishSection(section_id);

    reply.code(200).send(section);
  } catch (error) {
    handleError(error, reply);
  }
};
