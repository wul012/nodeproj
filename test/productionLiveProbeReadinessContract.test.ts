import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createProductionLiveProbeReadinessContract,
} from "../src/services/productionLiveProbeReadinessContract.js";

describe("production live probe readiness contract", () => {
  it("defines Java and mini-kv read-only live probe targets without attempting probes", () => {
    const contract = createProductionLiveProbeReadinessContract(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
      ORDER_PLATFORM_URL: "http://127.0.0.1:8080",
      MINIKV_HOST: "127.0.0.1",
      MINIKV_PORT: "6379",
    }));

    expect(contract).toMatchObject({
      profileVersion: "production-live-probe-readiness-contract.v1",
      readyForLiveProbePlanning: true,
      readOnly: true,
      executionAllowed: false,
      probeAttempted: false,
      checks: {
        javaReadTargetsDefined: true,
        miniKvReadTargetsDefined: true,
        statusDefinitionsDefined: true,
        noProbeAttempted: true,
        writeActionsForbidden: true,
        upstreamActionsStillDisabled: true,
        readyForLiveProbePlanning: true,
      },
      summary: {
        targetCount: 2,
        plannedProbeCount: 5,
        writeProbeCount: 0,
        productionBlockerCount: 0,
      },
    });
    expect(contract.targets.javaOrderPlatform.plannedProbes.map((probe) => probe.id)).toEqual([
      "java-actuator-health",
      "java-ops-overview",
    ]);
    expect(contract.targets.miniKv.plannedProbes.map((probe) => probe.id)).toEqual([
      "mini-kv-health",
      "mini-kv-infojson",
      "mini-kv-statsjson",
    ]);
    expect(contract.statusDefinitions.map((definition) => definition.status)).toEqual([
      "pass",
      "skipped",
      "blocked",
    ]);
  });

  it("blocks live probe planning when upstream actions are enabled", () => {
    const contract = createProductionLiveProbeReadinessContract(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "true",
    }));

    expect(contract.readyForLiveProbePlanning).toBe(false);
    expect(contract.checks.upstreamActionsStillDisabled).toBe(false);
    expect(contract.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "UPSTREAM_ACTIONS_ENABLED",
    ]);
  });

  it("exposes live probe readiness contract routes in JSON and Markdown", async () => {
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-readiness-contract",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-readiness-contract?format=markdown",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "production-live-probe-readiness-contract.v1",
        readyForLiveProbePlanning: true,
        probeAttempted: false,
        summary: {
          plannedProbeCount: 5,
          writeProbeCount: 0,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production live probe readiness contract");
      expect(markdown.body).toContain("java-actuator-health");
      expect(markdown.body).toContain("mini-kv-infojson");
      expect(markdown.body).toContain("LIVE_PROBE_NOT_ATTEMPTED_BY_CONTRACT");
    } finally {
      await app.close();
    }
  });
});
