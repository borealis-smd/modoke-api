import { z } from "zod";

export const LessonsDBSchema = z.object({
  lesson_id: z
    .number()
    .int({ message: "ID da lição deve ser um número inteiro." }),
  lesson_title: z.string().min(1, "Título da lição não deve ser vazio."),
  lesson_description: z
    .string()
    .min(1, "Descrição da lição não deve ser vazia."),
  lesson_principle: z.enum(["P", "O", "U", "R"], {
    message: "Princípio da lição inválido.",
  }),
  is_completed: z.boolean({
    message: "Status de conclusão deve ser um booleano.",
  }),
  unit_id: z
    .number()
    .int({ message: "ID da unidade deve ser um número inteiro." }),
  completed_at: z
    .date({ message: "Data de conclusão deve ser uma data válida." })
    .nullable(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const LessonsSchema = LessonsDBSchema.partial();

export const LessonsCreateSchema = LessonsDBSchema.omit({
  lesson_id: true,
  is_completed: true,
  completed_at: true,
  created_at: true,
  updated_at: true,
});

export type Lessons = z.infer<typeof LessonsSchema>;
export type LessonsCreate = z.infer<typeof LessonsCreateSchema>;
