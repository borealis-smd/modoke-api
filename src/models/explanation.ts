import { prisma } from "../config/db";
import { ExplanationsCreate } from "../validators/explanationsValidator";

export const getExplanationsByLessonId = async (lesson_id: number) => {
  // findMany because each explanation has 3 parts
  return prisma.explanations.findMany({
    where: { lesson_id },
  });
};

export const createExplanation = async (explanation: ExplanationsCreate) => {
  return prisma.explanations.create({
    data: {
      content: explanation.content,
      part: explanation.part,
      lesson_id: explanation.lesson_id,
    },
  });
};
