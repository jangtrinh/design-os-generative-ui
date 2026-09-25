import { z } from "zod";
import type { ComponentType } from "react";
export type ComponentCategory = "dashboard" | "marketing" | "navigation" | "feedback" | "agentic";
export declare const ActionContractSchema: z.ZodObject<{
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
}>;
export type ComponentAction = z.infer<typeof ActionContractSchema>;
export interface ComponentMetadata<TProps extends z.ZodTypeAny = z.ZodTypeAny> {
    id: string;
    name: string;
    category: ComponentCategory;
    description: string;
    system1Criteria: string;
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
//# sourceMappingURL=types.d.ts.map