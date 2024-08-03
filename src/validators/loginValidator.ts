import { z } from "zod";

export const LoginDBSchema = z.object({
  login_id: z.string().uuid(),
  email: z.string().email({ message: "E-mail inválido." }),
  password_hash: z.string(),
  user_id: z.string().uuid(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "E-mail inválido." }),
  password: z
    .string()
    .min(8)
    .refine(
      (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value,
        ),
      {
        message:
          "Senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
      },
    ),
});

export type LoginDB = z.infer<typeof LoginDBSchema>;
export type Login = z.infer<typeof LoginSchema>;
