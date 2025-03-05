import { z } from "zod";
import { ProgressStatus } from "@prisma/client";

export const LessonsDBSchema = z.object({
  lesson_id: z
    .number()
    .int("ID da lição deve ser um número inteiro.")
    .positive("ID da lição deve ser positivo."),
  lesson_sequence: z
    .number()
    .int("Sequência da lição deve ser um número inteiro.")
    .min(1, "Sequência da lição deve ser maior ou igual a 1."),
  lesson_title: z
    .string()
    .min(3, "Título da lição deve ter pelo menos 3 caracteres.")
    .max(100, "Título da lição deve ter no máximo 100 caracteres."),
  lesson_description: z
    .string()
    .min(10, "Descrição da lição deve ter pelo menos 10 caracteres.")
    .max(500, "Descrição da lição deve ter no máximo 500 caracteres."),
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
  unit_id: z
    .number()
    .int("ID da unidade deve ser um número inteiro.")
    .positive("ID da unidade deve ser positivo."),
  completed_at: z.date().nullable().optional(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const LessonsSchema = LessonsDBSchema.partial();

export const LessonsCreateSchema = LessonsDBSchema.omit({
  lesson_id: true,
  status: true,
  completed_at: true,
  created_at: true,
  updated_at: true,
});

export type Lessons = z.infer<typeof LessonsSchema>;
export type LessonsCreate = z.infer<typeof LessonsCreateSchema>;
