import { BrandPanel } from "@/components/auth/brand-panel";
import { LoginCard } from "@/components/auth/login-card";
import { Logo } from "@/components/brand/logo";

export default function LoginPage() {
  return (
    <main className="grid min-h-dvh bg-white lg:grid-cols-[1.05fr_1fr]">
      <BrandPanel />

      <section className="relative flex flex-col overflow-hidden bg-gradient-to-b from-slate-50 via-white to-indigo-50/60">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="pointer-events-none absolute -right-20 top-10 size-72 rounded-full bg-indigo-200/40 blur-3xl" />

        <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-8">
          <Logo className="lg:invisible" />
          <p className="text-sm text-slate-500">
            <span className="hidden sm:inline">New to EduSphere? </span>
            <a href="#demo" className="font-semibold text-indigo-600 hover:text-indigo-800">
              Book a demo
            </a>
          </p>
        </header>

        <div className="relative z-10 flex flex-1 items-center justify-center px-4 pb-10 sm:px-8">
          <LoginCard />
        </div>

        <footer className="relative z-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 px-5 pb-6 text-xs text-slate-400">
          <a href="#privacy" className="hover:text-slate-600">Privacy Policy</a>
          <a href="#terms" className="hover:text-slate-600">Terms of Service</a>
          <a href="#status" className="inline-flex items-center gap-1.5 hover:text-slate-600">
            <span className="size-1.5 rounded-full bg-emerald-500" /> All systems operational
          </a>
        </footer>
      </section>
    </main>
  );
}
