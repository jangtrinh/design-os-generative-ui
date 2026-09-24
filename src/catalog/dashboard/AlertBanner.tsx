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

export type AlertBannerProps = z.infer<typeof AlertBannerSchema>;

export const AlertBanner: React.FC<AlertBannerProps> = ({
  title,
  message,
  severity = "info",
  actionLabel,
  dismissible = true,
}) => {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed) return null;

  const styles = {
    info: {
      wrapper: "border-blue-200 dark:border-blue-900/50 bg-blue-50/60 dark:bg-blue-950/20 text-blue-900 dark:text-blue-200",
      icon: <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />,
      button: "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500",
    },
    warning: {
      wrapper: "border-amber-200 dark:border-amber-900/50 bg-amber-50/60 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200",
      icon: <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />,
      button: "bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500",
    },
    critical: {
      wrapper: "border-rose-200 dark:border-rose-900/50 bg-rose-50/60 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200",
      icon: <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />,
      button: "bg-rose-600 hover:bg-rose-700 text-white dark:bg-rose-500",
    },
    success: {
      wrapper: "border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200",
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />,
      button: "bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500",
    },
  }[severity];

  return (
    <div
      className={`rounded-xl border p-4 flex items-start gap-3 shadow-sm transition-all ${styles.wrapper}`}
    >
      <div className="mt-0.5">{styles.icon}</div>
      <div className="flex-1 text-xs">
        <h4 className="font-semibold text-sm">{title}</h4>
        <p className="mt-0.5 opacity-90 leading-relaxed">{message}</p>

        {actionLabel && (
          <div className="mt-2.5">
            <button
              type="button"
              className={`px-3 py-1 text-xs font-medium rounded-md shadow-sm transition-colors ${styles.button}`}
            >
              {actionLabel}
            </button>
          </div>
        )}
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="opacity-60 hover:opacity-100 p-0.5 rounded transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
