import { z } from "zod";

export const BadgesDBSchema = z.object({
  badge_id: z
    .number()
    .int({ message: "ID do badge deve ser um número inteiro." }),
  badge_name: z.string().min(1, "Nome do badge não deve ser vazio."),
  badge_image_url: z
    .string({ message: "URL da imagem do badge deve ser uma URL válida." })
    .url(),
  unit_id: z
    .number()
    .int({ message: "ID da unidade deve ser um número inteiro." }),
});

export const BadgeCreateSchema = BadgesDBSchema.omit({ badge_id: true });

export type BadgeCreate = z.infer<typeof BadgeCreateSchema>;
