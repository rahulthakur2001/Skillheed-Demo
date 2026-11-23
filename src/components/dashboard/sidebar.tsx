"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import type { WorkspaceConfig } from "@/config/workspaces";
import type { Session } from "@/lib/auth";
import { cn } from "@/lib/utils";

export function Sidebar({
  config,
  session,
  active,
  onSelect,
  mobileOpen,
}: {
  config: WorkspaceConfig;
  session: Session;
  active: string;
  onSelect: (label: string) => void;
  mobileOpen: boolean;
}) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const WsIcon = config.icon;

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-[272px] flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0",
        mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      )}
    >
      <div className="flex items-center gap-2.5 px-5 pb-4 pt-5">
        <LogoMark className="size-8" />
        <div className="leading-tight">
          <p className="text-[15px] font-extrabold tracking-tight text-slate-900">
            Edu<span className="text-indigo-600">Sphere</span>
          </p>
          <p className="text-[11px] font-medium text-slate-500">{config.label} Workspace</p>
        </div>
      </div>

      {/* organization switch card */}
      <div className="mx-4 mb-3 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2.5">
        <div className={cn("grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white shadow-sm", config.accent.gradient)}>
          <WsIcon className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-slate-900">{session.organization}</p>
          <p className="text-[11px] text-slate-500">ID · {config.shortCode}-{config.type === "school" ? "1024" : config.type === "college" ? "2045" : "3310"}</p>
        </div>
      </div>

      <nav className="scrollbar-thin flex-1 space-y-1 overflow-y-auto px-3 pb-4" data-testid="sidebar-nav">
        {config.nav.map((group) => {
          const isCollapsed = collapsed[group.title];
          return (
            <div key={group.title} className="pt-2">
              <button
                onClick={() => setCollapsed((c) => ({ ...c, [group.title]: !c[group.title] }))}
                className="flex w-full items-center gap-1 px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 transition-colors hover:text-slate-600"
              >
                {group.title}
                <ChevronDown className={cn("size-3 transition-transform", isCollapsed && "-rotate-90")} />
              </button>
              {!isCollapsed && (
                <ul className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = active === item.label;
                    return (
                      <li key={item.label}>
                        <button
                          onClick={() => onSelect(item.label)}
                          data-testid={`nav-${item.label}`}
                          className={cn(
                            "group flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left text-[13.5px] font-medium transition-all",
                            isActive
                              ? cn("text-slate-900 shadow-sm ring-1", config.accent.soft, config.accent.ring)
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          )}
                        >
                          <span
                            className={cn(
                              "grid size-7 shrink-0 place-items-center rounded-lg transition-colors",
                              isActive ? cn("bg-gradient-to-br text-white", config.accent.gradient) : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-700 group-hover:shadow-sm"
                            )}
                          >
                            <Icon className="size-[15px]" />
                          </span>
                          <span className="truncate">{item.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      <div className="border-t border-slate-100 p-4">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 p-3.5 text-white">
          <p className="text-[13px] font-semibold">Upgrade to EduSphere Pro</p>
          <p className="mt-0.5 text-[11px] text-indigo-100">AI insights, advanced analytics & priority support.</p>
        </div>
      </div>
    </aside>
  );
}
