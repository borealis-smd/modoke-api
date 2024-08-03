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

export type LessonsDB = z.infer<typeof LessonsDBSchema>;
export type Lessons = z.infer<typeof LessonsSchema>;
