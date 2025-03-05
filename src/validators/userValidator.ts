import { z } from "zod";

export const UserDBSchema = z.object({
  user_id: z
    .string()
    .uuid({ message: "ID do usuário deve ser um UUID válido." }),
  first_name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres.")
    .max(70, "Nome deve ter no máximo 70 caracteres.")
    .regex(
      /^[a-zA-ZÀ-ÿ\s'-]+$/,
      "Nome deve conter apenas letras, espaços, hífens e apóstrofos."
    ),
  last_name: z
    .string()
    .min(2, "Sobrenome deve ter pelo menos 2 caracteres.")
    .max(70, "Sobrenome deve ter no máximo 70 caracteres.")
    .regex(
      /^[a-zA-ZÀ-ÿ\s'-]+$/,
      "Sobrenome deve conter apenas letras, espaços, hífens e apóstrofos."
    )
    .optional(),
  avatar_url: z
    .string()
    .url("URL do avatar deve ser uma URL válida.")
    .startsWith("https://", "URL do avatar deve começar com https://")
    .optional(),
  xp: z
    .number()
    .int("XP deve ser um número inteiro.")
    .min(0, "XP não pode ser negativo.")
    .default(0),
  role: z
    .enum(["USER", "ADMIN"], {
      errorMap: () => ({ message: "Função deve ser USER ou ADMIN." }),
    })
    .default("USER"),
  level_id: z
    .number()
    .int("Nível deve ser um número inteiro.")
    .min(1, "Nível deve ser maior ou igual a 1.")
    .max(3, "Nível deve ser menor ou igual a 3."),
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
});

export const UserUpdateSchema = UserSchema.partial();

export const UserTokenSchema = UserDBSchema.pick({
  user_id: true,
  first_name: true,
  role: true,
});

export const GoogleUserRegisterSchema = UserDBSchema.omit({
  xp: true,
  role: true,
  created_at: true,
  updated_at: true,
});

export type User = z.infer<typeof UserSchema>;
export type UserRegister = z.infer<typeof UserRegisterSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
export type UserToken = z.infer<typeof UserTokenSchema>;
