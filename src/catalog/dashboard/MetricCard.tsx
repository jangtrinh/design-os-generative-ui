import React from "react";
import { z } from "zod";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export const MetricCardSchema = z.object({
  title: z.string().describe("Tên chỉ số (ví dụ: Doanh thu, Đơn hàng)"),
  value: z.string().describe("Giá trị chỉ số (ví dụ: $42,850, 1,240)"),
  change: z.string().optional().describe("Tỷ lệ tăng giảm (ví dụ: +12.5%, -3.2%)"),
  trend: z.enum(["up", "down", "neutral"]).default("neutral").describe("Hướng xu hướng"),
  period: z.string().optional().default("so với tháng trước").describe("Khoảng thời gian so sánh"),
  description: z.string().optional().describe("Ghi chú bổ sung"),
});

export type MetricCardProps = z.infer<typeof MetricCardSchema>;

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  trend = "neutral",
  period = "so với tháng trước",
  description,
}) => {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 shadow-sm hover:shadow transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          {title}
        </span>
        {change && (
          <div
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
              trend === "up"
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                : trend === "down"
                ? "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400"
                : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {trend === "up" && <TrendingUp className="w-3 h-3" />}
            {trend === "down" && <TrendingDown className="w-3 h-3" />}
            {trend === "neutral" && <Minus className="w-3 h-3" />}
            <span>{change}</span>
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {value}
        </div>
        {(period || description) && (
          <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            {description ? description : period}
          </div>
        )}
      </div>
    </div>
  );
};
