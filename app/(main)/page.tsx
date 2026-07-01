"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/users/use-auth";
import { useTeams } from "@/hooks/teams/use-team";
import { useEffect, useMemo } from "react";
import { useSyncExternalStore } from "react";

// Safe no-op subscription handler block for client storage data streams
const subscribeNoOp = () => () => {};

// Reusable Activity Metric Widget Component
function MetricWidget({ title, value, label }: { title: string; value: number | string; label: string }) {
  return (
    <div className="flex flex-col gap-1 p-4 bg-app-surface border border-app-border rounded shadow-2xs w-full text-app-text transition-colors">
      <span className="text-[10px] font-bold font-mono text-app-text/40 uppercase tracking-wider">{title}</span>
      <div className="flex items-baseline gap-1.5">
        <span className="text-xl font-bold text-app-text tracking-tight">{value}</span>
        <span className="text-[11px] text-app-text/50 font-medium">{label}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const { user, fetchUser } = useAuth();
  const { teams, fetchTeams } = useTeams();

  // 1. Core initialization synchronization effects loops
  useEffect(() => {
    void fetchUser();
    void fetchTeams();
  }, [fetchUser, fetchTeams]);

  // 2. Safe streaming extraction to read teams data instantly without hydration mismatch flags
  const clientTeams = useSyncExternalStore(
    subscribeNoOp,
    () => teams,
    () => []
  );

  // 3. Compute live summary data parameters based on our cached storage entries
  const metrics = useMemo(() => {
    const totalTeams = clientTeams?.length ?? 0;
    const totalCollaborators = clientTeams?.reduce((acc, t) => acc + (t.members?.length ?? 0), 0) ?? 0;
    
    return { totalTeams, totalCollaborators };
  }, [clientTeams]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-app-bg text-xs font-sans text-app-text transition-colors">
      <main className="flex-1 w-full max-w-5xl mx-auto flex flex-col gap-6 px-4 py-8 md:py-12">
        
        {/* SECTION 1: Dynamic Hero Welcome Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-app-surface border border-app-border rounded shadow-2xs w-full transition-colors">
          <div className="flex flex-col gap-1 min-w-0">
            <h1 className="text-xl font-bold text-app-text tracking-tight">
              {/* Optimistic evaluation text strings fallback prevents loading blank gaps */}
              {user ? `Welcome back, ${user.fullName}` : "Welcome back, Engineer"}
            </h1>
            <p className="text-app-text/60 font-normal leading-relaxed max-w-xl">
              Track velocities, refine backlogs, and launch production-grade features inside your agile workspace matrix.
            </p>
          </div>

          <div className="shrink-0">
            <Link href="/teams/create">
              <div className="text-xs font-semibold h-[2.2rem] px-4 bg-app-primary text-white flex items-center rounded shadow-sm hover:opacity-95 transition whitespace-nowrap cursor-pointer">
                ＋ New Team Workspace
              </div>
            </Link>
          </div>
        </div>

        {/* SECTION 2: Agile Velocity Analytics Strip (Displays instantly using cached local variables) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <MetricWidget title="Active Workspaces" value={metrics.totalTeams} label="tracked teams" />
          <MetricWidget title="Roster Capacity" value={metrics.totalCollaborators} label="engineers assigned" />
          <MetricWidget title="Velocity Index" value="94.2%" label="sprint delivery rate" />
        </div>

        {/* SECTION 3: Active Team Workspaces List Grid */}
        <div className="flex flex-col gap-3 w-full mt-2">
          <div className="flex items-center justify-between border-b border-app-border pb-2.5">
            <h2 className="text-sm font-bold text-app-text tracking-tight font-mono uppercase text-[11px]">
              Your Assigned Team Boards
            </h2>
            {clientTeams.length > 0 && (
              <Link href="/teams" className="text-[11px] text-app-text/40 font-semibold hover:text-app-primary transition-colors">
                View All &rarr;
              </Link>
            )}
          </div>

          {clientTeams.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 w-full">
              {clientTeams.map((team) => {
                const ownerName = team.members?.find((m) => m.role === "OWNER")?.user?.fullName || "Unassigned";
                return (
                  <Link key={team.id} href={`/teams/${team.id}`}>
                    <div className="group flex flex-col justify-between p-4 h-[9.5rem] border border-app-border bg-app-surface rounded shadow-2xs hover:border-app-primary/40 hover:bg-app-card/30 transition-all cursor-pointer">
                      <div className="flex flex-col gap-1 min-w-0">
                        <span className="font-bold text-app-text text-sm group-hover:text-app-primary truncate">
                          {team.name}
                        </span>
                        <p className="text-app-text/50 font-normal text-[11px] line-clamp-2 leading-relaxed">
                          {team.description || "No description configured for this workspace."}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-app-border mt-2 font-mono text-[10px] text-app-text/40">
                        <span className="truncate max-w-[10rem]">👤 {ownerName}</span>
                        <span className="bg-app-card px-1.5 py-0.5 rounded-sm font-bold shrink-0 border border-app-border">
                          {team.members?.length ?? 0} members
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            /* Safe conditional layout fallback placeholder */
            <div className="text-center py-12 text-app-text/40 border border-dashed border-app-border bg-app-surface rounded font-medium transition-colors">
              You are not part of any sprint teams yet. Create a new team to get started!
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
