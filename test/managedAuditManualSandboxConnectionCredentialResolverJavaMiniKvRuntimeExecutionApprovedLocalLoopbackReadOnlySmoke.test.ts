import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approved-local-loopback-read-only-smoke";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution approved local-loopback read-only smoke", () => {
  it("records pass evidence when the approved local-loopback probe window is open", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke({
        config: loadTestConfig({
          UPSTREAM_PROBES_ENABLED: "true",
          ORDER_PLATFORM_URL: "http://127.0.0.1:8080",
          MINIKV_HOST: "127.0.0.1",
          MINIKV_PORT: "6424",
        }),
        orderPlatform: {
          async health() {
            return { statusCode: 200, latencyMs: 7, data: { status: "UP" } };
          },
        },
        miniKv: {
          async health() {
            return {
              command: "HEALTH",
              response: "OK live_keys=0 wal_enabled=no",
              latencyMs: 3,
            };
          },
        },
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approved-local-loopback-read-only-smoke.v1",
      smokeState: "approved-local-loopback-read-only-smoke-passed",
      smokeDecision: "accept-read-only-smoke-pass-evidence",
      readyForRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke: true,
      readyForRuntimeExecutionPassEvidenceArchive: true,
      activeNodeVersion: "Node v407",
      sourceNodeVersion: "Node v406",
      upstreamProbesEnabled: true,
      upstreamActionsEnabled: false,
      startsJavaServiceFromRoute: false,
      startsMiniKvServiceFromRoute: false,
      connectsManagedAudit: false,
      credentialValueRead: false,
      rawEndpointUrlParsed: false,
      executionAllowed: false,
      activeShardPrototypeEnabled: false,
      sourceNodeV406: {
        sourceVersion: "Node v406",
        readyForRuntimeExecutionLiveReadGate: true,
        readyForApprovedLocalLoopbackReadOnlySmoke: true,
        checkCount: 33,
        passedCheckCount: 33,
        productionBlockerCount: 0,
        targetCount: 2,
        readyTargetCount: 2,
      },
      smokeSession: {
        smokeMode: "approved-local-loopback-read-only-smoke",
        approvalCorrelationId: "approval-v405-20260531T130805-codex-auto",
        targetCount: 2,
        attemptedTargetCount: 2,
        passedTargetCount: 2,
        failedTargetCount: 0,
        skippedTargetCount: 0,
        upstreamProbesEnabled: true,
        upstreamActionsEnabled: false,
        localLoopbackOnly: true,
        readOnly: true,
        mutatesUpstreamState: false,
        startsJavaServiceFromRoute: false,
        startsMiniKvServiceFromRoute: false,
        cleanupProofRequired: true,
        cleanupProofExpectedInArchive: true,
        nextNodeVersionSuggested: "Node v408",
      },
      checks: {
        sourceNodeV406Ready: true,
        sourceNodeV406HasNoBlockers: true,
        upstreamProbesEnabled: true,
        upstreamActionsDisabled: true,
        targetsAreLocalLoopback: true,
        targetsGetOnlyOrHealthOnly: true,
        javaHealthAttempted: true,
        miniKvHealthAttempted: true,
        javaHealthPassed: true,
        miniKvHealthPassed: true,
        allAttemptedTargetsPassed: true,
        noWriteTargets: true,
        noAutomaticUpstreamStartStopFromRoute: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        activeShardPrototypeStillDisabled: true,
        cleanupProofRequired: true,
        smokeDigestStable: true,
        readyForRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke: true,
      },
      summary: {
        targetCount: 2,
        attemptedTargetCount: 2,
        passedTargetCount: 2,
        failedTargetCount: 0,
        skippedTargetCount: 0,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.summary.passedCheckCount).toBe(profile.summary.checkCount);
    expect(profile.productionBlockers).toEqual([]);
    expect(profile.smokeSession.smokeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.records.map((record) => [record.id, record.status, record.attempted])).toEqual([
      ["java-health", "passed-read", true],
      ["mini-kv-health", "passed-read", true],
    ]);
  }, 60000);

  it("keeps the route closed when upstream probes are disabled", async () => {
    const app = await buildApp(loadTestConfig());

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
        activeNodeVersion: "Node v407",
        sourceNodeVersion: "Node v406",
        smokeState: "skipped-closed-window",
        smokeDecision: "skipped",
        readyForRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke: false,
        upstreamProbesEnabled: false,
        upstreamActionsEnabled: false,
        startsJavaServiceFromRoute: false,
        startsMiniKvServiceFromRoute: false,
        summary: {
          targetCount: 2,
          attemptedTargetCount: 0,
          passedTargetCount: 0,
          skippedTargetCount: 2,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("SMOKE_SKIPPED_WINDOW_CLOSED");
      expect(markdown.body).toContain("UPSTREAM_PROBES_DISABLED");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-407",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v405-20260531T130805-codex-auto",
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
