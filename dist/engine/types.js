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
//# sourceMappingURL=types.js.map