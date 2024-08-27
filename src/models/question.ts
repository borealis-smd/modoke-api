import { prisma } from "../config/db";
import { QuestionCreate } from "../validators/questionsValidator";

export const getQuestionsByLessonId = async (lesson_id: number) => {
  return prisma.questions.findMany({
    where: { lesson_id },
    include: { Options: true },
  });
};

export const getEntranceTestQuestions = async () => {
  return prisma.questions.findMany({
    where: { is_entrance_question: true },
    include: { Options: true },
  });
};

export const createQuestion = async (question: QuestionCreate) => {
  return prisma.questions.create({
    data: {
      question_text: question.question_text,
      is_entrance_question: question.is_entrance_question,
      xp: question.xp,
      lesson_id: question.lesson_id,
    },
  });
};
