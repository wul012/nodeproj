import { mkdtempSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-rerun-decision";

describe("managed audit manual sandbox connection credential resolver minimal read-only integration rerun decision", () => {
  it("consumes Node v347 and waits for the external read window without requesting Java or mini-kv code changes", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-rerun-decision.v1",
      rerunDecisionState: "minimal-read-only-integration-rerun-decision-ready",
      rerunDecision: "wait-for-external-read-window",
      readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision: true,
      consumesNodeV347MinimalReadOnlyIntegrationSmokeArchiveVerification: true,
      activeNodeVersion: "Node v348",
      sourceNodeVersion: "Node v347",
      sourceArchiveResult: "read-window-unavailable",
      sourceArchiveDecision: "wait-for-external-read-window-rerun",
      rerunsLiveProbe: false,
      startsJavaService: false,
      startsMiniKvService: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      rawEndpointUrlParsed: false,
      executionAllowed: false,
      externalReadWindowRequired: true,
      requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false,
      readyForNodeV349MinimalReadOnlyIntegrationRerunOrPendingArchive: true,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      sourceNodeV347: {
        sourceVersion: "Node v347",
        archiveVerificationState: "minimal-read-only-integration-smoke-archive-verified",
        archiveResult: "read-window-unavailable",
        archiveDecision: "wait-for-external-read-window-rerun",
        readyForArchiveVerification: true,
        readyForNodeV348RerunDecision: true,
        attemptedTargetCount: 5,
        passedTargetCount: 0,
        unavailableTargetCount: 5,
        invalidContractTargetCount: 0,
        archiveVerificationOnly: true,
        rerunsLiveProbe: false,
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
      },
      rerunDecisionRecord: {
        decisionMode: "minimal-read-only-integration-rerun-decision",
        sourceSpan: "Node v347 minimal read-only integration smoke archive verification",
        sourceArchiveResult: "read-window-unavailable",
        sourceArchiveDecision: "wait-for-external-read-window-rerun",
        rerunDecision: "wait-for-external-read-window",
        externalReadWindowRequired: true,
        requestsJavaMiniKvEcho: false,
        rerunsLiveProbe: false,
        startsUpstreamServices: false,
        nextNodeVersionSuggested: "Node v349",
      },
      checks: {
        sourceArchiveVerificationReady: true,
        sourceArchiveVerificationDigestStable: true,
        sourceArchiveDecisionRecognized: true,
        readWindowUnavailableHandledAsExternalWindow: true,
        invalidContractRequestsParallelEchoOnlyWhenNeeded: true,
        allReadPassedCanAdvanceWithoutExtraEcho: true,
        doesNotRerunLiveProbe: true,
        noUpstreamServiceStarted: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        executionStillBlocked: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        decisionDigestStable: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision: true,
      },
      summary: {
        sourceAttemptedTargetCount: 5,
        sourcePassedTargetCount: 0,
        sourceUnavailableTargetCount: 5,
        sourceInvalidContractTargetCount: 0,
        externalReadWindowRequired: true,
        requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV347.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.rerunDecisionRecord.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("fails closed when Node v347 archive verification is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v348-empty-"));
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision({
      config: loadTestConfig(),
      archiveRoot: emptyProjectRoot,
    });

    expect(profile.rerunDecisionState).toBe("blocked");
    expect(profile.rerunDecision).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision)
      .toBe(false);
    expect(profile.readyForNodeV349MinimalReadOnlyIntegrationRerunOrPendingArchive).toBe(false);
    expect(profile.sourceArchiveResult).toBe("blocked");
    expect(profile.sourceArchiveDecision).toBe("blocked");
    expect(profile.externalReadWindowRequired).toBe(false);
    expect(profile.requiresParallelJavaV153MiniKvV144ReadOnlyEcho).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "SOURCE_ARCHIVE_VERIFICATION_NOT_READY",
      "SOURCE_ARCHIVE_DECISION_UNKNOWN",
    ]));
    expect(profile.rerunsLiveProbe).toBe(false);
    expect(profile.startsJavaService).toBe(false);
    expect(profile.startsMiniKvService).toBe(false);
  }, 180_000);

  it("exposes JSON and Markdown through the audit route table", async () => {
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
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-rerun-decision.v1",
        rerunDecisionState: "minimal-read-only-integration-rerun-decision-ready",
        rerunDecision: "wait-for-external-read-window",
        activeNodeVersion: "Node v348",
        sourceNodeVersion: "Node v347",
        sourceArchiveResult: "read-window-unavailable",
        externalReadWindowRequired: true,
        rerunsLiveProbe: false,
        startsJavaService: false,
        startsMiniKvService: false,
        requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver minimal read-only integration rerun decision",
      );
      expect(markdown.body).toContain("Rerun decision: wait-for-external-read-window");
      expect(markdown.body).toContain("External read window required: true");
      expect(markdown.body).toContain("Requires Java v153 + mini-kv v144 echo: false");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-348",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v348-minimal-read-only-integration-rerun-decision",
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
