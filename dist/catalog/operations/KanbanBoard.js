import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { z } from "zod";
export const KanbanBoardSchema = z.object({
    title: z.string(),
    columns: z.array(z.object({
        id: z.string(),
        name: z.string(),
        color: z.enum(["zinc", "emerald", "amber", "red"]),
        tasks: z.array(z.object({
            id: z.string(),
            title: z.string(),
            priority: z.enum(["low", "medium", "high", "urgent"]),
            assignee: z.string(),
        })),
    })),
});
const columnColors = {
    zinc: "bg-zinc-400",
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    red: "bg-red-400",
};
const priorities = {
    low: {
        label: "Thấp",
        className: "border-zinc-700 bg-zinc-800 text-zinc-300",
    },
    medium: {
        label: "Trung bình",
        className: "border-amber-400/30 bg-amber-400/10 text-amber-300",
    },
    high: {
        label: "Cao",
        className: "border-red-400/30 bg-red-400/10 text-red-300",
    },
    urgent: {
        label: "Khẩn cấp",
        className: "border-red-400 bg-red-950 text-red-200",
    },
};
export const kanbanDefaultProps = {
    title: "Kế hoạch phát triển sản phẩm Agile",
    columns: [
        {
            id: "todo",
            name: "Cần làm",
            color: "zinc",
            tasks: [
                {
                    id: "task-01",
                    title: "Tổng hợp phản hồi khách hàng về quy trình đăng ký",
                    priority: "medium",
                    assignee: "Nguyễn Minh Anh",
                },
                {
                    id: "task-02",
                    title: "Thiết kế giao diện quản lý thông báo",
                    priority: "low",
                    assignee: "Trần Hoàng Nam",
                },
            ],
        },
        {
            id: "in-progress",
            name: "Đang xử lý",
            color: "amber",
            tasks: [
                {
                    id: "task-03",
                    title: "Khắc phục lỗi thanh toán trên thiết bị di động",
                    priority: "urgent",
                    assignee: "Lê Thu Hà",
                },
            ],
        },
        {
            id: "done",
            name: "Hoàn thành",
            color: "emerald",
            tasks: [
                {
                    id: "task-04",
                    title: "Hoàn thiện bộ thành phần giao diện dùng chung",
                    priority: "high",
                    assignee: "Phạm Quang Huy",
                },
            ],
        },
    ],
};
export const kanbanSystem1Criteria = "Bảng Kanban kéo thả task, quản lý công việc agile sprint theo cột tiến độ dự án (To Do, In Progress, Done), danh sách thẻ nhiệm vụ công việc.";
export const KanbanBoard = ({ title = kanbanDefaultProps.title, columns = kanbanDefaultProps.columns, }) => {
    const taskCount = columns.reduce((total, column) => total + column.tasks.length, 0);
    return (_jsxs("section", { "aria-label": title || "Bảng công việc", className: "min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-white shadow-xl", children: [_jsxs("header", { className: "mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-bold tracking-tight text-zinc-100", children: title }), _jsx("p", { className: "text-xs text-zinc-400 mt-0.5", children: "Qu\u1EA3n l\u00FD tr\u1EF1c quan lu\u1ED3ng c\u00F4ng vi\u1EC7c theo ph\u01B0\u01A1ng ph\u00E1p Kanban" })] }), _jsxs("span", { className: "text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300", children: [taskCount, " c\u00F4ng vi\u1EC7c"] })] }), columns.length === 0 ? (_jsx("p", { className: "rounded-xl border border-dashed border-zinc-800 p-6 text-center text-sm text-zinc-400", children: "Ch\u01B0a c\u00F3 c\u1ED9t c\u00F4ng vi\u1EC7c." })) : (_jsx("div", { className: "grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-3", children: columns.map((column) => (_jsxs("section", { className: "min-w-0 rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3.5 shadow-sm", children: [_jsxs("header", { className: "mb-4 flex items-center justify-between px-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { "aria-hidden": "true", className: `h-2.5 w-2.5 shrink-0 rounded-full ${columnColors[column.color]}` }), _jsx("h3", { className: "text-xs font-bold uppercase tracking-wider text-zinc-300", children: column.name })] }), _jsx("span", { className: "rounded bg-zinc-800 px-1.5 py-0.5 text-[11px] font-mono font-medium text-zinc-400", children: column.tasks.length })] }), _jsx("div", { className: "space-y-2.5", children: column.tasks.map((task) => {
                                const priority = priorities[task.priority];
                                return (_jsxs("div", { className: "rounded-lg border border-zinc-800 bg-zinc-900/90 p-3.5 hover:border-zinc-700 transition-colors shadow-sm", children: [_jsx("h4", { className: "text-xs font-medium text-zinc-200 leading-relaxed", children: task.title }), _jsxs("div", { className: "mt-3 flex items-center justify-between pt-2 border-t border-zinc-800/60 text-[11px]", children: [_jsx("span", { className: `inline-flex rounded px-1.5 py-0.5 text-[10px] font-semibold border ${priority.className}`, children: priority.label }), _jsx("span", { className: "text-zinc-400 font-mono text-[10px]", children: task.assignee })] })] }, task.id));
                            }) })] }, column.id))) }))] }));
};
//# sourceMappingURL=KanbanBoard.js.map