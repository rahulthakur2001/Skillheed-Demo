import type { TableConfig } from "@/config/workspaces";
import { cn } from "@/lib/utils";

const statusTone = (s: string) =>
  /approved|confirmed|ready|booked/i.test(s)
    ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
    : /pending|moderation|awaiting/i.test(s)
      ? "bg-amber-50 text-amber-700 ring-amber-200"
      : "bg-indigo-50 text-indigo-700 ring-indigo-200";

export function DataTable({ table, action }: { table: TableConfig; action?: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
      <div className="flex items-center justify-between px-5 py-4">
        <h3 className="text-[15px] font-bold text-slate-900">{table.title}</h3>
        {action}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-y border-slate-100 bg-slate-50/70 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {table.columns.map((c) => (
                <th key={c} className="px-5 py-2.5">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row[0]} className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/60">
                {row.map((cell, i) => (
                  <td key={i} className={cn("px-5 py-3", i === 0 ? "font-semibold text-slate-900" : "text-slate-600")}>
                    {i === row.length - 1 ? (
                      <span className={cn("inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ring-1", statusTone(cell))}>{cell}</span>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
