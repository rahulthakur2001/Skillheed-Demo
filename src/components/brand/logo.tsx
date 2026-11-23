import { useId } from "react";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  const gid = `es-g-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 40 40" className={cn("size-9", className)} aria-hidden>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4f46e5" />
          <stop offset="1" stopColor="#1e3a8a" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill={`url(#${gid})`} />
      <circle cx="20" cy="20" r="9.5" fill="none" stroke="#fff" strokeOpacity=".9" strokeWidth="2" />
      <ellipse cx="20" cy="20" rx="15" ry="5.2" fill="none" stroke="#a5b4fc" strokeWidth="1.8" transform="rotate(-24 20 20)" />
      <path d="M14.5 19.2 20 16.6l5.5 2.6L20 21.8z" fill="#fff" />
      <path d="M16.6 20.6v2.6c1.9 1.3 4.9 1.3 6.8 0v-2.6" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="32.2" cy="13.4" r="2" fill="#fbbf24" />
    </svg>
  );
}

export function Logo({
  className,
  tone = "dark",
  subtitle = true,
}: {
  className?: string;
  tone?: "dark" | "light";
  subtitle?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <div className="leading-tight">
        <p
          className={cn(
            "text-lg font-extrabold tracking-tight",
            tone === "dark" ? "text-slate-900" : "text-white"
          )}
        >
          Skill<span className={tone === "dark" ? "text-indigo-600" : "text-indigo-300"}>Heed</span>
        </p>
        {subtitle && (
          <p className={cn("text-[11px] font-medium", tone === "dark" ? "text-slate-500" : "text-indigo-200")}>
            School · College · Sports
          </p>
        )}
      </div>
    </div>
  );
}
