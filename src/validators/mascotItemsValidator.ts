import { z } from "zod";

export const MascotItemsDBSchema = z.object({
  mascot_items_id: z.number().int(),
  item_name: z.string(),
  item_image_url: z.string().url(),
  isEquipped: z.boolean(),
});

export const MascotItemsCreateSchema = MascotItemsDBSchema.omit({
  mascot_items_id: true,
  isEquipped: true,
});

export type MascotItemsDB = z.infer<typeof MascotItemsDBSchema>;
export type MascotItemsCreate = z.infer<typeof MascotItemsCreateSchema>;
