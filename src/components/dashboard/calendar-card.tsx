import { CalendarDays } from "lucide-react";
import type { WorkspaceConfig } from "@/config/workspaces";
import { cn } from "@/lib/utils";

// November 2026 starts on a Sunday.
const DAYS_IN_MONTH = 30;
const FIRST_WEEKDAY = 0;
const TODAY = 23;

export function CalendarCard({ config }: { config: WorkspaceConfig }) {
  const eventDays = new Set(config.calendar.map((e) => e.day));
  const cells = [...Array(FIRST_WEEKDAY).fill(null), ...Array.from({ length: DAYS_IN_MONTH }, (_, i) => i + 1)];
  const upcoming = config.calendar.filter((e) => e.day >= TODAY - 2).slice(0, 3);
  const title = config.type === "school" ? "School Calendar" : config.type === "college" ? "Academic Calendar" : "Academy Calendar";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[15px] font-bold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500">November 2026</p>
        </div>
        <CalendarDays className="size-5 text-slate-400" />
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px]">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i} className="pb-1 font-semibold text-slate-400">
            {d}
          </span>
        ))}
        {cells.map((d, i) => (
          <span
            key={i}
            className={cn(
              "relative grid aspect-square place-items-center rounded-lg font-medium",
              !d && "invisible",
              d === TODAY
                ? cn("bg-gradient-to-br text-white shadow-sm", config.accent.gradient)
                : eventDays.has(d as number)
                  ? cn("font-bold", config.accent.soft, config.accent.text)
                  : "text-slate-600 hover:bg-slate-50"
            )}
          >
            {d}
          </span>
        ))}
      </div>

      <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
        {(upcoming.length ? upcoming : config.calendar.slice(-3)).map((e) => (
          <li key={e.title} className="flex items-center gap-3">
            <span className={cn("grid size-9 shrink-0 place-items-center rounded-xl text-xs font-bold", config.accent.soft, config.accent.text)}>
              {e.day}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-slate-800">{e.title}</p>
              <p className="text-[11px] text-slate-500">{e.tag} · Nov {e.day}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
