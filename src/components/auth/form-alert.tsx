import { CircleAlert, CircleCheck, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export type AlertTone = "error" | "success" | "info";

const STYLES: Record<AlertTone, { box: string; icon: typeof Info }> = {
  error: { box: "border-red-200 bg-red-50 text-red-800", icon: CircleAlert },
  success: { box: "border-emerald-200 bg-emerald-50 text-emerald-800", icon: CircleCheck },
  info: { box: "border-indigo-200 bg-indigo-50 text-indigo-800", icon: Info },
};

export function FormAlert({ tone, title, message }: { tone: AlertTone; title: string; message?: string }) {
  const { box, icon: Icon } = STYLES[tone];
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      data-testid={`alert-${tone}`}
      className={cn("flex gap-2.5 rounded-xl border px-3.5 py-3 text-sm animate-in fade-in slide-in-from-top-2 duration-300", box)}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div>
        <p className="font-semibold">{title}</p>
        {message && <p className="mt-0.5 text-xs opacity-90">{message}</p>}
      </div>
    </div>
  );
}
