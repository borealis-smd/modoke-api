import { z } from "zod";

export const SectionsDBSchema = z.object({
  section_id: z.number().int(),
  section_title: z.string(),
  section_description: z.string(),
  is_completed: z.boolean(),
  completed_at: z.date().nullable(),
  level_id: z
    .number()
    .int()
    .min(1, { message: "Nível inválido." })
    .max(3, { message: "Nível inválido." }),
});

export const SectionCreateSchema = SectionsDBSchema.omit({
  section_id: true,
  is_completed: true,
  completed_at: true,
});

export type SectionCreate = z.infer<typeof SectionCreateSchema>;
