import { api } from "../api";
import { BusLine } from "@/types/busLine";
import { BusLineFormData } from "@/schemas/busLineSchema";

export const linhasApi = {
    getAll: () => api.get<BusLine[]>("/linhas/get/all"),
    getById: (id: string) => api.get<BusLine>(`/linhas/get/${id}`),
    create: (data: BusLineFormData) => api.post<BusLine>("/linhas/create", data),
    update: (id: string, data: BusLineFormData) => api.patch<BusLine>(`/linhas/update/${id}`, data),
    delete: (id: string) => api.delete(`/linhas/delete/${id}`),
};
