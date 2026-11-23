import { ArrowUpRight, TrendingUp } from "lucide-react";
import type { Stat, WorkspaceConfig } from "@/config/workspaces";
import { cn } from "@/lib/utils";

export function StatCard({ stat, accent, onAction }: { stat: Stat; accent: WorkspaceConfig["accent"]; onAction?: () => void }) {
  const Icon = stat.icon;
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/70">
      <div className={cn("absolute -right-6 -top-6 size-24 rounded-full opacity-60 blur-2xl", accent.soft)} />
      <div className="relative flex items-start justify-between">
        <p className="text-[13px] font-medium text-slate-500">{stat.label}</p>
        <span className={cn("grid size-9 place-items-center rounded-xl bg-gradient-to-br text-white shadow-sm", accent.gradient)}>
          <Icon className="size-4" />
        </span>
      </div>
      <p className="relative mt-1 text-[28px] font-extrabold tracking-tight text-slate-900">{stat.value}</p>
      <div className="relative mt-0.5 flex items-center gap-2 text-xs text-slate-500">
        {stat.trend && (
          <span className="inline-flex items-center gap-0.5 rounded-md bg-emerald-50 px-1.5 py-0.5 font-semibold text-emerald-700">
            <TrendingUp className="size-3" /> {stat.trend}
          </span>
        )}
        <span className="truncate">{stat.hint}</span>
      </div>
      {stat.progress !== undefined && (
        <div className="relative mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div className={cn("h-full rounded-full bg-gradient-to-r", accent.gradient)} style={{ width: `${stat.progress}%` }} />
        </div>
      )}
      <button
        onClick={onAction}
        className={cn("relative mt-4 inline-flex items-center gap-1 text-xs font-semibold transition-all hover:gap-1.5", accent.text)}
      >
        {stat.action} <ArrowUpRight className="size-3.5" />
      </button>
    </div>
  );
}
