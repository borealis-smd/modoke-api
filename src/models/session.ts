import { prisma } from "../config/db";
import { SessionCreate } from "../validators/sessionsValidator";

export const getSessions = async () => {
  return prisma.sessions.findMany();
};

export const createSession = async (session: SessionCreate) => {
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
