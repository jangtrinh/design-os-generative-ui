import { defaultCatalog } from "../src/catalog/registry.js";
import { DesignOSComposer } from "../src/engine/composer.js";
import { z } from "zod";

interface TestReport {
  passed: number;
  failed: number;
  results: { name: string; status: "PASS" | "FAIL"; error?: string; latencyMs?: number }[];
}

const report: TestReport = { passed: 0, failed: 0, results: [] };

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(`Assertion Failed: ${message}`);
}

async function test(name: string, fn: () => void | Promise<void>) {
  const t0 = performance.now();
  try {
    await fn();
    const elapsed = performance.now() - t0;
    report.passed++;
    report.results.push({ name, status: "PASS", latencyMs: Math.round(elapsed * 100) / 100 });
    console.log(`  ✅ [PASS] ${name} (${elapsed.toFixed(1)}ms)`);
  } catch (err: any) {
    const elapsed = performance.now() - t0;
    report.failed++;
    report.results.push({ name, status: "FAIL", error: err.message, latencyMs: Math.round(elapsed * 100) / 100 });
    console.error(`  ❌ [FAIL] ${name}: ${err.message}`);
  }
}

async function runSuite() {
  console.log("=================================================");
  console.log("🧪 RUNNING TEST SUITE: design-os-generative-ui");
  console.log("=================================================\n");

  console.log("--- 1. Catalog Integrity & Zod Schema Tests ---");
  for (const [id, meta] of Object.entries(defaultCatalog)) {
    await test(`Catalog Item [${id}] - schema validates defaultProps`, () => {
      const parsed = meta.schema.safeParse(meta.defaultProps);
      assert(parsed.success, `Schema validation failed for defaultProps of ${id}: ${JSON.stringify(parsed)}`);
      assert(Boolean(meta.name), `Missing name in metadata for ${id}`);
      assert(Boolean(meta.system1Criteria), `Missing system1Criteria in metadata for ${id}`);
      assert(Boolean(meta.component), `Missing React component in metadata for ${id}`);
    });
  }

  console.log("\n--- 2. DesignOSComposer Decision & Topology Tests ---");
  const composer = new DesignOSComposer();

  await test("Composer: Dashboard Prompt correctly generates Dashboard Layout", async () => {
    const res = await composer.compose("Xem dashboard doanh thu và đơn hàng hôm nay");
    assert(res.spec.layout === "dashboard", `Expected layout 'dashboard', got '${res.spec.layout}'`);
    const types = res.spec.components.map((c) => c.type);
    assert(types.includes("metric_card"), "Dashboard must contain metric_card");
    assert(types.includes("trend_chart"), "Dashboard must contain trend_chart");
    assert(types.includes("data_table"), "Dashboard must contain data_table");
  });

  await test("Composer: Marketing Prompt correctly generates Hero-First Layout", async () => {
    const res = await composer.compose("Dựng trang landing page giới thiệu sản phẩm AI thế hệ mới kèm bảng giá");
    assert(res.spec.layout === "hero-first", `Expected layout 'hero-first', got '${res.spec.layout}'`);
    const types = res.spec.components.map((c) => c.type);
    assert(types.includes("hero_section"), "Marketing stack must contain hero_section");
    assert(types.includes("feature_grid"), "Marketing stack must contain feature_grid");
    assert(types.includes("pricing_table"), "Marketing stack must contain pricing_table");
    assert(types.includes("cta_section"), "Marketing stack must contain cta_section");
  });

  await test("Composer: Alert/Error Prompt triggers AlertBanner", async () => {
    const res = await composer.compose("Hệ thống cảnh báo lỗi kết nối máy chủ dữ liệu đột xuất");
    const types = res.spec.components.map((c) => c.type);
    assert(types.includes("alert_banner"), "Must trigger alert_banner on error/alert keywords");
    const alertComp = res.spec.components.find((c) => c.type === "alert_banner");
    assert(alertComp?.props.severity === "critical", "Expected critical severity for lỗi kết nối");
  });

  console.log("\n--- 3. Adversarial Security & Sanitization Tests ---");

  await test("Security: XSS payload in prompt does not break spec assembly", async () => {
    const xssPrompt = '<script>alert("XSS")</script><img src=x onerror=alert(1)>';
    const res = await composer.compose(xssPrompt);
    assert(Boolean(res.spec), "Spec should assemble cleanly");
    assert(Array.isArray(res.spec.components), "Components array should be intact");
    // Verify no raw script execution or undefined injection
    const jsonStr = JSON.stringify(res.spec);
    assert(!jsonStr.includes("undefined"), "JSON Spec should not contain undefined values");
  });

  await test("Security: SQL Injection payload in prompt is treated as literal text", async () => {
    const sqliPrompt = "'; DROP TABLE users; SELECT * FROM credentials WHERE '1'='1";
    const res = await composer.compose(sqliPrompt);
    assert(Boolean(res.spec), "Should handle SQLi string safely");
    assert(res.spec.components.length > 0, "Should generate valid components");
  });

  await test("Security: Massive prompt (10,000 chars) handles without buffer overflow", async () => {
    const massivePrompt = "Dựng dashboard ".repeat(1000);
    const res = await composer.compose(massivePrompt);
    assert(Boolean(res.spec), "Must handle long prompt gracefully");
    assert(res.telemetry.latencyMs < 2000, `Latency should remain bounded, took ${res.telemetry.latencyMs}ms`);
  });

  console.log("\n--- 4. Schema Strictness & Prop Validation Boundary ---");

  await test("Schema Boundary: Invalid prop types are caught by Zod", () => {
    const metricSchema = defaultCatalog.metric_card.schema;
    const invalidProps = {
      title: 12345, // Invalid: should be string
      value: null,  // Invalid: should be string
      trend: "super-fast", // Invalid enum
    };
    const result = metricSchema.safeParse(invalidProps);
    assert(!result.success, "Zod must reject invalid prop types");
  });

  console.log("\n=================================================");
  console.log(`🏁 TEST SUITE COMPLETE: ${report.passed}/${report.passed + report.failed} PASSED`);
  if (report.failed > 0) {
    console.error(`💥 ${report.failed} TESTS FAILED!`);
    process.exit(1);
  } else {
    console.log("🎉 ALL TESTS PASSED WITH 100% SUCCESS RATE!");
  }
  console.log("=================================================");
}

runSuite().catch((err) => {
  console.error("Fatal test runner error:", err);
  process.exit(1);
});
