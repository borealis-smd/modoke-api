import { z } from "zod";

export const ExplanationsDBSchema = z.object({
  explanation_id: z.number().int(),
  content: z.string(),
  lesson_id: z.number().int(),
  part: z.enum(["PART_1", "PART_2", "PART_3"]),
  created_at: z.date(),
  updated_at: z.date(),
});

export const ExplanationsSchema = ExplanationsDBSchema.partial();

export const ExplanationsCreate = ExplanationsDBSchema.omit({
  explanation_id: true,
  created_at: true,
  updated_at: true,
});

export type Explanations = z.infer<typeof ExplanationsSchema>;
export type ExplanationsCreate = z.infer<typeof ExplanationsCreate>;
