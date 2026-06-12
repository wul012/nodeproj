import { mkdtempSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-passed-archive-verification";

describe("managed audit manual sandbox connection credential resolver minimal read-only integration passed archive verification", () => {
  it("verifies v349 all-read-passed archive and prepares Node v351 disabled read-only intake", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-passed-archive-verification.v1",
      transitionState: "minimal-read-only-integration-passed-archive-verified",
      transitionDecision: "advance-to-managed-audit-disabled-read-only-integration-intake",
      readyForMinimalReadOnlyIntegrationPassedArchiveVerification: true,
      readyForNodeV351ManagedAuditDisabledReadOnlyIntegrationIntake: true,
      consumesNodeV349MinimalReadOnlyIntegrationSmokeRerunArchive: true,
      activeNodeVersion: "Node v350",
      sourceNodeVersion: "Node v349",
      archiveVerificationOnly: true,
      transitionDecisionOnly: true,
      rerunsLiveProbe: false,
      startsJavaService: false,
      startsMiniKvService: false,
      mutatesJavaState: false,
      mutatesMiniKvState: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      rawEndpointUrlParsed: false,
      executionAllowed: false,
      requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      sourceNodeV349: {
        sourceVersion: "Node v349",
        rerunArchiveState: "minimal-read-only-integration-smoke-rerun-archived",
        rerunArchiveResult: "all-read-passed",
        rerunArchiveDecision: "archive-read-passed-rerun-evidence",
        readyForRerunArchive: true,
        externalReadWindowConfirmed: true,
        liveProbePerformedNow: true,
        attemptedTargetCount: 5,
        passedTargetCount: 5,
        unavailableTargetCount: 0,
        invalidContractTargetCount: 0,
        productionBlockerCount: 0,
        startsJavaService: false,
        startsMiniKvService: false,
        mutatesJavaState: false,
        mutatesMiniKvState: false,
        executionAllowed: false,
        connectsManagedAudit: false,
      },
      transitionRecord: {
        transitionMode: "minimal-read-only-integration-passed-archive-verification",
        sourceSpan: "Node v349 minimal read-only integration smoke rerun archive",
        archiveRoot: "d/349",
        transitionDecision: "advance-to-managed-audit-disabled-read-only-integration-intake",
        verifiesJsonMarkdownAndSummary: true,
        verifiesScreenshotExplanationAndWalkthrough: true,
        rerunsLiveProbe: false,
        startsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        requestsJavaMiniKvEcho: false,
        nextNodeVersionSuggested: "Node v351",
      },
      checks: {
        archiveFilesPresent: true,
        jsonEvidenceReadable: true,
        jsonProfileVersionValid: true,
        jsonReadyForV350Verification: true,
        jsonArchiveAllReadPassed: true,
        targetCountsConfirmAllPassed: true,
        targetResultsAllReadOnlyAndAllowed: true,
        summaryMatchesJson: true,
        markdownRecordsPassedArchive: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsPassedWindow: true,
        codeWalkthroughPresent: true,
        planIndexReferencesV349AndV350: true,
        transitionDoesNotRerunProbe: true,
        noUpstreamServiceStartedByNode: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        noJavaMiniKvEchoRequired: true,
        transitionDecisionLimitedToDisabledReadOnlyStage: true,
        transitionDigestStable: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForMinimalReadOnlyIntegrationPassedArchiveVerification: true,
      },
      summary: {
        archiveFileCount: 10,
        presentArchiveFileCount: 10,
        attemptedTargetCount: 5,
        passedTargetCount: 5,
        unavailableTargetCount: 0,
        invalidContractTargetCount: 0,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV349.archiveDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.transitionRecord.transitionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("fails closed when the v349 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v350-empty-"));
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification({
        config: loadTestConfig(),
        archiveRoot: emptyProjectRoot,
      });

    expect(profile.transitionState).toBe("blocked");
    expect(profile.transitionDecision).toBe("blocked");
    expect(profile.readyForMinimalReadOnlyIntegrationPassedArchiveVerification).toBe(false);
    expect(profile.readyForNodeV351ManagedAuditDisabledReadOnlyIntegrationIntake).toBe(false);
    expect(profile.summary.presentArchiveFileCount).toBe(0);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "ARCHIVE_FILES_MISSING",
      "ARCHIVE_JSON_UNREADABLE",
      "ARCHIVE_NOT_ALL_READ_PASSED",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-passed-archive-verification.v1",
        transitionState: "minimal-read-only-integration-passed-archive-verified",
        transitionDecision: "advance-to-managed-audit-disabled-read-only-integration-intake",
        activeNodeVersion: "Node v350",
        sourceNodeVersion: "Node v349",
        rerunsLiveProbe: false,
        startsJavaService: false,
        startsMiniKvService: false,
        requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver minimal read-only integration passed archive verification",
      );
      expect(markdown.body).toContain(
        "Transition decision: advance-to-managed-audit-disabled-read-only-integration-intake",
      );
      expect(markdown.body).toContain("Ready for v351 intake: true");
      expect(markdown.body).toContain("Reruns live probe: false");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-350",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v350-minimal-read-only-integration-passed-archive",
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
