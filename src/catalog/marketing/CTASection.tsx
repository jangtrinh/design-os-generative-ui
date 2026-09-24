import React from "react";
import { z } from "zod";
import { ArrowRight } from "lucide-react";

export const CTASectionSchema = z.object({
  headline: z.string().describe("Tiêu đề kêu gọi hành động"),
  subheadline: z.string().describe("Đoạn mô tả ngắn"),
  buttonText: z.string().default("Đăng ký trải nghiệm").describe("Chữ trên nút"),
  showEmailInput: z.boolean().default(true).describe("Có hiển thị ô nhập email không"),
  guaranteeText: z.string().optional().describe("Dòng cam kết (ví dụ: Miễn phí 14 ngày, không cần thẻ)"),
});

export type CTASectionProps = z.infer<typeof CTASectionSchema>;

export const CTASection: React.FC<CTASectionProps> = ({
  headline,
  subheadline,
  buttonText = "Đăng ký trải nghiệm",
  showEmailInput = true,
  guaranteeText = "Không cần thẻ tín dụng • Triển khai dưới 5 phút",
}) => {
  return (
    <div className="rounded-2xl border border-zinc-900 bg-zinc-950 text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-lg">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {headline}
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed">
          {subheadline}
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
          {showEmailInput && (
            <input
              type="email"
              placeholder="Nhập email của bạn..."
              className="w-full sm:flex-1 px-3.5 py-2 text-xs rounded-lg border border-zinc-800 bg-zinc-900 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-400"
            />
          )}
          <button
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-white text-zinc-950 hover:bg-zinc-200 transition-colors shrink-0 shadow-sm"
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {guaranteeText && (
          <p className="mt-4 text-[11px] text-zinc-500 font-medium">
            {guaranteeText}
          </p>
        )}
      </div>
    </div>
  );
};
