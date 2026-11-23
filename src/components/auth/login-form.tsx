"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, KeyRound, LoaderCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { WORKSPACES, type WorkspaceType } from "@/config/workspaces";
import { DEMO_ACCOUNTS, DEMO_PASSWORD, dummySignIn, saveSession } from "@/lib/auth";
import { validateLogin, type LoginErrors, type LoginValues } from "@/lib/validation";
import { FormAlert, type AlertTone } from "./form-alert";
import { FormField } from "./form-field";
import { GoogleButton } from "./google-button";
import { IconInput, PasswordInput } from "./icon-input";
import { WorkspaceSelect } from "./workspace-select";

type Status = "idle" | "loading" | "success";

export function LoginForm() {
  const router = useRouter();
  const [values, setValues] = useState<LoginValues>({ workspace: "", identifier: "", password: "", remember: true });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [alert, setAlert] = useState<{ tone: AlertTone; title: string; message?: string } | null>(null);

  const set = <K extends keyof LoginValues>(key: K, v: LoginValues[K]) => {
    setValues((s) => ({ ...s, [key]: v }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
    if (alert?.tone === "error") setAlert(null);
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validateLogin(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setAlert({ tone: "error", title: "Please fix the highlighted fields." });
      return;
    }
    setAlert(null);
    setStatus("loading");
    try {
      const session = await dummySignIn({
        workspace: values.workspace as WorkspaceType,
        identifier: values.identifier,
        password: values.password,
      });
      saveSession(session, values.remember);
      setStatus("success");
      setAlert({
        tone: "success",
        title: `Welcome, ${session.name}!`,
        message: `Signed in to ${session.organization}. Opening your ${WORKSPACES[session.workspace].label} workspace…`,
      });
      setTimeout(() => router.push(`/dashboard/${session.workspace}`), 1300);
    } catch (err) {
      setStatus("idle");
      setAlert({ tone: "error", title: "Sign in failed", message: (err as Error).message });
    }
  }

  function fillDemo(type: WorkspaceType) {
    const acc = DEMO_ACCOUNTS.find((a) => a.workspace === type)!;
    setValues((s) => ({ ...s, workspace: type, identifier: acc.identifiers[0], password: DEMO_PASSWORD }));
    setErrors({});
    setAlert({ tone: "info", title: "Demo credentials filled", message: `${WORKSPACES[type].label} workspace · password ${DEMO_PASSWORD}` });
  }

  const busy = status !== "idle";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4" data-testid="login-form">
      {alert && <FormAlert {...alert} />}

      <FormField id="workspace" label="Workspace Type" error={errors.workspace}>
        <WorkspaceSelect id="workspace" value={values.workspace} onChange={(v) => set("workspace", v)} invalid={!!errors.workspace} />
      </FormField>

      <FormField id="identifier" label="Organization ID / Email" error={errors.identifier}>
        <IconInput
          id="identifier"
          icon={Mail}
          autoComplete="username"
          placeholder="e.g. GVS-1024 or admin@school.edu.in"
          value={values.identifier}
          onChange={(e) => set("identifier", e.target.value)}
          invalid={!!errors.identifier}
          disabled={busy}
        />
      </FormField>

      <FormField
        id="password"
        label="Password"
        error={errors.password}
        aside={
          <button
            type="button"
            onClick={() =>
              setAlert({
                tone: "info",
                title: "Password reset",
                message: "A secure reset link will be sent to your registered email. (Demo mode)",
              })
            }
            className="text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-800 hover:underline"
          >
            Forgot password?
          </button>
        }
      >
        <PasswordInput
          id="password"
          icon={KeyRound}
          autoComplete="current-password"
          placeholder="Enter your password"
          value={values.password}
          onChange={(e) => set("password", e.target.value)}
          invalid={!!errors.password}
          disabled={busy}
        />
      </FormField>

      <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-slate-600 select-none">
        <Checkbox
          checked={values.remember}
          onCheckedChange={(c) => set("remember", !!c)}
          className="size-[18px] rounded-[5px] data-checked:border-indigo-600 data-checked:bg-indigo-600"
        />
        Remember me on this device
      </label>

      <Button
        type="submit"
        disabled={busy}
        data-testid="sign-in"
        className="group h-11 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-blue-700 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:-translate-y-px hover:from-indigo-500 hover:to-blue-600 hover:shadow-xl hover:shadow-indigo-600/30 disabled:opacity-90"
      >
        {status === "loading" ? (
          <>
            <LoaderCircle className="size-4 animate-spin" /> Signing in…
          </>
        ) : status === "success" ? (
          "Redirecting…"
        ) : (
          <>
            Sign In <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </Button>

      <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-wider text-slate-400">
        <span className="h-px flex-1 bg-slate-200" /> or <span className="h-px flex-1 bg-slate-200" />
      </div>

      <GoogleButton
        disabled={busy}
        onClick={() =>
          setAlert({
            tone: "info",
            title: "Google Sign-In",
            message: "Single sign-on is enabled by your organization admin. Use demo credentials for this preview.",
          })
        }
      />

      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/70 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Try a demo workspace</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {(["school", "college", "sports"] as WorkspaceType[]).map((t) => {
            const Icon = WORKSPACES[t].icon;
            return (
              <button
                key={t}
                type="button"
                disabled={busy}
                onClick={() => fillDemo(t)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition-all hover:-translate-y-px hover:border-indigo-300 hover:text-indigo-700 hover:shadow-sm"
              >
                <Icon className="size-3.5" /> {WORKSPACES[t].label}
              </button>
            );
          })}
        </div>
      </div>
    </form>
  );
}
