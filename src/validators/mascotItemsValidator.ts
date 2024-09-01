import { z } from "zod";

export const MascotItemsDBSchema = z.object({
  mascot_items_id: z
    .number()
    .int({ message: "ID do item do mascote deve ser um número inteiro." }),
  item_name: z.string().min(1, "Nome do item do mascote não deve ser vazio."),
  item_image_url: z
    .string()
    .url({ message: "URL do item do mascote deve ser uma URL válida." }),
  isEquipped: z.boolean({
    message: "Status de equipamento deve ser um booleano.",
  }),
});

export const MascotItemsCreateSchema = MascotItemsDBSchema.omit({
  mascot_items_id: true,
  isEquipped: true,
});

export type MascotItemsCreate = z.infer<typeof MascotItemsCreateSchema>;
