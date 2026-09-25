import React from "react";
import type { CatalogRegistry } from "../catalog/types.js";
import type { UISpec } from "../engine/types.js";
export interface DesignOSRendererProps {
    spec: UISpec;
    catalog?: CatalogRegistry;
    className?: string;
    onError?: (err: Error) => void;
}
export declare const DesignOSRenderer: React.FC<DesignOSRendererProps>;
//# sourceMappingURL=DesignOSRenderer.d.ts.map