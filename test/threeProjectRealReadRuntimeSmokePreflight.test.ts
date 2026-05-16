import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadThreeProjectRealReadRuntimeSmokePreflight,
} from "../src/services/threeProjectRealReadRuntimeSmokePreflight.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("three-project real-read runtime smoke preflight", () => {
  it("creates a closed-window runtime smoke preflight without touching Java or mini-kv", async () => {
    const profile = await loadThreeProjectRealReadRuntimeSmokePreflight({
      config: loadTestConfig(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
      headers: completeHeaders(),
    });

    expect(profile).toMatchObject({
      profileVersion: "three-project-real-read-runtime-smoke-preflight.v1",
      preflightState: "closed-window-preflight-ready",
      readyForThreeProjectRealReadRuntimeSmokePreflight: true,
      readyForRuntimeSmokeExecutionCandidate: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnly: true,
      executionAllowed: false,
      sourceRetentionGate: {
        profileVersion: "cross-project-ci-artifact-retention-gate.v1",
        gateState: "ready-for-retention-review",
        ready: true,
        readyForRealCiArtifactUpload: false,
        readyForProductionWindow: false,
      },
      runtimeWindow: {
        sourceEvidenceSpan: "Node v203 + Java v72 + mini-kv v81",
        windowMode: "closed-window-plan",
        upstreamProbesEnabled: false,
        upstreamActionsEnabled: false,
        automaticUpstreamStart: false,
        nodeServiceMustRunForV205: true,
        javaStartPolicy: "manual-or-explicit-v205-start-only",
        miniKvStartPolicy: "manual-or-explicit-v205-start-only",
        realRuntimeSmokeExecutedInV204: false,
      },
      checks: {
        sourceRetentionGateReady: true,
        sourceRetentionGateDigestValid: true,
        sourceProductionWindowStillBlocked: true,
        readTargetsComplete: true,
        javaTargetsReadOnly: true,
        miniKvTargetsReadOnly: true,
        nodeTargetsReadOnly: true,
        noWriteHttpMethodsPlanned: true,
        noForbiddenMiniKvCommandsPlanned: true,
        failureTaxonomyComplete: true,
        processPlanRequiresCleanup: true,
        automaticUpstreamStartDisabled: true,
        upstreamActionsStillDisabled: true,
        closedWindowDoesNotAttemptUpstreams: true,
        runtimeSmokeExecutionDeferredToV205: true,
        readyForProductionOperationsStillFalse: true,
        readyForThreeProjectRealReadRuntimeSmokePreflight: true,
        readyForRuntimeSmokeExecutionCandidate: false,
      },
      summary: {
        checkCount: 18,
        passedCheckCount: 17,
        readTargetCount: 8,
        javaTargetCount: 2,
        miniKvTargetCount: 4,
        nodeTargetCount: 2,
        processStepCount: 3,
        failureClassCount: 9,
        productionBlockerCount: 1,
      },
    });
    expect(profile.runtimeWindow.preflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.readTargets.every((target) => target.readOnly && !target.mutatesState && !target.attemptedInV204)).toBe(true);
    expect(profile.commandPolicy.allowedMiniKvCommands).toEqual(["SMOKEJSON", "INFOJSON", "STORAGEJSON", "HEALTH"]);
    expect(profile.commandPolicy.forbiddenMiniKvCommands).toEqual(expect.arrayContaining([
      "LOAD",
      "COMPACT",
      "SETNXEX",
      "RESTORE",
    ]));
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "REAL_RUNTIME_SMOKE_NOT_EXECUTED",
    ]);
  });

  it("marks a manual open-window preflight as an execution candidate without executing the smoke", async () => {
    const profile = await loadThreeProjectRealReadRuntimeSmokePreflight({
      config: loadTestConfig({ UPSTREAM_PROBES_ENABLED: "true" }),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
      headers: completeHeaders(),
    });

    expect(profile).toMatchObject({
      preflightState: "manual-window-preflight-ready",
      readyForThreeProjectRealReadRuntimeSmokePreflight: true,
      readyForRuntimeSmokeExecutionCandidate: true,
      runtimeWindow: {
        windowMode: "manual-open-window-plan",
        upstreamProbesEnabled: true,
        upstreamActionsEnabled: false,
        automaticUpstreamStart: false,
        realRuntimeSmokeExecutedInV204: false,
      },
      checks: {
        runtimeSmokeExecutionDeferredToV205: true,
        upstreamActionsStillDisabled: true,
      },
    });
    expect(profile.readTargets.every((target) => !target.attemptedInV204)).toBe(true);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "REAL_RUNTIME_SMOKE_NOT_EXECUTED",
    ]);
  });

  it("blocks the preflight when upstream actions are enabled", async () => {
    const profile = await loadThreeProjectRealReadRuntimeSmokePreflight({
      config: loadTestConfig({ UPSTREAM_ACTIONS_ENABLED: "true" }),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
      headers: completeHeaders(),
    });

    expect(profile).toMatchObject({
      preflightState: "blocked",
      readyForThreeProjectRealReadRuntimeSmokePreflight: false,
      readyForRuntimeSmokeExecutionCandidate: false,
      checks: {
        upstreamActionsStillDisabled: false,
        readyForThreeProjectRealReadRuntimeSmokePreflight: false,
      },
    });
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_ACTIONS_ENABLED",
      "REAL_RUNTIME_SMOKE_NOT_EXECUTED",
    ]));
  });

  it("exposes JSON and Markdown routes", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/three-project-real-read-runtime-smoke-preflight",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/three-project-real-read-runtime-smoke-preflight?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "three-project-real-read-runtime-smoke-preflight.v1",
        preflightState: "closed-window-preflight-ready",
        readyForThreeProjectRealReadRuntimeSmokePreflight: true,
        readyForRuntimeSmokeExecutionCandidate: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Three-project real-read runtime smoke preflight");
      expect(markdown.body).toContain("java-release-approval-rehearsal");
      expect(markdown.body).toContain("mini-kv-smokejson");
      expect(markdown.body).toContain("REAL_RUNTIME_SMOKE_NOT_EXECUTED");
      expect(markdown.body).toContain("PROCEED_TO_RECOMMENDED_PARALLEL_JAVA_V73_MINI_KV_V82");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "operator-204",
    "x-orderops-roles": "operator,auditor",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v204-runtime-smoke-preflight",
  };
}

