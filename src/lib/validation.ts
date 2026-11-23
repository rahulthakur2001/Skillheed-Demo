import type { WorkspaceType } from "@/config/workspaces";

export interface LoginValues {
  workspace: WorkspaceType | "";
  identifier: string;
  password: string;
  remember: boolean;
}

export type LoginErrors = Partial<Record<"workspace" | "identifier" | "password", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ORG_ID_RE = /^[A-Za-z]{2,5}-\d{3,6}$/;

export function validateLogin(values: LoginValues): LoginErrors {
  const errors: LoginErrors = {};
  if (!values.workspace) errors.workspace = "Select your workspace type.";

  const id = values.identifier.trim();
  if (!id) errors.identifier = "Enter your Organization ID or email.";
  else if (id.includes("@") ? !EMAIL_RE.test(id) : !ORG_ID_RE.test(id))
    errors.identifier = id.includes("@")
      ? "Enter a valid email address."
      : "Organization ID looks like GVS-1024.";

  if (!values.password) errors.password = "Enter your password.";
  else if (values.password.length < 6)
    errors.password = "Password must be at least 6 characters.";

  return errors;
}
