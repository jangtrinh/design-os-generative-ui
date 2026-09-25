import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { z } from "zod";
export const TrendChartSchema = z.object({
    title: z.string().describe("Tiêu đề biểu đồ"),
    subtitle: z.string().optional().describe("Mô tả phụ"),
    chartType: z.enum(["line", "bar"]).default("line").describe("Loại biểu đồ (line hoặc bar)"),
    dataPoints: z
        .array(z.object({
        label: z.string(),
        value: z.number(),
    }))
        .min(3)
        .describe("Dữ liệu các điểm mốc"),
    color: z.enum(["zinc", "emerald", "blue"]).default("zinc").describe("Màu chủ đạo"),
});
export const TrendChart = ({ title, subtitle, chartType = "line", dataPoints = [], color = "zinc", }) => {
    if (dataPoints.length === 0)
        return null;
    const values = dataPoints.map((d) => d.value);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const range = maxVal - minVal || 1;
    const width = 600;
    const height = 180;
    const paddingX = 40;
    const paddingY = 25;
    const stepX = (width - paddingX * 2) / (dataPoints.length - 1 || 1);
    // Compute coordinates
    const coords = dataPoints.map((d, i) => {
        const x = paddingX + i * stepX;
        const y = height - paddingY - ((d.value - minVal) / range) * (height - paddingY * 2);
        return { x, y, ...d };
    });
    const pathD = coords.reduce((acc, curr, idx) => {
        return idx === 0 ? `M ${curr.x},${curr.y}` : `${acc} L ${curr.x},${curr.y}`;
    }, "");
    const areaD = `${pathD} L ${coords[coords.length - 1].x},${height - paddingY} L ${coords[0].x},${height - paddingY} Z`;
    const strokeColor = color === "emerald"
        ? "stroke-emerald-600 dark:stroke-emerald-400"
        : color === "blue"
            ? "stroke-blue-600 dark:stroke-blue-400"
            : "stroke-zinc-900 dark:stroke-zinc-100";
    const fillColor = color === "emerald"
        ? "fill-emerald-500/10 dark:fill-emerald-400/10"
        : color === "blue"
            ? "fill-blue-500/10 dark:fill-blue-400/10"
            : "fill-zinc-900/5 dark:fill-zinc-100/5";
    return (_jsxs("div", { className: "rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 shadow-sm", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-zinc-900 dark:text-zinc-50", children: title }), subtitle && (_jsx("p", { className: "text-xs text-zinc-500 dark:text-zinc-400 mt-0.5", children: subtitle }))] }), _jsxs("div", { className: "flex items-center gap-1.5 text-xs text-zinc-400", children: [_jsx("span", { className: "w-2 h-2 rounded-full bg-zinc-900 dark:bg-zinc-100 inline-block" }), _jsx("span", { children: "Th\u1EDDi gian th\u1EF1c" })] })] }), _jsx("div", { className: "w-full overflow-x-auto", children: _jsxs("svg", { viewBox: `0 0 ${width} ${height}`, className: "w-full h-auto min-w-[400px]", children: [_jsx("line", { x1: paddingX, y1: paddingY, x2: width - paddingX, y2: paddingY, className: "stroke-zinc-100 dark:stroke-zinc-800", strokeDasharray: "4 4" }), _jsx("line", { x1: paddingX, y1: height / 2, x2: width - paddingX, y2: height / 2, className: "stroke-zinc-100 dark:stroke-zinc-800", strokeDasharray: "4 4" }), _jsx("line", { x1: paddingX, y1: height - paddingY, x2: width - paddingX, y2: height - paddingY, className: "stroke-zinc-200 dark:stroke-zinc-700" }), chartType === "line" ? (_jsxs(_Fragment, { children: [_jsx("path", { d: areaD, className: fillColor }), _jsx("path", { d: pathD, fill: "none", strokeWidth: "2.5", className: strokeColor }), coords.map((pt, idx) => (_jsx("circle", { cx: pt.x, cy: pt.y, r: "3.5", className: "fill-white dark:fill-zinc-950 stroke-zinc-900 dark:stroke-zinc-100 stroke-2" }, idx)))] })) : (
                        // Bar chart
                        coords.map((pt, idx) => {
                            const barWidth = 24;
                            const barHeight = height - paddingY - pt.y;
                            return (_jsx("rect", { x: pt.x - barWidth / 2, y: pt.y, width: barWidth, height: barHeight, rx: "4", className: "fill-zinc-800 dark:fill-zinc-200 hover:fill-zinc-600 transition-colors" }, idx));
                        })), coords.map((pt, idx) => (_jsx("text", { x: pt.x, y: height - 6, textAnchor: "middle", className: "text-[10px] fill-zinc-400 font-medium", children: pt.label }, idx)))] }) })] }));
};
//# sourceMappingURL=TrendChart.js.map