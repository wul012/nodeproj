import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { AppHttpError } from "../src/errors.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rehearsal";

describe("managed audit manual sandbox connection credential resolver minimal read-only integration smoke rehearsal", () => {
  it("records all-read-passed when every Java and mini-kv read target responds", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal({
        config: loadTestConfig(),
        orderPlatform: passingOrderPlatform(),
        miniKv: passingMiniKv(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rehearsal.v1",
      smokeState: "all-read-passed",
      smokeDecision: "archive-read-passed-evidence",
      readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal: true,
      readyForNodeV347MinimalReadOnlyIntegrationSmokeArchiveVerification: true,
      consumesNodeV345MinimalReadOnlyIntegrationWindowReadinessCut: true,
      activeNodeVersion: "Node v346",
      sourceNodeVersion: "Node v345",
      readOnlyIntegrationSmokeRehearsal: true,
      liveProbePerformedNow: true,
      startsJavaService: false,
      startsMiniKvService: false,
      mutatesJavaState: false,
      mutatesMiniKvState: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      rawEndpointUrlParsed: false,
      runtimeShellImplemented: false,
      runtimeShellInvocationAllowed: false,
      executionAllowed: false,
      requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      sourceNodeV345: {
        readinessState: "minimal-read-only-integration-window-readiness-cut-ready",
        readinessDecision: "ready-for-manual-read-only-integration-window",
        readyForReadinessCut: true,
        readyForNodeV346MinimalReadOnlyIntegrationSmokeRehearsal: true,
        requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false,
      },
      smokeSession: {
        sessionMode: "node-v346-minimal-read-only-integration-smoke-rehearsal",
        attemptedTargetCount: 5,
        passedTargetCount: 5,
        unavailableTargetCount: 0,
        invalidContractTargetCount: 0,
        onlyJavaGetRequests: true,
        onlyMiniKvReadCommands: true,
        startsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        nextNodeVersionSuggested: "Node v347",
      },
      checks: {
        sourceNodeV345Ready: true,
        sourceNodeV345KeepsBoundariesClosed: true,
        allReadTargetsAttempted: true,
        onlyAllowedJavaGetRequestsAttempted: true,
        onlyAllowedMiniKvReadCommandsAttempted: true,
        noUpstreamServiceStarted: true,
        noJavaMutationAttempted: true,
        noMiniKvMutationAttempted: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        connectionFailuresFailClosed: true,
        invalidReadContractRequestsParallelEcho: true,
        smokeSessionDigestStable: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal: true,
      },
      summary: {
        attemptedTargetCount: 5,
        passedTargetCount: 5,
        connectionRefusedTargetCount: 0,
        timeoutTargetCount: 0,
        invalidJsonTargetCount: 0,
        unexpectedStatusTargetCount: 0,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.smokeSession.sessionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.targetResults.map((target) => target.methodOrCommand)).toEqual([
      "GET /actuator/health",
      "GET /api/v1/ops/overview",
      "HEALTH",
      "INFOJSON",
      "STATSJSON",
    ]);
  }, 60000);

  it("fails closed as read-window-unavailable when services are not reachable", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal({
        config: loadTestConfig(),
        orderPlatform: unavailableOrderPlatform(),
        miniKv: unavailableMiniKv(),
      });

    expect(profile.smokeState).toBe("read-window-unavailable");
    expect(profile.smokeDecision).toBe("archive-read-window-unavailable-evidence");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal)
      .toBe(true);
    expect(profile.requiresParallelJavaV153MiniKvV144ReadOnlyEcho).toBe(false);
    expect(profile.summary.connectionRefusedTargetCount).toBe(5);
    expect(profile.summary.passedTargetCount).toBe(0);
    expect(profile.targetResults.every((target) => target.status === "connection-refused")).toBe(true);
    expect(profile.targetResults.every((target) => target.readOnly && !target.mutatesState)).toBe(true);
    expect(profile.productionBlockers).toEqual([]);
    expect(profile.warnings).toHaveLength(5);
  }, 60000);

  it("requests only read-contract echo when a read target returns invalid JSON", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal({
        config: loadTestConfig(),
        orderPlatform: passingOrderPlatform(),
        miniKv: invalidMiniKv(),
      });

    expect(profile.smokeState).toBe("invalid-read-contract");
    expect(profile.smokeDecision).toBe("request-read-contract-field-fix");
    expect(profile.requiresParallelJavaV153MiniKvV144ReadOnlyEcho).toBe(true);
    expect(profile.summary.invalidJsonTargetCount).toBe(1);
    expect(profile.summary.passedTargetCount).toBe(4);
    expect(profile.recommendations[0]?.code).toBe("RUN_JAVA_V153_MINI_KV_V144_FOR_READ_CONTRACT");
    expect(profile.executionAllowed).toBe(false);
  }, 60000);

  it("exposes JSON and Markdown through the audit route table without starting upstreams", async () => {
    const app = await buildApp(loadTestConfig({
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
          "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rehearsal.v1",
        smokeState: "read-window-unavailable",
        activeNodeVersion: "Node v346",
        sourceNodeVersion: "Node v345",
        liveProbePerformedNow: true,
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
        requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver minimal read-only integration smoke rehearsal",
      );
      expect(markdown.body).toContain("Smoke state: read-window-unavailable");
      expect(markdown.body).toContain("GET /api/v1/ops/overview");
      expect(markdown.body).toContain("INFOJSON");
    } finally {
      await app.close();
    }
  }, 60000);
});

function passingOrderPlatform() {
  return {
    health: async () => ({ statusCode: 200, latencyMs: 3, data: { status: "UP" } }),
    opsOverview: async () => ({ statusCode: 200, latencyMs: 4, data: { application: { name: "advanced-order-platform" } } }),
  };
}

function passingMiniKv() {
  return {
    health: async () => ({ command: "HEALTH", response: "OK", latencyMs: 2 }),
    infoJson: async () => ({ command: "INFOJSON", response: "{\"version\":\"0.143.0\"}", latencyMs: 3, info: { version: "0.143.0" } }),
    statsJson: async () => ({ command: "STATSJSON", response: "{\"keys\":0}", latencyMs: 3, stats: { keys: 0 } }),
  };
}

function unavailableOrderPlatform() {
  return {
    health: async () => {
      throw new AppHttpError(502, "ORDER_PLATFORM_UNAVAILABLE", "Order platform is unavailable: connect ECONNREFUSED");
    },
    opsOverview: async () => {
      throw new AppHttpError(502, "ORDER_PLATFORM_UNAVAILABLE", "Order platform is unavailable: connect ECONNREFUSED");
    },
  };
}

function unavailableMiniKv() {
  return {
    health: async () => {
      throw new AppHttpError(502, "MINIKV_UNAVAILABLE", "mini-kv is unavailable: connect ECONNREFUSED");
    },
    infoJson: async () => {
      throw new AppHttpError(502, "MINIKV_UNAVAILABLE", "mini-kv is unavailable: connect ECONNREFUSED");
    },
    statsJson: async () => {
      throw new AppHttpError(502, "MINIKV_UNAVAILABLE", "mini-kv is unavailable: connect ECONNREFUSED");
    },
  };
}

function invalidMiniKv() {
  return {
    health: passingMiniKv().health,
    infoJson: async () => {
      throw new AppHttpError(502, "MINIKV_INFOJSON_INVALID", "mini-kv returned invalid INFOJSON output");
    },
    statsJson: passingMiniKv().statsJson,
  };
}

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-346",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v346-minimal-read-only-integration-smoke",
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
