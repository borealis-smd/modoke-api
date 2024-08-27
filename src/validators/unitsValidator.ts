import { z } from "zod";

export const UnitsDBSchema = z.object({
  unit_id: z.number().int(),
  unit_title: z.string(),
  unit_description: z.string(),
  is_completed: z.boolean(),
  completed_at: z.date().nullable(),
  session_id: z.number().int(),
});

export const UnitsSchema = UnitsDBSchema.partial();

export const UnitsCreateSchema = UnitsDBSchema.omit({
  unit_id: true,
  is_completed: true,
  completed_at: true,
});

export type UnitsDB = z.infer<typeof UnitsDBSchema>;
export type Units = z.infer<typeof UnitsSchema>;
export type UnitsCreate = z.infer<typeof UnitsCreateSchema>;
