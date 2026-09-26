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

  async predict(request: LayaPredictRequest, timeoutMs = 500): Promise<LayaPredictResponse | null> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const resp = await fetch(this.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
        signal: controller.signal,
      });

      if (!resp.ok) {
        clearTimeout(timer);
        return null;
      }
      const data = (await resp.json()) as LayaPredictResponse;
      clearTimeout(timer);
      return data;
    } catch {
      clearTimeout(timer);
      return null;
    }
  }
}
