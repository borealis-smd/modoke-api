import * as SectionRepo from "../models/section";
import { SectionCreate } from "../validators/sectionsValidator";
import { SectionAlreadyInProgressError } from "../errors/SectionAlreadyInProgressError";

export const getSections = async () => {
  return SectionRepo.getSections();
};

export const getInProgressSectionByUserId = async (user_id: string) => {
  return SectionRepo.getInProgressSectionByUserId(user_id);
};

export const createSection = async (section: SectionCreate) => {
  return SectionRepo.createSection(section);
};

export const unlockSection = async (unit_id: number, user_id: string) => {
  const sectionInProgress =
    await SectionRepo.getInProgressSectionByUserId(user_id);
  if (sectionInProgress) {
    throw new SectionAlreadyInProgressError(
      "Só é possível ter uma seção em progresso por vez.",
    );
  }
  return SectionRepo.unlockSection(unit_id, user_id);
};

export const finishSection = async (unit_id: number, user_id: string) => {
  return SectionRepo.finishSection(unit_id, user_id);
};
