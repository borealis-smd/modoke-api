import * as SectionRepository from "../models/section";
import { SectionCreate } from "../validators/sectionsValidator";

export const getSections = async () => {
  return SectionRepository.getSections();
};

export const createSection = async (section: SectionCreate) => {
  return SectionRepository.createSection(section);
};

export const finishSection = async (section_id: number) => {
  return SectionRepository.finishSection(section_id);
};
