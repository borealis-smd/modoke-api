import { z } from "zod";

export const MascotDBSchema = z.object({
  mascot_id: z
    .number()
    .int({ message: "ID do mascote deve ser um número inteiro." }),
  mascot_image_url: z
    .string()
    .url({ message: "URL do avatar do mascote deve ser uma URL válida." }),
  user_id: z
    .string()
    .uuid({ message: "ID do usuário deve ser um UUID válido." }),
});

export const MascotCreateSchema = MascotDBSchema.omit({
  mascot_id: true,
});

export type MascotCreate = z.infer<typeof MascotCreateSchema>;
