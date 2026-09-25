import React from "react";
import { z } from "zod";
export declare const DataTableSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    columns: z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        label: z.ZodString;
        align: z.ZodDefault<z.ZodEnum<["left", "center", "right"]>>;
    }, "strip", z.ZodTypeAny, {
        key: string;
        label: string;
        align: "left" | "center" | "right";
    }, {
        key: string;
        label: string;
        align?: "left" | "center" | "right" | undefined;
    }>, "many">;
    rows: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodAny>, "many">;
}, "strip", z.ZodTypeAny, {
    title: string;
    columns: {
        key: string;
        label: string;
        align: "left" | "center" | "right";
    }[];
    rows: Record<string, any>[];
    description?: string | undefined;
}, {
    title: string;
    columns: {
        key: string;
        label: string;
        align?: "left" | "center" | "right" | undefined;
    }[];
    rows: Record<string, any>[];
    description?: string | undefined;
}>;
export type DataTableProps = z.infer<typeof DataTableSchema>;
export declare const DataTable: React.FC<DataTableProps>;
//# sourceMappingURL=DataTable.d.ts.map