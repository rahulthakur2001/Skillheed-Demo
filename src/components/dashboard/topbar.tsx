"use client";

import { useRouter } from "next/navigation";
import { Bell, ChevronRight, LogOut, Menu, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { WorkspaceConfig } from "@/config/workspaces";
import { clearSession, type Session } from "@/lib/auth";
import { cn } from "@/lib/utils";

const initials = (name: string) =>
  name
    .replace(/^(Dr\.|Coach)\s+/i, "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

export function Topbar({
  config,
  session,
  active,
  onMenu,
  onSelect,
}: {
  config: WorkspaceConfig;
  session: Session;
  active: string;
  onMenu: () => void;
  onSelect: (label: string) => void;
}) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <button onClick={onMenu} className="grid size-9 place-items-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden" aria-label="Open menu">
        <Menu className="size-5" />
      </button>

      <nav className="hidden items-center gap-1.5 text-sm text-slate-500 md:flex">
        <button onClick={() => onSelect("Dashboard")} className="hover:text-slate-900">
          {config.label}
        </button>
        <ChevronRight className="size-3.5" />
        <span className="font-semibold text-slate-900">{active}</span>
      </nav>

      <div className="relative ml-auto hidden w-full max-w-xs sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <input
          placeholder="Search students, modules, reports…"
          className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-12 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
        />
        <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-slate-200 bg-white px-1.5 text-[10px] font-semibold text-slate-400">
          Ctrl K
        </kbd>
      </div>

      <button className="relative grid size-9 shrink-0 place-items-center rounded-xl text-slate-600 transition-colors hover:bg-slate-100 sm:ml-0 ml-auto" aria-label="Notifications">
        <Bell className="size-[18px]" />
        <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500 ring-2 ring-white" />
      </button>

      <div className="flex items-center gap-2.5 border-l border-slate-200 pl-3">
        <Avatar className="size-9">
          <AvatarFallback className={cn("bg-gradient-to-br text-xs font-bold text-white", config.accent.gradient)}>
            {initials(session.name)}
          </AvatarFallback>
        </Avatar>
        <div className="hidden leading-tight md:block">
          <p className="text-[13px] font-semibold text-slate-900">{session.name}</p>
          <p className="text-[11px] text-slate-500">{session.role}</p>
        </div>
        <button
          data-testid="logout"
          onClick={() => {
            clearSession();
            router.push("/login");
          }}
          className="ml-1 inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 px-2.5 text-xs font-semibold text-slate-600 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="size-3.5" /> <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
