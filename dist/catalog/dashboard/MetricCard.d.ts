import React from "react";
import { z } from "zod";
export declare const MetricCardSchema: z.ZodObject<{
    title: z.ZodString;
    value: z.ZodString;
    change: z.ZodOptional<z.ZodString>;
    trend: z.ZodDefault<z.ZodEnum<["up", "down", "neutral"]>>;
    period: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    value: string;
    title: string;
    trend: "up" | "down" | "neutral";
    period: string;
    change?: string | undefined;
    description?: string | undefined;
}, {
    value: string;
    title: string;
    change?: string | undefined;
    trend?: "up" | "down" | "neutral" | undefined;
    period?: string | undefined;
    description?: string | undefined;
}>;
export type MetricCardProps = z.infer<typeof MetricCardSchema>;
export declare const MetricCard: React.FC<MetricCardProps>;
//# sourceMappingURL=MetricCard.d.ts.map