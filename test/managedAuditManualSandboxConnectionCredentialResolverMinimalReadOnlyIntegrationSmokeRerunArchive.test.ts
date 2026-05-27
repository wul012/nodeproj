import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { AppHttpError } from "../src/errors.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rerun-archive";

describe("managed audit manual sandbox connection credential resolver minimal read-only integration smoke rerun archive", () => {
  it("archives all-read-passed evidence when the external read window is confirmed", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive({
        config: loadTestConfig({ UPSTREAM_PROBES_ENABLED: "true" }),
        orderPlatform: passingOrderPlatform(),
        miniKv: passingMiniKv(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rerun-archive.v1",
      rerunArchiveState: "minimal-read-only-integration-smoke-rerun-archived",
      rerunArchiveResult: "all-read-passed",
      rerunArchiveDecision: "archive-read-passed-rerun-evidence",
      readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive: true,
      consumesNodeV348MinimalReadOnlyIntegrationRerunDecision: true,
      activeNodeVersion: "Node v349",
      sourceNodeVersion: "Node v348",
      externalReadWindowConfirmed: true,
      liveProbePerformedNow: true,
      startsJavaService: false,
      startsMiniKvService: false,
      mutatesJavaState: false,
      mutatesMiniKvState: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      rawEndpointUrlParsed: false,
      executionAllowed: false,
      requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false,
      sourceNodeV348: {
        rerunDecisionState: "minimal-read-only-integration-rerun-decision-ready",
        rerunDecision: "wait-for-external-read-window",
        readyForNodeV349MinimalReadOnlyIntegrationRerunOrPendingArchive: true,
        externalReadWindowRequired: true,
        rerunsLiveProbe: false,
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
      },
      rerunArchive: {
        archiveMode: "minimal-read-only-integration-smoke-rerun-or-pending-archive",
        rerunArchiveResult: "all-read-passed",
        rerunArchiveDecision: "archive-read-passed-rerun-evidence",
        externalReadWindowConfirmed: true,
        liveProbePerformedNow: true,
        attemptedTargetCount: 5,
        passedTargetCount: 5,
        unavailableTargetCount: 0,
        invalidContractTargetCount: 0,
        startsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        nextNodeVersionSuggested: "Node v350",
      },
      checks: {
        sourceNodeV348Ready: true,
        sourceNodeV348DecisionDigestStable: true,
        sourceNodeV348KeepsBoundariesClosed: true,
        externalReadWindowConfirmedBeforeProbe: true,
        pendingDoesNotProbe: true,
        liveProbeOnlyWhenWindowConfirmed: true,
        allReadTargetsAttemptedWhenProbing: true,
        onlyAllowedJavaGetRequestsAttempted: true,
        onlyAllowedMiniKvReadCommandsAttempted: true,
        noUpstreamServiceStartedByNode: true,
        noJavaMutationAttempted: true,
        noMiniKvMutationAttempted: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        invalidContractRequestsParallelEchoOnlyWhenNeeded: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive: true,
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
    expect(profile.rerunArchive.archiveDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.targetResults.map((target) => target.methodOrCommand)).toEqual([
      "GET /actuator/health",
      "GET /api/v1/ops/overview",
      "HEALTH",
      "INFOJSON",
      "STATSJSON",
    ]);
  }, 60000);

  it("keeps the archive pending and does not call upstreams when the external read window is closed", async () => {
    let callCount = 0;
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive({
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
      rerunArchiveState: "minimal-read-only-integration-smoke-rerun-pending",
      rerunArchiveResult: "pending",
      rerunArchiveDecision: "pending-external-read-window",
      readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive: true,
      externalReadWindowConfirmed: false,
      liveProbePerformedNow: false,
      requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false,
      summary: {
        attemptedTargetCount: 0,
        passedTargetCount: 0,
        unavailableTargetCount: 0,
        invalidContractTargetCount: 0,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.targetResults).toEqual([]);
    expect(profile.warnings[0]?.code).toBe("EXTERNAL_READ_WINDOW_NOT_CONFIRMED");
  }, 60000);

  it("exposes pending JSON and Markdown through the audit route table without probing", async () => {
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
          "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rerun-archive.v1",
        rerunArchiveState: "minimal-read-only-integration-smoke-rerun-pending",
        rerunArchiveResult: "pending",
        rerunArchiveDecision: "pending-external-read-window",
        activeNodeVersion: "Node v349",
        sourceNodeVersion: "Node v348",
        externalReadWindowConfirmed: false,
        liveProbePerformedNow: false,
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver minimal read-only integration smoke rerun archive",
      );
      expect(markdown.body).toContain("Rerun archive result: pending");
      expect(markdown.body).toContain("Live probe performed now: false");
    } finally {
      await app.close();
    }
  }, 60000);
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
      response: "{\"keys\":0}",
      latencyMs: 3,
      stats: { keys: 0 },
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
    "x-orderops-operator-id": "auditor-349",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v349-minimal-read-only-integration-rerun",
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
