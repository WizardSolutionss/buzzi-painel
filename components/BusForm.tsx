"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { busSchema, BusFormData } from "@/schemas/busSchema";
import { Bus } from "@/types/bus";
import { BusLine } from "@/types/busLine";
import { linhasApi } from "@/lib/api/linhas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface BusFormProps {
    initial?: Bus;
    onSubmit: (data: BusFormData) => Promise<void>;
    onCancel: () => void;
}

export function BusForm({ initial, onSubmit, onCancel }: BusFormProps) {
    const [loading, setLoading] = useState(false);
    const [linhas, setLinhas] = useState<BusLine[]>([]);
    const [loadingLinhas, setLoadingLinhas] = useState(true);

    const form = useForm<BusFormData>({
        resolver: zodResolver(busSchema),
        defaultValues: {
            name: initial?.name ?? "",
            imei: initial?.imei ?? "",
            plate: initial?.plate ?? "",
            linhaId: initial?.linhaId ?? "",
        },
    });

    useEffect(() => {
        const fetchLinhas = async () => {
            try {
                const data = await linhasApi.getAll();
                setLinhas(data);
            } catch (error) {
                console.error("Erro ao carregar linhas:", error);
            } finally {
                setLoadingLinhas(false);
            }
        };

        fetchLinhas();
    }, []);

    const handleSubmit = async (data: BusFormData) => {
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
                className="space-y-4"
            >
                {/* Nome */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-semibold text-slate-700">
                                Nome / Identificação
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Ex: Carro 2024 - Rota Centro"
                                    className="border-slate-200 focus-visible:ring-[#3366FF]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    {/* Placa */}
                    <FormField
                        control={form.control}
                        name="plate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-semibold text-slate-700">
                                    Placa
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="ABC-1234"
                                        className="border-slate-200 focus-visible:ring-[#3366FF] uppercase"
                                        {...field}
                                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* IMEI */}
                    <FormField
                        control={form.control}
                        name="imei"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-semibold text-slate-700">
                                    IMEI do Rastreador
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ex: 86453..."
                                        className="border-slate-200 focus-visible:ring-[#3366FF]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Linha Vinculada */}
                <FormField
                    control={form.control}
                    name="linhaId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-semibold text-slate-700">
                                Linha Vinculada
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="border-slate-200 focus:ring-[#3366FF]">
                                        <SelectValue placeholder="Selecione uma linha" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {loadingLinhas ? (
                                        <div className="p-2 text-sm text-slate-400 flex items-center justify-center">
                                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                            Carregando...
                                        </div>
                                    ) : (
                                        linhas.map((linha) => (
                                            <SelectItem key={linha.id} value={linha.id}>
                                                Linha {linha.code} - {linha.name}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
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
                            "Cadastrar ônibus"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
