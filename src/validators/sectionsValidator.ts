import { z } from "zod";
import { ProgressStatus } from "@prisma/client";

export const SectionsDBSchema = z.object({
  section_id: z
    .number()
    .int("ID da seção deve ser um número inteiro.")
    .positive("ID da seção deve ser positivo."),
  section_title: z
    .string()
    .min(3, "Título da seção deve ter pelo menos 3 caracteres.")
    .max(100, "Título da seção deve ter no máximo 100 caracteres."),
  section_description: z
    .string()
    .min(10, "Descrição da seção deve ter pelo menos 10 caracteres.")
    .max(500, "Descrição da seção deve ter no máximo 500 caracteres."),
  status: z
    .enum(
      [
        ProgressStatus.LOCKED,
        ProgressStatus.IN_PROGRESS,
        ProgressStatus.COMPLETED,
      ],
      {
        errorMap: () => ({ message: "Status inválido." }),
      }
    )
    .default(ProgressStatus.LOCKED),
  completed_at: z.date().nullable().optional(),
  level_id: z
    .number()
    .int("Nível deve ser um número inteiro.")
    .min(1, "Nível deve ser maior ou igual a 1.")
    .max(3, "Nível deve ser menor ou igual a 3."),
  created_at: z.date(),
  updated_at: z.date(),
});

export const SectionsSchema = SectionsDBSchema.omit({
  created_at: true,
  updated_at: true,
});

export const SectionCreateSchema = SectionsDBSchema.omit({
  status: true,
  completed_at: true,
});

export type SectionCreate = z.infer<typeof SectionCreateSchema>;
