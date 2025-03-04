import * as QuestionRepository from "../models/question";
import { QuestionCreate } from "../validators/questionsValidator";

export const getEntranceTestQuestions = async () => {
  return QuestionRepository.getEntranceTestQuestions();
};

export const createQuestion = async (question: QuestionCreate) => {
  return QuestionRepository.createQuestion(question);
};

export const createQuestionWithOptions = async (question: any) => {
  return QuestionRepository.createQuestionWithOptions(question);
};