function loadTestConfig(overrides: Record<string, string> = {}) {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
    ACCESS_GUARD_ENFORCEMENT_ENABLED: "true",
    ORDEROPS_AUTH_TOKEN_ISSUER: "orderops-test",
    ORDEROPS_AUTH_TOKEN_SECRET: "test-secret",
    ORDEROPS_IDP_ISSUER: "https://idp.example",
    ORDEROPS_IDP_AUDIENCE: "orderops-node",
    ORDEROPS_IDP_JWKS_URL: "https://idp.example/.well-known/jwks.json",
    ORDEROPS_IDP_CLOCK_SKEW_SECONDS: "90",
    PORT: "4304",
    ORDER_PLATFORM_URL: "http://127.0.0.1:18080",
    MINIKV_HOST: "127.0.0.1",
    MINIKV_PORT: "6419",
    ...overrides,
  });
}

class ThrowingOrderPlatformClient {
  health(): Promise<UpstreamJsonResponse> {
    throw new Error("v204 preflight must not call Java");
  }

  opsOverview(): Promise<UpstreamJsonResponse> {
    throw new Error("v204 preflight must not call Java");
  }
}

class ThrowingMiniKvClient {
  health(): Promise<{ command: string; response: string; latencyMs: number }> {
    throw new Error("v204 preflight must not call mini-kv");
  }

  infoJson(): Promise<{ command: string; response: string; latencyMs: number; info: Record<string, unknown> }> {
    throw new Error("v204 preflight must not call mini-kv");
  }

  statsJson(): Promise<{ command: string; response: string; latencyMs: number; stats: Record<string, unknown> }> {
    throw new Error("v204 preflight must not call mini-kv");
  }
}
