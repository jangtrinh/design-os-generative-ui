import React, { useState, useEffect, useRef } from "react";
import { DesignOSComposer } from "../../src/engine/composer.js";
import { DesignOSRenderer } from "../../src/renderer/DesignOSRenderer.js";
import { listenDesignOSActions, type DesignOSActionDetail } from "../../src/engine/events.js";
import type { ComposeResult, UISpec } from "../../src/engine/types.js";
import { Sparkles, Zap, Shield, Cpu, Code2, Play, RefreshCw, AlertTriangle, CheckCircle2, Lock } from "lucide-react";

const composer = new DesignOSComposer();

const PRESETS = [
  {
    label: "🤖 Swarm Mission Control",
    prompt: "Mở bảng điều khiển Swarm Mission Control giám sát bầy 4 sub-agents tự trị và xử lý ngoại lệ",
  },
  {
    label: "📋 Bảng Kanban Sprint",
    prompt: "Dựng bảng Kanban quản lý tiến độ sprint dự án với 3 cột Cần làm, Đang xử lý, Hoàn thành",
  },
  {
    label: "📊 Doanh Số & Đơn Hàng",
    prompt: "Hiển thị các thẻ chỉ số doanh thu bán lẻ trực tuyến, biểu đồ doanh số và bảng lịch sử giao dịch khách hàng",
  },
  {
    label: "🚀 Landing Page Sản Phẩm",
    prompt: "Tạo landing page hiện đại phong cách Stark White giới thiệu công cụ AI Coding Assistant với 3 tính năng và nút dùng thử",
  },
  {
    label: "💰 Bảng Giá 3 Gói SaaS",
    prompt: "Hiển thị bảng so sánh chi tiết các gói dịch vụ Starter, Professional và Enterprise cho khách hàng doanh nghiệp",
  },
  {
    label: "⚠️ Cảnh Báo Sập Cluster",
    prompt: "Cảnh báo khẩn cấp: Cluster Kubernetes worker-node-03 chạm ngưỡng 96% Memory, nguy cơ sập pod",
  },
  {
    label: "📈 Xu Hướng Tăng Trưởng",
    prompt: "Biểu đồ xu hướng tăng trưởng dòng tiền và phân tích biến động doanh thu 30 ngày qua",
  },
  {
    label: "👥 Retention & Khách Hàng",
    prompt: "Bảng thống kê tỷ lệ người dùng quay lại retention rate, khách hàng VIP và danh sách người dùng mới",
  },
  {
    label: "🛡️ Cảnh Báo An Ninh 2FA",
    prompt: "Thông báo bảo mật: Phát hiện nhiều lần đăng nhập bất thường từ dải IP lạ, yêu cầu đổi mật khẩu ngay",
  },
  {
    label: "📦 Tra Cứu Vận Đơn",
    prompt: "Khách hàng muốn tra cứu tình trạng vận chuyển mã bưu phẩm và thời gian giao hàng",
  },
];

