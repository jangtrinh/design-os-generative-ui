import React, { useState, useEffect } from "react";
import { DesignOSComposer } from "../../src/engine/composer.js";
import { DesignOSRenderer } from "../../src/renderer/DesignOSRenderer.js";
import type { ComposeResult, UISpec } from "../../src/engine/types.js";
import { Sparkles, Zap, Shield, Cpu, Code2, Play, RefreshCw } from "lucide-react";

const composer = new DesignOSComposer();

const PRESETS = [
  {
    label: "📊 Dashboard Doanh Số & Đơn Hàng",
    prompt: "Dựng dashboard theo dõi doanh số tuần này, biểu đồ tăng trưởng và danh sách 10 đơn hàng mới nhất",
  },
  {
    label: "🚀 Landing Page Giới Thiệu Sản Phẩm",
    prompt: "Tạo landing page giới thiệu phần mềm AI thế hệ mới với 3 tính năng cốt lõi và nút dùng thử",
  },
  {
    label: "💰 Bảng Giá 3 Gói Dịch Vụ SaaS",
    prompt: "Hiển thị bảng giá dịch vụ gồm các gói Starter, Pro và Enterprise",
  },
  {
    label: "⚠️ Cảnh Báo Sự Cố Hệ Thống",
    prompt: "Thông báo lỗi khẩn cấp: cơ sở dữ liệu đang bảo trì đột xuất, vui lòng liên hệ hỗ trợ kỹ thuật",
  },
];

export const App: React.FC = () => {
  const [prompt, setPrompt] = useState(PRESETS[0].prompt);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ComposeResult | null>(null);
  const [showJson, setShowJson] = useState(false);
  const [forceCloud, setForceCloud] = useState(false);

  const handleCompose = async (customPrompt?: string) => {
    const text = customPrompt || prompt;
    if (!text.trim()) return;

    setLoading(true);
    try {
      const res = await composer.compose(text, { forceCloud });
      setResult(res);
    } catch (err) {
      console.error("Compose error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCompose(PRESETS[0].prompt);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-950 flex items-center justify-center font-black text-sm shadow">
            D
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-zinc-50">Design OS Generative UI</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700">
                System 1 Cascade
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">Sub-50ms Real-Time Adaptive UI Playground</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={forceCloud}
              onChange={(e) => setForceCloud(e.target.checked)}
              className="rounded border-zinc-700 bg-zinc-800 text-zinc-100 focus:ring-0"
            />
            <span>Bắt buộc dùng JEV Cloud</span>
          </label>

          <button
            type="button"
            onClick={() => setShowJson(!showJson)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
              showJson
                ? "bg-zinc-800 border-zinc-600 text-white"
                : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>{showJson ? "Ẩn JSON Spec" : "Xem JSON Spec"}</span>
          </button>
        </div>
      </header>

      {/* Control Bar */}
      <div className="border-b border-zinc-800 bg-zinc-900/30 px-6 py-4">
        <div className="max-w-6xl mx-auto space-y-3">
          {/* Input Box */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCompose()}
                placeholder="Nhập mô tả giao diện bạn muốn dựng (ví dụ: Dựng bảng giá 3 gói dịch vụ)..."
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 shadow-inner"
              />
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleCompose()}
              className="px-5 py-2.5 rounded-xl bg-zinc-100 text-zinc-950 hover:bg-white text-xs font-bold flex items-center gap-2 shadow transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current" />
              )}
              <span>Soạn Giao Diện</span>
            </button>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-zinc-500 font-medium">Gợi ý nhanh:</span>
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPrompt(p.prompt);
                  handleCompose(p.prompt);
                }}
                className="text-xs px-2.5 py-1 rounded-lg border border-zinc-800 bg-zinc-900/70 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Telemetry Bar */}
      {result && (
        <div className="bg-zinc-900/40 border-b border-zinc-800/80 px-6 py-2.5">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-6">
              {/* Engine */}
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">Động cơ:</span>
                <span
                  className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-md ${
                    result.telemetry.engine === "laya-mlx"
                      ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/50"
                      : result.telemetry.engine === "jev-cloud"
                      ? "bg-blue-950/60 text-blue-400 border border-blue-800/50"
                      : "bg-zinc-800 text-zinc-300"
                  }`}
                >
                  <Zap className="w-3 h-3" />
                  {result.telemetry.engine === "laya-mlx"
                    ? "Laya-MLX (Local Apple Silicon)"
                    : result.telemetry.engine === "jev-cloud"
                    ? "TypeSafe JEV (Cloud API)"
                    : "Deterministic Calibrated Engine"}
                </span>
              </div>

              {/* Latency */}
              <div className="flex items-center gap-1.5">
                <span className="text-zinc-500">Độ trễ:</span>
                <span className="font-mono font-bold text-zinc-200">
                  {result.telemetry.latencyMs} ms
                </span>
                {result.telemetry.latencyMs < 50 && (
                  <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/40 px-1.5 py-0.2 rounded">
                    ⚡ Sub-50ms
                  </span>
                )}
              </div>

              {/* Confidence */}
              <div className="flex items-center gap-1.5">
                <span className="text-zinc-500">Độ tin cậy:</span>
                <span className="font-mono font-bold text-zinc-200">
                  {Math.round(result.telemetry.confidence * 100)}%
                </span>
              </div>
            </div>

            {/* Components Rendered */}
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500">Components:</span>
              <div className="flex items-center gap-1">
                {result.telemetry.selectedComponents.map((c, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[10px]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Preview Area */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-6 sm:p-8 flex gap-6">
        <div className="flex-1 min-w-0">
          {result ? (
            <DesignOSRenderer spec={result.spec} />
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-800 p-16 text-center text-zinc-500">
              <Sparkles className="w-8 h-8 mx-auto mb-3 opacity-40" />
              <p className="text-sm font-medium">Nhập yêu cầu để tạo giao diện tức thì</p>
            </div>
          )}
        </div>

        {/* JSON Spec Inspector */}
        {showJson && result && (
          <div className="w-96 rounded-xl border border-zinc-800 bg-zinc-900/90 p-4 font-mono text-xs overflow-auto max-h-[750px] shadow-xl shrink-0">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3 text-zinc-400">
              <span className="font-semibold text-zinc-200">Generated UISpec (JSON)</span>
              <span className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded">Zod Validated</span>
            </div>
            <pre className="text-zinc-300 whitespace-pre-wrap leading-relaxed">
              {JSON.stringify(result.spec, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
};
