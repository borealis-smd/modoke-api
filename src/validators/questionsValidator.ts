import { z } from "zod";
import { OptionsCreateSchema } from "./optionsValidator";

export const QuestionDBSchema = z.object({
  question_id: z
    .number()
    .int({ message: "ID da pergunta deve ser um número inteiro." }),
  question_text: z.string().min(1, "Texto da pergunta não deve ser vazio."),
  is_entrance_question: z.boolean({
    message: "Status de pergunta de entrada deve ser um booleano.",
  }),
  xp: z.number().int({ message: "XP deve ser um número inteiro." }),
  lesson_id: z
    .number()
    .int({ message: "ID da lição deve ser um número inteiro." })
    .nullable(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const QuestionsSchema = QuestionDBSchema.partial();

export const QuestionCreateSchema = QuestionDBSchema.omit({
  question_id: true,
  created_at: true,
  updated_at: true,
});

export const FullQuestionCreateSchema = z.object({
  question: QuestionCreateSchema,
  options: OptionsCreateSchema.omit({ question_id: true })
    .array()
    .length(4, "Deve haver 4 opções."),
});

export type Questions = z.infer<typeof QuestionsSchema>;
export type QuestionCreate = z.infer<typeof QuestionCreateSchema>;
export type FullQuestionCreate = z.infer<typeof FullQuestionCreateSchema>;
