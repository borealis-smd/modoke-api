import { z } from "zod";

export const UserDBSchema = z.object({
  user_id: z.string().uuid(),
  name: z.string().min(3, { message: "Nome muito curto." }),
  tries: z.number().int(),
  xp: z.number().int(),
  level_id: z.number().int(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const UserSchema = UserDBSchema.omit({
  user_id: true,
  created_at: true,
  updated_at: true,
});

export type UserDB = z.infer<typeof UserDBSchema>;
export type User = z.infer<typeof UserSchema>;
