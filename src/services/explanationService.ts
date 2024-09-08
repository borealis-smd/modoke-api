import * as ExplanationRepo from "../models/explanation";
import { NoExplanationFoundError } from "../errors/NoExplanationFoundError";
import { ExplanationsCreate } from "../validators/explanationsValidator";

export const getExplanationsByLessonId = async (
  lesson_id: number,
  part?: "PART_1" | "PART_2" | "PART_3",
) => {
  const explanations =
    await ExplanationRepo.getExplanationsByLessonId(lesson_id, part);
  if (!explanations) {
    throw new NoExplanationFoundError("Nenhuma explicação encontrada.");
  }
  return explanations;
};

export const createExplanation = async (explanation: ExplanationsCreate) => {
  return ExplanationRepo.createExplanation(explanation);
};
