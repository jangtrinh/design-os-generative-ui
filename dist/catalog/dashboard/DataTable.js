import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { z } from "zod";
import { Search } from "lucide-react";
export const DataTableSchema = z.object({
    title: z.string().describe("Tên bảng dữ liệu"),
    description: z.string().optional().describe("Mô tả bảng"),
    columns: z
        .array(z.object({
        key: z.string(),
        label: z.string(),
        align: z.enum(["left", "center", "right"]).default("left"),
    }))
        .describe("Danh sách cột"),
    rows: z.array(z.record(z.any())).describe("Dữ liệu các hàng"),
});
export const DataTable = ({ title, description, columns, rows, }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredRows = rows.filter((row) => {
        if (!searchTerm.trim())
            return true;
        return Object.values(row).some((val) => String(val).toLowerCase().includes(searchTerm.toLowerCase()));
    });
    return (_jsxs("div", { className: "rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 shadow-sm", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-zinc-900 dark:text-zinc-50", children: title }), description && (_jsx("p", { className: "text-xs text-zinc-500 dark:text-zinc-400 mt-0.5", children: description }))] }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" }), _jsx("input", { type: "text", placeholder: "T\u00ECm ki\u1EBFm...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-8 pr-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600" })] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left text-xs", children: [_jsx("thead", { children: _jsx("tr", { className: "border-b border-zinc-100 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-medium", children: columns.map((col) => (_jsx("th", { className: `pb-2.5 pt-1 px-3 ${col.align === "center"
                                        ? "text-center"
                                        : col.align === "right"
                                            ? "text-right"
                                            : "text-left"}`, children: col.label }, col.key))) }) }), _jsx("tbody", { className: "divide-y divide-zinc-100 dark:divide-zinc-900", children: filteredRows.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: columns.length, className: "py-6 text-center text-zinc-400", children: "Kh\u00F4ng t\u00ECm th\u1EA5y b\u1EA3n ghi n\u00E0o." }) })) : (filteredRows.map((row, idx) => (_jsx("tr", { className: "hover:bg-zinc-50/80 dark:hover:bg-zinc-900/50 transition-colors", children: columns.map((col) => {
                                    const val = row[col.key];
                                    const isStatus = col.key.toLowerCase().includes("status") || col.key.toLowerCase().includes("trạng thái");
                                    return (_jsx("td", { className: `py-3 px-3 text-zinc-800 dark:text-zinc-200 ${col.align === "center"
                                            ? "text-center"
                                            : col.align === "right"
                                                ? "text-right"
                                                : "text-left"}`, children: isStatus ? (_jsx("span", { className: `inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${String(val).toLowerCase().includes("success") ||
                                                String(val).toLowerCase().includes("thành công") ||
                                                String(val).toLowerCase().includes("active")
                                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                                                : String(val).toLowerCase().includes("pending") ||
                                                    String(val).toLowerCase().includes("chờ")
                                                    ? "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400"
                                                    : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"}`, children: String(val) })) : (String(val ?? "")) }, col.key));
                                }) }, idx)))) })] }) })] }));
};
//# sourceMappingURL=DataTable.js.map