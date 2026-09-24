import React from "react";
import { z } from "zod";
import { ArrowRight, Sparkles } from "lucide-react";

export const HeroSectionSchema = z.object({
  badge: z.string().optional().describe("Tag nhỏ ở trên cùng (ví dụ: 'Mới ra mắt', 'v2.0')"),
  headline: z.string().describe("Tiêu đề lớn đập vào mắt"),
  subheadline: z.string().describe("Đoạn mô tả ngắn dưới tiêu đề"),
  primaryCtaText: z.string().default("Bắt đầu ngay").describe("Nút hành động chính"),
  secondaryCtaText: z.string().optional().default("Xem tài liệu").describe("Nút hành động phụ"),
  socialProof: z.string().optional().describe("Bằng chứng xã hội (ví dụ: 'Được tin dùng bởi 1,200+ nhóm AI')"),
});

export type HeroSectionProps = z.infer<typeof HeroSectionSchema>;

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge,
  headline,
  subheadline,
  primaryCtaText = "Bắt đầu ngay",
  secondaryCtaText = "Xem tài liệu",
  socialProof,
}) => {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-8 sm:p-12 text-center relative overflow-hidden shadow-sm">
      {/* Background ambient radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-zinc-100 dark:bg-zinc-900/60 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {badge && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 mb-6 shadow-2xs">
            <Sparkles className="w-3 h-3 text-zinc-500" />
            <span>{badge}</span>
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
          {headline}
        </h1>

        <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
          {subheadline}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow transition-all active:scale-[0.98]"
          >
            <span>{primaryCtaText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {secondaryCtaText && (
            <button
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-xs font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              {secondaryCtaText}
            </button>
          )}
        </div>

        {socialProof && (
          <p className="mt-6 text-xs text-zinc-400 dark:text-zinc-500 font-medium">
            {socialProof}
          </p>
        )}
      </div>
    </div>
  );
};
