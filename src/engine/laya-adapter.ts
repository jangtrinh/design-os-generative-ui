export interface LayaPredictRequest {
  state: string;
  questions: Record<
    string,
    {
      type: "choice" | "score" | "noul";
      instructions: string;
      criteria?: Record<string, string> | string[];
    }
  >;
}

export interface LayaPredictResponse {
  answers: Record<
    string,
    {
      choice?: string;
      confidence?: number;
      score?: number;
      truth_probability?: number;
      probabilities?: Record<string, number>;
    }
  >;
}

export class LayaAdapter {
  private endpoint: string;

  constructor(endpoint = "http://127.0.0.1:8000/predict") {
    this.endpoint = endpoint;
  }

  async predict(request: LayaPredictRequest, timeoutMs = 80): Promise<LayaPredictResponse | null> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const resp = await fetch(this.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (!resp.ok) return null;
      return (await resp.json()) as LayaPredictResponse;
    } catch {
      clearTimeout(timer);
      return null;
    }
  }
}
