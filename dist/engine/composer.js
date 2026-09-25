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
                }, options.localTimeoutMs ?? 500);
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
                }, options.cloudTimeoutMs ?? 3000);
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
        const getTruthProb = (ans) => {
            if (!ans)
                return undefined;
            if (typeof ans.truth_probability === "number")
                return ans.truth_probability;
            if (typeof ans.noul === "number")
                return ans.noul;
            return undefined;
        };
        const probDashboard = getTruthProb(answers.is_dashboard_intent);
        const probMarketing = getTruthProb(answers.is_marketing_intent);
        const probAlert = getTruthProb(answers.has_warning_or_alert);
        const p = prompt.toLowerCase();
        const isDashboardKeyword = p.includes("dashboard") ||
            p.includes("doanh thu") ||
            p.includes("doanh số") ||
            p.includes("báo cáo") ||
            p.includes("giao dịch") ||
            p.includes("dòng tiền") ||
            p.includes("retention") ||
            p.includes("tăng trưởng");
        const isMarketingKeyword = p.includes("landing") ||
            p.includes("giới thiệu") ||
            p.includes("trang chủ") ||
            p.includes("bảng giá") ||
            p.includes("gói dịch vụ") ||
            p.includes("pricing");
        const dashScore = probDashboard ?? (isDashboardKeyword ? 0.85 : 0.2);
        const mktScore = probMarketing ?? (isMarketingKeyword ? 0.85 : 0.2);
        const isDashboard = dashScore >= 0.4 && dashScore >= mktScore;
        const isMarketing = mktScore >= 0.5 && mktScore > dashScore;
        const hasAlert = (probAlert ?? 0) > 0.65 ||
            p.includes("lỗi") ||
            p.includes("cảnh báo") ||
            p.includes("khẩn cấp") ||
            p.includes("bất thường");
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
                    severity: p.includes("lỗi") || p.includes("sập") || p.includes("khẩn cấp") ? "critical" : "warning",
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
            if ((p.includes("giá") || p.includes("gói") || p.includes("pricing") || primaryChoice === "pricing_table") &&
                this.catalog.pricing_table) {
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
        // Check if primaryChoice is a registered component outside the standard default marketing/dashboard triplets
        const isStandardTriplet = [
            "metric_card",
            "trend_chart",
            "data_table",
            "hero_section",
            "feature_grid",
            "pricing_table",
            "cta_section",
            "alert_banner",
        ].includes(primaryChoice);
        if (!isStandardTriplet && this.catalog[primaryChoice]) {
            const customMeta = this.catalog[primaryChoice];
            components.push({
                id: `custom-${primaryChoice}`,
                type: customMeta.id,
                props: customMeta.defaultProps,
            });
            // If user also requested dashboard/analytics context, add supporting metrics
            if (isDashboard && this.catalog.metric_card) {
                components.push({
                    id: "metric-context",
                    type: "metric_card",
                    props: {
                        title: "Trạng Thái Theo Dõi",
                        value: "100%",
                        change: "Ổn định",
                        trend: "up",
                        period: "thời gian thực",
                    },
                });
            }
            return {
                layout: layoutChoice === "dashboard" ? "grid-2" : layoutChoice,
                title: customMeta.name,
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
        let bestScore = 0;
        // 1. Dynamic Catalog matching for custom and default components
        for (const [id, meta] of Object.entries(this.catalog)) {
            const criteriaStr = `${meta.name} ${meta.system1Criteria || ""} ${meta.description || ""}`.toLowerCase();
            const words = criteriaStr.split(/[,;\s]+/);
            let matchCount = 0;
            for (const w of words) {
                if (w.length >= 3 && p.includes(w)) {
                    matchCount++;
                }
            }
            if (matchCount > bestScore) {
                bestScore = matchCount;
                primary = id;
            }
        }
        // 2. Standard heuristic fallbacks if no specific keyword match
        if (bestScore === 0) {
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
        }
        const isDashboard = p.includes("dashboard") || p.includes("doanh thu") || p.includes("thống kê");
        const isMarketing = p.includes("landing") || p.includes("giá") || p.includes("sản phẩm");
        const hasAlert = p.includes("lỗi") || p.includes("cảnh báo") || p.includes("alert");
        return {
            primary_widget: { choice: primary, confidence: bestScore > 0 ? 0.9 : 0.8 },
            layout_topology: { choice: isDashboard ? "dashboard" : isMarketing ? "hero-first" : "stack", confidence: 0.85 },
            is_dashboard_intent: { truth_probability: isDashboard ? 0.9 : 0.1 },
            is_marketing_intent: { truth_probability: isMarketing ? 0.9 : 0.1 },
            has_warning_or_alert: { truth_probability: hasAlert ? 0.95 : 0.05 },
        };
    }
}
//# sourceMappingURL=composer.js.map