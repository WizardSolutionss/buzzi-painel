import { api } from "../api";
import { BusStop } from "@/types/busStop";
import { BusStopFormData } from "@/schemas/busStopSchema";

export const paradasApi = {
    getAll: () => api.get<BusStop[]>("/paradas"),
    getById: (id: string) => api.get<BusStop>(`/paradas/${id}`),
    create: (data: BusStopFormData) => api.post<BusStop>("/paradas", data),
    update: (id: string, data: BusStopFormData) => api.patch<BusStop>(`/paradas/${id}`, data),
    delete: (id: string) => api.delete(`/paradas/${id}`),
};
