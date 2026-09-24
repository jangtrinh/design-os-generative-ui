import React from "react";
import { z } from "zod";
import { Zap, ShieldCheck, Cpu, Layers, Lock, BarChart3 } from "lucide-react";

export const FeatureGridSchema = z.object({
  title: z.string().describe("Tiêu đề khối tính năng"),
  subtitle: z.string().optional().describe("Mô tả phụ cho khối"),
  features: z
    .array(
      z.object({
        title: z.string().describe("Tên tính năng"),
        description: z.string().describe("Mô tả tính năng"),
        icon: z
          .enum(["zap", "shield", "cpu", "layers", "lock", "chart"])
          .default("zap")
          .describe("Icon đại diện"),
      })
    )
    .min(2)
    .max(6)
    .describe("Danh sách các tính năng"),
});

export type FeatureGridProps = z.infer<typeof FeatureGridSchema>;

const ICONS = {
  zap: <Zap className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />,
  shield: <ShieldCheck className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />,
  cpu: <Cpu className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />,
  layers: <Layers className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />,
  lock: <Lock className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />,
  chart: <BarChart3 className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />,
};

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  title,
  subtitle,
  features,
}) => {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-sm">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 flex items-center justify-center mb-3.5 shadow-2xs">
              {ICONS[f.icon] || ICONS.zap}
            </div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {f.title}
            </h3>
            <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
