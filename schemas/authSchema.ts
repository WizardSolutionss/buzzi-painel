import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "O e-mail é obrigatório")
        .email("Insira um e-mail válido"),
    pass: z
        .string()
        .min(1, "A senha é obrigatória")
        .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export interface User {
    id: string;
    email: string;
    fullName: string;
}

export type LoginFormData = z.infer<typeof loginSchema>;
