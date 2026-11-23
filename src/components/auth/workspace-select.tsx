"use client";

import { Building } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WORKSPACE_LIST, WORKSPACES, type WorkspaceType } from "@/config/workspaces";
import { cn } from "@/lib/utils";

export function WorkspaceSelect({
  id,
  value,
  onChange,
  invalid,
}: {
  id: string;
  value: WorkspaceType | "";
  onChange: (v: WorkspaceType) => void;
  invalid?: boolean;
}) {
  const selected = value ? WORKSPACES[value] : null;
  const SelectedIcon = selected?.icon ?? Building;

  return (
    <Select value={value || null} onValueChange={(v) => v && onChange(v as WorkspaceType)}>
      <SelectTrigger
        id={id}
        data-testid="workspace-trigger"
        aria-invalid={invalid || undefined}
        className={cn(
          "h-11! w-full rounded-xl border-slate-200 bg-white px-3.5 text-sm shadow-xs transition-all hover:border-slate-300 focus-visible:border-indigo-500 focus-visible:ring-4 focus-visible:ring-indigo-500/15",
          invalid && "border-red-400"
        )}
      >
        <SelectValue>
          {() => (
            <span className="flex items-center gap-2.5">
              <SelectedIcon className={cn("size-4", selected ? "text-indigo-600" : "text-slate-400")} />
              <span className={selected ? "text-slate-900" : "text-slate-400"}>
                {selected ? selected.label : "Select workspace type"}
              </span>
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="rounded-xl p-1.5" alignItemWithTrigger={false}>
        {WORKSPACE_LIST.map((w) => {
          const Icon = w.icon;
          return (
            <SelectItem key={w.type} value={w.type} data-testid={`workspace-${w.type}`} className="rounded-lg py-2">
              <span className="grid size-8 place-items-center rounded-lg bg-indigo-50 text-indigo-600">
                <Icon className="size-4" />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900">{w.label}</span>
                <span className="text-xs text-slate-500">{w.tagline}</span>
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
