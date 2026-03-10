import { z } from "zod";

export const busLineSchema = z.object({
    code: z
        .string()
        .min(1, "Código é obrigatório")
        .max(10, "Código muito longo"),
    name: z
        .string()
        .min(2, "Nome deve ter ao menos 2 caracteres")
        .max(100, "Nome muito longo"),
    paradas: z.array(z.string()),
});

export type BusLineFormData = z.infer<typeof busLineSchema>;
