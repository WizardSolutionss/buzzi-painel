"use client";

import { Bus } from "@/types/bus";
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
import { Pencil, Trash2, Bus as BusIcon } from "lucide-react";

interface BusTableProps {
    buses: Bus[];
    onEdit: (bus: Bus) => void;
    onDelete: (id: string) => void;
}

export function BusTable({ buses, onEdit, onDelete }: BusTableProps) {
    if (buses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                <BusIcon className="w-10 h-10 mb-3 opacity-40" />
                <p className="text-sm font-medium">Nenhum ônibus encontrado</p>
                <p className="text-xs mt-1">Cadastre um novo ônibus para começar</p>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-slate-100 overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-50/70 hover:bg-slate-50/70">
                        <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            Nome / Identificação
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            Placa
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            IMEI
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            Linha Vinculada
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">
                            Ações
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {buses.map((bus) => (
                        <TableRow
                            key={bus.id}
                            className="hover:bg-blue-50/30 transition-colors border-slate-100"
                        >
                            <TableCell className="font-medium text-slate-800">
                                {bus.name}
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline" className="font-mono bg-slate-50">
                                    {bus.plate}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-slate-500 text-sm font-mono">
                                {bus.imei}
                            </TableCell>
                            <TableCell>
                                {bus.linha ? (
                                    <Badge
                                        variant="secondary"
                                        className="bg-[#3366FF]/10 text-[#3366FF] hover:bg-[#3366FF]/15 text-xs font-semibold px-2"
                                    >
                                        Linha {bus.linha.code}
                                    </Badge>
                                ) : (
                                    <span className="text-slate-400 text-sm">Sem linha</span>
                                )}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-slate-400 hover:text-[#3366FF] hover:bg-[#3366FF]/10"
                                        onClick={() => onEdit(bus)}
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
                                                <AlertDialogTitle>Excluir ônibus</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Tem certeza que deseja excluir o ônibus{" "}
                                                    <strong>&quot;{bus.name}&quot;</strong>
                                                    ? Esta ação não pode ser desfeita.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => onDelete(bus.id)}
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
