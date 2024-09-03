import * as LessonService from "../services/lessonService";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { LessonsCreateSchema } from "../validators/lessonsValidator";
import { handleError } from "../utils/errorHandler";

export const getLessonById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { lesson_id } = z
      .object({
        lesson_id: z.number().int(),
      })
      .parse(request.query);

    const lesson = await LessonService.getLessonById(lesson_id);

    reply.code(200).send(lesson);
  } catch (error) {
    handleError(error, reply);
  }
};

export const getLessonsByUnitId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { unit_id } = z
      .object({
        unit_id: z.number().int(),
      })
      .parse(request.query);

    const lessons = await LessonService.getLessonsByUnitId(unit_id);

    reply.code(200).send(lessons);
  } catch (error) {
    handleError(error, reply);
  }
};

export const getLessonsBySeçionId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { section_id } = z
      .object({
        section_id: z.number().int(),
      })
      .parse(request.query);

    const lessons = await LessonService.getLessonsBySeçionId(section_id);

    reply.code(200).send(lessons);
  } catch (error) {
    handleError(error, reply);
  }
};

export const getLessonsByLevelId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { level_id } = z
      .object({
        level_id: z.number().int(),
      })
      .parse(request.query);

    const lessons = await LessonService.getLessonsByLevelId(level_id);

    reply.code(200).send(lessons);
  } catch (error) {
    handleError(error, reply);
  }
};

export const createLesson = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const lesson = LessonsCreateSchema.parse(request.body);

    const newLesson = await LessonService.createLesson(lesson);

    reply.code(201).send(newLesson);
  } catch (error) {
    handleError(error, reply);
  }
};

export const finishLesson = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { lesson_id } = z
      .object({
        lesson_id: z.number().int(),
      })
      .parse(request.query);

    const finishedLesson = await LessonService.finishLesson(lesson_id);

    reply.code(200).send(finishedLesson);
  } catch (error) {
    handleError(error, reply);
  }
};
