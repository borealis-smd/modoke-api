import * as ExplanationRepo from "../models/explanation";
import { NoExplanationFoundError } from "../errors/NoExplanationFoundError";
import { ExplanationsCreate } from "../validators/explanationsValidator";

export const getExplanationsByLessonId = async (lesson_id: number) => {
  const explanations =
    await ExplanationRepo.getExplanationsByLessonId(lesson_id);
  if (!explanations) {
    throw new NoExplanationFoundError("Nenhuma explicação encontrada.");
  }
  return explanations;
};

export const createExplanation = async (explanation: ExplanationsCreate) => {
  return ExplanationRepo.createExplanation(explanation);
};
