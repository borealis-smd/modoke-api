import { z } from "zod";

export const ExplanationsDBSchema = z.object({
  explanation_id: z
    .number()
    .int({ message: "ID de explicação deve ser um número inteiro." }),
  content: z.string().min(1, "Conteúdo da explicação não deve ser vazio."),
  lesson_id: z
    .number()
    .int({ message: "ID de lição deve ser um número inteiro." }),
  part: z.enum(["PART_1", "PART_2", "PART_3"], { message: "Parte inválida." }),
  created_at: z.date(),
  updated_at: z.date(),
});

export const ExplanationsSchema = ExplanationsDBSchema.partial();

export const ExplanationsCreate = ExplanationsDBSchema.omit({
  explanation_id: true,
  created_at: true,
  updated_at: true,
});

export type Explanations = z.infer<typeof ExplanationsSchema>;
export type ExplanationsCreate = z.infer<typeof ExplanationsCreate>;
