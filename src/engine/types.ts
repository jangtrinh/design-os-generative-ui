export interface UIComponentSpec {
  id: string;
  type: string;
  props: Record<string, any>;
}

export type LayoutType = "single" | "stack" | "grid-2" | "dashboard" | "hero-first";

export interface UISpec {
  layout: LayoutType;
  title?: string;
  description?: string;
  components: UIComponentSpec[];
}

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
