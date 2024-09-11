import { prisma } from "../config/db";
import { ExplanationsCreate } from "../validators/explanationsValidator";
import { ExplanationAlreadyExistsError } from "../errors/ExplanationAlreadyExistsError";

export const getExplanationsByLessonId = async (
  lesson_id: number,
  part?: "PART_1" | "PART_2" | "PART_3",
) => {
  // findMany because each explanation has 3 parts
  return prisma.explanations.findMany({
    where: { lesson_id, part },
  });
};

// Até 3 explicações por lição, sendo PART_1, PART_2 e PART_3
export const createExplanation = async (explanation: ExplanationsCreate) => {
  const explanationExists = await prisma.explanations.findFirst({
    where: {
      lesson_id: explanation.lesson_id,
      part: explanation.part,
    },
  });
  if (explanationExists) {
    throw new ExplanationAlreadyExistsError("Explanation already exists");
  }

  return prisma.explanations.create({
    data: {
      content: explanation.content,
      part: explanation.part,
      lesson_id: explanation.lesson_id,
    },
  });
};
