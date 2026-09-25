import React from "react";
import { z } from "zod";
export declare const PricingTableSchema: z.ZodObject<{
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    tiers: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        price: z.ZodString;
        period: z.ZodDefault<z.ZodString>;
        description: z.ZodString;
        features: z.ZodArray<z.ZodString, "many">;
        highlighted: z.ZodDefault<z.ZodBoolean>;
        buttonText: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        period: string;
        description: string;
        name: string;
        features: string[];
        price: string;
        highlighted: boolean;
        buttonText: string;
    }, {
        description: string;
        name: string;
        features: string[];
        price: string;
        period?: string | undefined;
        highlighted?: boolean | undefined;
        buttonText?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    title: string;
    tiers: {
        period: string;
        description: string;
        name: string;
        features: string[];
        price: string;
        highlighted: boolean;
        buttonText: string;
    }[];
    subtitle?: string | undefined;
}, {
    title: string;
    tiers: {
        description: string;
        name: string;
        features: string[];
        price: string;
        period?: string | undefined;
        highlighted?: boolean | undefined;
        buttonText?: string | undefined;
    }[];
    subtitle?: string | undefined;
}>;
export type PricingTableProps = z.infer<typeof PricingTableSchema>;
export declare const PricingTable: React.FC<PricingTableProps>;
//# sourceMappingURL=PricingTable.d.ts.map