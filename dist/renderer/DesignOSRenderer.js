import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { defaultCatalog } from "../catalog/registry.js";
import { LayoutContainer } from "./LayoutContainer.js";
import { AlertCircle } from "lucide-react";
export const DesignOSRenderer = ({ spec, catalog = defaultCatalog, className = "", onError, }) => {
    if (!spec || !spec.components || spec.components.length === 0) {
        return (_jsx("div", { className: "rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800 p-8 text-center text-zinc-400 text-xs", children: "Ch\u01B0a c\u00F3 c\u1EA5u h\u00ECnh giao di\u1EC7n (Empty UI Spec)." }));
    }
    // Group metrics in dashboard layout
    const isDashboard = spec.layout === "dashboard";
    const metricComponents = spec.components.filter((c) => c.type === "metric_card");
    const otherComponents = spec.components.filter((c) => c.type !== "metric_card");
    const renderedElements = [];
    if (isDashboard && metricComponents.length > 0) {
        // Render top 3-column metric grid
        renderedElements.push(_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full", children: metricComponents.map((comp) => renderComponent(comp, catalog, onError)) }, "metrics-grid-row"));
        // Render remaining charts, tables, alerts
        otherComponents.forEach((comp) => {
            renderedElements.push(renderComponent(comp, catalog, onError));
        });
    }
    else {
        // Standard rendering
        spec.components.forEach((comp) => {
            renderedElements.push(renderComponent(comp, catalog, onError));
        });
    }
    return (_jsx("div", { className: `w-full ${className}`, children: _jsx(LayoutContainer, { layout: spec.layout, title: spec.title, description: spec.description, children: renderedElements }) }));
};
function renderComponent(comp, catalog, onError) {
    const meta = catalog[comp.type];
    if (!meta) {
        return (_jsxs("div", { className: "rounded-lg border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-3 text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2", children: [_jsx(AlertCircle, { className: "w-4 h-4 shrink-0 text-amber-600" }), _jsxs("span", { children: ["Component kh\u00F4ng t\u1ED3n t\u1EA1i trong Catalog: ", _jsx("strong", { children: comp.type })] })] }, comp.id));
    }
    // Type-safe Zod validation
    try {
        const validatedProps = meta.schema.parse({
            ...meta.defaultProps,
            ...comp.props,
        });
        const Component = meta.component;
        return _jsx(Component, { ...validatedProps }, comp.id);
    }
    catch (err) {
        if (onError)
            onError(err);
        return (_jsxs("div", { className: "rounded-lg border border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 p-3 text-xs text-rose-800 dark:text-rose-200 flex items-center gap-2", children: [_jsx(AlertCircle, { className: "w-4 h-4 shrink-0 text-rose-600" }), _jsxs("span", { children: ["L\u1ED7i x\u00E1c th\u1EF1c Zod Schema [", comp.type, "]: ", err.message] })] }, comp.id));
    }
}
//# sourceMappingURL=DesignOSRenderer.js.map