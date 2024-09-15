import { z } from "zod";

export const AttemptsDBSchema = z.object({
  attempt_id: z
    .number()
    .int({ message: "ID da tentativa deve ser um número inteiro." }),
  user_id: z
    .string()
    .uuid({ message: "ID do usuário deve ser um UUID válido." }),
  question_id: z
    .string()
    .uuid({ message: "ID da questão deve ser um UUID válido." }),
  selected_option_id: z
    .string()
    .uuid({ message: "ID da opção selecionada deve ser um UUID válido." }),
  attempted_at: z.date({
    message: "Data da tentativa deve ser uma data válida.",
  }),
});

export const AttemptsSchema = AttemptsDBSchema.partial();

export const AttemptCreateSchema = AttemptsDBSchema.omit({
  attempt_id: true,
  attempted_at: true,
});

export type Attempts = z.infer<typeof AttemptsSchema>;
export type AttemptCreate = z.infer<typeof AttemptCreateSchema>;
