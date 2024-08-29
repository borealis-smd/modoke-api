import { FastifyRequest, FastifyReply } from "fastify";
import { uploadToS3 } from "../config/aws";

export const uploadImage = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const data = await request.file();
    if (!data) {
      reply.code(400).send({ message: "Arquivo não encontrado." });
      return;
    }

    const buffer = await data.toBuffer();
    const imageUrl = await uploadToS3(buffer, data.filename);
    reply.send({ imageUrl });
  } catch (e) {
    console.error(e);
    reply.code(500).send({ message: "Erro ao fazer upload do arquivo." });
  }
};
