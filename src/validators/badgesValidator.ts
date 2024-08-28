import { z } from "zod";

export const BadgesDBSchema = z.object({
  badge_id: z.number().int(),
  badge_name: z.string(),
  badge_image_url: z.string().url(),
  unit_id: z.number().int(),
});

export const BadgeCreateSchema = BadgesDBSchema.omit({ badge_id: true });

export type BadgesDB = z.infer<typeof BadgesDBSchema>;
export type BadgeCreate = z.infer<typeof BadgeCreateSchema>;
