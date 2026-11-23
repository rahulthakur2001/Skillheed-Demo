"use client";

import { useState, type ComponentProps } from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const fieldClass =
  "h-11 rounded-xl border-slate-200 bg-white pl-10 text-sm shadow-xs transition-all placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-indigo-500 focus-visible:ring-4 focus-visible:ring-indigo-500/15";

export function IconInput({
  icon: Icon,
  invalid,
  className,
  ...props
}: ComponentProps<typeof Input> & { icon: LucideIcon; invalid?: boolean }) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
      <Input
        aria-invalid={invalid || undefined}
        className={cn(fieldClass, invalid && "border-red-400 focus-visible:border-red-500 focus-visible:ring-red-500/15", className)}
        {...props}
      />
    </div>
  );
}

export function PasswordInput({
  icon,
  invalid,
  ...props
}: Omit<ComponentProps<typeof Input>, "type"> & { icon: LucideIcon; invalid?: boolean }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <IconInput icon={icon} invalid={invalid} type={visible ? "text" : "password"} className="pr-11" {...props} />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        data-testid="toggle-password"
        className="absolute right-1.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
      >
        {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}
