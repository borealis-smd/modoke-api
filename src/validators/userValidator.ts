import { z } from "zod";

export const UserDBSchema = z.object({
  user_id: z.string().uuid(),
  first_name: z
    .string()
    .min(3, { message: "Nome muito curto." })
    .max(70, { message: "Primeiro nome muito longo." }),
  last_name: z
    .string()
    .min(3, { message: "Nome muito curto." })
    .max(70, { message: "Sobrenome muito longo." }),
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
