import { z } from "zod";

export const QuestionsDBSchema = z.object({
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

export const QuestionsSchema = QuestionsDBSchema.partial();

export const QuestionCreateSchema = QuestionsDBSchema.omit({
  question_id: true,
  created_at: true,
  updated_at: true,
});

export type Questions = z.infer<typeof QuestionsSchema>;
export type QuestionCreate = z.infer<typeof QuestionCreateSchema>;
