import { z } from "zod";

export const busStopSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter ao menos 2 caracteres")
    .max(100, "Nome muito longo"),
  latitude: z
    .number({ message: "Latitude deve ser um número" })
    .min(-90, "Latitude inválida")
    .max(90, "Latitude inválida"),
  longitude: z
    .number({ message: "Longitude deve ser um número" })
    .min(-180, "Longitude inválida")
    .max(180, "Longitude inválida"),
  lines: z.array(z.string()).default([]),
});

export type BusStopFormData = z.infer<typeof busStopSchema>;
