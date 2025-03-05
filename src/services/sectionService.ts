import * as SectionRepo from "../models/section";
import { SectionCreate } from "../validators/sectionsValidator";
import { SectionAlreadyInProgressError } from "../errors/SectionAlreadyInProgressError";
import { SectionLinkedList } from "../data-structures/SectionLinkedList";

// Cache for storing section linked lists
const levelSectionsCache = new Map<number, SectionLinkedList>();

export const getSections = async () => {
  return SectionRepo.getSections();
};

export const getInProgressSectionByUserId = async (user_id: string) => {
  return SectionRepo.getInProgressSectionByUserId(user_id);
};

export const createSection = async (section: SectionCreate) => {
  const newSection = await SectionRepo.createSection(section);

  // Update cache if it exists for the related level
  if (levelSectionsCache.has(section.level_id)) {
    levelSectionsCache.get(section.level_id)!.append(newSection);
  }

  return newSection;
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
