import { z } from "zod";

export const OptionsDBSchema = z.object({
  option_id: z
    .number()
    .int({ message: "ID da opção deve ser um número inteiro." }),
  option_text: z.string().min(1, "Texto da opção não deve ser vazio."),
  is_correct: z.boolean({
    message: "Status de correção deve ser um booleano.",
  }),
  question_id: z
    .number()
    .int({ message: "ID da pergunta deve ser um número inteiro." }),
});

export const OptionsCreateSchema = OptionsDBSchema.omit({ option_id: true });

export type OptionsCreate = z.infer<typeof OptionsCreateSchema>;
