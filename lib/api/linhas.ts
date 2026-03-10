import { api } from "../api";
import { BusLine } from "@/types/busLine";
import { BusLineFormData } from "@/schemas/busLineSchema";

export const linhasApi = {
    getAll: () => api.get<BusLine[]>("/linhas"),
    getById: (id: string) => api.get<BusLine>(`/linhas/${id}`),
    create: (data: BusLineFormData) => api.post<BusLine>("/linhas", data),
    update: (id: string, data: BusLineFormData) => api.patch<BusLine>(`/linhas/${id}`, data),
    delete: (id: string) => api.delete(`/linhas/${id}`),
};
