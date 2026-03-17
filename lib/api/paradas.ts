import { api } from "../api";
import { BusStop } from "@/types/busStop";
import { BusStopFormData } from "@/schemas/busStopSchema";

export const paradasApi = {
    getAll: () => api.get<BusStop[]>("/paradas/get/all"),
    getById: (id: string) => api.get<BusStop>(`/paradas/get/${id}`),
    create: (data: BusStopFormData) => api.post<BusStop>("/paradas/create", data),
    update: (id: string, data: BusStopFormData) => api.patch<BusStop>(`/paradas/update/${id}`, data),
    delete: (id: string) => api.delete(`/paradas/delete/${id}`),
};
