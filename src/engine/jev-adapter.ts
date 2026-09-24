export interface JevSystemOneRequest {
  state: string;
  model?: string;
  questions: Record<
    string,
    {
      type: "choice" | "score" | "noul";
      instructions: string;
      criteria?: Record<string, string> | string[];
    }
  >;
}

export interface JevSystemOneResponse {
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

export class JevAdapter {
  private endpoint: string;
  private apiKey: string;
  private model: string;

  constructor(apiKey?: string, endpoint = "https://api.typesafe.ai/v1/systemone", model = "jev-latest") {
    this.apiKey = apiKey || (typeof process !== "undefined" ? process.env?.TYPESAFE_API_KEY || "" : "");
    this.endpoint = endpoint;
    this.model = model;
  }

  isAvailable(): boolean {
    return Boolean(this.apiKey);
  }

  async predict(request: JevSystemOneRequest, timeoutMs = 800): Promise<JevSystemOneResponse | null> {
    if (!this.apiKey) return null;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const resp = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          ...request,
        }),
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (!resp.ok) return null;
      return (await resp.json()) as JevSystemOneResponse;
    } catch {
      clearTimeout(timer);
      return null;
    }
  }
}
