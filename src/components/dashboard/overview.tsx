"use client";

import { ArrowUpRight, Download, Plus } from "lucide-react";
import type { WorkspaceConfig } from "@/config/workspaces";
import type { Session } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { CalendarCard } from "./calendar-card";
import { BarsChart, ChartCard, MixChart, TrendChart } from "./charts";
import { DataTable } from "./data-table";
import { StatCard } from "./stat-card";

const TITLES: Record<WorkspaceConfig["type"], { title: string; snapshot: string; cta: string }> = {
  school: { title: "Admin Dashboard", snapshot: "Here's your school's snapshot.", cta: "New Admission" },
  college: { title: "College Dashboard", snapshot: "Here's your campus at a glance.", cta: "Publish Results" },
  sports: { title: "Academy Dashboard", snapshot: "Here's how your athletes are performing.", cta: "Add Player" },
};

export function Overview({ config, session, onSelect }: { config: WorkspaceConfig; session: Session; onSelect: (l: string) => void }) {
  const t = TITLES[config.type];
  const firstName = session.name.replace(/^(Dr\.|Coach)\s+/i, "").split(" ")[0];
  const statTargets = config.commandCenter.map((c) => c.label);

  return (
    <div className="space-y-6" data-testid={`overview-${config.type}`}>
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-[28px]">{t.title}</h1>
            <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1", config.accent.soft, config.accent.text, config.accent.ring)}>
              Overview
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Welcome back, {firstName}. {t.snapshot}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-50">
            <Download className="size-4" /> Export
          </button>
          <button className={cn("inline-flex h-10 items-center gap-1.5 rounded-xl bg-gradient-to-r px-3.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-px hover:shadow-lg", config.accent.gradient)}>
            <Plus className="size-4" /> {t.cta}
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {config.stats.map((s, i) => (
          <StatCard key={s.label} stat={s} accent={config.accent} onAction={() => onSelect(statTargets[i] ?? "Dashboard")} />
        ))}
      </div>

      {/* charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title={config.trend.title} caption={config.trend.caption}>
          <TrendChart config={config} />
        </ChartCard>
        <ChartCard title={config.bars.title} caption={config.bars.caption}>
          <BarsChart config={config} />
        </ChartCard>
        <ChartCard title={config.mix.title} caption={config.mix.caption}>
          <MixChart config={config} />
        </ChartCard>
      </div>

      {/* command center + calendar */}
      <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <h3 className="text-[15px] font-bold text-slate-900">Command Center</h3>
            <p className="text-xs text-slate-500">Navigate to the core modules of your {config.label.toLowerCase()}&apos;s operating system.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {config.commandCenter.map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.label}
                    onClick={() => onSelect(m.label)}
                    className="group flex items-start gap-3 rounded-xl border border-slate-200 p-3.5 text-left transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                  >
                    <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl transition-colors", config.accent.soft, config.accent.text)}>
                      <Icon className="size-[18px]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between text-[13.5px] font-semibold text-slate-900">
                        {m.label}
                        <ArrowUpRight className="size-3.5 text-slate-300 transition-colors group-hover:text-slate-600" />
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">{m.desc}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <DataTable
            table={config.table}
            action={
              <button className={cn("text-xs font-semibold hover:underline", config.accent.text)}>View all</button>
            }
          />
        </div>
        <CalendarCard config={config} />
      </div>
    </div>
  );
}
