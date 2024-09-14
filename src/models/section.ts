import { prisma } from "../config/db";
import { SectionCreate } from "../validators/sectionsValidator";
import { MaxSectionsReachedError } from "../errors/MaxSectionsReachedError";
import { SectionForLevelAlreadyExistsError } from "../errors/SectionForLevelAlreadyExistsError";

export const getSections = async () => {
  return prisma.sections.findMany();
};

// Só pode haver uma seção em progresso por usuário
export const getInProgressSectionByUserId = async (user_id: string) => {
  return prisma.sectionProgress.findFirst({
    where: {
      user_id,
      in_progress: true,
    },
    include: {
      Section: true,
    },
  });
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
    },
  });
};

export const startSection = async (section_id: number, user_id: string) => {
  // [] verificar se não existe uma seção em progresso
  return prisma.sectionProgress.create({
    data: {
      section_id,
      user_id,
      in_progress: true,
    },
  });
};

export const unlockSection = async (section_id: number, user_id: string) => {
  // [] verificar se não existe uma seção em progresso
  return prisma.sectionProgress.create({
    data: {
      section_id,
      user_id,
      in_progress: true,
      is_locked: false,
    },
  });
};

export const finishSection = async (section_id: number, user_id: string) => {
  return prisma.sectionProgress.update({
    where: {
      section_id,
      user_id,
    },
    data: {
      in_progress: false,
      completed_at: new Date(),
    },
  });
};
