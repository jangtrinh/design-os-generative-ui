import { z } from "zod";
export declare const UIComponentSpecSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodString;
    props: z.ZodRecord<z.ZodString, z.ZodAny>;
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
    blastRadius: z.ZodOptional<z.ZodEnum<["low", "medium", "critical"]>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: string;
    props: Record<string, any>;
    blastRadius?: "low" | "medium" | "critical" | undefined;
    actions?: {
        id: string;
        label: string;
        variant: "primary" | "secondary" | "danger" | "outline";
        requiredPermission: "read" | "write" | "execute" | "admin";
        blastRadius: "low" | "medium" | "critical";
        payload?: Record<string, any> | undefined;
    }[] | undefined;
}, {
    id: string;
    type: string;
    props: Record<string, any>;
    blastRadius?: "low" | "medium" | "critical" | undefined;
    actions?: {
        id: string;
        label: string;
        variant?: "primary" | "secondary" | "danger" | "outline" | undefined;
        requiredPermission?: "read" | "write" | "execute" | "admin" | undefined;
        blastRadius?: "low" | "medium" | "critical" | undefined;
        payload?: Record<string, any> | undefined;
    }[] | undefined;
}>;
export declare const LayoutTypeSchema: z.ZodEnum<["single", "stack", "grid-2", "dashboard", "hero-first"]>;
export declare const UISpecSchema: z.ZodObject<{
    layout: z.ZodEnum<["single", "stack", "grid-2", "dashboard", "hero-first"]>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    components: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodString;
        props: z.ZodRecord<z.ZodString, z.ZodAny>;
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
        blastRadius: z.ZodOptional<z.ZodEnum<["low", "medium", "critical"]>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: string;
        props: Record<string, any>;
        blastRadius?: "low" | "medium" | "critical" | undefined;
        actions?: {
            id: string;
            label: string;
            variant: "primary" | "secondary" | "danger" | "outline";
            requiredPermission: "read" | "write" | "execute" | "admin";
            blastRadius: "low" | "medium" | "critical";
            payload?: Record<string, any> | undefined;
        }[] | undefined;
    }, {
        id: string;
        type: string;
        props: Record<string, any>;
        blastRadius?: "low" | "medium" | "critical" | undefined;
        actions?: {
            id: string;
            label: string;
            variant?: "primary" | "secondary" | "danger" | "outline" | undefined;
            requiredPermission?: "read" | "write" | "execute" | "admin" | undefined;
            blastRadius?: "low" | "medium" | "critical" | undefined;
            payload?: Record<string, any> | undefined;
        }[] | undefined;
    }>, "many">;
    blastRadius: z.ZodOptional<z.ZodEnum<["low", "medium", "critical"]>>;
}, "strip", z.ZodTypeAny, {
    layout: "dashboard" | "single" | "stack" | "grid-2" | "hero-first";
    components: {
        id: string;
        type: string;
        props: Record<string, any>;
        blastRadius?: "low" | "medium" | "critical" | undefined;
        actions?: {
            id: string;
            label: string;
            variant: "primary" | "secondary" | "danger" | "outline";
            requiredPermission: "read" | "write" | "execute" | "admin";
            blastRadius: "low" | "medium" | "critical";
            payload?: Record<string, any> | undefined;
        }[] | undefined;
    }[];
    blastRadius?: "low" | "medium" | "critical" | undefined;
    title?: string | undefined;
    description?: string | undefined;
}, {
    layout: "dashboard" | "single" | "stack" | "grid-2" | "hero-first";
    components: {
        id: string;
        type: string;
        props: Record<string, any>;
        blastRadius?: "low" | "medium" | "critical" | undefined;
        actions?: {
            id: string;
            label: string;
            variant?: "primary" | "secondary" | "danger" | "outline" | undefined;
            requiredPermission?: "read" | "write" | "execute" | "admin" | undefined;
            blastRadius?: "low" | "medium" | "critical" | undefined;
            payload?: Record<string, any> | undefined;
        }[] | undefined;
    }[];
    blastRadius?: "low" | "medium" | "critical" | undefined;
    title?: string | undefined;
    description?: string | undefined;
}>;
export type UIComponentSpec = z.infer<typeof UIComponentSpecSchema>;
export type LayoutType = z.infer<typeof LayoutTypeSchema>;
export type UISpec = z.infer<typeof UISpecSchema>;
export interface DecisionTelemetry {
    engine: "laya-mlx" | "jev-cloud" | "deterministic";
    latencyMs: number;
    confidence: number;
    escalated: boolean;
    selectedComponents: string[];
    localEnforced?: boolean;
    blastRadius?: "low" | "medium" | "critical";
}
export interface ClientRenderTelemetry {
    specReceivedAt: number;
    domInteractiveAt?: number;
    firstPaintMs?: number;
    totalE2EMs?: number;
}
export interface ComposeResult {
    spec: UISpec;
    telemetry: DecisionTelemetry;
}
export interface ComposeOptions {
    cascadeThreshold?: number;
    forceCloud?: boolean;
    localOnly?: boolean;
    localEndpoint?: string;
    localTimeoutMs?: number;
    cloudTimeoutMs?: number;
}
//# sourceMappingURL=types.d.ts.map