export interface JevSystemOneRequest {
    state: string;
    model?: string;
    questions: Record<string, {
        type: "choice" | "score" | "noul";
        instructions: string;
        criteria?: Record<string, string> | string[];
    }>;
}
export interface JevSystemOneResponse {
    answers: Record<string, {
        choice?: string;
        confidence?: number;
        score?: number;
        truth_probability?: number;
        probabilities?: Record<string, number>;
    }>;
}
export declare class JevAdapter {
    private endpoint;
    private apiKey;
    private model;
    constructor(apiKey?: string, endpoint?: string, model?: string);
    isAvailable(): boolean;
    predict(request: JevSystemOneRequest, timeoutMs?: number): Promise<JevSystemOneResponse | null>;
}
//# sourceMappingURL=jev-adapter.d.ts.map