import { z } from "zod";

export const OptionsDBSchema = z.object({
  option_id: z.number().int(),
  option_text: z.string(),
  is_correct: z.boolean(),
  question_id: z.number().int(),
});

export const OptionsCreateSchema = OptionsDBSchema.omit({ option_id: true });

export type OptionsCreate = z.infer<typeof OptionsCreateSchema>;
