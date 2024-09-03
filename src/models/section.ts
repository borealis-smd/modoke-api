import { prisma } from "../config/db";
import { SectionCreate } from "../validators/sectionsValidator";
import { MaxSectionsReachedError } from "../errors/MaxSectionsReachedError";
import { SectionForLevelAlreadyExistsError } from "../errors/SectionForLevelAlreadyExistsError";

export const getSections = async () => {
  return prisma.sections.findMany();
};

// Apenas uma seção por nível
export const createSection = async (section: SectionCreate) => {
  const sections = await getSections();
  if (sections.length >= 3) {
    throw new MaxSectionsReachedError(
      "Já existem seções para todos os níveis.",
    );
  }

  const sectionExists = sections.some((s) => s.level_id === section.level_id);
  if (sectionExists) {
    throw new SectionForLevelAlreadyExistsError(
      "Você não pode criar mais de uma seção para um nível.",
    );
  }

  return prisma.sections.create({
    data: {
      section_title: section.section_title,
      section_description: section.section_description,
      level_id: section.level_id,
      is_completed: false,
    },
  });
};

export const finishSection = async (section_id: number) => {
  return prisma.sections.update({
    where: {
      section_id,
    },
    data: {
      is_completed: true,
      completed_at: new Date(),
    },
  });
};
