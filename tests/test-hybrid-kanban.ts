import React from "react";
import { renderToString } from "react-dom/server";
import { DesignOSComposer } from "../src/engine/composer.js";
import { DesignOSRenderer } from "../src/renderer/DesignOSRenderer.js";
import { defaultCatalog } from "../src/catalog/registry.js";
import { UISpecSchema } from "../src/engine/types.js";

const GREEN = "\x1b[32m";
const CYAN = "\x1b[36m";
const YELLOW = "\x1b[33m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

async function testHybridKanban() {
  console.log(`\n${BOLD}${CYAN}========================================================================${RESET}`);
  console.log(`${BOLD}${CYAN}   HYBRID SYNTHESIS TEST: SYSTEM 2 SYNTHESIZED -> SYSTEM 1 ROUTED      ${RESET}`);
  console.log(`${BOLD}${CYAN}========================================================================${RESET}\n`);

  const composer = new DesignOSComposer({
    cascadeThreshold: 0.30,
    localEndpoint: "http://127.0.0.1:8000/predict",
  });

  const prompt = "Dựng bảng Kanban quản lý tiến độ sprint dự án với 3 cột Cần làm, Đang xử lý, Hoàn thành";
  console.log(`[Input Prompt] "${prompt}"\n`);

  const t0 = performance.now();
  const { spec, telemetry } = await composer.compose(prompt);
  const duration = Math.round(performance.now() - t0);

  // 1. Zod Validation
  const parseResult = UISpecSchema.safeParse(spec);
  console.log(`• Zod Runtime Validation: ${parseResult.success ? `${GREEN}✔ 100% VALID${RESET}` : "FAIL"}`);

  // 2. Component Inspection
  const selectedTypes = spec.components.map((c) => c.type);
  const foundKanban = selectedTypes.includes("kanban_board");
  console.log(`• Selected Components: [${selectedTypes.join(", ")}]`);
  console.log(`• Kanban Recognized: ${foundKanban ? `${GREEN}✔ DETECTED ('kanban_board')${RESET}` : "NOT FOUND"}`);

  // 3. Telemetry
  console.log(`• Engine Used: ${telemetry.engine === "laya-mlx" ? GREEN : CYAN}${telemetry.engine.toUpperCase()}${RESET} (${telemetry.latencyMs}ms)`);
  console.log(`• Total Round-trip Latency: ${YELLOW}${duration}ms${RESET}`);

  // 4. React 19 SSR HTML Rendering
  const element = React.createElement(DesignOSRenderer, {
    spec,
    catalog: defaultCatalog,
  });
  const html = renderToString(element);

  const hasPurple = /purple|violet/i.test(html);
  const hasColumns = html.includes("Cần làm") && html.includes("Đang xử lý") && html.includes("Hoàn thành");

  console.log(`• React 19 SSR HTML Rendered: ${GREEN}${html.length.toLocaleString()} bytes${RESET}`);
  console.log(`• Rendered Columns: ${hasColumns ? `${GREEN}✔ Verified (Cần làm, Đang xử lý, Hoàn thành)${RESET}` : "MISSING"}`);
  console.log(`• Purple Ban Compliance: ${!hasPurple ? `${GREEN}✔ PASSED (Zero purple/violet classes)${RESET}` : "FAILED"}\n`);

  console.log(`${BOLD}${CYAN}========================================================================${RESET}`);
  const allPassed = parseResult.success && foundKanban && hasColumns && !hasPurple;
  console.log(`Result: ${allPassed ? `${BOLD}${GREEN}🎉 HYBRID SYNTHESIS VERIFICATION PASSED (100%)${RESET}` : "FAILED"}`);
  console.log(`${BOLD}${CYAN}========================================================================${RESET}\n`);

  return allPassed;
}

testHybridKanban().then((ok) => process.exit(ok ? 0 : 1));
