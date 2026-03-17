"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Bus,
  Route,
  ChevronRight,
  LogOut,
  ChevronUp,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  // {
  //   label: "Dashboard",
  //   href: "/dashboard",
  //   icon: LayoutDashboard,
  // },
  {
    label: "Paradas",
    href: "/dashboard/paradas",
    icon: MapPin,
  },
  {
    label: "Linhas",
    href: "/dashboard/linhas",
    icon: Route,
  },
  {
    label: "Ônibus",
    href: "/dashboard/onibus",
    icon: Bus,
  },
  // {
  //   label: "Configurações",
  //   href: "/dashboard/configuracoes",
  //   icon: Settings,
  // },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <Sidebar>
      {/* Logo */}
      <SidebarHeader className="border-b border-slate-100 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#3366FF]">
            <Bus className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-slate-800 text-base leading-tight block">
              Buzzi
            </span>
            <span className="text-xs text-slate-400">Painel de Controle</span>
          </div>
        </div>
      </SidebarHeader>

      {/* Nav */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    pathname.startsWith(item.href));

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={
                        isActive
                          ? "bg-[#3366FF] text-white shadow-sm shadow-blue-200 hover:bg-[#3366FF] hover:text-white"
                          : ""
                      }
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span className="flex-1">{item.label}</span>
                        {isActive && (
                          <ChevronRight className="w-3.5 h-3.5 opacity-70" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-slate-100">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="py-5">
                  <div className="w-7 h-7 rounded-full bg-[#3366FF]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-[#3366FF]">
                      {user?.fullName?.[0]?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-700 truncate">
                      {user?.fullName || "Usuário"}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {user?.email || "usuario@sistema.com"}
                    </p>
                  </div>
                  <ChevronUp className="ml-auto w-4 h-4 text-slate-400" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
