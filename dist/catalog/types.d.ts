import { z } from "zod";
import type { ComponentType } from "react";
export type ComponentCategory = "dashboard" | "marketing" | "navigation" | "feedback";
export interface ComponentMetadata<TProps extends z.ZodTypeAny = z.ZodTypeAny> {
    id: string;
    name: string;
    category: ComponentCategory;
    description: string;
    system1Criteria: string;
    schema: TProps;
    defaultProps: z.infer<TProps>;
    component: ComponentType<z.infer<TProps>>;
}
export type AnyComponentMetadata = ComponentMetadata<any>;
export interface CatalogRegistry {
    [key: string]: AnyComponentMetadata;
}
//# sourceMappingURL=types.d.ts.map