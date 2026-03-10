export interface BusStop {
  id: string;
  name: string;
  longitude: number;
  latitude: number;
  lines?: string[]; // Used for payload
  linhas?: {
    linhaId: string;
    paradaId: string;
    ordem: number;
    linha: {
      id: string;
      name: string;
      code: string;
      createdAt: string;
    };
  }[]; // Actual data from GET
  createdAt?: string;
}
