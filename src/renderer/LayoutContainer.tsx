import React from "react";
import type { LayoutType } from "../engine/types.js";

export interface LayoutContainerProps {
  layout: LayoutType;
  title?: string;
  description?: string;
  children: React.ReactNode[];
}

export const LayoutContainer: React.FC<LayoutContainerProps> = ({
  layout,
  title,
  description,
  children,
}) => {
  if (layout === "dashboard") {
    // Separate metrics (first elements) from charts/tables
    const metrics: React.ReactNode[] = [];
    const mainBlocks: React.ReactNode[] = [];

    children.forEach((child) => {
      // In dashboard layout, cards are grouped in top row
      metrics.push(child);
    });

    return (
      <div className="space-y-6 w-full animate-in fade-in duration-300">
        {(title || description) && (
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
            {title && <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{title}</h1>}
            {description && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{description}</p>
            )}
          </div>
        )}

        <div className="space-y-5">
          {children}
        </div>
      </div>
    );
  }

  if (layout === "grid-2") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full animate-in fade-in duration-300">
        {children}
      </div>
    );
  }

  if (layout === "hero-first") {
    return (
      <div className="space-y-8 w-full max-w-5xl mx-auto animate-in fade-in duration-300">
        {children}
      </div>
    );
  }

  // Default: vertical stack
  return (
    <div className="space-y-5 w-full animate-in fade-in duration-300">
      {children}
    </div>
  );
};
