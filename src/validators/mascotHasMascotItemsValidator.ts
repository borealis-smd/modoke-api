import { z } from "zod";

export const MascotHasMascotItemsDBSchema = z.object({
  mascot_has_mascot_items_id: z.string().uuid(),
  mascot_id: z.number().int(),
  mascot_items_id: z.number().int(),
  acquired_at: z.date().nullable(),
});

export type MascotHasMascotItemsDB = z.infer<
  typeof MascotHasMascotItemsDBSchema
>;
