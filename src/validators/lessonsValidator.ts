import { z } from "zod";

export const LessonsDBSchema = z.object({
  lesson_id: z
    .number()
    .int({ message: "ID da lição deve ser um número inteiro." }),
  lesson_sequence: z
    .number()
    .int({ message: "Sequência da lição deve ser um número inteiro." }),
  lesson_title: z.string().min(1, "Título da lição não deve ser vazio."),
  lesson_description: z
    .string()
    .min(1, "Descrição da lição não deve ser vazia."),
  in_progress: z
    .boolean({
      message: "Status de progresso deve ser um booleano.",
    })
    .default(false),
  is_locked: z
    .boolean({
      message: "Status de bloqueio deve ser um booleano.",
    })
    .default(true),
  is_completed: z
    .boolean({
      message: "Status de conclusão deve ser um booleano.",
    })
    .default(false),
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
