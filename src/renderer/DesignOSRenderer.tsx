import React from "react";
import type { CatalogRegistry } from "../catalog/types.js";
import { defaultCatalog } from "../catalog/registry.js";
import type { UISpec } from "../engine/types.js";
import { LayoutContainer } from "./LayoutContainer.js";
import { AlertCircle } from "lucide-react";

export interface DesignOSRendererProps {
  spec: UISpec;
  catalog?: CatalogRegistry;
  className?: string;
  onError?: (err: Error) => void;
}

export const DesignOSRenderer: React.FC<DesignOSRendererProps> = ({
  spec,
  catalog = defaultCatalog,
  className = "",
  onError,
}) => {
  if (!spec || !spec.components || spec.components.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800 p-8 text-center text-zinc-400 text-xs">
        Chưa có cấu hình giao diện (Empty UI Spec).
      </div>
    );
  }

  // Group metrics in dashboard layout
  const isDashboard = spec.layout === "dashboard";
  const metricComponents = spec.components.filter((c) => c.type === "metric_card");
  const otherComponents = spec.components.filter((c) => c.type !== "metric_card");

  const renderedElements: React.ReactNode[] = [];

  if (isDashboard && metricComponents.length > 0) {
    // Render top 3-column metric grid
    renderedElements.push(
      <div
        key="metrics-grid-row"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
      >
        {metricComponents.map((comp) => renderComponent(comp, catalog, onError))}
      </div>
    );

    // Render remaining charts, tables, alerts
    otherComponents.forEach((comp) => {
      renderedElements.push(renderComponent(comp, catalog, onError));
    });
  } else {
    // Standard rendering
    spec.components.forEach((comp) => {
      renderedElements.push(renderComponent(comp, catalog, onError));
    });
  }

  return (
    <div className={`w-full ${className}`}>
      <LayoutContainer layout={spec.layout} title={spec.title} description={spec.description}>
        {renderedElements}
      </LayoutContainer>
    </div>
  );
};

function renderComponent(
  comp: { id: string; type: string; props: Record<string, any> },
  catalog: CatalogRegistry,
  onError?: (err: Error) => void
): React.ReactNode {
  const meta = catalog[comp.type];

  if (!meta) {
    return (
      <div
        key={comp.id}
        className="rounded-lg border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-3 text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2"
      >
        <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
        <span>Component không tồn tại trong Catalog: <strong>{comp.type}</strong></span>
      </div>
    );
  }

  // Type-safe Zod validation
  try {
    const validatedProps = meta.schema.parse({
      ...meta.defaultProps,
      ...comp.props,
    });
    const Component = meta.component;
    return <Component key={comp.id} {...validatedProps} />;
  } catch (err: any) {
    if (onError) onError(err);
    return (
      <div
        key={comp.id}
        className="rounded-lg border border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 p-3 text-xs text-rose-800 dark:text-rose-200 flex items-center gap-2"
      >
        <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
        <span>Lỗi xác thực Zod Schema [{comp.type}]: {err.message}</span>
      </div>
    );
  }
}
