"use client";

import type { ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { WorkspaceConfig } from "@/config/workspaces";

export function ChartCard({ title, caption, children, right }: { title: string; caption: string; children: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-[15px] font-bold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500">{caption}</p>
        </div>
        {right}
      </div>
      <div className="mt-4 h-[220px]">{children}</div>
    </div>
  );
}

const axis = { fontSize: 11, fill: "#94a3b8" };
const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid #e2e8f0",
  boxShadow: "0 10px 30px -10px rgba(15,23,42,.2)",
  fontSize: 12,
};

export function TrendChart({ config }: { config: WorkspaceConfig }) {
  const c = config.accent.chart;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={config.trend.data} margin={{ left: -18, right: 6, top: 6 }}>
        <defs>
          <linearGradient id={`tg-${config.type}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={c} stopOpacity={0.28} />
            <stop offset="1" stopColor={c} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey="m" tick={axis} axisLine={false} tickLine={false} />
        <YAxis tick={axis} axisLine={false} tickLine={false} domain={["auto", "auto"]} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="v" name={config.trend.title} stroke={c} strokeWidth={2.5} fill={`url(#tg-${config.type})`} dot={{ r: 3, fill: "#fff", strokeWidth: 2 }} activeDot={{ r: 5 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function BarsChart({ config }: { config: WorkspaceConfig }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={config.bars.data} margin={{ left: -18, right: 6, top: 6 }}>
        <CartesianGrid stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey="name" tick={axis} axisLine={false} tickLine={false} />
        <YAxis tick={axis} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#f8fafc" }} />
        <Bar dataKey="v" name={config.bars.title} radius={[8, 8, 0, 0]} maxBarSize={56}>
          {config.bars.data.map((_, i) => (
            <Cell key={i} fill={i % 2 ? config.accent.chart : config.accent.chart2} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

const MIX_COLORS = ["#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#f43f5e"];

export function MixChart({ config }: { config: WorkspaceConfig }) {
  const data = config.mix.data;
  const total = data.reduce((s, d) => s + d.v, 0);
  const colors = config.type === "sports" ? ["#f59e0b", "#94a3b8", "#b45309"] : MIX_COLORS;
  return (
    <div className="flex h-full items-center gap-4">
      <div className="relative h-full w-1/2 min-w-[140px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="v" nameKey="name" innerRadius="62%" outerRadius="92%" paddingAngle={3} stroke="none">
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="text-xl font-extrabold text-slate-900">{total}</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">{config.type === "sports" ? "medals" : "%"}</p>
          </div>
        </div>
      </div>
      <ul className="flex-1 space-y-2">
        {data.map((d, i) => (
          <li key={d.name} className="flex items-center justify-between gap-2 text-xs">
            <span className="flex items-center gap-2 text-slate-600">
              <span className="size-2.5 rounded-full" style={{ background: colors[i % colors.length] }} />
              {d.name}
            </span>
            <span className="font-semibold text-slate-900">{d.v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
