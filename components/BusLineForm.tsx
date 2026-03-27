"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { busLineSchema, BusLineFormData } from "@/schemas/busLineSchema";
import { BusLine } from "@/types/busLine";
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
import { Loader2 } from "lucide-react";

interface BusLineFormProps {
    initial?: BusLine;
    onSubmit: (data: BusLineFormData) => Promise<void>;
    onCancel: () => void;
}

export function BusLineForm({ initial, onSubmit, onCancel }: BusLineFormProps) {
    const [loading, setLoading] = useState(false);

    const form = useForm<BusLineFormData>({
        resolver: zodResolver(busLineSchema),
        defaultValues: {
            code: initial?.code ?? "",
            name: initial?.name ?? "",
            paradas: (initial?.paradas ?? []).map((p) => p.paradaId),
        },
    });

    const handleSubmit = async (data: BusLineFormData) => {
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
                {/* Código */}
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-semibold text-slate-700">
                                Código da Linha
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Ex: 101"
                                    className="border-slate-200 focus-visible:ring-[#3366FF]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Nome */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-semibold text-slate-700">
                                Nome da Linha
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Ex: Centro / Terminal Norte"
                                    className="border-slate-200 focus-visible:ring-[#3366FF]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Preview */}
                {form.watch("code") && form.watch("name") && (
                    <div className="rounded-lg bg-slate-50 border border-slate-100 px-4 py-3">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                            Identificação
                        </p>
                        <p className="text-sm font-medium text-slate-700">
                            Linha {form.watch("code")} - {form.watch("name")}
                        </p>
                    </div>
                )}

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
                            "Criar linha"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
