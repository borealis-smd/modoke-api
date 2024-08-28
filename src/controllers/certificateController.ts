import * as CertificateService from "../services/certificateService";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { validateToken } from "../validators/tokenValidator";
import { CertificateCreateSchema } from "../validators/certificatesValidator";

export const getCertificatesByUserId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await validateToken(request, reply);

    const { user_id } = z
      .object({
        user_id: z.string().uuid(),
      })
      .parse(request.query);

    const certificate =
      await CertificateService.getCertificatesByUserId(user_id);
    console.log(certificate);

    reply.code(200).send(certificate);
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

export const createCertificate = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await validateToken(request, reply);

    const certificateParsedBody = CertificateCreateSchema.parse(request.body);

    const certificate = await CertificateService.createCertificate(
      certificateParsedBody,
    );

    reply.code(201).send(certificate);
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

export const assignCertificateToUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await validateToken(request, reply);

    const { user_id, certificate_id } = z
      .object({
        user_id: z.string().uuid(),
        certificate_id: z.number().int(),
      })
      .parse(request.body);

    await CertificateService.assignCertificateToUser(user_id, certificate_id);

    reply.code(200).send({ message: "Certificado atribuído com sucesso!" });
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
