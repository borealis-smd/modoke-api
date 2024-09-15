import { z } from "zod";

export const SectionsDBSchema = z.object({
  section_id: z.number().int(),
  section_title: z.string().min(1, "Título da seção não deve ser vazio."),
  section_description: z.string(),
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
  completed_at: z.date().nullable(),
  level_id: z
    .number()
    .int()
    .min(1, { message: "Nível inválido." })
    .max(3, { message: "Nível inválido." }),
});

export const SectionCreateSchema = SectionsDBSchema.omit({
  is_completed: true,
  completed_at: true,
});

export type SectionCreate = z.infer<typeof SectionCreateSchema>;
