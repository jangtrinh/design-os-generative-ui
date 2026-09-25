import * as React from "react";
import { z } from "zod";
import { ActionContractSchema } from "../types.js";
import { dispatchDesignOSAction } from "../../engine/events.js";

export const AgentStatusSchema = z.enum(["running", "idle", "waiting_approval", "error", "completed"]);
export const SwarmHealthSchema = z.enum(["healthy", "degraded", "blocked", "intervention_required"]);

export const SwarmAgentSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  status: AgentStatusSchema,
  currentTask: string(),
  latencyMs: z.number().optional(),
  tokensUsed: z.number().optional(),
});

function string() {
  return z.string();
}

export const SwarmRootCauseAlertSchema = z.object({
  severity: z.enum(["warning", "critical"]),
  issue: z.string(),
  affectedAgent: z.string(),
  suggestedRemedy: z.string(),
  blastRadius: z.enum(["low", "medium", "critical"]),
});

export const SwarmMissionControlSchema = z.object({
  title: z.string(),
  swarmHealth: SwarmHealthSchema,
  activeAgentsCount: z.number(),
  totalTasksCompleted: z.number(),
  agents: z.array(SwarmAgentSchema),
  rootCauseAlert: SwarmRootCauseAlertSchema.optional(),
  actions: z.array(ActionContractSchema).optional(),
});

export type SwarmMissionControlProps = z.infer<typeof SwarmMissionControlSchema> & {
  onAction?: (action: z.infer<typeof ActionContractSchema>) => void;
};

export const swarmDefaultProps: z.infer<typeof SwarmMissionControlSchema> = {
  title: "Antigravity Autonomous Swarm Mission Control",
  swarmHealth: "intervention_required",
  activeAgentsCount: 4,
  totalTasksCompleted: 28,
  agents: [
    {
      id: "agent-controller",
      name: "Astra Controller",
      role: "Outer Execution Loop & Outcome Contract",
      status: "running",
      currentTask: "Orchestrating Sub-Agents & Verifying Acceptance State",
      latencyMs: 142,
      tokensUsed: 4200,
    },
    {
      id: "agent-reasoner",
      name: "Fable Reasoner",
      role: "Epistemic Ledger & Falsification",
      status: "running",
      currentTask: "Evaluating Decision Tree & Blast Radius Boundary",
      latencyMs: 98,
      tokensUsed: 3100,
    },
    {
      id: "agent-executor",
      name: "Orca Worker Dispatch",
      role: "Supervised Worker & Terminal DAG",
      status: "waiting_approval",
      currentTask: "Attempting Cloud DB Mutation (High Blast Radius)",
      latencyMs: 45,
      tokensUsed: 1850,
    },
    {
      id: "agent-verifier",
      name: "Security Gatekeeper",
      role: "Design System & Zod Type-Safety Auditor",
      status: "completed",
      currentTask: "Verified 100% Stark Zinc Palette & 0 Schema Violations",
      latencyMs: 12,
      tokensUsed: 800,
    },
  ],
  rootCauseAlert: {
    severity: "critical",
    issue: "Agent Orca Worker Dispatch requires human confirmation before modifying production schema.",
    affectedAgent: "Orca Worker Dispatch",
    suggestedRemedy: "Review SQL Diff, evaluate blast radius, and click 'Phê Duyệt Bước' to proceed.",
    blastRadius: "critical",
  },
  actions: [
    {
      id: "approve_mutation",
      label: "Phê Duyệt Bước (Approve)",
      variant: "primary",
      requiredPermission: "admin",
      blastRadius: "critical",
    },
    {
      id: "inspect_diff",
      label: "Xem Chi Tiết Bằng Chứng (Inspect Evidence)",
      variant: "outline",
      requiredPermission: "read",
      blastRadius: "low",
    },
    {
      id: "pause_swarm",
      label: "Tạm Dừng Toàn Bộ Swarm (Pause)",
      variant: "danger",
      requiredPermission: "execute",
      blastRadius: "medium",
    },
  ],
};

export const swarmSystem1Criteria =
  "Quản trị multi-agent swarm, giám sát bầy sub-agents tự trị, điều phối agentic workflow theo ngoại lệ, cây phân tích sự cố root cause, phê duyệt hành động can thiệp khẩn cấp (HITL)";

