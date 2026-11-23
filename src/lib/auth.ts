// Dummy authentication for UI demonstration only. No backend is called.
import type { WorkspaceType } from "@/config/workspaces";

export interface DemoAccount {
  workspace: WorkspaceType;
  identifiers: string[]; // email or organization ID
  password: string;
  name: string;
  role: string;
  organization: string;
}

export const DEMO_PASSWORD = "Demo@123";

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    workspace: "school",
    identifiers: ["admin@greenvalley.edu.in", "GVS-1024"],
    password: DEMO_PASSWORD,
    name: "Ram Sharma",
    role: "School Administrator",
    organization: "Green Valley Public School",
  },
  {
    workspace: "college",
    identifiers: ["admin@stxavierscollege.edu.in", "SXC-2045"],
    password: DEMO_PASSWORD,
    name: "Dr. Priya Nair",
    role: "Registrar",
    organization: "St. Xavier's College of Science & Arts",
  },
  {
    workspace: "sports",
    identifiers: ["admin@championsacademy.in", "CSA-3310"],
    password: DEMO_PASSWORD,
    name: "Coach Arjun Mehta",
    role: "Academy Director",
    organization: "Champions Sports Academy",
  },
];

export interface Session {
  name: string;
  role: string;
  organization: string;
  workspace: WorkspaceType;
}

const SESSION_KEY = "skillheed.session";

export async function dummySignIn(input: {
  workspace: WorkspaceType;
  identifier: string;
  password: string;
}): Promise<Session> {
  // Simulate network latency so the loading state is visible.
  await new Promise((r) => setTimeout(r, 1400));
  const id = input.identifier.trim().toLowerCase();
  const account = DEMO_ACCOUNTS.find(
    (a) =>
      a.workspace === input.workspace &&
      a.identifiers.some((x) => x.toLowerCase() === id)
  );
  if (!account || account.password !== input.password) {
    throw new Error(
      "Invalid credentials for this workspace. Check your Organization ID / Email and password."
    );
  }
  return {
    name: account.name,
    role: account.role,
    organization: account.organization,
    workspace: account.workspace,
  };
}

export function saveSession(session: Session, remember: boolean) {
  try {
    const store = remember ? localStorage : sessionStorage;
    store.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    /* storage unavailable – demo continues without persistence */
  }
}

export function readSession(): Session | null {
  try {
    const raw =
      sessionStorage.getItem(SESSION_KEY) ?? localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}
