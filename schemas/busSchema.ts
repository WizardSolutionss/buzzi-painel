import { z } from "zod";

export const busSchema = z.object({
    name: z
        .string()
        .min(2, "Nome deve ter ao menos 2 caracteres")
        .max(100, "Nome muito longo"),
    imei: z
        .string()
        .min(5, "IMEI deve ter ao menos 5 caracteres")
        .max(50, "IMEI muito longo"),
    plate: z
        .string()
        .min(7, "Placa deve ter ao menos 7 caracteres")
        .max(10, "Placa muito longa"),
    linhaId: z.string().min(1, "Selecione uma linha"),
});

export type BusFormData = z.infer<typeof busSchema>;
