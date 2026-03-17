export interface Bus {
    id: string;
    name: string;
    imei: string;
    linhaId: string;
    plate: string;
    linha?: {
        id: string;
        name: string;
        code: string;
    };
    createdAt?: string;
}
