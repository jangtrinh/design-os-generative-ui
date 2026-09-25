export class LayaAdapter {
    endpoint;
    constructor(endpoint = "http://127.0.0.1:8000/predict") {
        this.endpoint = endpoint;
    }
    async predict(request, timeoutMs = 80) {
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
            if (!resp.ok)
                return null;
            return (await resp.json());
        }
        catch {
            clearTimeout(timer);
            return null;
        }
    }
}
//# sourceMappingURL=laya-adapter.js.map