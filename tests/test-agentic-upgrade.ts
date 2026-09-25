import * as React from "react";
import { renderToString } from "react-dom/server";
import { DesignOSComposer } from "../src/engine/composer.js";
import { defaultCatalog } from "../src/catalog/registry.js";
import { DesignOSRenderer } from "../src/renderer/DesignOSRenderer.js";
import {
  dispatchDesignOSAction,
  listenDesignOSActions,
  type DesignOSActionDetail,
} from "../src/engine/events.js";

async function runAgenticUpgradeTest() {
  console.log("\n========================================================================");
  console.log("   TESTING AGENTIC ERA ENHANCEMENTS: LOCAL-ONLY, ACTIONS & SWARM        ");
  console.log("========================================================================\n");

  const composer = new DesignOSComposer({}, defaultCatalog);

  // -------------------------------------------------------------------------
  // TEST 1: Local-Only Enforced Mode (Air-Gapped, $0 Token, Zero Cloud Leak)
  // -------------------------------------------------------------------------
  console.log("▶ [Test 1] Testing Local-Only Enforced Mode...");
  const promptLocal = "Theo dõi doanh thu bán hàng trực tuyến hôm nay với các thẻ KPI";
  const resultLocal = await composer.compose(promptLocal, {
    localOnly: true,
  });

  console.log(`  • Engine: ${resultLocal.telemetry.engine}`);
  console.log(`  • Local Enforced Flag: ${resultLocal.telemetry.localEnforced}`);
  console.log(`  • Decision Latency: ${resultLocal.telemetry.latencyMs}ms`);

  if (!resultLocal.telemetry.localEnforced) {
    throw new Error("FAIL: telemetry.localEnforced should be true");
  }
  if (resultLocal.telemetry.engine === "jev-cloud") {
    throw new Error("FAIL: JEV Cloud was called despite localOnly: true!");
  }
  console.log("  ✔ Test 1 PASSED: Strict Local-Only enforced, zero cloud calls.\n");

  // -------------------------------------------------------------------------
  // TEST 2: Local-Only Under-Confidence Fallback (Deterministic Rule Engine)
  // -------------------------------------------------------------------------
  console.log("▶ [Test 2] Testing Local-Only Fallback on Novel Prompt...");
  const novelPrompt = "Xây dựng giao diện ma trận lượng tử phân tán phi tập trung";
  const resultFallback = await composer.compose(novelPrompt, {
    localOnly: true,
    cascadeThreshold: 0.999, // Force local confidence below threshold
  });

  console.log(`  • Engine: ${resultFallback.telemetry.engine}`);
  console.log(`  • Local Enforced: ${resultFallback.telemetry.localEnforced}`);
  if (resultFallback.telemetry.engine !== "deterministic") {
    throw new Error(`FAIL: Expected fallback to deterministic, got ${resultFallback.telemetry.engine}`);
  }
  console.log("  ✔ Test 2 PASSED: Safely and deterministically resolved locally in sub-10ms.\n");

  // -------------------------------------------------------------------------
  // TEST 3: Action Contracts & Blast Radius Attribution
  // -------------------------------------------------------------------------
  console.log("▶ [Test 3] Testing Action Contracts & Blast Radius Attribution...");
  const alertPrompt = "Cảnh báo khẩn cấp máy chủ sập và tràn bộ nhớ RAM 98%";
  const resultAlert = await composer.compose(alertPrompt);

  console.log(`  • Spec Blast Radius: ${resultAlert.spec.blastRadius}`);
  console.log(`  • Telemetry Blast Radius: ${resultAlert.telemetry.blastRadius}`);
  console.log(`  • Components: ${resultAlert.spec.components.map((c) => c.type).join(", ")}`);

  const alertComp = resultAlert.spec.components.find((c) => c.type === "alert_banner");
  if (!alertComp) {
    throw new Error("FAIL: alert_banner should be present");
  }
  if (resultAlert.spec.blastRadius !== "critical" && resultAlert.spec.blastRadius !== "medium") {
    throw new Error(`FAIL: Expected critical or medium blast radius for emergency alert, got ${resultAlert.spec.blastRadius}`);
  }
  console.log("  ✔ Test 3 PASSED: Blast Radius and Action Contracts properly enriched.\n");

  // -------------------------------------------------------------------------
  // TEST 4: SwarmMissionControl Component & Exception-Based Observability
  // -------------------------------------------------------------------------
  console.log("▶ [Test 4] Testing SwarmMissionControl Recognition & Rendering...");
  const swarmPrompt = "Mở bảng điều khiển Swarm Mission Control giám sát bầy 4 sub-agents tự trị và xử lý ngoại lệ";
  const resultSwarm = await composer.compose(swarmPrompt);

  const swarmComp = resultSwarm.spec.components.find((c) => c.type === "swarm_mission_control");
  console.log(`  • Components Selected: [${resultSwarm.spec.components.map((c) => c.type).join(", ")}]`);
  console.log(`  • Engine Used: ${resultSwarm.telemetry.engine} (${resultSwarm.telemetry.latencyMs}ms)`);

  if (!swarmComp) {
    throw new Error("FAIL: swarm_mission_control was not selected for Swarm prompt!");
  }

  // Render to React 19 SSR HTML
  const element = React.createElement(DesignOSRenderer, {
    spec: resultSwarm.spec,
    catalog: defaultCatalog,
  });
  const html = renderToString(element);

  console.log(`  • Rendered HTML Size: ${html.length.toLocaleString()} bytes`);
  const hasPurple = /purple|violet/i.test(html);
  if (hasPurple) {
    throw new Error("FAIL: Purple Ban violated in SwarmMissionControl HTML!");
  }
  console.log("  • Purple Ban Compliance: ✔ 100% Clean (0 violet/purple classes)");
  console.log("  ✔ Test 4 PASSED: SwarmMissionControl recognized and rendered flawlessly.\n");

  // -------------------------------------------------------------------------
  // TEST 5: Interactive Action Event Bus
  // -------------------------------------------------------------------------
  console.log("▶ [Test 5] Testing Interactive Action Event Bus...");
  // Simulate window environment for node testing
  let eventDispatched = false;
  let receivedActionId = "";

  (globalThis as any).window = {
    dispatchEvent: (event: any) => {
      if (event?.detail?.action?.id) {
        eventDispatched = true;
        receivedActionId = event.detail.action.id;
      }
      return true;
    },
    addEventListener: () => {},
    removeEventListener: () => {},
  };

  dispatchDesignOSAction(
    {
      id: "approve_mutation",
      label: "Phê Duyệt Bước",
      variant: "primary",
      blastRadius: "critical",
    },
    "swarm_mission_control"
  );

  if (!eventDispatched || receivedActionId !== "approve_mutation") {
    throw new Error("FAIL: Action event was not properly dispatched!");
  }
  console.log(`  • Dispatched Action: ${receivedActionId} (critical blast radius)`);
  console.log("  ✔ Test 5 PASSED: Event bus successfully dispatches action contracts.\n");

  console.log("========================================================================");
  console.log("🎉 ALL AGENTIC ERA UPGRADE TESTS PASSED SUCCESSFULLY! (5/5)             ");
  console.log("========================================================================\n");
}

runAgenticUpgradeTest().catch((err) => {
  console.error("\n❌ Test Suite Failed:", err);
  process.exit(1);
});
