import { z } from "zod";
import type { ComponentType } from "react";

export type ComponentCategory = "dashboard" | "marketing" | "navigation" | "feedback" | "agentic";

export const ActionContractSchema = z.object({
  id: z.string(),
  label: z.string(),
  variant: z.enum(["primary", "secondary", "danger", "outline"]).default("primary"),
  requiredPermission: z.enum(["read", "write", "execute", "admin"]).default("read"),
  blastRadius: z.enum(["low", "medium", "critical"]).default("low"),
  payload: z.record(z.any()).optional(),
});

export type ComponentAction = z.infer<typeof ActionContractSchema>;

export interface ComponentMetadata<TProps extends z.ZodTypeAny = z.ZodTypeAny> {
  id: string;
  name: string;
  category: ComponentCategory;
  description: string;
  system1Criteria: string; // The semantic descriptor sent to Laya/JEV
  schema: TProps;
  defaultProps: z.infer<TProps>;
  component: ComponentType<z.infer<TProps>>;
  actions?: ComponentAction[];
  blastRadius?: "low" | "medium" | "critical";
}

export type AnyComponentMetadata = ComponentMetadata<any>;

export interface CatalogRegistry {
  [key: string]: AnyComponentMetadata;
}

