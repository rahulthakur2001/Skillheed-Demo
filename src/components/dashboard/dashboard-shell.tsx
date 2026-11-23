"use client";

import { useEffect, useState } from "react";
import { WORKSPACES, type WorkspaceType } from "@/config/workspaces";
import { readSession, type Session } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { ModuleView } from "./module-view";
import { Overview } from "./overview";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

const FALLBACK: Record<WorkspaceType, Omit<Session, "workspace">> = {
  school: { name: "Ram Sharma", role: "School Administrator", organization: "Green Valley Public School" },
  college: { name: "Dr. Priya Nair", role: "Registrar", organization: "St. Xavier's College of Science & Arts" },
  sports: { name: "Coach Arjun Mehta", role: "Academy Director", organization: "Champions Sports Academy" },
};

export function DashboardShell({ workspace }: { workspace: WorkspaceType }) {
  const config = WORKSPACES[workspace];
  const [active, setActive] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [session, setSession] = useState<Session>({ ...FALLBACK[workspace], workspace });

  useEffect(() => {
    const s = readSession();
    if (s && s.workspace === workspace) setSession(s);
  }, [workspace]);

  const select = (label: string) => {
    setActive(label);
    setMobileOpen(false);
    document.getElementById("main-scroll")?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex h-dvh overflow-hidden bg-slate-50">
      {/* mobile backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        className={cn(
          "fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <Sidebar config={config} session={session} active={active} onSelect={select} mobileOpen={mobileOpen} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar config={config} session={session} active={active} onMenu={() => setMobileOpen(true)} onSelect={select} />
        <main id="main-scroll" className="scrollbar-thin flex-1 overflow-y-auto">
          <div key={active} className="mx-auto max-w-[1400px] px-4 py-6 animate-in fade-in slide-in-from-bottom-2 duration-300 sm:px-6 lg:px-8">
            {active === "Dashboard" ? (
              <Overview config={config} session={session} onSelect={select} />
            ) : (
              <ModuleView config={config} module={active} onBack={() => select("Dashboard")} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
