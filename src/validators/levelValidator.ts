import { z } from "zod";

export const LevelDBSchema = z.object({
  level_id: z.number().int(),
  name: z.enum(["A", "AA", "AAA"]),
  description: z.string(),
});

export const LevelSchema = LevelDBSchema.partial();

export type LevelDB = z.infer<typeof LevelDBSchema>;
export type Level = z.infer<typeof LevelSchema>;
