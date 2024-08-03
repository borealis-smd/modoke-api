import { z } from "zod";

export const MascotItemsDBSchema = z.object({
  mascot_items_id: z.number().int(),
  item_name: z.string(),
  item_image_url: z.string().url(),
  isEquipped: z.boolean(),
});

export type MascotItemsDB = z.infer<typeof MascotItemsDBSchema>;
