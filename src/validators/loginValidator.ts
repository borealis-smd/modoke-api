import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "E-mail deve ser um endereço válido." }),
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

export type Login = z.infer<typeof LoginSchema>;
