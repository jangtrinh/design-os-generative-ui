import { z } from "zod";
export declare const UIComponentSpecSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodString;
    props: z.ZodRecord<z.ZodString, z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    type: string;
    id: string;
    props: Record<string, any>;
}, {
    type: string;
    id: string;
    props: Record<string, any>;
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
    }, "strip", z.ZodTypeAny, {
        type: string;
        id: string;
        props: Record<string, any>;
    }, {
        type: string;
        id: string;
        props: Record<string, any>;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    layout: "dashboard" | "single" | "stack" | "grid-2" | "hero-first";
    components: {
        type: string;
        id: string;
        props: Record<string, any>;
    }[];
    title?: string | undefined;
    description?: string | undefined;
}, {
    layout: "dashboard" | "single" | "stack" | "grid-2" | "hero-first";
    components: {
        type: string;
        id: string;
        props: Record<string, any>;
    }[];
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
}
export interface ComposeResult {
    spec: UISpec;
    telemetry: DecisionTelemetry;
}
export interface ComposeOptions {
    cascadeThreshold?: number;
    forceCloud?: boolean;
    localEndpoint?: string;
}
//# sourceMappingURL=types.d.ts.map