import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { z } from "zod";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
export const AlertBannerSchema = z.object({
    title: z.string().describe("Tiêu đề cảnh báo"),
    message: z.string().describe("Nội dung thông điệp"),
    severity: z
        .enum(["info", "warning", "critical", "success"])
        .default("info")
        .describe("Mức độ nghiêm trọng"),
    actionLabel: z.string().optional().describe("Nút hành động (ví dụ: Xem chi tiết, Khắc phục ngay)"),
    dismissible: z.boolean().default(true).describe("Cho phép đóng thông báo"),
});
export const AlertBanner = ({ title, message, severity = "info", actionLabel, dismissible = true, }) => {
    const [dismissed, setDismissed] = React.useState(false);
    if (dismissed)
        return null;
    const styles = {
        info: {
            wrapper: "border-blue-200 dark:border-blue-900/50 bg-blue-50/60 dark:bg-blue-950/20 text-blue-900 dark:text-blue-200",
            icon: _jsx(Info, { className: "w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" }),
            button: "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500",
        },
        warning: {
            wrapper: "border-amber-200 dark:border-amber-900/50 bg-amber-50/60 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200",
            icon: _jsx(AlertTriangle, { className: "w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" }),
            button: "bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500",
        },
        critical: {
            wrapper: "border-rose-200 dark:border-rose-900/50 bg-rose-50/60 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200",
            icon: _jsx(AlertCircle, { className: "w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" }),
            button: "bg-rose-600 hover:bg-rose-700 text-white dark:bg-rose-500",
        },
        success: {
            wrapper: "border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200",
            icon: _jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" }),
            button: "bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500",
        },
    }[severity];
    return (_jsxs("div", { className: `rounded-xl border p-4 flex items-start gap-3 shadow-sm transition-all ${styles.wrapper}`, children: [_jsx("div", { className: "mt-0.5", children: styles.icon }), _jsxs("div", { className: "flex-1 text-xs", children: [_jsx("h4", { className: "font-semibold text-sm", children: title }), _jsx("p", { className: "mt-0.5 opacity-90 leading-relaxed", children: message }), actionLabel && (_jsx("div", { className: "mt-2.5", children: _jsx("button", { type: "button", className: `px-3 py-1 text-xs font-medium rounded-md shadow-sm transition-colors ${styles.button}`, children: actionLabel }) }))] }), dismissible && (_jsx("button", { type: "button", onClick: () => setDismissed(true), className: "opacity-60 hover:opacity-100 p-0.5 rounded transition-opacity", children: _jsx(X, { className: "w-4 h-4" }) }))] }));
};
//# sourceMappingURL=AlertBanner.js.map