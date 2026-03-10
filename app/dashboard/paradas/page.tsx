"use client";

import { useState, useMemo, useEffect } from "react";
import { BusStop } from "@/types/busStop";
import { BusStopFormData } from "@/schemas/busStopSchema";
import { BusStopTable } from "@/components/BusStopTable";
import { BusStopForm } from "@/components/BusStopForm";
import { StatsCards } from "@/components/StatsCards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Search, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { paradasApi } from "@/lib/api/paradas";

export default function ParadasPage() {
  const [stops, setStops] = useState<BusStop[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<BusStop | null>(null);

  const fetchStops = async () => {
    setLoading(true);
    try {
      const data = await paradasApi.getAll();
      setStops(data);
    } catch (error) {
      toast.error("Erro ao carregar paradas");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStops();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return stops;
    const q = search.toLowerCase();
    return stops.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.linhas || []).some((item) =>
          item.linha.name.toLowerCase().includes(q) ||
          item.linha.code.toLowerCase().includes(q)
        )
    );
  }, [stops, search]);

  const totalLinhas = useMemo(() => {
    const all = new Set(stops.flatMap((s) => (s.linhas || []).map(l => l.linhaId)));
    return all.size;
  }, [stops]);

  const handleCreate = async (data: BusStopFormData) => {
    try {
      await paradasApi.create(data);
      await fetchStops();
      setDialogOpen(false);
      toast.success("Parada criada com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar parada");
      console.error(error);
    }
  };

  const handleEdit = async (data: BusStopFormData) => {
    if (!editing) return;
    try {
      await paradasApi.update(editing.id, data);
      await fetchStops();
      setEditing(null);
      setDialogOpen(false);
      toast.success("Parada atualizada!");
    } catch (error) {
      toast.error("Erro ao atualizar parada");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await paradasApi.delete(id);
      setStops((prev) => prev.filter((s) => s.id !== id));
      toast.success("Parada excluída.");
    } catch (error) {
      toast.error("Erro ao excluir parada");
      console.error(error);
    }
  };

  const openCreate = () => {
    setEditing(null);
    setDialogOpen(true);
  };

  const openEdit = (stop: BusStop) => {
    // Map backend format (linhas object) to form format (lines string array)
    const formData = {
      ...stop,
      lines: (stop.linhas || []).map(l => l.linhaId)
    };
    setEditing({ ...stop, lines: formData.lines });
    setDialogOpen(true);
  };

  return (
    <div className="flex-1 bg-slate-50/50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-5 h-5 text-[#3366FF]" />
              <h1 className="text-xl font-bold text-slate-800">
                Paradas de Ônibus
              </h1>
            </div>
            <p className="text-sm text-slate-500">
              Gerencie todas as paradas do sistema
            </p>
          </div>
          <Button
            onClick={openCreate}
            className="bg-[#3366FF] hover:bg-[#2255EE] text-white shadow-sm shadow-blue-200 gap-2"
          >
            <Plus className="w-4 h-4" />
            Nova Parada
          </Button>
        </div>

        {/* Stats */}
        <StatsCards totalParadas={stops.length} totalLinhas={totalLinhas} />

        {/* Table card */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
          {/* Card header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nome ou linha..."
                className="pl-9 h-8 text-sm border-slate-200 focus-visible:ring-[#3366FF]"
              />
            </div>
            <p className="text-sm font-semibold text-slate-700">
              {filtered.length} parada{filtered.length !== 1 ? "s" : ""}
              {search && ` para "${search}"`}
            </p>
          </div>

          {/* Table */}
          <div className="p-2">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin mb-3 text-[#3366FF] opacity-60" />
                <p className="text-sm font-medium">Carregando paradas...</p>
              </div>
            ) : (
              <BusStopTable
                stops={filtered}
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
              {editing ? "Editar Parada" : "Nova Parada"}
            </DialogTitle>
          </DialogHeader>
          <BusStopForm
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
