import * as CertificateService from "../services/certificateService";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { CertificateCreateSchema } from "../validators/certificatesValidator";
import { extractUserId } from "../utils/extractUserId";
import { handleError } from "../utils/errorHandler";

export const getCertificatesByUserId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const user_id = extractUserId(request, reply);

    const certificate =
      await CertificateService.getCertificatesByUserId(user_id);

    reply.code(200).send(certificate);
  } catch (error) {
    handleError(error, reply);
  }
};

export const createCertificate = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const certificateParsedBody = CertificateCreateSchema.parse(request.body);

    const certificate = await CertificateService.createCertificate(
      certificateParsedBody,
    );

    reply.code(201).send(certificate);
  } catch (error) {
    handleError(error, reply);
  }
};

export const assignCertificateToUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { user_id, certificate_id } = z
      .object({
        user_id: z.string().uuid(),
        certificate_id: z.number().int(),
      })
      .parse(request.body);

    await CertificateService.assignCertificateToUser(user_id, certificate_id);

    reply.code(200).send({ message: "Certificado atribuído com sucesso!" });
  } catch (error) {
    handleError(error, reply);
  }
};
