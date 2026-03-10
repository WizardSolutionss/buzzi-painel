import { MapPin, Route, Bus, TrendingUp } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  color?: string;
}

function StatCard({ label, value, icon, change, color = "bg-[#3366FF]" }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
            {label}
          </p>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
          {change && (
            <p className="text-xs text-emerald-500 font-medium mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {change}
            </p>
          )}
        </div>
        <div className={`${color} w-10 h-10 rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

interface StatsCardsProps {
  totalParadas: number;
  totalLinhas: number;
}

export function StatsCards({ totalParadas, totalLinhas }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard
        label="Total de Paradas"
        value={totalParadas}
        icon={<MapPin className="w-5 h-5 text-white" />}
        change="+2 este mês"
        color="bg-[#3366FF]"
      />
      <StatCard
        label="Linhas Ativas"
        value={totalLinhas}
        icon={<Route className="w-5 h-5 text-white" />}
        color="bg-indigo-500"
      />
      <StatCard
        label="Ônibus em Rota"
        value="—"
        icon={<Bus className="w-5 h-5 text-white" />}
        color="bg-sky-500"
      />
    </div>
  );
}
