import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
export const CTASectionSchema = z.object({
    headline: z.string().describe("Tiêu đề kêu gọi hành động"),
    subheadline: z.string().describe("Đoạn mô tả ngắn"),
    buttonText: z.string().default("Đăng ký trải nghiệm").describe("Chữ trên nút"),
    showEmailInput: z.boolean().default(true).describe("Có hiển thị ô nhập email không"),
    guaranteeText: z.string().optional().describe("Dòng cam kết (ví dụ: Miễn phí 14 ngày, không cần thẻ)"),
});
export const CTASection = ({ headline, subheadline, buttonText = "Đăng ký trải nghiệm", showEmailInput = true, guaranteeText = "Không cần thẻ tín dụng • Triển khai dưới 5 phút", }) => {
    return (_jsx("div", { className: "rounded-2xl border border-zinc-900 bg-zinc-950 text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-lg", children: _jsxs("div", { className: "max-w-xl mx-auto", children: [_jsx("h2", { className: "text-2xl sm:text-3xl font-extrabold tracking-tight", children: headline }), _jsx("p", { className: "mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed", children: subheadline }), _jsxs("div", { className: "mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto", children: [showEmailInput && (_jsx("input", { type: "email", placeholder: "Nh\u1EADp email c\u1EE7a b\u1EA1n...", className: "w-full sm:flex-1 px-3.5 py-2 text-xs rounded-lg border border-zinc-800 bg-zinc-900 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-400" })), _jsxs("button", { type: "button", className: "w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-white text-zinc-950 hover:bg-zinc-200 transition-colors shrink-0 shadow-sm", children: [_jsx("span", { children: buttonText }), _jsx(ArrowRight, { className: "w-3.5 h-3.5" })] })] }), guaranteeText && (_jsx("p", { className: "mt-4 text-[11px] text-zinc-500 font-medium", children: guaranteeText }))] }) }));
};
//# sourceMappingURL=CTASection.js.map