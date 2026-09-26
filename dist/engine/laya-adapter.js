export class LayaAdapter {
    endpoint;
    constructor(endpoint = "http://127.0.0.1:8000/predict") {
        this.endpoint = endpoint;
    }
    async predict(request, timeoutMs = 500) {
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
//# sourceMappingURL=laya-adapter.js.map