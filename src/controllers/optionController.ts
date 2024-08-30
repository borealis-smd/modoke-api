import * as OptionService from "../services/optionService";
import { FastifyRequest, FastifyReply } from "fastify";
import { OptionsCreateSchema } from "../validators/optionsValidator";
import { handleError } from "../utils/errorHandler";

export const createOption = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const optionParsedBody = OptionsCreateSchema.parse(request.body);

    const option = await OptionService.createOption(optionParsedBody);

    reply.code(201).send(option);
  } catch (error) {
    handleError(error, reply);
  }
};
