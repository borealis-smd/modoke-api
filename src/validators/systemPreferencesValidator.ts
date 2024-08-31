import { z } from "zod";

export const SystemPreferencesDBSchema = z.object({
  system_preferences_id: z.number().int(),
  font_size: z.enum(["VERY_SMALL", "SMALL", "MEDIUM", "LARGE", "VERY_LARGE"]),
  theme: z.enum(["LIGHT", "DARK"]),
  is_high_contrast: z.boolean(),
  sound: z.boolean(),
  user_id: z.string(),
});

export const SystemPreferencesCreateSchema = SystemPreferencesDBSchema.omit({
  system_preferences_id: true,
});

export const SystemPreferencesUpdateSchema = SystemPreferencesCreateSchema.omit(
  { user_id: true },
).partial();

export type SystemPreferencesCreate = z.infer<
  typeof SystemPreferencesCreateSchema
>;
export type SystemPreferencesUpdate = z.infer<
  typeof SystemPreferencesUpdateSchema
>;
