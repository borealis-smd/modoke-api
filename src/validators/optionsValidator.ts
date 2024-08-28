import { z } from "zod";

export const OptionsDBSchema = z.object({
  option_id: z.number().int(),
  option_text: z.string(),
  is_correct: z.boolean(),
  question_id: z.number().int(),
});

export const OptionsSchema = OptionsDBSchema.partial();

export const OptionsCreateSchema = OptionsDBSchema.omit({ option_id: true });

export type OptionsDB = z.infer<typeof OptionsDBSchema>;
export type Options = z.infer<typeof OptionsSchema>;
export type OptionsCreate = z.infer<typeof OptionsCreateSchema>;
