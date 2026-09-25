import React from "react";
import { z } from "zod";
export declare const AlertBannerSchema: z.ZodObject<{
    title: z.ZodString;
    message: z.ZodString;
    severity: z.ZodDefault<z.ZodEnum<["info", "warning", "critical", "success"]>>;
    actionLabel: z.ZodOptional<z.ZodString>;
    dismissible: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    message: string;
    title: string;
    severity: "success" | "info" | "warning" | "critical";
    dismissible: boolean;
    actionLabel?: string | undefined;
}, {
    message: string;
    title: string;
    severity?: "success" | "info" | "warning" | "critical" | undefined;
    actionLabel?: string | undefined;
    dismissible?: boolean | undefined;
}>;
export type AlertBannerProps = z.infer<typeof AlertBannerSchema>;
export declare const AlertBanner: React.FC<AlertBannerProps>;
//# sourceMappingURL=AlertBanner.d.ts.map