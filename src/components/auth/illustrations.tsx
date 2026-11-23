/* Hand-built SVG illustrations – no external assets required. */

export function SchoolArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect x="6" y="26" width="52" height="30" rx="4" fill="#dbeafe" />
      <path d="M4 28 32 10l28 18z" fill="#2563eb" />
      <rect x="27" y="40" width="10" height="16" rx="2" fill="#1e40af" />
      <rect x="12" y="34" width="9" height="8" rx="1.5" fill="#fff" />
      <rect x="43" y="34" width="9" height="8" rx="1.5" fill="#fff" />
      <circle cx="32" cy="27" r="4.5" fill="#fff" />
      <path d="M32 24.5v2.8l1.8 1" stroke="#2563eb" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M32 10V3" stroke="#1e3a8a" strokeWidth="1.6" />
      <path d="M32 3h8l-2 2.5 2 2.5h-8z" fill="#f59e0b" />
    </svg>
  );
}

export function CollegeArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path d="M4 22 32 10l28 12-28 12z" fill="#6d28d9" />
      <path d="M16 28v12c8 6 24 6 32 0V28l-16 7z" fill="#8b5cf6" />
      <path d="M56 24v14" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      <circle cx="56" cy="40" r="2.6" fill="#f59e0b" />
      <rect x="10" y="46" width="22" height="5" rx="1.5" fill="#c4b5fd" />
      <rect x="13" y="51" width="22" height="5" rx="1.5" fill="#a78bfa" />
      <rect x="36" y="48" width="18" height="8" rx="2" fill="#ede9fe" />
      <path d="M39 52h12" stroke="#7c3aed" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function SportsArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path d="M20 8h24v10a12 12 0 0 1-24 0z" fill="#f59e0b" />
      <path d="M20 11h-7a7 7 0 0 0 7 9M44 11h7a7 7 0 0 1-7 9" stroke="#d97706" strokeWidth="2.4" fill="none" />
      <rect x="29" y="29" width="6" height="8" fill="#d97706" />
      <rect x="22" y="37" width="20" height="5" rx="1.5" fill="#b45309" />
      <circle cx="16" cy="50" r="9" fill="#fff" stroke="#059669" strokeWidth="2" />
      <path d="m16 45 4 3-1.5 4.6h-5L12 48z" fill="#059669" />
      <circle cx="48" cy="51" r="7.5" fill="#10b981" />
      <path d="M41 49c4 1.5 10 1.5 14 0M42 54c4-1.4 9-1.4 13 0" stroke="#fff" strokeWidth="1.3" fill="none" />
    </svg>
  );
}

/** Large hero scene for the branding panel: floating product preview. */
export function HeroScene() {
  return (
    <div className="relative mx-auto h-[250px] w-full max-w-[460px] select-none">
      {/* main preview card */}
      <div className="absolute inset-x-6 top-6 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-2xl shadow-indigo-950/40 backdrop-blur-md">
        <div className="mb-3 flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-rose-400/80" />
          <span className="size-2.5 rounded-full bg-amber-300/80" />
          <span className="size-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-3 h-2 w-28 rounded-full bg-white/20" />
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            ["Students", "1,254", "bg-sky-300"],
            ["Attendance", "94.6%", "bg-emerald-300"],
            ["Fees", "75%", "bg-amber-300"],
          ].map(([l, v, c]) => (
            <div key={l} className="rounded-xl bg-white/10 p-2.5">
              <p className="text-[10px] text-indigo-100/80">{l}</p>
              <p className="text-sm font-bold text-white">{v}</p>
              <div className="mt-1.5 h-1 rounded-full bg-white/15">
                <div className={`h-1 w-2/3 rounded-full ${c}`} />
              </div>
            </div>
          ))}
        </div>
        <svg viewBox="0 0 300 70" className="mt-3 h-[70px] w-full">
          <defs>
            <linearGradient id="hs-a" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#a5b4fc" stopOpacity=".55" />
              <stop offset="1" stopColor="#a5b4fc" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 58 L30 50 L60 54 L90 40 L120 46 L150 30 L180 34 L210 20 L240 26 L270 12 L300 8 V70 H0Z" fill="url(#hs-a)" />
          <path d="M0 58 L30 50 L60 54 L90 40 L120 46 L150 30 L180 34 L210 20 L240 26 L270 12 L300 8" fill="none" stroke="#c7d2fe" strokeWidth="2.2" strokeLinejoin="round" />
        </svg>
      </div>

      {/* floating chips */}
      <div className="animate-float absolute -left-1 top-0 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-xl">
        <SchoolArt className="size-7" />
        <div>
          <p className="text-[10px] font-medium text-slate-500">Admissions</p>
          <p className="text-xs font-bold text-slate-900">+12 this month</p>
        </div>
      </div>
      <div className="animate-float-delayed absolute -right-2 top-[150px] flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-xl">
        <SportsArt className="size-7" />
        <div>
          <p className="text-[10px] font-medium text-slate-500">State U-16</p>
          <p className="text-xs font-bold text-slate-900">Gold Medal 🏅</p>
        </div>
      </div>
      <div className="animate-float absolute bottom-0 left-10 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-xl">
        <CollegeArt className="size-7" />
        <div>
          <p className="text-[10px] font-medium text-slate-500">Results published</p>
          <p className="text-xs font-bold text-slate-900">B.Sc Sem 5 · 96% pass</p>
        </div>
      </div>
    </div>
  );
}
