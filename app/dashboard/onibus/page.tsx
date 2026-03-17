"use client";

import { useState, useMemo, useEffect } from "react";
import { Bus } from "@/types/bus";
import { BusFormData } from "@/schemas/busSchema";
import { BusTable } from "@/components/BusTable";
import { BusForm } from "@/components/BusForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Search, Bus as BusIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { onibusApi } from "@/lib/api/onibus";

export default function OnibusPage() {
    const [buses, setBuses] = useState<Bus[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editing, setEditing] = useState<Bus | null>(null);

    const fetchBuses = async () => {
        setLoading(true);
        try {
            const data = await onibusApi.getAll();
            setBuses(data);
        } catch (error) {
            toast.error("Erro ao carregar ônibus");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBuses();
    }, []);

    const filtered = useMemo(() => {
        if (!search.trim()) return buses;
        const q = search.toLowerCase();
        return buses.filter(
            (b) =>
                b.name.toLowerCase().includes(q) ||
                b.plate.toLowerCase().includes(q) ||
                b.imei.toLowerCase().includes(q)
        );
    }, [buses, search]);

    const handleCreate = async (data: BusFormData) => {
        try {
            await onibusApi.create(data);
            await fetchBuses();
            setDialogOpen(false);
            toast.success("Ônibus cadastrado com sucesso!");
        } catch (error) {
            toast.error("Erro ao cadastrar ônibus");
            console.error(error);
        }
    };

    const handleEdit = async (data: BusFormData) => {
        if (!editing) return;
        try {
            await onibusApi.update(editing.id, data);
            await fetchBuses();
            setEditing(null);
            setDialogOpen(false);
            toast.success("Ônibus atualizado!");
        } catch (error) {
            toast.error("Erro ao atualizar ônibus");
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await onibusApi.delete(id);
            setBuses((prev) => prev.filter((b) => b.id !== id));
            toast.success("Ônibus excluído.");
        } catch (error) {
            toast.error("Erro ao excluir ônibus");
            console.error(error);
        }
    };

    const openCreate = () => {
        setEditing(null);
        setDialogOpen(true);
    };

    const openEdit = (bus: Bus) => {
        setEditing(bus);
        setDialogOpen(true);
    };

    return (
        <div className="flex-1 bg-slate-50/50 min-h-screen">
            <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <BusIcon className="w-5 h-5 text-indigo-500" />
                            <h1 className="text-xl font-bold text-slate-800">
                                Frota de Ônibus
                            </h1>
                        </div>
                        <p className="text-sm text-slate-500">
                            Gerencie os veículos rodando no sistema
                        </p>
                    </div>
                    <Button
                        onClick={openCreate}
                        className="bg-[#3366FF] hover:bg-[#2255EE] text-white shadow-sm shadow-blue-200 gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Novo Ônibus
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                                    Total de Veículos
                                </p>
                                <p className="text-2xl font-bold text-slate-800">
                                    {buses.length}
                                </p>
                            </div>
                            <div className="bg-indigo-500 w-10 h-10 rounded-xl flex items-center justify-center">
                                <BusIcon className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table card */}
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
                    {/* Card header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar placa, imei ou nome..."
                                className="pl-9 h-8 text-sm border-slate-200 focus-visible:ring-[#3366FF]"
                            />
                        </div>
                        <p className="text-sm font-semibold text-slate-700">
                            {filtered.length} ônibus
                            {search && ` para "${search}"`}
                        </p>
                    </div>

                    {/* Table */}
                    <div className="p-2">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                                <Loader2 className="w-8 h-8 animate-spin mb-3 text-indigo-500 opacity-60" />
                                <p className="text-sm font-medium">Carregando frota...</p>
                            </div>
                        ) : (
                            <BusTable
                                buses={filtered}
                                onEdit={openEdit}
                                onDelete={handleDelete}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Create / Edit Dialog */}
            <Dialog
                open={dialogOpen}
                onOpenChange={(open) => {
                    setDialogOpen(open);
                    if (!open) setEditing(null);
                }}
            >
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-slate-800">
                            {editing ? "Editar Ônibus" : "Cadastrar Novo Ônibus"}
                        </DialogTitle>
                    </DialogHeader>
                    <BusForm
                        initial={editing ?? undefined}
                        onSubmit={editing ? handleEdit : handleCreate}
                        onCancel={() => {
                            setDialogOpen(false);
                            setEditing(null);
                        }}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
