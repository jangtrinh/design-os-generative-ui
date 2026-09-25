import * as React from "react";
import { z } from "zod";
import { ActionContractSchema } from "../types.js";
export declare const AgentStatusSchema: z.ZodEnum<["running", "idle", "waiting_approval", "error", "completed"]>;
export declare const SwarmHealthSchema: z.ZodEnum<["healthy", "degraded", "blocked", "intervention_required"]>;
export declare const SwarmAgentSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    role: z.ZodString;
    status: z.ZodEnum<["running", "idle", "waiting_approval", "error", "completed"]>;
    currentTask: z.ZodString;
    latencyMs: z.ZodOptional<z.ZodNumber>;
    tokensUsed: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "error" | "running" | "idle" | "waiting_approval" | "completed";
    name: string;
    role: string;
    currentTask: string;
    latencyMs?: number | undefined;
    tokensUsed?: number | undefined;
}, {
    id: string;
    status: "error" | "running" | "idle" | "waiting_approval" | "completed";
    name: string;
    role: string;
    currentTask: string;
    latencyMs?: number | undefined;
    tokensUsed?: number | undefined;
}>;
export declare const SwarmRootCauseAlertSchema: z.ZodObject<{
    severity: z.ZodEnum<["warning", "critical"]>;
    issue: z.ZodString;
    affectedAgent: z.ZodString;
    suggestedRemedy: z.ZodString;
    blastRadius: z.ZodEnum<["low", "medium", "critical"]>;
}, "strip", z.ZodTypeAny, {
    blastRadius: "low" | "medium" | "critical";
    severity: "critical" | "warning";
    issue: string;
    affectedAgent: string;
    suggestedRemedy: string;
}, {
    blastRadius: "low" | "medium" | "critical";
    severity: "critical" | "warning";
    issue: string;
    affectedAgent: string;
    suggestedRemedy: string;
}>;
export declare const SwarmMissionControlSchema: z.ZodObject<{
    title: z.ZodString;
    swarmHealth: z.ZodEnum<["healthy", "degraded", "blocked", "intervention_required"]>;
    activeAgentsCount: z.ZodNumber;
    totalTasksCompleted: z.ZodNumber;
    agents: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        role: z.ZodString;
        status: z.ZodEnum<["running", "idle", "waiting_approval", "error", "completed"]>;
        currentTask: z.ZodString;
        latencyMs: z.ZodOptional<z.ZodNumber>;
        tokensUsed: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: "error" | "running" | "idle" | "waiting_approval" | "completed";
        name: string;
        role: string;
        currentTask: string;
        latencyMs?: number | undefined;
        tokensUsed?: number | undefined;
    }, {
        id: string;
        status: "error" | "running" | "idle" | "waiting_approval" | "completed";
        name: string;
        role: string;
        currentTask: string;
        latencyMs?: number | undefined;
        tokensUsed?: number | undefined;
    }>, "many">;
    rootCauseAlert: z.ZodOptional<z.ZodObject<{
        severity: z.ZodEnum<["warning", "critical"]>;
        issue: z.ZodString;
        affectedAgent: z.ZodString;
        suggestedRemedy: z.ZodString;
        blastRadius: z.ZodEnum<["low", "medium", "critical"]>;
    }, "strip", z.ZodTypeAny, {
        blastRadius: "low" | "medium" | "critical";
        severity: "critical" | "warning";
        issue: string;
        affectedAgent: string;
        suggestedRemedy: string;
    }, {
        blastRadius: "low" | "medium" | "critical";
        severity: "critical" | "warning";
        issue: string;
        affectedAgent: string;
        suggestedRemedy: string;
    }>>;
    actions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodString;
        variant: z.ZodDefault<z.ZodEnum<["primary", "secondary", "danger", "outline"]>>;
        requiredPermission: z.ZodDefault<z.ZodEnum<["read", "write", "execute", "admin"]>>;
        blastRadius: z.ZodDefault<z.ZodEnum<["low", "medium", "critical"]>>;
        payload: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        label: string;
        variant: "primary" | "secondary" | "danger" | "outline";
        requiredPermission: "read" | "write" | "execute" | "admin";
        blastRadius: "low" | "medium" | "critical";
        payload?: Record<string, any> | undefined;
    }, {
        id: string;
        label: string;
        variant?: "primary" | "secondary" | "danger" | "outline" | undefined;
        requiredPermission?: "read" | "write" | "execute" | "admin" | undefined;
        blastRadius?: "low" | "medium" | "critical" | undefined;
        payload?: Record<string, any> | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    title: string;
    swarmHealth: "healthy" | "degraded" | "blocked" | "intervention_required";
    activeAgentsCount: number;
    totalTasksCompleted: number;
    agents: {
        id: string;
        status: "error" | "running" | "idle" | "waiting_approval" | "completed";
        name: string;
        role: string;
        currentTask: string;
        latencyMs?: number | undefined;
        tokensUsed?: number | undefined;
    }[];
    rootCauseAlert?: {
        blastRadius: "low" | "medium" | "critical";
        severity: "critical" | "warning";
        issue: string;
        affectedAgent: string;
        suggestedRemedy: string;
    } | undefined;
    actions?: {
        id: string;
        label: string;
        variant: "primary" | "secondary" | "danger" | "outline";
        requiredPermission: "read" | "write" | "execute" | "admin";
        blastRadius: "low" | "medium" | "critical";
        payload?: Record<string, any> | undefined;
    }[] | undefined;
}, {
    title: string;
    swarmHealth: "healthy" | "degraded" | "blocked" | "intervention_required";
    activeAgentsCount: number;
    totalTasksCompleted: number;
    agents: {
        id: string;
        status: "error" | "running" | "idle" | "waiting_approval" | "completed";
        name: string;
        role: string;
        currentTask: string;
        latencyMs?: number | undefined;
        tokensUsed?: number | undefined;
    }[];
    rootCauseAlert?: {
        blastRadius: "low" | "medium" | "critical";
        severity: "critical" | "warning";
        issue: string;
        affectedAgent: string;
        suggestedRemedy: string;
    } | undefined;
    actions?: {
        id: string;
        label: string;
        variant?: "primary" | "secondary" | "danger" | "outline" | undefined;
        requiredPermission?: "read" | "write" | "execute" | "admin" | undefined;
        blastRadius?: "low" | "medium" | "critical" | undefined;
        payload?: Record<string, any> | undefined;
    }[] | undefined;
}>;
export type SwarmMissionControlProps = z.infer<typeof SwarmMissionControlSchema> & {
    onAction?: (action: z.infer<typeof ActionContractSchema>) => void;
};
export declare const swarmDefaultProps: z.infer<typeof SwarmMissionControlSchema>;
export declare const swarmSystem1Criteria = "Qu\u1EA3n tr\u1ECB multi-agent swarm, gi\u00E1m s\u00E1t b\u1EA7y sub-agents t\u1EF1 tr\u1ECB, \u0111i\u1EC1u ph\u1ED1i agentic workflow theo ngo\u1EA1i l\u1EC7, c\u00E2y ph\u00E2n t\u00EDch s\u1EF1 c\u1ED1 root cause, ph\u00EA duy\u1EC7t h\u00E0nh \u0111\u1ED9ng can thi\u1EC7p kh\u1EA9n c\u1EA5p (HITL)";
export declare const SwarmMissionControl: React.FC<SwarmMissionControlProps>;
//# sourceMappingURL=SwarmMissionControl.d.ts.map