import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewArchiveVerification.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-closure-review-archive-verification";

describe("managed audit manual sandbox connection credential resolver sandbox handle review prerequisite closure review archive verification", () => {
  it("verifies the Node v362 prerequisite closure review archive and prepares the v364 regular smoke gate", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewArchiveVerification({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-closure-review-archive-verification.v1",
      archiveVerificationState: "sandbox-handle-review-prerequisite-closure-review-archive-verified",
      archiveVerificationDecision: "archive-sandbox-handle-review-prerequisite-closure-review",
      readyForSandboxHandleReviewPrerequisiteClosureReviewArchiveVerification: true,
      readyForNodeV364MinimalReadOnlyIntegrationRegularGate: true,
      consumesNodeV362SandboxHandleReviewPrerequisiteClosureReview: true,
      activeNodeVersion: "Node v363",
      sourceNodeVersion: "Node v362",
      archiveVerificationOnly: true,
      rerunsLiveProbe: false,
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
      requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      sourceNodeV362: {
        sourceVersion: "Node v362",
        reviewState: "sandbox-handle-review-prerequisite-closure-review-ready",
        prerequisiteClosureDecision: "close-sandbox-handle-review-prerequisite-chain-for-non-executable-review",
        readyForClosureReview: true,
        readyForNodeV363ArchiveVerification: true,
        originalClosureItemCount: 4,
        completedClosureItemCount: 4,
        remainingClosureItemCount: 0,
        sourceCheckCount: 20,
        sourcePassedCheckCount: 20,
        checkCount: 27,
        passedCheckCount: 27,
        productionBlockerCount: 0,
        closureReviewOnly: true,
        readOnlyClosureReview: true,
        startsJavaService: false,
        startsMiniKvService: false,
        connectsManagedAudit: false,
        sendsManagedAuditHttpTcp: false,
        credentialValueRequested: false,
        rawEndpointUrlRequested: false,
        executionAllowed: false,
      },
      archiveVerification: {
        verificationMode: "sandbox-handle-review-prerequisite-closure-review-archive-verification",
        sourceSpan: "Node v362 sandbox handle review prerequisite closure review",
        archiveRoot: "d/362",
        archiveVerificationDecision: "archive-sandbox-handle-review-prerequisite-closure-review",
        verifiesJsonMarkdownAndSummary: true,
        verifiesScreenshotExplanationAndWalkthrough: true,
        verifiesPlanAndArchiveIndexes: true,
        verifiesClosureItemsAndBoundaryControls: true,
        rerunsLiveProbe: false,
        startsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        requestsJavaMiniKvEcho: false,
        nextNodeVersionSuggested: "Node v364",
      },
      checks: {
        archiveFilesPresent: true,
        jsonEvidenceReadable: true,
        jsonProfileVersionValid: true,
        jsonReadyForV363Verification: true,
        jsonDecisionValid: true,
        closureReviewRecorded: true,
        closureItemsRecordedAndClosed: true,
        allChecksPassedInSourceClosureReview: true,
        sourceNodeV361ArchiveEvidenceRecorded: true,
        summaryMatchesJson: true,
        markdownRecordsClosureReview: true,
        markdownRecordsClosureItemsAndBoundaries: true,
        browserSnapshotPresent: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsClosureAndBoundary: true,
        codeWalkthroughPresent: true,
        sourcePlanPointsToV363: true,
        planIndexReferencesV362AndV363: true,
        archiveIndexReferencesV362: true,
        routeRecordedInArchive: true,
        verificationDoesNotRerunProbe: true,
        noUpstreamServiceStartedByNode: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRequestedOrRead: true,
        noRawEndpointUrlRequestedOrParsed: true,
        noProviderClientInstantiated: true,
        noRuntimeShellImplementedOrInvoked: true,
        noJavaMiniKvEchoRequired: true,
        archiveVerificationDigestStable: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForSandboxHandleReviewPrerequisiteClosureReviewArchiveVerification: true,
      },
      summary: {
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        originalClosureItemCount: 4,
        completedClosureItemCount: 4,
        remainingClosureItemCount: 0,
        sourceCheckCount: 27,
        sourcePassedCheckCount: 27,
        sourceProductionBlockerCount: 0,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV362.reviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV362.sourceArchiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV362.sourceDecisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(33);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when the v362 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v363-empty-"));

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewArchiveVerification({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        });

      expect(profile.archiveVerificationState).toBe("blocked");
      expect(profile.archiveVerificationDecision).toBe("blocked");
      expect(profile.readyForSandboxHandleReviewPrerequisiteClosureReviewArchiveVerification).toBe(false);
      expect(profile.readyForNodeV364MinimalReadOnlyIntegrationRegularGate).toBe(false);
      expect(profile.summary.presentArchiveFileCount).toBe(0);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "ARCHIVE_FILES_MISSING",
        "ARCHIVE_JSON_UNREADABLE",
        "ARCHIVE_JSON_NOT_READY",
      ]));
      expect(profile.rerunsLiveProbe).toBe(false);
      expect(profile.startsJavaService).toBe(false);
      expect(profile.startsMiniKvService).toBe(false);
      expect(profile.connectsManagedAudit).toBe(false);
    } finally {
      rmSync(emptyProjectRoot, { force: true, recursive: true });
    }
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
          "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-closure-review-archive-verification.v1",
        archiveVerificationState: "sandbox-handle-review-prerequisite-closure-review-archive-verified",
        archiveVerificationDecision: "archive-sandbox-handle-review-prerequisite-closure-review",
        activeNodeVersion: "Node v363",
        sourceNodeVersion: "Node v362",
        archiveVerificationOnly: true,
        rerunsLiveProbe: false,
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
        "# Managed audit manual sandbox connection credential resolver sandbox handle review prerequisite closure review archive verification",
      );
      expect(markdown.body).toContain(
        "Archive verification decision: archive-sandbox-handle-review-prerequisite-closure-review",
      );
      expect(markdown.body).toContain("Ready for v364 minimal read-only integration regular gate: true");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("Starts mini-kv service: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-363",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v363-prerequisite-closure-review-archive",
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
