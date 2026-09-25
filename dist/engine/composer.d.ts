import type { CatalogRegistry } from "../catalog/types.js";
import type { ComposeOptions, ComposeResult } from "./types.js";
export declare class DesignOSComposer {
    private catalog;
    private laya;
    private jev;
    private cascadeThreshold;
    constructor(options?: ComposeOptions, catalog?: CatalogRegistry);
    /**
     * Evaluates user prompt and rapidly composes a validated UI Spec via System 1 Cascade Router.
     */
    compose(prompt: string, options?: Partial<ComposeOptions>): Promise<ComposeResult>;
    private assembleSpec;
    private evaluateDeterministic;
}
//# sourceMappingURL=composer.d.ts.map