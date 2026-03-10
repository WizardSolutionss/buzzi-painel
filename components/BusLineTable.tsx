"use client";

import { BusLine } from "@/types/busLine";
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
import { Pencil, Trash2, Route } from "lucide-react";

interface BusLineTableProps {
    lines: BusLine[];
    onEdit: (line: BusLine) => void;
    onDelete: (id: string) => void;
}

export function BusLineTable({ lines, onEdit, onDelete }: BusLineTableProps) {
    if (lines.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                <Route className="w-10 h-10 mb-3 opacity-40" />
                <p className="text-sm font-medium">Nenhuma linha encontrada</p>
                <p className="text-xs mt-1">Crie uma nova linha para começar</p>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-slate-100 overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-50/70 hover:bg-slate-50/70">
                        <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            Código
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            Nome
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            Identificação
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            Paradas
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">
                            Ações
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {lines.map((line) => (
                        <TableRow
                            key={line.id}
                            className="hover:bg-blue-50/30 transition-colors border-slate-100"
                        >
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant="secondary"
                                        className="bg-[#3366FF]/10 text-[#3366FF] hover:bg-[#3366FF]/15 text-xs font-semibold px-2"
                                    >
                                        {line.code}
                                    </Badge>
                                </div>
                            </TableCell>
                            <TableCell className="font-medium text-slate-800">
                                {line.name}
                            </TableCell>
                            <TableCell className="text-slate-500 text-sm">
                                Linha {line.code} - {line.name}
                            </TableCell>
                            <TableCell className="text-slate-500 text-sm">
                                <Badge variant="outline" className="font-semibold text-slate-600 border-slate-200">
                                    {line._count?.paradas ?? 0}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-slate-400 hover:text-[#3366FF] hover:bg-[#3366FF]/10"
                                        onClick={() => onEdit(line)}
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
                                                <AlertDialogTitle>Excluir linha</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Tem certeza que deseja excluir a{" "}
                                                    <strong>
                                                        &quot;Linha {line.code} - {line.name}&quot;
                                                    </strong>
                                                    ? Esta ação não pode ser desfeita.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => onDelete(line.id)}
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
