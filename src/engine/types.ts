import { z } from "zod";

export const UIComponentSpecSchema = z.object({
  id: z.string(),
  type: z.string(),
  props: z.record(z.any()),
});

export const LayoutTypeSchema = z.enum(["single", "stack", "grid-2", "dashboard", "hero-first"]);

export const UISpecSchema = z.object({
  layout: LayoutTypeSchema,
  title: z.string().optional(),
  description: z.string().optional(),
  components: z.array(UIComponentSpecSchema),
});

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
  cascadeThreshold?: number; // Default 0.30
  forceCloud?: boolean;
  localEndpoint?: string; // Default http://127.0.0.1:8000/predict
}
