import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadRealReadAdapterOperatorWindowRunbook,
} from "../src/services/realReadAdapterOperatorWindowRunbook.js";

describe("real-read adapter operator window runbook", () => {
  it("builds a manual operator window runbook without contacting upstreams", () => {
    const profile = loadRealReadAdapterOperatorWindowRunbook(loadTestConfig());

    expect(profile).toMatchObject({
      profileVersion: "real-read-adapter-operator-window-runbook.v1",
      runbookState: "ready-for-manual-window",
      readyForRealReadAdapterOperatorWindow: true,
      readyForProductionOperations: false,
      readOnly: true,
      executionAllowed: false,
      runbook: {
        sourceAdapterProfileVersion: "real-read-adapter-rehearsal.v1",
        javaDependencyVersion: "Java v67",
        miniKvDependencyVersion: "mini-kv v76",
        requiredEnvironment: {
          UPSTREAM_PROBES_ENABLED: true,
          UPSTREAM_ACTIONS_ENABLED: false,
          ACCESS_GUARD_ENFORCEMENT_ENABLED: true,
          ORDER_PLATFORM_URL: "http://localhost:8080",
          MINIKV_HOST: "127.0.0.1",
          MINIKV_PORT: 6379,
          operatorOwnsJavaLifecycle: true,
          operatorOwnsMiniKvLifecycle: true,
        },
        currentRuntime: {
          upstreamProbesEnabled: false,
          upstreamActionsEnabled: false,
          accessGuardEnforcementEnabled: true,
        },
        manualJavaStartRequired: true,
        manualMiniKvStartRequired: true,
        automaticUpstreamStart: false,
        nodeStartsOrStopsUpstreams: false,
        mutatesUpstreamState: false,
        productionWriteAuthorized: false,
      },
      checks: {
        sourceAdapterEndpointDocumented: true,
        requiredProbeEnvDocumented: true,
        requiredActionsEnvDocumented: true,
        currentActionsDisabled: true,
        manualStartupDocumented: true,
        manualShutdownDocumented: true,
        allowedJavaReadsOnly: true,
        allowedMiniKvReadsOnly: true,
        forbiddenOperationsCovered: true,
        expectedEvidenceCovered: true,
        noAutomaticUpstreamStart: true,
        readyForProductionOperationsStillFalse: true,
        readyForRealReadAdapterOperatorWindow: true,
      },
      summary: {
        operatorStepCount: 5,
        allowedReadCount: 5,
        expectedEvidenceCount: 3,
        forbiddenOperationCount: 5,
        runbookCheckCount: 13,
        passedRunbookCheckCount: 13,
        productionBlockerCount: 0,
      },
    });
    expect(profile.runbook.runbookDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.operatorSteps.map((step) => step.phase)).toEqual([
      "preflight",
      "open-window",
      "capture",
      "close-window",
      "archive",
    ]);
    expect(profile.allowedReads.java.map((target) => target.target)).toEqual([
      "GET /actuator/health",
      "GET /api/v1/ops/overview",
    ]);
    expect(profile.allowedReads.miniKv.map((target) => target.target)).toEqual([
      "HEALTH",
      "INFOJSON",
      "STATSJSON",
    ]);
    expect(profile.expectedEvidence.map((item) => item.expectedState)).toContain("closed-skipped");
    expect(profile.expectedEvidence.map((item) => item.expectedState)).toContain("open-pass-or-mixed");
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toContain("Automatically start Java or mini-kv");
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toContain("UPSTREAM_ACTIONS_ENABLED=true");
  });

  it("blocks the runbook when upstream actions are enabled", () => {
    const profile = loadRealReadAdapterOperatorWindowRunbook(loadTestConfig({
      UPSTREAM_ACTIONS_ENABLED: "true",
    }));

    expect(profile.runbookState).toBe("blocked");
    expect(profile.readyForRealReadAdapterOperatorWindow).toBe(false);
    expect(profile.readyForProductionOperations).toBe(false);
    expect(profile.checks.currentActionsDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.runbook.productionWriteAuthorized).toBe(false);
  });

  it("exposes real-read adapter operator window runbook routes in JSON and Markdown", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const headers = {
        "x-orderops-operator-id": "viewer-1",
        "x-orderops-roles": "viewer",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-adapter-operator-window-runbook",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-adapter-operator-window-runbook?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "real-read-adapter-operator-window-runbook.v1",
        runbookState: "ready-for-manual-window",
        readyForRealReadAdapterOperatorWindow: true,
        runbook: {
          sourceAdapterProfileVersion: "real-read-adapter-rehearsal.v1",
          automaticUpstreamStart: false,
          nodeStartsOrStopsUpstreams: false,
          requiredEnvironment: {
            UPSTREAM_PROBES_ENABLED: true,
            UPSTREAM_ACTIONS_ENABLED: false,
          },
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Real-read adapter operator window runbook");
      expect(markdown.body).toContain("GET /api/v1/ops/overview");
      expect(markdown.body).toContain("INFOJSON");
      expect(markdown.body).toContain("Automatically start Java or mini-kv");
      expect(markdown.body).toContain("UPSTREAM_ACTIONS_ENABLED=false");
    } finally {
      await app.close();
    }
  });
});

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
    ...overrides,
  });
}
