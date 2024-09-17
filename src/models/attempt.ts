import { prisma } from "../config/db";
import { AttemptCreate } from "../validators/attemptsValidator";

export const registerAttempt = async (attempt: AttemptCreate) => {
  // Verifica se o usuário já respondeu à questão
  const lastAttempt = await getLastAttemptByQuestionId(
    attempt.question_id,
    attempt.user_id,
  );

  if (lastAttempt) {
    return prisma.attempt.update({
      where: { attempt_id: lastAttempt.attempt_id },
      data: {
        selected_option_id: attempt.selected_option_id,
        attempted_at: new Date(),
      },
    });
  }

  return prisma.attempt.create({
    data: {
      user_id: attempt.user_id,
      question_id: attempt.question_id,
      selected_option_id: attempt.selected_option_id,
      attempted_at: new Date(),
    },
  });
};

export const getLastAttemptByQuestionId = async (
  question_id: string,
  user_id: string,
) => {
  return prisma.attempt.findFirst({
    where: { question_id, user_id },
    orderBy: { attempted_at: "desc" },
    include: { Option: true },
  });
};
