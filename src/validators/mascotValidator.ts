import { z } from "zod";

export const MascotDBSchema = z.object({
  mascot_id: z.number().int(),
  mascot_image_url: z.string().url(),
  user_id: z.string().uuid(),
});

export type MascotDBSchema = z.infer<typeof MascotDBSchema>;
