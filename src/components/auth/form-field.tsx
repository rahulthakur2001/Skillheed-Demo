import type { ReactNode } from "react";
import { CircleAlert } from "lucide-react";
import { Label } from "@/components/ui/label";

export function FormField({
  id,
  label,
  error,
  aside,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-[13px] font-semibold text-slate-700">
          {label}
        </Label>
        {aside}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1 text-xs font-medium text-red-600 animate-in fade-in slide-in-from-top-1">
          <CircleAlert className="size-3.5" /> {error}
        </p>
      )}
    </div>
  );
}
