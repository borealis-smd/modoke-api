import { prisma } from "../config/db";
import { AttemptCreate } from "../validators/attemptsValidator";

export const registerAttempt = async (attempt: AttemptCreate) => {
  // Verifica se o usuário já respondeu a questão
  const lastAttempt = await getLastAttemptByQuestionId(
    attempt.question_id,
    attempt.user_id,
  );
  console.log(attempt.user_id, lastAttempt);

  if (lastAttempt) {
    return prisma.attempts.update({
      where: { attempt_id: lastAttempt.attempt_id },
      data: {
        selected_option_id: attempt.selected_option_id,
        attempted_at: new Date(),
      },
    });
  }

  return prisma.attempts
    .create({
      data: {
        user_id: attempt.user_id,
        question_id: attempt.question_id,
        selected_option_id: attempt.selected_option_id,
        attempted_at: new Date(),
      },
    })
    .catch((error) => console.log(error));
};

export const getLastAttemptByQuestionId = async (
  question_id: number,
  user_id: string,
) => {
  return prisma.attempts.findFirst({
    where: { question_id, user_id },
    orderBy: { attempted_at: "desc" },
    include: { Option: true },
  });
};
