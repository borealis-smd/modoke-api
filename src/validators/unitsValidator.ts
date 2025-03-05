import { z } from "zod";
import { ProgressStatus } from "@prisma/client";

export const UnitsDBSchema = z.object({
  unit_id: z
    .number()
    .int("ID da unidade deve ser um número inteiro.")
    .positive("ID da unidade deve ser positivo."),
  unit_icon: z
    .string()
    .url("Ícone da unidade deve ser uma URL válida.")
    .startsWith("https://", "Ícone da unidade deve começar com https://")
    .nullable(),
  unit_title: z
    .string()
    .min(3, "Título da unidade deve ter pelo menos 3 caracteres.")
    .max(100, "Título da unidade deve ter no máximo 100 caracteres."),
  unit_description: z
    .string()
    .min(10, "Descrição da unidade deve ter pelo menos 10 caracteres.")
    .max(500, "Descrição da unidade deve ter no máximo 500 caracteres."),
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
  section_id: z
    .number()
    .int("ID da seção deve ser um número inteiro.")
    .positive("ID da seção deve ser positivo."),
  created_at: z.date(),
  updated_at: z.date(),
});

export const UnitsSchema = UnitsDBSchema.omit({
  created_at: true,
  updated_at: true,
});

export const UnitsCreateSchema = UnitsDBSchema.omit({
  unit_id: true,
  status: true,
  completed_at: true,
});

export type Units = z.infer<typeof UnitsSchema>;
export type UnitsCreate = z.infer<typeof UnitsCreateSchema>;
