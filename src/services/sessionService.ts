import * as SessionRepository from "../models/session";
import { SessionCreate } from "../validators/sessionsValidator";

export const getSessions = async () => {
  return SessionRepository.getSessions();
};

export const createSession = async (session: SessionCreate) => {
  return SessionRepository.createSession(session);
};

export const finishSession = async (session_id: number) => {
  return SessionRepository.finishSession(session_id);
};