export const SwarmMissionControl: React.FC<SwarmMissionControlProps> = (props) => {
  const {
    title = swarmDefaultProps.title,
    swarmHealth = swarmDefaultProps.swarmHealth,
    activeAgentsCount = swarmDefaultProps.activeAgentsCount,
    totalTasksCompleted = swarmDefaultProps.totalTasksCompleted,
    agents = swarmDefaultProps.agents,
    rootCauseAlert = swarmDefaultProps.rootCauseAlert,
    actions = swarmDefaultProps.actions,
    onAction,
  } = props;

  const handleActionClick = (action: z.infer<typeof ActionContractSchema>) => {
    // 1. Dispatch custom event on window for cross-framework subscribers
    dispatchDesignOSAction(action, "swarm_mission_control");
    // 2. Call optional direct React prop callback
    onAction?.(action);
  };

  const healthBadgeColor = {
    healthy: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    degraded: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    blocked: "border-red-500/30 bg-red-500/10 text-red-400",
    intervention_required: "border-red-500/40 bg-red-950/60 text-red-300 animate-pulse",
  }[swarmHealth];

  const agentStatusColor: Record<string, string> = {
    running: "bg-emerald-400",
    idle: "bg-zinc-500",
    waiting_approval: "bg-amber-400 animate-ping",
    error: "bg-red-400",
    completed: "bg-zinc-400",
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-100 shadow-2xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
            <h2 className="text-xl font-bold tracking-tight text-white">{title}</h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Dynamic Mission Control • Exception-based Agentic Observability & Steering
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${healthBadgeColor}`}>
            Trạng thái: {swarmHealth.toUpperCase()}
          </span>
          <div className="text-xs text-zinc-400 font-mono border-l border-zinc-800 pl-3">
            {activeAgentsCount} Agents • {totalTasksCompleted} Tasks Done
          </div>
        </div>
      </div>

      {/* Exception-Based Root Cause Alert Banner */}
      {rootCauseAlert && (
        <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-400 text-sm font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-red-500" />
              CẢNH BÁO CAN THIỆP (HITL) • Mức rủi ro: {rootCauseAlert.blastRadius.toUpperCase()}
            </div>
            <span className="text-[11px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
              Target: {rootCauseAlert.affectedAgent}
            </span>
          </div>
          <p className="text-sm text-zinc-200">{rootCauseAlert.issue}</p>
          <div className="text-xs text-amber-300/90 font-mono pt-1">
            💡 Gợi ý giải pháp: {rootCauseAlert.suggestedRemedy}
          </div>
        </div>
      )}

      {/* Multi-Agent Swarm Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-4 space-y-2 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${agentStatusColor[agent.status] || "bg-zinc-500"}`} />
                <h4 className="text-sm font-semibold text-zinc-200">{agent.name}</h4>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                {agent.status}
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-snug">{agent.role}</p>
            <div className="text-xs font-mono text-zinc-300 bg-zinc-950/80 p-2 rounded border border-zinc-800/60">
              ➜ {agent.currentTask}
            </div>
            <div className="flex justify-between items-center text-[10px] text-zinc-400 font-mono pt-1">
              <span>Latency: {agent.latencyMs ?? 0}ms</span>
              <span>Tokens: {agent.tokensUsed ? agent.tokensUsed.toLocaleString() : 0}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Action Contracts Execution Toolbar */}
      {actions && actions.length > 0 && (
        <div className="border-t border-zinc-800 pt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-zinc-400">
            Hợp đồng hành động (Action Contracts):
          </span>
          <div className="flex flex-wrap gap-2">
            {actions.map((act) => {
              const variantStyles = {
                primary: "bg-white text-zinc-950 hover:bg-zinc-200 font-semibold",
                secondary: "bg-zinc-800 text-zinc-200 hover:bg-zinc-700",
                danger: "bg-red-600 text-white hover:bg-red-700 font-semibold",
                outline: "border border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800",
              }[act.variant ?? "primary"];

              return (
                <button
                  key={act.id}
                  type="button"
                  onClick={() => handleActionClick(act)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs transition-all active:scale-95 shadow-sm ${variantStyles}`}
                >
                  {act.label}
                  {act.blastRadius === "critical" && " ⚠️"}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
