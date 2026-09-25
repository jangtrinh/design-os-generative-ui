import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { z } from "zod";
import { Check } from "lucide-react";
export const PricingTableSchema = z.object({
    title: z.string().describe("Tiêu đề bảng giá"),
    subtitle: z.string().optional().describe("Mô tả phụ cho bảng giá"),
    tiers: z
        .array(z.object({
        name: z.string().describe("Tên gói (ví dụ: Starter, Pro, Enterprise)"),
        price: z.string().describe("Giá niêm yết (ví dụ: $0, $29, Liên hệ)"),
        period: z.string().default("/tháng").describe("Kỳ thanh toán"),
        description: z.string().describe("Mô tả gói"),
        features: z.array(z.string()).describe("Danh sách quyền lợi"),
        highlighted: z.boolean().default(false).describe("Gói nổi bật nhất"),
        buttonText: z.string().default("Chọn gói").describe("Chữ trên nút"),
    }))
        .min(1)
        .max(4)
        .describe("Các gói giá"),
});
export const PricingTable = ({ title, subtitle, tiers, }) => {
    return (_jsxs("div", { className: "rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-sm", children: [_jsxs("div", { className: "text-center max-w-xl mx-auto mb-8", children: [_jsx("h2", { className: "text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50", children: title }), subtitle && (_jsx("p", { className: "mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400", children: subtitle }))] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch", children: tiers.map((tier, idx) => (_jsxs("div", { className: `rounded-xl p-6 flex flex-col justify-between transition-all ${tier.highlighted
                        ? "border-2 border-zinc-900 dark:border-zinc-100 bg-zinc-50/80 dark:bg-zinc-900/80 shadow-md relative"
                        : "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xs"}`, children: [tier.highlighted && (_jsx("span", { className: "absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full", children: "Ph\u1ED5 bi\u1EBFn nh\u1EA5t" })), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-semibold text-zinc-900 dark:text-zinc-100", children: tier.name }), _jsx("p", { className: "mt-1 text-xs text-zinc-500 dark:text-zinc-400 min-h-[32px]", children: tier.description }), _jsxs("div", { className: "mt-4 flex items-baseline gap-1", children: [_jsx("span", { className: "text-3xl font-extrabold text-zinc-900 dark:text-zinc-50", children: tier.price }), _jsx("span", { className: "text-xs text-zinc-500 font-medium", children: tier.period })] }), _jsx("div", { className: "mt-6 border-t border-zinc-100 dark:border-zinc-800 pt-5", children: _jsx("ul", { className: "space-y-2.5 text-xs text-zinc-700 dark:text-zinc-300", children: tier.features.map((feat, fIdx) => (_jsxs("li", { className: "flex items-center gap-2", children: [_jsx(Check, { className: "w-3.5 h-3.5 text-zinc-900 dark:text-zinc-100 shrink-0" }), _jsx("span", { children: feat })] }, fIdx))) }) })] }), _jsx("div", { className: "mt-8 pt-4", children: _jsx("button", { type: "button", className: `w-full py-2 px-3 rounded-lg text-xs font-semibold shadow transition-all ${tier.highlighted
                                    ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                                    : "border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900"}`, children: tier.buttonText }) })] }, idx))) })] }));
};
//# sourceMappingURL=PricingTable.js.map