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
  level_id: z
    .number()
    .int()
    .min(1, { message: "Nível inválido." })
    .max(3, { message: "Nível inválido." }),
  created_at: z.date(),
  updated_at: z.date(),
});

export const UserSchema = UserDBSchema.omit({
  user_id: true,
  created_at: true,
  updated_at: true,
});

export const UserRegisterSchema = UserSchema.omit({ xp: true });

export const UserUpdateSchema = UserSchema.partial();

export type UserDB = z.infer<typeof UserDBSchema>;
export type User = z.infer<typeof UserSchema>;
export type UserRegister = z.infer<typeof UserRegisterSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
