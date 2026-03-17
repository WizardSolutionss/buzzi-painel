import { api } from "../api";
import { Bus } from "@/types/bus";
import { BusFormData } from "@/schemas/busSchema";

export const onibusApi = {
    getAll: () => api.get<Bus[]>("/bus/get/all"),
    getById: (id: string) => api.get<Bus>(`/bus/get/${id}`),
    create: (data: BusFormData) => api.post<Bus>("/bus/create", data),
    update: (id: string, data: BusFormData) => api.patch<Bus>(`/bus/update/${id}`, data),
    delete: (id: string) => api.delete(`/bus/delete/${id}`),
};
