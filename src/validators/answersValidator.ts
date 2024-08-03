import { z } from "zod";

export const AnswersDBSchema = z.object({
  answer_id: z.number().int(),
  answer_text: z.string(),
  is_correct: z.boolean(),
  question_id: z.number().int(),
  answered_at: z.date(),
});

export const AnswersSchema = AnswersDBSchema.partial();

export type AnswersDB = z.infer<typeof AnswersDBSchema>;
export type Answers = z.infer<typeof AnswersSchema>;
