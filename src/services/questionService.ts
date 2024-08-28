import * as QuestionRepository from "../models/question";
import { QuestionCreate } from "../validators/questionsValidator";

export const getQuestionsByLessonId = async (lesson_id: number) => {
  return QuestionRepository.getQuestionsByLessonId(lesson_id);
};

export const getQuestionsByUnitId = async (unit_id: number) => {
  return QuestionRepository.getQuestionsByUnitId(unit_id);
};

export const getEntranceTestQuestions = async () => {
  return QuestionRepository.getEntranceTestQuestions();
};

export const createQuestion = async (question: QuestionCreate) => {
  return QuestionRepository.createQuestion(question);
};
