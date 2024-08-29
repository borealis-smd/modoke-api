import { z } from "zod";

export const CertificatesDBSchema = z.object({
  certificate_id: z.number().int(),
  certificate_text: z.string(),
  session_id: z.number().int(),
});

export const CertificateCreateSchema = CertificatesDBSchema.omit({
  certificate_id: true,
});

export type CertificateCreate = z.infer<typeof CertificateCreateSchema>;
