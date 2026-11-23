import type { ReactNode } from "react";

export function FeatureCard({
  art,
  title,
  description,
}: {
  art: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.07] p-3.5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.12]">
      <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-white shadow-lg shadow-indigo-950/30 transition-transform duration-300 group-hover:scale-105">
        {art}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="truncate text-xs text-indigo-100/75">{description}</p>
      </div>
    </div>
  );
}
