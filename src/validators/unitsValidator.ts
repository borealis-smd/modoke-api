import { z } from "zod";

export const UnitsDBSchema = z.object({
  unit_id: z
    .number()
    .int({ message: "ID da unidade deve ser um número inteiro." }),
  unit_title: z
    .string()
    .min(1, { message: "Título da unidade não deve ser vazio." }),
  unit_description: z
    .string()
    .min(1, { message: "Descrição da unidade não deve ser vazia." }),
  in_progress: z
    .boolean({
      message: "Status de progresso deve ser um booleano.",
    })
    .default(false),
  is_locked: z
    .boolean({
      message: "Status de bloqueio deve ser um booleano.",
    })
    .default(true),
  is_completed: z
    .boolean({
      message: "Status de conclusão deve ser um booleano.",
    })
    .default(false),
  completed_at: z
    .date({ message: "Data de conclusão deve ser uma data válida." })
    .nullable(),
  section_id: z
    .number()
    .int({ message: "ID da seção deve ser um número inteiro." }),
});

export const UnitsSchema = UnitsDBSchema.partial();

export const UnitsCreateSchema = UnitsDBSchema.omit({
  is_completed: true,
  completed_at: true,
});

export type Units = z.infer<typeof UnitsSchema>;
export type UnitsCreate = z.infer<typeof UnitsCreateSchema>;
