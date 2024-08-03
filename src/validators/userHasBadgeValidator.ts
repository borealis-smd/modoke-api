import { z } from "zod";

export const UserHasBadgeDBSchema = z.object({
  user_has_badge_id: z.string().uuid(),
  badge_id: z.number().int(),
  user_id: z.string().uuid(),
  acquired_at: z.date(),
});

export type UserHasBadgeDB = z.infer<typeof UserHasBadgeDBSchema>;
