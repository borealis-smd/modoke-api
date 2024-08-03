import { z } from "zod";

export const ExplanationsDBSchema = z.object({
  explanation_id: z.number().int(),
  content: z.string(),
  lesson_id: z.number().int(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const ExplanationsSchema = ExplanationsDBSchema.partial();

export type ExplanationsDB = z.infer<typeof ExplanationsDBSchema>;
export type Explanations = z.infer<typeof ExplanationsSchema>;
