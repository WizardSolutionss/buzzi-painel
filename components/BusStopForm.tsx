"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { busStopSchema, BusStopFormData } from "@/schemas/busStopSchema";
import { BusStop } from "@/types/busStop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { linhasApi } from "@/lib/api/linhas";
import { BusLine } from "@/types/busLine";

interface BusStopFormProps {
  initial?: BusStop;
  onSubmit: (data: BusStopFormData) => Promise<void>;
  onCancel: () => void;
}

export function BusStopForm({ initial, onSubmit, onCancel }: BusStopFormProps) {
  const [loading, setLoading] = useState(false);
  const [availableLines, setAvailableLines] = useState<BusLine[]>([]);
  const [loadingLines, setLoadingLines] = useState(true);

  const form = useForm<BusStopFormData>({
    resolver: zodResolver(busStopSchema),
    defaultValues: {
      name: initial?.name ?? "",
      latitude: initial?.latitude ?? undefined,
      longitude: initial?.longitude ?? undefined,
      lines: initial?.lines ?? [],
    },
  });

  const lines = form.watch("lines") || [];

  useEffect(() => {
    const fetchLines = async () => {
      try {
        const data = await linhasApi.getAll();
        setAvailableLines(data);
      } catch (error) {
        console.error("Erro ao buscar linhas:", error);
      } finally {
        setLoadingLines(false);
      }
    };
    fetchLines();
  }, []);

  const adicionarLinha = (linhaId: string) => {
    if (!linhaId || lines.includes(linhaId)) return;
    form.setValue("lines", [...lines, linhaId], { shouldValidate: true });
  };

  const removerLinha = (linha: string) => {
    form.setValue(
      "lines",
      lines.filter((l) => l !== linha),
      { shouldValidate: true }
    );
  };

  const linhasDisponiveis = availableLines.filter(
    (l) => !lines.includes(l.id)
  );

  const handleSubmit = async (data: BusStopFormData) => {
    setLoading(true);
    try {
      await onSubmit(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-5"
      >
        {/* Nome */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-slate-700">
                Nome da Parada
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Terminal Central"
                  className="border-slate-200 focus-visible:ring-[#3366FF]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Coords */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-slate-700">
                  Latitude
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="any"
                    placeholder="-23.5505"
                    className="border-slate-200 focus-visible:ring-[#3366FF]"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? undefined : parseFloat(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-slate-700">
                  Longitude
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="any"
                    placeholder="-46.6333"
                    className="border-slate-200 focus-visible:ring-[#3366FF]"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? undefined : parseFloat(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Linhas */}
        <FormField
          control={form.control}
          name="lines"
          render={() => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-slate-700">
                Linhas
              </FormLabel>
              <Select onValueChange={adicionarLinha} value="">
                <FormControl>
                  <SelectTrigger className="border-slate-200 focus:ring-[#3366FF]" disabled={loadingLines}>
                    <SelectValue placeholder={loadingLines ? "Carregando linhas..." : "Selecione uma linha..."} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableLines.filter(l => !lines.includes(l.id)).length > 0 ? (
                    availableLines.filter(l => !lines.includes(l.id)).map((linha) => (
                      <SelectItem key={linha.id} value={linha.id}>
                        {linha.code} - {linha.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-slate-400">
                      {loadingLines ? "Buscando linhas..." : "Todas as linhas já foram adicionadas"}
                    </div>
                  )}
                </SelectContent>
              </Select>
              {lines.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {lines.map((linhaId) => {
                    const linhaInfo = availableLines.find((l) => l.id === linhaId);
                    return (
                      <span
                        key={linhaId}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#3366FF]/10 text-[#3366FF] text-xs font-semibold"
                      >
                        {linhaInfo ? `${linhaInfo.code} - ${linhaInfo.name}` : linhaId}
                        <button
                          type="button"
                          onClick={() => removerLinha(linhaId)}
                          className="hover:text-red-500 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="text-slate-600 hover:text-slate-800"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-[#3366FF] hover:bg-[#2255EE] text-white min-w-[120px]"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : initial ? (
              "Salvar alterações"
            ) : (
              "Criar parada"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
