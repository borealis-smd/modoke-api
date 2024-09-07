import { z } from "zod";

const passwordValidation = z
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
  );

export const LoginSchema = z
  .object({
    email: z.string().email({ message: "E-mail deve ser um endereço válido." }),
    password: z.string().optional(),
    is_google_user: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (!data.is_google_user) {
        passwordValidation.parse(data.password);
      }
      return true;
    },
    {
      message: "Senha é obrigatória.",
      path: ["password"],
    },
  );

export type Login = z.infer<typeof LoginSchema>;
