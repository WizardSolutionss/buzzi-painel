import { BusStop } from "@/types/busStop";
import { BusLine } from "@/types/busLine";

export const mockBusStops: BusStop[] = [
  {
    id: "1",
    nome: "Terminal Central",
    latitude: -23.5505,
    longitude: -46.6333,
    linhas: ["101", "202", "303"],
    criadoEm: "2024-01-15",
  },
  {
    id: "2",
    nome: "Parada Av. Paulista",
    latitude: -23.5629,
    longitude: -46.6544,
    linhas: ["510", "720"],
    criadoEm: "2024-02-10",
  },
  {
    id: "3",
    nome: "Estação Consolação",
    latitude: -23.5563,
    longitude: -46.6602,
    linhas: ["181", "675"],
    criadoEm: "2024-03-05",
  },
  {
    id: "4",
    nome: "Parada Rua Augusta",
    latitude: -23.5592,
    longitude: -46.6543,
    linhas: ["915"],
    criadoEm: "2024-03-20",
  },
];

export const mockBusLines: BusLine[] = [
  {
    id: "1",
    codigo: "101",
    nome: "Centro / Terminal Norte",
    criadoEm: "2024-01-10",
  },
  {
    id: "2",
    codigo: "202",
    nome: "Bairro Sul / Centro",
    criadoEm: "2024-01-20",
  },
  {
    id: "3",
    codigo: "303",
    nome: "Terminal Leste / Shopping",
    criadoEm: "2024-02-05",
  },
  {
    id: "4",
    codigo: "510",
    nome: "Av. Paulista / Morumbi",
    criadoEm: "2024-03-01",
  },
  {
    id: "5",
    codigo: "720",
    nome: "Interlagos / Centro",
    criadoEm: "2024-03-15",
  },
];
