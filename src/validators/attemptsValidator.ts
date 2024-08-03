import { z } from "zod";

export const AttemptsDBSchema = z.object({
  attempt_id: z.number().int(),
  user_id: z.string().uuid(),
  question_id: z.number().int(),
  selected_answer_id: z.number().int(),
  attempted_at: z.date(),
});

export const AttemptsSchema = AttemptsDBSchema.partial();

export type AttemptsDB = z.infer<typeof AttemptsDBSchema>;
export type Attempts = z.infer<typeof AttemptsSchema>;
