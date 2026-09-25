export const DESIGN_OS_ACTION_EVENT = "design-os:action";
/**
 * Dispatch an action from an interactive component to the system/agent runtime.
 * Works across React, Vue, Next.js, and Agentic frameworks.
 */
export function dispatchDesignOSAction(action, componentId) {
    if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
        const detail = {
            action,
            componentId,
            timestamp: Date.now(),
        };
        const event = new CustomEvent(DESIGN_OS_ACTION_EVENT, {
            detail,
            bubbles: true,
            cancelable: true,
        });
        window.dispatchEvent(event);
    }
}
/**
 * Subscribe to DesignOS interactive action events emitted by components.
 * Returns an unsubscribe cleanup function.
 */
export function listenDesignOSActions(handler) {
    if (typeof window === "undefined" || typeof window.addEventListener !== "function") {
        return () => { };
    }
    const listener = (e) => {
        const customEvent = e;
        handler(customEvent.detail, customEvent);
    };
    window.addEventListener(DESIGN_OS_ACTION_EVENT, listener);
    return () => {
        window.removeEventListener(DESIGN_OS_ACTION_EVENT, listener);
    };
}
//# sourceMappingURL=events.js.map