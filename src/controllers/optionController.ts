import * as OptionService from "../services/optionService";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { validateToken } from "../validators/tokenValidator";
import { OptionsCreateSchema } from "../validators/optionsValidator";

export const createOption = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await validateToken(request, reply);

    const optionParsedBody = OptionsCreateSchema.parse(request.body);

    const option = await OptionService.createOption(optionParsedBody);

    reply.code(201).send(option);
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
