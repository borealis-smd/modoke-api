import { z } from "zod";

export const SessionsDBSchema = z.object({
  session_id: z.number().int(),
  session_title: z.string(),
  session_description: z.string(),
  is_completed: z.boolean(),
  completed_at: z.date().nullable(),
  level_id: z
    .number()
    .int()
    .min(1, { message: "Nível inválido." })
    .max(3, { message: "Nível inválido." }),
});

export const SessionSchema = SessionsDBSchema.partial();

export type SessionsDB = z.infer<typeof SessionsDBSchema>;
export type Session = z.infer<typeof SessionSchema>;
