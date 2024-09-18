import { prisma } from "../config/db";
import {
  FullQuestionCreate,
  QuestionCreate,
} from "../validators/questionsValidator";

export const getQuestionsByLessonId = async (lesson_id: number) => {
  return prisma.question.findMany({
    where: { lesson_id },
    include: { Options: true },
  });
};

export const getQuestionsByUnitId = async (unit_id: number) => {
  return prisma.question.findMany({
    where: { Lesson: { unit_id } },
    include: { Options: true },
  });
};

export const getEntranceTestQuestions = async () => {
  return prisma.question.findMany({
    where: { is_entrance_question: true },
    include: { Options: true },
  });
};

export const createQuestion = async (question: QuestionCreate) => {
  return prisma.question.create({
    data: {
      question_text: question.question_text,
      is_entrance_question: question.is_entrance_question,
      xp: question.xp,
      lesson_id: question.lesson_id,
    },
  });
};

export const createQuestionWithOptions = async ({
  question,
  options,
}: FullQuestionCreate) => {
  return prisma.question.create({
    data: {
      question_text: question.question_text,
      is_entrance_question: question.is_entrance_question,
      xp: question.xp,
      lesson_id: question.lesson_id,
      Options: {
        createMany: {
          data: options,
        },
      },
    },
    include: { Options: true },
  });
};
