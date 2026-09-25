import type { ComponentAction } from "../catalog/types.js";
export declare const DESIGN_OS_ACTION_EVENT = "design-os:action";
export interface DesignOSActionDetail {
    action: ComponentAction;
    componentId?: string;
    timestamp: number;
}
/**
 * Dispatch an action from an interactive component to the system/agent runtime.
 * Works across React, Vue, Next.js, and Agentic frameworks.
 */
export declare function dispatchDesignOSAction(action: ComponentAction, componentId?: string): void;
/**
 * Subscribe to DesignOS interactive action events emitted by components.
 * Returns an unsubscribe cleanup function.
 */
export declare function listenDesignOSActions(handler: (detail: DesignOSActionDetail, event: CustomEvent<DesignOSActionDetail>) => void): () => void;
//# sourceMappingURL=events.d.ts.map