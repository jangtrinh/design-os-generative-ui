import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const LayoutContainer = ({ layout, title, description, children, }) => {
    if (layout === "dashboard") {
        // Separate metrics (first elements) from charts/tables
        const metrics = [];
        const mainBlocks = [];
        children.forEach((child) => {
            // In dashboard layout, cards are grouped in top row
            metrics.push(child);
        });
        return (_jsxs("div", { className: "space-y-6 w-full animate-in fade-in duration-300", children: [(title || description) && (_jsxs("div", { className: "border-b border-zinc-200 dark:border-zinc-800 pb-4", children: [title && _jsx("h1", { className: "text-xl font-bold text-zinc-900 dark:text-zinc-50", children: title }), description && (_jsx("p", { className: "text-xs text-zinc-500 dark:text-zinc-400 mt-1", children: description }))] })), _jsx("div", { className: "space-y-5", children: children })] }));
    }
    if (layout === "grid-2") {
        return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5 w-full animate-in fade-in duration-300", children: children }));
    }
    if (layout === "hero-first") {
        return (_jsx("div", { className: "space-y-8 w-full max-w-5xl mx-auto animate-in fade-in duration-300", children: children }));
    }
    // Default: vertical stack
    return (_jsx("div", { className: "space-y-5 w-full animate-in fade-in duration-300", children: children }));
};
//# sourceMappingURL=LayoutContainer.js.map