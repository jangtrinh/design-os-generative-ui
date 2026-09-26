export class JevAdapter {
    endpoint;
    apiKey;
    model;
    constructor(apiKey, endpoint = "https://api.typesafe.ai/v1/systemone", model = "jev-latest") {
        this.apiKey = apiKey || (typeof process !== "undefined" ? process.env?.TYPESAFE_API_KEY || "" : "");
        this.endpoint = endpoint;
        this.model = model;
    }
    isAvailable() {
        return Boolean(this.apiKey);
    }
    async predict(request, timeoutMs = 3000) {
        if (!this.apiKey)
            return null;
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
            if (!resp.ok) {
                clearTimeout(timer);
                return null;
            }
            const data = (await resp.json());
            clearTimeout(timer);
            return data;
        }
        catch {
            clearTimeout(timer);
            return null;
        }
    }
}
//# sourceMappingURL=jev-adapter.js.map