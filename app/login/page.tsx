"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/schemas/authSchema";
import { authApi } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
import { Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { refreshUser } = useAuth();

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            pass: "",
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);
        try {
            await authApi.login(data);
            await refreshUser();
            toast.success("Login realizado com sucesso!");
            router.push("/dashboard/paradas");
        }
        catch (error: any) {
            console.error("Login error:", error);

            if (error.message && (error.message.includes("401") || error.message.toLowerCase().includes("credentials") || error.message.toLowerCase().includes("inválidas"))) {
                toast.error("Credenciais inválidas. Verifique seu e-mail e senha.");
            } else if (error.message && (error.message.includes("Failed to fetch") || error.message.includes("NetworkError") || error.message.includes("ECONNREFUSED"))) {
                toast.error("Erro de conexão. Verifique sua conexão com o servidor.");
            } else {
                toast.error("Ocorreu um erro ao tentar entrar. Tente novamente mais tarde.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50/50 p-4">
            <div className="w-full max-w-md space-y-8">
                {/* Logo/Brand */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#3366FF] text-white shadow-lg shadow-blue-200 mb-6">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Buzzi
                    </h1>
                    <p className="mt-2 text-slate-500 font-medium">
                        Painel Administrativo
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-semibold text-slate-700">
                                            E-mail
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <Input
                                                    placeholder="seu@email.com"
                                                    className="pl-10 h-12 border-slate-200 focus-visible:ring-[#3366FF] rounded-xl"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="pass"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-semibold text-slate-700">
                                            Senha
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    className="pl-10 h-12 border-slate-200 focus-visible:ring-[#3366FF] rounded-xl"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 bg-[#3366FF] hover:bg-[#2255EE] text-white font-bold rounded-xl shadow-md shadow-blue-100 transition-all active:scale-[0.98]"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    "Entrar no Sistema"
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>

                {/* Footer info */}
                <p className="text-center text-xs text-slate-400 font-medium tracking-wide pb-8">
                    © 2026 Wizard Solutions. Todos os direitos reservados.
                </p>
            </div>
        </div>
    );
}
