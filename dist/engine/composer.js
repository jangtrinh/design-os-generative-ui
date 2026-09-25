import { defaultCatalog } from "../catalog/registry.js";
import { LayaAdapter } from "./laya-adapter.js";
import { JevAdapter } from "./jev-adapter.js";
export class DesignOSComposer {
    catalog;
    laya;
    jev;
    cascadeThreshold;
    constructor(options = {}, catalog = defaultCatalog) {
        this.catalog = catalog;
        this.cascadeThreshold = options.cascadeThreshold ?? 0.30;
        this.laya = new LayaAdapter(options.localEndpoint ?? "http://127.0.0.1:8000/predict");
        this.jev = new JevAdapter();
    }
    /**
     * Evaluates user prompt and rapidly composes a validated UI Spec via System 1 Cascade Router.
     */
    async compose(prompt, options = {}) {
        const startTime = performance.now();
        const threshold = options.cascadeThreshold ?? this.cascadeThreshold;
        const forceCloud = options.forceCloud ?? false;
        // 1. Build Criteria mapping from Catalog for System 1
        const componentCriteria = {};
        for (const [id, meta] of Object.entries(this.catalog)) {
            componentCriteria[id] = `${meta.name}: ${meta.system1Criteria}`;
        }
        const layoutCriteria = {
            dashboard: "Bố cục bảng điều khiển, chia lưới nhiều cột cho thẻ số liệu và biểu đồ",
            "hero-first": "Bố cục trang chủ với banner lớn ở đầu trang, theo sau là tính năng và bảng giá",
            "grid-2": "Bố cục chia đôi hai cột cân đối",
            stack: "Bố cục xếp dọc tuần tự từ trên xuống dưới",
            single: "Chỉ hiển thị một widget đơn lẻ duy nhất",
        };
        const questions = {
            primary_widget: {
                type: "choice",
                instructions: "Chọn widget giao diện phù hợp nhất với yêu cầu của người dùng từ Catalog:",
                criteria: componentCriteria,
            },
            layout_topology: {
                type: "choice",
                instructions: "Chọn bố cục trình bày tối ưu nhất cho giao diện này:",
                criteria: layoutCriteria,
            },
            is_dashboard_intent: {
                type: "noul",
                instructions: "Yêu cầu có liên quan đến theo dõi số liệu, dashboard, biểu đồ hoặc phân tích không?",
            },
            is_marketing_intent: {
                type: "noul",
                instructions: "Yêu cầu có liên quan đến giới thiệu sản phẩm, landing page, trang chủ hoặc bảng giá không?",
            },
            has_warning_or_alert: {
                type: "noul",
                instructions: "Người dùng có đề cập đến lỗi, sự cố, bảo trì, cảnh báo hoặc trạng thái khẩn cấp không?",
            },
        };
        let engineUsed = "deterministic";
        let confidence = 0.85;
        let escalated = false;
        let answers = {};
        // 2. Cascade Layer 1: Local Laya-MLX (<10ms, $0)
        if (!forceCloud) {
            try {
                const layaResp = await this.laya.predict({
                    state: `User UI Request: "${prompt}"`,
                    questions,
                });
                if (layaResp?.answers?.primary_widget) {
                    const layaConf = layaResp.answers.primary_widget.confidence ?? 0.5;
                    if (layaConf >= threshold) {
                        // Solved locally by Laya
                        engineUsed = "laya-mlx";
                        confidence = layaConf;
                        escalated = false;
                        answers = layaResp.answers;
                    }
                }
            }
            catch {
                // Fallback to JEV
            }
        }
        // 3. Cascade Layer 2: Escalate to TypeSafe JEV Cloud API when confidence < threshold or forced
        if (Object.keys(answers).length === 0 && this.jev.isAvailable()) {
            try {
                const jevResp = await this.jev.predict({
                    state: `User UI Request: "${prompt}"`,
                    questions,
                });
                if (jevResp?.answers?.primary_widget) {
                    engineUsed = "jev-cloud";
                    confidence = jevResp.answers.primary_widget.confidence ?? 0.9;
                    escalated = true;
                    answers = jevResp.answers;
                }
            }
            catch {
                // Fallback to deterministic
            }
        }
        // 4. Fallback Layer 3: Sub-millisecond Calibrated Deterministic Rule Engine
        if (Object.keys(answers).length === 0) {
            engineUsed = "deterministic";
            answers = this.evaluateDeterministic(prompt);
            confidence = 0.75;
            escalated = false;
        }
        // 5. Assemble UI Spec from System 1 Decisions
        const spec = this.assembleSpec(prompt, answers);
        const latencyMs = performance.now() - startTime;
        return {
            spec,
            telemetry: {
                engine: engineUsed,
                latencyMs: Math.round(latencyMs * 100) / 100,
                confidence: Math.round(confidence * 100) / 100,
                escalated,
                selectedComponents: spec.components.map((c) => c.type),
            },
        };
    }
    assembleSpec(prompt, answers) {
        const primaryChoice = answers.primary_widget?.choice || "metric_card";
        const layoutChoice = answers.layout_topology?.choice || "stack";
        const isDashboard = answers.is_dashboard_intent?.truth_probability
            ? answers.is_dashboard_intent.truth_probability > 0.5
            : prompt.toLowerCase().includes("dashboard") || prompt.toLowerCase().includes("doanh thu");
        const isMarketing = answers.is_marketing_intent?.truth_probability
            ? answers.is_marketing_intent.truth_probability > 0.5
            : prompt.toLowerCase().includes("landing") || prompt.toLowerCase().includes("giá");
        const hasAlert = answers.has_warning_or_alert?.truth_probability
            ? answers.has_warning_or_alert.truth_probability > 0.5
            : prompt.toLowerCase().includes("lỗi") || prompt.toLowerCase().includes("cảnh báo");
        const components = [];
        // Alert Banner if detected
        if (hasAlert && this.catalog.alert_banner) {
            components.push({
                id: "alert-top",
                type: "alert_banner",
                props: {
                    ...this.catalog.alert_banner.defaultProps,
                    title: "Thông Báo Trạng Thái",
                    message: `Hệ thống phát hiện ghi chú: "${prompt.slice(0, 80)}"`,
                    severity: prompt.toLowerCase().includes("lỗi") ? "critical" : "warning",
                },
            });
        }
        if (isMarketing) {
            // Compose Marketing Stack
            if (this.catalog.hero_section) {
                components.push({
                    id: "hero-main",
                    type: "hero_section",
                    props: {
                        ...this.catalog.hero_section.defaultProps,
                        headline: prompt.length > 10 ? prompt : "Khám Phá Giải Pháp Đột Phá",
                    },
                });
            }
            if (this.catalog.feature_grid) {
                components.push({
                    id: "features-main",
                    type: "feature_grid",
                    props: this.catalog.feature_grid.defaultProps,
                });
            }
            if (prompt.toLowerCase().includes("giá") && this.catalog.pricing_table) {
                components.push({
                    id: "pricing-main",
                    type: "pricing_table",
                    props: this.catalog.pricing_table.defaultProps,
                });
            }
            if (this.catalog.cta_section) {
                components.push({
                    id: "cta-bottom",
                    type: "cta_section",
                    props: this.catalog.cta_section.defaultProps,
                });
            }
            return {
                layout: "hero-first",
                title: "Marketing Landing View",
                components,
            };
        }
        if (isDashboard || primaryChoice === "metric_card" || primaryChoice === "trend_chart") {
            // Compose Dashboard Layout
            if (this.catalog.metric_card) {
                components.push({
                    id: "metric-1",
                    type: "metric_card",
                    props: {
                        title: "Doanh Thu Thực Tế",
                        value: "$54,120",
                        change: "+18.4%",
                        trend: "up",
                        period: "so với tuần trước",
                    },
                }, {
                    id: "metric-2",
                    type: "metric_card",
                    props: {
                        title: "Khách Hàng Mới",
                        value: "1,429",
                        change: "+6.2%",
                        trend: "up",
                        period: "so với tuần trước",
                    },
                }, {
                    id: "metric-3",
                    type: "metric_card",
                    props: {
                        title: "Tỷ Lệ Chuyển Đổi",
                        value: "4.82%",
                        change: "-0.5%",
                        trend: "down",
                        period: "so với tuần trước",
                    },
                });
            }
            if (this.catalog.trend_chart) {
                components.push({
                    id: "chart-main",
                    type: "trend_chart",
                    props: this.catalog.trend_chart.defaultProps,
                });
            }
            if (this.catalog.data_table) {
                components.push({
                    id: "table-main",
                    type: "data_table",
                    props: this.catalog.data_table.defaultProps,
                });
            }
            return {
                layout: "dashboard",
                title: "Bảng Điều Khiển Quản Trị",
                components,
            };
        }
        // Single or fallback primary component
        const primaryMeta = this.catalog[primaryChoice] || this.catalog.metric_card;
        components.push({
            id: "comp-primary",
            type: primaryMeta.id,
            props: primaryMeta.defaultProps,
        });
        return {
            layout: layoutChoice,
            components,
        };
    }
    evaluateDeterministic(prompt) {
        const p = prompt.toLowerCase();
        let primary = "metric_card";
        if (p.includes("landing") || p.includes("trang chủ") || p.includes("hero"))
            primary = "hero_section";
        else if (p.includes("giá") || p.includes("pricing") || p.includes("gói"))
            primary = "pricing_table";
        else if (p.includes("tính năng") || p.includes("feature"))
            primary = "feature_grid";
        else if (p.includes("bảng") || p.includes("danh sách") || p.includes("table"))
            primary = "data_table";
        else if (p.includes("biểu đồ") || p.includes("chart") || p.includes("xu hướng"))
            primary = "trend_chart";
        else if (p.includes("cảnh báo") || p.includes("lỗi") || p.includes("alert"))
            primary = "alert_banner";
        return {
            primary_widget: { choice: primary, confidence: 0.8 },
            layout_topology: { choice: p.includes("dashboard") ? "dashboard" : "stack", confidence: 0.85 },
            is_dashboard_intent: { truth_probability: p.includes("dashboard") || p.includes("doanh thu") ? 0.9 : 0.1 },
            is_marketing_intent: { truth_probability: p.includes("landing") || p.includes("giá") ? 0.9 : 0.1 },
            has_warning_or_alert: { truth_probability: p.includes("lỗi") || p.includes("cảnh báo") ? 0.95 : 0.05 },
        };
    }
}
//# sourceMappingURL=composer.js.map