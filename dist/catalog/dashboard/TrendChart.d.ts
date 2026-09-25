import React from "react";
import { z } from "zod";
export declare const TrendChartSchema: z.ZodObject<{
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    chartType: z.ZodDefault<z.ZodEnum<["line", "bar"]>>;
    dataPoints: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        label: string;
    }, {
        value: number;
        label: string;
    }>, "many">;
    color: z.ZodDefault<z.ZodEnum<["zinc", "emerald", "blue"]>>;
}, "strip", z.ZodTypeAny, {
    title: string;
    color: "zinc" | "emerald" | "blue";
    chartType: "line" | "bar";
    dataPoints: {
        value: number;
        label: string;
    }[];
    subtitle?: string | undefined;
}, {
    title: string;
    dataPoints: {
        value: number;
        label: string;
    }[];
    color?: "zinc" | "emerald" | "blue" | undefined;
    subtitle?: string | undefined;
    chartType?: "line" | "bar" | undefined;
}>;
export type TrendChartProps = z.infer<typeof TrendChartSchema>;
export declare const TrendChart: React.FC<TrendChartProps>;
//# sourceMappingURL=TrendChart.d.ts.map