import * as React from "react";
import { z } from "zod";
export declare const KanbanBoardSchema: z.ZodObject<{
    title: z.ZodString;
    columns: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        color: z.ZodEnum<["zinc", "emerald", "amber", "red"]>;
        tasks: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            priority: z.ZodEnum<["low", "medium", "high", "urgent"]>;
            assignee: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            title: string;
            priority: "low" | "medium" | "high" | "urgent";
            assignee: string;
        }, {
            id: string;
            title: string;
            priority: "low" | "medium" | "high" | "urgent";
            assignee: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        color: "zinc" | "emerald" | "amber" | "red";
        name: string;
        tasks: {
            id: string;
            title: string;
            priority: "low" | "medium" | "high" | "urgent";
            assignee: string;
        }[];
    }, {
        id: string;
        color: "zinc" | "emerald" | "amber" | "red";
        name: string;
        tasks: {
            id: string;
            title: string;
            priority: "low" | "medium" | "high" | "urgent";
            assignee: string;
        }[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    title: string;
    columns: {
        id: string;
        color: "zinc" | "emerald" | "amber" | "red";
        name: string;
        tasks: {
            id: string;
            title: string;
            priority: "low" | "medium" | "high" | "urgent";
            assignee: string;
        }[];
    }[];
}, {
    title: string;
    columns: {
        id: string;
        color: "zinc" | "emerald" | "amber" | "red";
        name: string;
        tasks: {
            id: string;
            title: string;
            priority: "low" | "medium" | "high" | "urgent";
            assignee: string;
        }[];
    }[];
}>;
export type KanbanBoardProps = z.infer<typeof KanbanBoardSchema>;
export declare const kanbanDefaultProps: KanbanBoardProps;
export declare const kanbanSystem1Criteria = "B\u1EA3ng Kanban k\u00E9o th\u1EA3 task, qu\u1EA3n l\u00FD c\u00F4ng vi\u1EC7c agile sprint theo c\u1ED9t ti\u1EBFn \u0111\u1ED9 d\u1EF1 \u00E1n (To Do, In Progress, Done), danh s\u00E1ch th\u1EBB nhi\u1EC7m v\u1EE5 c\u00F4ng vi\u1EC7c.";
export declare const KanbanBoard: React.FC<KanbanBoardProps>;
//# sourceMappingURL=KanbanBoard.d.ts.map