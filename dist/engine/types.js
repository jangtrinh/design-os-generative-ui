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
//# sourceMappingURL=types.js.map