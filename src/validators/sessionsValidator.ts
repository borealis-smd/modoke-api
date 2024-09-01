import { z } from "zod";

export const SessionsDBSchema = z.object({
  session_id: z
    .number()
    .int({ message: "ID da sessão deve ser um número inteiro." }),
  session_title: z.string().min(1, "Título da sessão não deve ser vazio."),
  session_description: z
    .string()
    .min(1, "Descrição da sessão não deve ser vazia."),
  is_completed: z.boolean({
    message: "Status de conclusão deve ser um booleano.",
  }),
  completed_at: z
    .date({ message: "Data de conclusão deve ser uma data válida." })
    .nullable(),
  level_id: z
    .number()
    .int()
    .min(1, "Nível inválido.")
    .max(3, "Nível inválido."),
});

export const SessionCreateSchema = SessionsDBSchema.omit({
  session_id: true,
  is_completed: true,
  completed_at: true,
});

export type SessionCreate = z.infer<typeof SessionCreateSchema>;
