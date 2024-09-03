import { z } from "zod";

export const CertificatesDBSchema = z.object({
  certificate_id: z
    .number()
    .int({ message: "ID de certificado deve ser um número inteiro." }),
  certificate_text: z
    .string()
    .min(1, "Texto do certificado não deve ser vazio."),
  section_id: z
    .number()
    .int({ message: "ID de seção deve ser um número inteiro." }),
});

export const CertificateCreateSchema = CertificatesDBSchema.omit({
  certificate_id: true,
});

export type CertificateCreate = z.infer<typeof CertificateCreateSchema>;
