import React from "react";
import { z } from "zod";
export declare const CTASectionSchema: z.ZodObject<{
    headline: z.ZodString;
    subheadline: z.ZodString;
    buttonText: z.ZodDefault<z.ZodString>;
    showEmailInput: z.ZodDefault<z.ZodBoolean>;
    guaranteeText: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    headline: string;
    subheadline: string;
    buttonText: string;
    showEmailInput: boolean;
    guaranteeText?: string | undefined;
}, {
    headline: string;
    subheadline: string;
    buttonText?: string | undefined;
    showEmailInput?: boolean | undefined;
    guaranteeText?: string | undefined;
}>;
export type CTASectionProps = z.infer<typeof CTASectionSchema>;
export declare const CTASection: React.FC<CTASectionProps>;
//# sourceMappingURL=CTASection.d.ts.map