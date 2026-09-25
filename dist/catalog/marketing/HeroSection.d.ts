import React from "react";
import { z } from "zod";
export declare const HeroSectionSchema: z.ZodObject<{
    badge: z.ZodOptional<z.ZodString>;
    headline: z.ZodString;
    subheadline: z.ZodString;
    primaryCtaText: z.ZodDefault<z.ZodString>;
    secondaryCtaText: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    socialProof: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    headline: string;
    subheadline: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    badge?: string | undefined;
    socialProof?: string | undefined;
}, {
    headline: string;
    subheadline: string;
    badge?: string | undefined;
    primaryCtaText?: string | undefined;
    secondaryCtaText?: string | undefined;
    socialProof?: string | undefined;
}>;
export type HeroSectionProps = z.infer<typeof HeroSectionSchema>;
export declare const HeroSection: React.FC<HeroSectionProps>;
//# sourceMappingURL=HeroSection.d.ts.map