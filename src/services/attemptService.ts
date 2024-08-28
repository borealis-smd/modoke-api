import * as AttemptRepo from "../models/attempt";
import { AttemptCreate } from "../validators/attemptsValidator";

export const registerAttempt = async (attempt: AttemptCreate) => {
  return AttemptRepo.registerAttempt(attempt);
};

export const getLastAttemptByQuestionId = async (
  question_id: number,
  user_id: string,
) => {
  return AttemptRepo.getLastAttemptByQuestionId(question_id, user_id);
};
