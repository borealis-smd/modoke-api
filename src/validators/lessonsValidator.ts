import { z } from "zod";

export const LessonsDBSchema = z.object({
  lesson_id: z.number().int(),
  lesson_title: z.string(),
  lesson_description: z.string(),
  lesson_principle: z.enum(["P", "O", "U", "R"]),
  is_completed: z.boolean(),
  unit_id: z.number().int(),
  completed_at: z.date().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const LessonsSchema = LessonsDBSchema.partial();

export const LessonsCreateSchema = LessonsDBSchema.omit({
  lesson_id: true,
  is_completed: true,
  completed_at: true,
  created_at: true,
  updated_at: true,
});

export type Lessons = z.infer<typeof LessonsSchema>;
export type LessonsCreate = z.infer<typeof LessonsCreateSchema>;
