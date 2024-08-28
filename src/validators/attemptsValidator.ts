import { z } from "zod";

export const AttemptsDBSchema = z.object({
  attempt_id: z.number().int(),
  user_id: z.string().uuid(),
  question_id: z.number().int(),
  selected_option_id: z.number().int(),
  attempted_at: z.date(),
});

export const AttemptsSchema = AttemptsDBSchema.partial();

export const AttemptCreateSchema = AttemptsDBSchema.omit({
  attempt_id: true,
  attempted_at: true,
});

export type AttemptsDB = z.infer<typeof AttemptsDBSchema>;
export type Attempts = z.infer<typeof AttemptsSchema>;
export type AttemptCreate = z.infer<typeof AttemptCreateSchema>;
