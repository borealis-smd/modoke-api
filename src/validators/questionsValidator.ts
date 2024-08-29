import { z } from "zod";

export const QuestionsDBSchema = z.object({
  question_id: z.number().int(),
  question_text: z.string(),
  is_entrance_question: z.boolean(),
  xp: z.number().int(),
  lesson_id: z.number().int().nullable(),
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
