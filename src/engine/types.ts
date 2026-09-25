import { z } from "zod";

import { ActionContractSchema } from "../catalog/types.js";

export const UIComponentSpecSchema = z.object({
  id: z.string(),
  type: z.string(),
  props: z.record(z.any()),
  actions: z.array(ActionContractSchema).optional(),
  blastRadius: z.enum(["low", "medium", "critical"]).optional(),
});

export const LayoutTypeSchema = z.enum(["single", "stack", "grid-2", "dashboard", "hero-first"]);

export const UISpecSchema = z.object({
  layout: LayoutTypeSchema,
  title: z.string().optional(),
  description: z.string().optional(),
  components: z.array(UIComponentSpecSchema),
  blastRadius: z.enum(["low", "medium", "critical"]).optional(),
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
  cascadeThreshold?: number; // Default 0.30
  forceCloud?: boolean;
  localOnly?: boolean; // When true: strictly offline/edge on Apple Silicon ($0 token, zero cloud leak)
  localEndpoint?: string; // Default http://127.0.0.1:8000/predict
  localTimeoutMs?: number; // Default 500ms
  cloudTimeoutMs?: number; // Default 3000ms
}

