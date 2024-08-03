import { z } from "zod";

export const UserHasCertificateDBSchema = z.object({
  user_has_certificate_id: z.string().uuid(),
  user_id: z.string().uuid(),
  certificate_id: z.number().int(),
  acquired_at: z.date(),
});

export type UserHasCertificateDB = z.infer<typeof UserHasCertificateDBSchema>;
