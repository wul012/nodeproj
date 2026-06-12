import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { AppHttpError } from "../src/errors.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecution,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecution.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution";

describe("managed audit manual sandbox connection credential resolver minimal read-only integration gate execution", () => {
  it("executes the reused v349 smoke lane when the explicit read window is open", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecution({
        config: loadTestConfig({ UPSTREAM_PROBES_ENABLED: "true" }),
        orderPlatform: passingOrderPlatform(),
        miniKv: passingMiniKv(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution.v1",
      gateExecutionState: "minimal-read-only-integration-gate-executed",
      gateExecutionResult: "all-read-passed",
      gateExecutionDecision: "archive-read-passed-gate-execution",
      readyForMinimalReadOnlyIntegrationGateExecution: true,
      consumesNodeV366ExplicitReadWindowGateExecutionDecision: true,
      reusesNodeV349MinimalReadOnlySmokeLane: true,
      activeNodeVersion: "Node v367",
      sourceNodeVersion: "Node v366",
      externalReadWindowConfirmed: true,
      liveProbePerformedNow: true,
      startsJavaService: false,
      startsMiniKvService: false,
      mutatesJavaState: false,
      mutatesMiniKvState: false,
      connectsManagedAudit: false,
      sendsManagedAuditHttpTcp: false,
      credentialValueRequested: false,
      credentialValueRead: false,
      rawEndpointUrlRequested: false,
      rawEndpointUrlParsed: false,
      secretProviderInstantiated: false,
      resolverClientInstantiated: false,
      runtimeShellImplemented: false,
      runtimeShellInvocationAllowed: false,
      executionAllowed: false,
      requiresParallelJavaMiniKvReadContractFix: false,
      sourceNodeV366: {
        sourceVersion: "Node v366",
        decisionState: "explicit-read-window-gate-execution-decision-ready",
        gateExecutionDecision: "ready-for-explicit-read-window-gate-execution",
        readyForDecision: true,
        explicitReadWindowProvided: true,
        actualProbeExecutedNow: false,
        readOnlyTargetCount: 5,
        productionBlockerCount: 0,
      },
      reusedNodeV349SmokeLane: {
        sourceVersion: "Node v349",
        rerunArchiveResult: "all-read-passed",
        rerunArchiveDecision: "archive-read-passed-rerun-evidence",
        readyForSmokeRerunArchive: true,
        externalReadWindowConfirmed: true,
        liveProbePerformedNow: true,
        attemptedTargetCount: 5,
        passedTargetCount: 5,
        unavailableTargetCount: 0,
        invalidContractTargetCount: 0,
        productionBlockerCount: 0,
        startsJavaService: false,
        startsMiniKvService: false,
        connectsManagedAudit: false,
        executionAllowed: false,
      },
      gateExecution: {
        executionMode: "minimal-read-only-integration-gate-execution",
        gateExecutionResult: "all-read-passed",
        gateExecutionDecision: "archive-read-passed-gate-execution",
        externalReadWindowConfirmed: true,
        liveProbePerformedNow: true,
        attemptedTargetCount: 5,
        passedTargetCount: 5,
        unavailableTargetCount: 0,
        invalidContractTargetCount: 0,
        startsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        readsCredentialValue: false,
        parsesRawEndpointUrl: false,
        instantiatesProviderClient: false,
        invokesRuntimeShell: false,
        requestsJavaMiniKvEcho: false,
        nextNodeVersionSuggested: "Node v368",
      },
      checks: {
        sourceNodeV366Ready: true,
        sourceDecisionAllowsV367: true,
        explicitReadWindowConfirmed: true,
        smokeLaneReusedInsteadOfDuplicated: true,
        allReadTargetsAttemptedWhenWindowOpen: true,
        onlyAllowedJavaGetRequestsAttempted: true,
        onlyAllowedMiniKvReadCommandsAttempted: true,
        noUpstreamServiceStartedByNode: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        noProviderClientInstantiated: true,
        noRuntimeShellImplementedOrInvoked: true,
        resultClassifiedFailClosed: true,
        invalidContractRequestsParallelEchoOnlyWhenNeeded: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForMinimalReadOnlyIntegrationGateExecution: true,
      },
      summary: {
        attemptedTargetCount: 5,
        passedTargetCount: 5,
        unavailableTargetCount: 0,
        invalidContractTargetCount: 0,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV366.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.reusedNodeV349SmokeLane?.archiveDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.gateExecution.executionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.targetResults.map((target) => target.methodOrCommand)).toEqual([
      "GET /actuator/health",
      "GET /api/v1/ops/overview",
      "HEALTH",
      "INFOJSON",
      "STATSJSON",
    ]);
  }, 180_000);

  it("does not call upstreams when the explicit read window is closed", async () => {
    let callCount = 0;
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecution({
        config: loadTestConfig({ UPSTREAM_PROBES_ENABLED: "false" }),
        orderPlatform: throwingOrderPlatform(() => {
          callCount += 1;
        }),
        miniKv: throwingMiniKv(() => {
          callCount += 1;
        }),
      });

    expect(callCount).toBe(0);
    expect(profile).toMatchObject({
      gateExecutionState: "blocked",
      gateExecutionResult: "blocked",
      gateExecutionDecision: "blocked",
      externalReadWindowConfirmed: false,
      liveProbePerformedNow: false,
      startsJavaService: false,
      startsMiniKvService: false,
      connectsManagedAudit: false,
      executionAllowed: false,
      reusedNodeV349SmokeLane: null,
      targetResults: [],
      summary: {
        attemptedTargetCount: 0,
        passedTargetCount: 0,
      },
    });
  }, 180_000);

  it("exposes closed-window JSON and Markdown through the audit route table without probing", async () => {
    const app = await buildApp(loadTestConfig({
      UPSTREAM_PROBES_ENABLED: "false",
      ORDER_PLATFORM_URL: "http://127.0.0.1:1",
      ORDER_PLATFORM_TIMEOUT_MS: "50",
      MINIKV_HOST: "127.0.0.1",
      MINIKV_PORT: "1",
      MINIKV_TIMEOUT_MS: "50",
    }));

    try {
      const json = await app.inject({
        method: "GET",
        url: ROUTE,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${ROUTE}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution.v1",
        gateExecutionState: "blocked",
        gateExecutionResult: "blocked",
        activeNodeVersion: "Node v367",
        sourceNodeVersion: "Node v366",
        externalReadWindowConfirmed: false,
        liveProbePerformedNow: false,
        startsJavaService: false,
        startsMiniKvService: false,
        connectsManagedAudit: false,
        sendsManagedAuditHttpTcp: false,
        credentialValueRequested: false,
        rawEndpointUrlRequested: false,
        executionAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver minimal read-only integration gate execution",
      );
      expect(markdown.body).toContain("External read window confirmed: false");
      expect(markdown.body).toContain("Live probe performed now: false");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function passingOrderPlatform() {
  return {
    health: async () => ({ statusCode: 200, latencyMs: 3, data: { status: "UP" } }),
    opsOverview: async () => ({
      statusCode: 200,
      latencyMs: 4,
      data: { application: { name: "advanced-order-platform" } },
    }),
  };
}

function passingMiniKv() {
  return {
    health: async () => ({ command: "HEALTH", response: "OK", latencyMs: 2 }),
    infoJson: async () => ({
      command: "INFOJSON",
      response: "{\"version\":\"0.143.0\"}",
      latencyMs: 3,
      info: { version: "0.143.0" },
    }),
    statsJson: async () => ({
      command: "STATSJSON",
      response: "{\"live_keys\":0}",
      latencyMs: 3,
      stats: { live_keys: 0 },
    }),
  };
}

function throwingOrderPlatform(onCall: () => void) {
  return {
    health: async () => {
      onCall();
      throw new AppHttpError(502, "ORDER_PLATFORM_UNAVAILABLE", "Order platform should not be called");
    },
    opsOverview: async () => {
      onCall();
      throw new AppHttpError(502, "ORDER_PLATFORM_UNAVAILABLE", "Order platform should not be called");
    },
  };
}

function throwingMiniKv(onCall: () => void) {
  return {
    health: async () => {
      onCall();
      throw new AppHttpError(502, "MINIKV_UNAVAILABLE", "mini-kv should not be called");
    },
    infoJson: async () => {
      onCall();
      throw new AppHttpError(502, "MINIKV_UNAVAILABLE", "mini-kv should not be called");
    },
    statsJson: async () => {
      onCall();
      throw new AppHttpError(502, "MINIKV_UNAVAILABLE", "mini-kv should not be called");
    },
  };
}

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-367",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v367-minimal-read-only-gate-execution",
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
    ...overrides,
  });
}
