import React from "react";
import { z } from "zod";
export declare const FeatureGridSchema: z.ZodObject<{
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    features: z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        description: z.ZodString;
        icon: z.ZodDefault<z.ZodEnum<["zap", "shield", "cpu", "layers", "lock", "chart"]>>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        description: string;
        icon: "zap" | "shield" | "cpu" | "layers" | "lock" | "chart";
    }, {
        title: string;
        description: string;
        icon?: "zap" | "shield" | "cpu" | "layers" | "lock" | "chart" | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    title: string;
    features: {
        title: string;
        description: string;
        icon: "zap" | "shield" | "cpu" | "layers" | "lock" | "chart";
    }[];
    subtitle?: string | undefined;
}, {
    title: string;
    features: {
        title: string;
        description: string;
        icon?: "zap" | "shield" | "cpu" | "layers" | "lock" | "chart" | undefined;
    }[];
    subtitle?: string | undefined;
}>;
export type FeatureGridProps = z.infer<typeof FeatureGridSchema>;
export declare const FeatureGrid: React.FC<FeatureGridProps>;
//# sourceMappingURL=FeatureGrid.d.ts.map