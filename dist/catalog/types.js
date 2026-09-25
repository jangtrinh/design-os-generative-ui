import { z } from "zod";
export const ActionContractSchema = z.object({
    id: z.string(),
    label: z.string(),
    variant: z.enum(["primary", "secondary", "danger", "outline"]).default("primary"),
    requiredPermission: z.enum(["read", "write", "execute", "admin"]).default("read"),
    blastRadius: z.enum(["low", "medium", "critical"]).default("low"),
    payload: z.record(z.any()).optional(),
});
//# sourceMappingURL=types.js.map