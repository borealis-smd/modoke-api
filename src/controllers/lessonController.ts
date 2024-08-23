import * as LessonService from "../services/lessonService";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export const getLessonById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { lesson_id } = z
      .object({
        lesson_id: z.number(),
      })
      .parse(request.query);

    const lesson = await LessonService.getLessonById(lesson_id);

    reply.code(200).send(lesson);
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

export const getLessonsByUnitId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { unit_id } = z
      .object({
        unit_id: z.number(),
      })
      .parse(request.query);

    const lessons = await LessonService.getLessonsByUnitId(unit_id);

    reply.code(200).send(lessons);
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

export const getLessonsBySessionId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { session_id } = z
      .object({
        session_id: z.number(),
      })
      .parse(request.query);

    const lessons = await LessonService.getLessonsBySessionId(session_id);
    console.log(lessons);

    reply.code(200).send(lessons);
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

export const getLessonsByLevelId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { level_id } = z
      .object({
        level_id: z.number(),
      })
      .parse(request.query);

    const lessons = await LessonService.getLessonsByLevelId(level_id);

    reply.code(200).send(lessons);
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

export const createLesson = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const lesson = z
      .object({
        lesson_title: z.string(),
        lesson_description: z.string(),
        lesson_principle: z.enum(["P", "O", "U", "R"]),
        unit_id: z.number(),
      })
      .parse(request.body);

    const newLesson = await LessonService.createLesson(lesson);

    reply.code(201).send(newLesson);
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

export const finishLesson = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { lesson_id } = z
      .object({
        lesson_id: z.number(),
      })
      .parse(request.query);

    const finishedLesson = await LessonService.finishLesson(lesson_id);

    reply.code(200).send(finishedLesson);
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
