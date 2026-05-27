import { mkdtempSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-archive-verification";

describe("managed audit manual sandbox connection credential resolver minimal read-only integration smoke archive verification", () => {
  it("verifies v346 read-window-unavailable archive without requesting Java or mini-kv changes", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-archive-verification.v1",
      archiveVerificationState: "minimal-read-only-integration-smoke-archive-verified",
      archiveResult: "read-window-unavailable",
      archiveDecision: "wait-for-external-read-window-rerun",
      readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification:
        true,
      consumesNodeV346MinimalReadOnlyIntegrationSmokeRehearsal: true,
      activeNodeVersion: "Node v347",
      sourceNodeVersion: "Node v346",
      archiveVerificationOnly: true,
      rerunsLiveProbe: false,
      startsJavaService: false,
      startsMiniKvService: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      rawEndpointUrlParsed: false,
      executionAllowed: false,
      requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false,
      readyForNodeV348MinimalReadOnlyIntegrationRerunDecision: true,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      sourceNodeV346: {
        smokeState: "read-window-unavailable",
        smokeDecision: "archive-read-window-unavailable-evidence",
        readyForSmokeRehearsal: true,
        readyForNodeV347ArchiveVerification: true,
        attemptedTargetCount: 5,
        passedTargetCount: 0,
        connectionRefusedTargetCount: 5,
        timeoutTargetCount: 0,
        invalidJsonTargetCount: 0,
        unexpectedStatusTargetCount: 0,
        productionBlockerCount: 0,
        liveProbePerformedNow: true,
        startsJavaService: false,
        startsMiniKvService: false,
        mutatesJavaState: false,
        mutatesMiniKvState: false,
        executionAllowed: false,
      },
      archiveVerification: {
        verificationMode: "read-only-v346-smoke-archive-verification",
        sourceSpan: "Node v346 minimal read-only integration smoke rehearsal archive",
        decision: "wait-for-external-read-window-rerun",
        archiveRoot: "d/346",
        archiveResult: "read-window-unavailable",
        verifiesJsonAndMarkdown: true,
        verifiesSmokeSummary: true,
        verifiesScreenshotAndExplanation: true,
        verifiesCodeWalkthroughAndPlanIndex: true,
        rerunsLiveProbe: false,
        startsUpstreamServices: false,
        requestsJavaMiniKvEcho: false,
        nextNodeVersionSuggested: "Node v348",
      },
      checks: {
        archiveFilesPresent: true,
        jsonEvidenceReadable: true,
        jsonEvidenceProfileVersionValid: true,
        jsonEvidenceReadyForArchiveVerification: true,
        jsonEvidenceKeepsRuntimeAndWritesClosed: true,
        smokeSummaryMatchesJson: true,
        markdownRecordsSmokeState: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsReadWindowUnavailable: true,
        codeWalkthroughPresent: true,
        planIndexReferencesV346AndV347: true,
        archiveVerificationDoesNotRerunProbe: true,
        noUpstreamServiceStarted: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        readWindowUnavailableDoesNotRequestJavaMiniKvCodeChange: true,
        invalidContractRequestsParallelEchoOnlyWhenNeeded: true,
        archiveVerificationDigestStable: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification:
          true,
      },
      summary: {
        archiveFileCount: 10,
        presentArchiveFileCount: 10,
        attemptedTargetCount: 5,
        passedTargetCount: 0,
        unavailableTargetCount: 5,
        invalidContractTargetCount: 0,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.archiveVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV346.sessionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when the v346 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v347-empty-"));
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification({
        config: loadTestConfig(),
        archiveRoot: emptyProjectRoot,
      });

    expect(profile.archiveVerificationState).toBe("blocked");
    expect(profile.archiveResult).toBe("blocked");
    expect(profile.archiveDecision).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification)
      .toBe(false);
    expect(profile.readyForNodeV348MinimalReadOnlyIntegrationRerunDecision).toBe(false);
    expect(profile.summary.presentArchiveFileCount).toBe(0);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "ARCHIVE_FILES_MISSING",
      "ARCHIVE_JSON_UNREADABLE",
    ]));
    expect(profile.rerunsLiveProbe).toBe(false);
    expect(profile.startsJavaService).toBe(false);
    expect(profile.startsMiniKvService).toBe(false);
  }, 60000);

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
          "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-archive-verification.v1",
        archiveVerificationState: "minimal-read-only-integration-smoke-archive-verified",
        archiveResult: "read-window-unavailable",
        archiveDecision: "wait-for-external-read-window-rerun",
        activeNodeVersion: "Node v347",
        sourceNodeVersion: "Node v346",
        rerunsLiveProbe: false,
        startsJavaService: false,
        startsMiniKvService: false,
        requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver minimal read-only integration smoke archive verification",
      );
      expect(markdown.body).toContain("Archive result: read-window-unavailable");
      expect(markdown.body).toContain("Reruns live probe: false");
      expect(markdown.body).toContain("Requires Java v153 + mini-kv v144 echo: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-347",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v347-minimal-read-only-integration-smoke-archive",
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
