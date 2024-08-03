import { z } from "zod";

export const CertificatesDBSchema = z.object({
  certificate_id: z.number().int(),
  certificate_text: z.string(),
  session_id: z.number().int(),
});

export type CertificatesDB = z.infer<typeof CertificatesDBSchema>;
