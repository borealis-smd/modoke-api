import { z } from "zod";

export const UserDBSchema = z.object({
  user_id: z
    .string()
    .uuid({ message: "ID do usuário deve ser um UUID válido." }),
  first_name: z
    .string()
    .min(3, "Primeiro nome deve ter pelo menos 3 caracteres.")
    .max(70, "Primeiro nome deve ter no máximo 70 caracteres."),
  last_name: z
    .string()
    .min(3, "Último nome deve ter pelo menos 3 caracteres.")
    .max(70, "Último nome deve ter no máximo 70 caracteres."),
  avatar_url: z
    .string({ message: "URL do avatar deve ser uma URL válida." })
    .url(),
  xp: z.number().int({ message: "XP deve ser um número inteiro." }),
  coins: z.number().int({ message: "Moedas deve ser um número inteiro." }),
  role: z.enum(["USER", "ADMIN"], { message: "Função inválida." }),
  level_id: z
    .number()
    .int()
    .min(1, "Nível inválido.")
    .max(3, "Nível inválido."),
  created_at: z.date(),
  updated_at: z.date(),
});

export const UserSchema = UserDBSchema.omit({
  user_id: true,
  created_at: true,
  updated_at: true,
  role: true,
});

export const UserRegisterSchema = UserSchema.omit({
  xp: true,
  coins: true,
});

export const UserUpdateSchema = UserSchema.partial();

export const UserTokenSchema = UserDBSchema.pick({
  user_id: true,
  first_name: true,
  role: true,
});

export const GoogleUserRegisterSchema = UserDBSchema.omit({
  xp: true,
  coins: true,
  role: true,
  created_at: true,
  updated_at: true,
});

export type User = z.infer<typeof UserSchema>;
export type UserRegister = z.infer<typeof UserRegisterSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
export type UserToken = z.infer<typeof UserTokenSchema>;
export type GoogleUserRegister = z.infer<typeof GoogleUserRegisterSchema>;
