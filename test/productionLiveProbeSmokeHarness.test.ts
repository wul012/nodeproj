import { describe, expect, it } from "vitest";

import { MiniKvClient } from "../src/clients/miniKvClient.js";
import { OrderPlatformClient } from "../src/clients/orderPlatformClient.js";
import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadProductionLiveProbeSmokeHarness,
} from "../src/services/productionLiveProbeSmokeHarness.js";

describe("production live probe smoke harness", () => {
  it("records graceful skipped evidence when upstream probes are disabled", async () => {
    const config = loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    });
    const profile = await loadProductionLiveProbeSmokeHarness({
      config,
      orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
      miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
    });

    expect(profile).toMatchObject({
      profileVersion: "production-live-probe-smoke-harness.v1",
      readyForLiveProbeEvidence: true,
      readyForProductionConnections: false,
      readOnly: true,
      executionAllowed: false,
      probesEnabled: false,
      checks: {
        contractReady: true,
        probeSetMatchesContract: true,
        allProbeResultsRecorded: true,
        skippedAllowed: true,
        writeProbeAttempted: false,
        javaWritesAttempted: false,
        miniKvWritesAttempted: false,
        upstreamActionsStillDisabled: true,
        readyForLiveProbeEvidence: true,
      },
      summary: {
        probeCount: 5,
        passedProbeCount: 0,
        skippedProbeCount: 5,
        blockedProbeCount: 0,
        productionBlockerCount: 0,
      },
    });
    expect(profile.results.every((result) => !result.attempted)).toBe(true);
    expect(profile.results.every((result) => result.status === "skipped")).toBe(true);
    expect(profile.warnings.map((warning) => warning.code)).toEqual([
      "LIVE_PROBES_SKIPPED_BY_CONFIG",
    ]);
  });

  it("gracefully skips unavailable read-only probes when probes are enabled", async () => {
    const config = loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "true",
      UPSTREAM_ACTIONS_ENABLED: "false",
      ORDER_PLATFORM_URL: "http://127.0.0.1:9",
      ORDER_PLATFORM_TIMEOUT_MS: "100",
      MINIKV_HOST: "127.0.0.1",
      MINIKV_PORT: "9",
      MINIKV_TIMEOUT_MS: "100",
    });
    const profile = await loadProductionLiveProbeSmokeHarness({
      config,
      orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
      miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
    });

    expect(profile.readyForLiveProbeEvidence).toBe(true);
    expect(profile.probesEnabled).toBe(true);
    expect(profile.summary).toMatchObject({
      probeCount: 5,
      passedProbeCount: 0,
      skippedProbeCount: 5,
      blockedProbeCount: 0,
      productionBlockerCount: 0,
    });
    expect(profile.results.every((result) => result.status === "skipped")).toBe(true);
    expect(profile.results.every((result) => result.readOnly && !result.mutatesState)).toBe(true);
    expect(profile.warnings.map((warning) => warning.code)).toEqual([
      "LIVE_PROBES_SKIPPED_UPSTREAM_UNAVAILABLE",
    ]);
  });

  it("exposes smoke harness routes in JSON and Markdown", async () => {
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-smoke-harness",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-smoke-harness?format=markdown",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "production-live-probe-smoke-harness.v1",
        readyForLiveProbeEvidence: true,
        probesEnabled: false,
        summary: {
          probeCount: 5,
          skippedProbeCount: 5,
          blockedProbeCount: 0,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production live probe smoke harness");
      expect(markdown.body).toContain("LIVE_PROBES_SKIPPED_BY_CONFIG");
      expect(markdown.body).toContain("No live probe smoke blockers.");
    } finally {
      await app.close();
    }
  });
});
