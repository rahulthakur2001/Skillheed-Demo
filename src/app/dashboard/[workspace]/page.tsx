import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { WORKSPACES, type WorkspaceType } from "@/config/workspaces";

export function generateStaticParams() {
  return Object.keys(WORKSPACES).map((workspace) => ({ workspace }));
}

export default async function DashboardPage({ params }: { params: Promise<{ workspace: string }> }) {
  const { workspace } = await params;
  if (!(workspace in WORKSPACES)) notFound();
  return <DashboardShell workspace={workspace as WorkspaceType} />;
}
