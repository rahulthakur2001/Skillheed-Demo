import { Headset, Lock } from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { LoginForm } from "./login-form";

export function LoginCard() {
  return (
    <div className="w-full max-w-[440px] rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_60px_-20px_rgba(30,41,99,0.25)] backdrop-blur-xl sm:p-8">
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-indigo-500/30 blur-xl" />
          <LogoMark className="relative size-12" />
        </div>
        <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900">Welcome Back!</h2>
        <p className="mt-1 text-sm text-slate-500">Sign in to your organization workspace.</p>
      </div>

      <LoginForm />

      <div className="mt-6 flex flex-col items-center gap-2 border-t border-slate-100 pt-5 text-center text-xs text-slate-500">
        <p>
          Need help accessing your workspace?{" "}
          <a href="#support" className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800 hover:underline">
            <Headset className="size-3.5" /> Contact Support
          </a>
        </p>
        <p className="flex items-center gap-1 text-slate-400">
          <Lock className="size-3" /> Secured with 256-bit TLS encryption
        </p>
      </div>
    </div>
  );
}
