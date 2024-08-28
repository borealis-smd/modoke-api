import { prisma } from "../config/db";
import { SessionCreate } from "../validators/sessionsValidator";
import { MaxSessionsReachedError } from "../errors/MaxSessionsReachedError";
import { SessionForLevelAlreadyExistsError } from "../errors/SessionForLevelAlreadyExistsError";

export const getSessions = async () => {
  return prisma.sessions.findMany();
};

// Apenas uma sessão por nível
export const createSession = async (session: SessionCreate) => {
  const sessions = await getSessions();
  if (sessions.length >= 3) {
    throw new MaxSessionsReachedError(
      "Já existem sessões para todos os níveis.",
    );
  }

  const sessionExists = sessions.some((s) => s.level_id === session.level_id);
  if (sessionExists) {
    throw new SessionForLevelAlreadyExistsError(
      "Você não pode criar mais de uma sessão para um nível.",
    );
  }

  return prisma.sessions.create({
    data: {
      session_title: session.session_title,
      session_description: session.session_description,
      level_id: session.level_id,
      is_completed: false,
    },
  });
};

export const finishSession = async (session_id: number) => {
  return prisma.sessions.update({
    where: {
      session_id,
    },
    data: {
      is_completed: true,
      completed_at: new Date(),
    },
  });
};
