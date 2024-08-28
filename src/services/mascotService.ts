import * as MascotRepo from "../models/mascot";
import { MascotCreate } from "../validators/mascotValidator";

export const getMascotByUserId = async (user_id: string) => {
  return MascotRepo.getMascotByUserId(user_id);
};

export const createMascot = async (mascot: MascotCreate) => {
  return MascotRepo.createMascot(mascot);
};
