export interface LayaPredictRequest {
    state: string;
    questions: Record<string, {
        type: "choice" | "score" | "noul";
        instructions: string;
        criteria?: Record<string, string> | string[];
    }>;
}
export interface LayaPredictResponse {
    answers: Record<string, {
        choice?: string;
        confidence?: number;
        score?: number;
        truth_probability?: number;
        probabilities?: Record<string, number>;
    }>;
}
export declare class LayaAdapter {
    private endpoint;
    constructor(endpoint?: string);
    predict(request: LayaPredictRequest, timeoutMs?: number): Promise<LayaPredictResponse | null>;
}
//# sourceMappingURL=laya-adapter.d.ts.map