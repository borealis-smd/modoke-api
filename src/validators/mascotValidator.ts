import { z } from "zod";

export const MascotDBSchema = z.object({
  mascot_id: z.number().int(),
  mascot_image_url: z.string().url(),
  user_id: z.string().uuid(),
});

export const MascotCreateSchema = MascotDBSchema.omit({
  mascot_id: true,
});

export type MascotDBSchema = z.infer<typeof MascotDBSchema>;
export type MascotCreate = z.infer<typeof MascotCreateSchema>;