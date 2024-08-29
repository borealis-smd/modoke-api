import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import client from "../config/googleAuth";
import { getUserById, registerGoogleUser } from "../models/user";
import { generateToken } from "../config/jwt";

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { code } = z
      .object({
        code: z.string(),
      })
      .parse(request.query);
    const { tokens } = await client.getToken(code);
    if (!tokens.id_token) {
      reply.code(400).send({ message: "Token inválido." });
      return;
    }
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.sub || !payload.given_name) {
      reply.code(400).send({ message: "Token inválido." });
      return;
    }

    let user = await getUserById(payload.sub);
    if (!user) {
      reply.code(404).send({ message: "Usuário não encontrado." });
      return;
    }

    const token = generateToken({
      user_id: user.user_id,
      first_name: user.first_name,
      xp: user.xp,
      level_id: user.level_id,
    });
    reply.send({ token });
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

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { code, level_id } = z
      .object({
        code: z.string(),
        level_id: z.number().int(),
      })
      .parse(request.query);
    const { tokens } = await client.getToken(code);
    if (!tokens.id_token) {
      reply.code(400).send({ message: "Token inválido." });
      return;
    }
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.sub || !payload.given_name) {
      reply.code(400).send({ message: "Token inválido." });
      return;
    }

    let user = await getUserById(payload.sub);
    if (!user) {
      user = await registerGoogleUser({
        user_id: payload.sub,
        first_name: payload.given_name,
        last_name: payload.family_name || "",
        avatar_url: payload.picture || "",
        level_id,
      });
    }

    const token = generateToken({
      user_id: user.user_id,
      first_name: user.first_name,
      xp: user.xp,
      level_id: user.level_id,
    });
    reply.send({ token });
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