export const App: React.FC = () => {
  const [prompt, setPrompt] = useState(PRESETS[0].prompt);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ComposeResult | null>(null);
  const [showJson, setShowJson] = useState(false);
  const [forceCloud, setForceCloud] = useState(false);
  const [localOnly, setLocalOnly] = useState(false);
  const [clientRenderTimeMs, setClientRenderTimeMs] = useState<number | null>(null);
  const [actionToast, setActionToast] = useState<DesignOSActionDetail | null>(null);

  // Subscribe to DesignOS interactive action events
  useEffect(() => {
    const unsubscribe = listenDesignOSActions((detail) => {
      setActionToast(detail);
      const timer = setTimeout(() => setActionToast(null), 5000);
      return () => clearTimeout(timer);
    });
    return unsubscribe;
  }, []);

  const handleCompose = async (customPrompt?: string) => {
    const text = customPrompt || prompt;
    if (!text.trim()) return;

    setLoading(true);
    const startReqTime = performance.now();
    try {
      const res = await composer.compose(text, {
        forceCloud: localOnly ? false : forceCloud,
        localOnly,
      });

      // Measure client render time
      requestAnimationFrame(() => {
        const renderDoneTime = performance.now();
        setClientRenderTimeMs(Math.round(renderDoneTime - startReqTime));
      });

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
                Agentic Interaction Engine
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">Sub-50ms Real-Time Adaptive UI & Swarm Mission Control</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Local-Only Enforced Mode Toggle */}
          <label className="flex items-center gap-1.5 text-xs text-zinc-300 cursor-pointer select-none bg-zinc-900 border border-zinc-700 px-2.5 py-1.5 rounded-lg hover:border-zinc-600 transition-colors">
            <input
              type="checkbox"
              checked={localOnly}
              onChange={(e) => {
                setLocalOnly(e.target.checked);
                if (e.target.checked) setForceCloud(false);
              }}
              className="rounded border-zinc-700 bg-zinc-800 text-emerald-500 focus:ring-0"
            />
            <Lock className="w-3 h-3 text-emerald-400" />
            <span className="font-semibold text-emerald-400">Local-Only (Air-Gapped)</span>
          </label>

          <label className={`flex items-center gap-2 text-xs text-zinc-400 cursor-pointer select-none ${localOnly ? "opacity-40 pointer-events-none" : ""}`}>
            <input
              type="checkbox"
              checked={forceCloud}
              disabled={localOnly}
              onChange={(e) => setForceCloud(e.target.checked)}
              className="rounded border-zinc-700 bg-zinc-800 text-zinc-100 focus:ring-0"
            />
            <span>Bắt buộc JEV Cloud</span>
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
                placeholder="Nhập mô tả giao diện bạn muốn dựng (ví dụ: Bảng điều khiển Swarm Mission Control)..."
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
            <span className="text-xs text-zinc-500 font-medium">Kịch bản Agentic:</span>
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
                    ? "Laya-MLX (Apple Silicon UMA)"
                    : result.telemetry.engine === "jev-cloud"
                    ? "TypeSafe JEV (Cloud API)"
                    : "Deterministic Calibrated Engine"}
                </span>

                {result.telemetry.localEnforced && (
                  <span className="text-[10px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800 px-1.5 py-0.5 rounded">
                    🔒 Air-Gapped Local
                  </span>
                )}
              </div>

              {/* Latency: Decision + First-Paint E2E */}
              <div className="flex items-center gap-2 font-mono">
                <span className="text-zinc-500">Độ trễ Quyết định:</span>
                <span className="font-bold text-zinc-200">
                  {result.telemetry.latencyMs} ms
                </span>
                {clientRenderTimeMs !== null && (
                  <span className="text-zinc-400">
                    • E2E First-Paint: <strong className="text-emerald-400">{clientRenderTimeMs} ms</strong>
                  </span>
                )}
              </div>

              {/* Blast Radius / Rủi ro */}
              <div className="flex items-center gap-1.5">
                <span className="text-zinc-500">Blast Radius:</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                    result.telemetry.blastRadius === "critical"
                      ? "bg-red-950 text-red-300 border border-red-800"
                      : result.telemetry.blastRadius === "medium"
                      ? "bg-amber-950 text-amber-300 border border-amber-800"
                      : "bg-zinc-800 text-zinc-300"
                  }`}
                >
                  {result.telemetry.blastRadius ?? "low"}
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

      {/* Interactive Action Toast Notification */}
      {actionToast && (
        <aside aria-label="Thông báo hành động hệ thống" className="fixed bottom-6 right-6 z-50 max-w-md rounded-xl border border-emerald-500/40 bg-zinc-900 p-4 text-white shadow-2xl space-y-1.5 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>ACTION DISPATCHED ĐẾN AGENT RUNTIME</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">
              {new Date(actionToast.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <p className="text-sm font-medium text-zinc-100">
            Hành động: <span className="font-bold underline">{actionToast.action.label}</span> ({actionToast.action.id})
          </p>
          <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono pt-1">
            <span>Rủi ro: <strong className="text-amber-400 uppercase">{actionToast.action.blastRadius ?? "low"}</strong></span>
            <span>Nguồn: <strong>{actionToast.componentId ?? "ui"}</strong></span>
          </div>
        </aside>
      )}
    </div>
  );
};
