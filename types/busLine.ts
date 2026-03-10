export interface BusLine {
    id: string;
    code: string;
    name: string;
    paradas: {
        linhaId: string;
        paradaId: string;
        ordem: number;
        parada: {
            id: string;
            name: string;
            longitude: number;
            latitude: number;
            createdAt: string;
        };
    }[];
    _count?: {
        paradas: number;
    };
    createdAt?: string;
}
