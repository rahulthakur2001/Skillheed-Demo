"use client";

import { ArrowLeft, Filter, Plus, Sparkles } from "lucide-react";
import type { WorkspaceConfig } from "@/config/workspaces";
import { cn } from "@/lib/utils";
import { DataTable } from "./data-table";

function findIcon(config: WorkspaceConfig, label: string) {
  for (const g of config.nav) for (const i of g.items) if (i.label === label) return { icon: i.icon, group: g.title };
  return { icon: Sparkles, group: "Modules" };
}

/** Generic module screen used for every sidebar item in this UI-only demo. */
export function ModuleView({ config, module, onBack }: { config: WorkspaceConfig; module: string; onBack: () => void }) {
  const { icon: Icon, group } = findIcon(config, module);
  const seed = module.length;
  const kpis = [
    { label: "Total records", value: (seed * 137 + 412).toLocaleString("en-IN") },
    { label: "Updated this week", value: String(seed * 7 + 18) },
    { label: "Pending actions", value: String((seed % 9) + 3) },
  ];

  return (
    <div className="space-y-6" data-testid="module-view">
      <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900">
        <ArrowLeft className="size-4" /> Back to dashboard
      </button>

      <div className={cn("relative overflow-hidden rounded-3xl bg-gradient-to-r p-6 text-white shadow-lg sm:p-8", config.accent.gradient)}>
        <div className="bg-grid absolute inset-0 opacity-20" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur">
              <Icon className="size-7" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70">{group}</p>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{module}</h1>
              <p className="mt-0.5 text-sm text-white/80">Manage {module.toLowerCase()} for your {config.label.toLowerCase()} in one place.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-white/15 px-3.5 text-sm font-semibold ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white/25">
              <Filter className="size-4" /> Filter
            </button>
            <button className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-white px-3.5 text-sm font-semibold text-slate-900 shadow transition-all hover:-translate-y-px">
              <Plus className="size-4" /> Add new
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <p className="text-[13px] font-medium text-slate-500">{k.label}</p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">{k.value}</p>
          </div>
        ))}
      </div>

      <DataTable table={{ ...config.table, title: `${module} · recent activity` }} />
    </div>
  );
}
