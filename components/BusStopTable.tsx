"use client";

import { BusStop } from "@/types/busStop";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, MapPin } from "lucide-react";

interface BusStopTableProps {
  stops: BusStop[];
  onEdit: (stop: BusStop) => void;
  onDelete: (id: string) => void;
}

export function BusStopTable({ stops, onEdit, onDelete }: BusStopTableProps) {
  if (stops.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-400">
        <MapPin className="w-10 h-10 mb-3 opacity-40" />
        <p className="text-sm font-medium">Nenhuma parada encontrada</p>
        <p className="text-xs mt-1">Crie uma nova parada para começar</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-100 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/70 hover:bg-slate-50/70">
            <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Nome
            </TableHead>
            <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Endereço
            </TableHead>
            <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Latitude
            </TableHead>
            <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Longitude
            </TableHead>
            <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Linhas
            </TableHead>
            <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stops.map((stop) => (
            <TableRow
              key={stop.id}
              className="hover:bg-blue-50/30 transition-colors border-slate-100"
            >
              <TableCell className="font-medium text-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#3366FF]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-[#3366FF]" />
                  </div>
                  {stop.name}
                </div>
              </TableCell>
              <TableCell className="text-slate-500 text-sm">
                {stop.address || "-"}
              </TableCell>
              <TableCell className="text-slate-500 font-mono text-sm">
                {stop.latitude.toFixed(4)}
              </TableCell>
              <TableCell className="text-slate-500 font-mono text-sm">
                {stop.longitude.toFixed(4)}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {(stop.linhas || []).slice(0, 3).map((item) => (
                    <Badge
                      key={item.linhaId}
                      variant="secondary"
                      className="bg-[#3366FF]/10 text-[#3366FF] hover:bg-[#3366FF]/15 text-xs font-semibold px-2"
                    >
                      {item.linha.code}
                    </Badge>
                  ))}
                  {(stop.linhas || []).length > 3 && (
                    <Badge
                      variant="secondary"
                      className="bg-slate-100 text-slate-500 text-xs"
                    >
                      +{(stop.linhas || []).length - 3}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-400 hover:text-[#3366FF] hover:bg-[#3366FF]/10"
                    onClick={() => onEdit(stop)}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir parada</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir{" "}
                          <strong>"{stop.name}"</strong>? Esta ação não pode
                          ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(stop.id)}
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
