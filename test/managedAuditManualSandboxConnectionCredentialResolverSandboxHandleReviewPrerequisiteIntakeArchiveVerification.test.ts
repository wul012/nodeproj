import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerification.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-intake-archive-verification";

describe("managed audit manual sandbox connection credential resolver sandbox handle review prerequisite intake archive verification", () => {
  it("verifies the Node v354 prerequisite intake archive and prepares v356", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerification({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-intake-archive-verification.v1",
      archiveVerificationState: "sandbox-handle-review-prerequisite-intake-archive-verified",
      archiveVerificationDecision: "archive-sandbox-handle-review-prerequisite-intake",
      readyForSandboxHandleReviewPrerequisiteIntakeArchiveVerification: true,
      readyForNodeV356SandboxHandleReviewContractDecision: true,
      consumesNodeV354SandboxHandleReviewPrerequisiteIntake: true,
      activeNodeVersion: "Node v355",
      sourceNodeVersion: "Node v354",
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
      sourceNodeV354: {
        sourceVersion: "Node v354",
        intakeState: "sandbox-handle-review-prerequisite-intake-ready",
        intakeDecision: "define-non-secret-sandbox-handle-review-prerequisites",
        readyForIntake: true,
        readyForNodeV355ArchiveVerification: true,
        prerequisiteInputCount: 5,
        closedScopeCount: 9,
        checkCount: 24,
        passedCheckCount: 24,
        sourceCheckCount: 19,
        sourcePassedCheckCount: 19,
        productionBlockerCount: 0,
        prerequisiteIntakeOnly: true,
        sandboxHandleReviewOnly: true,
        startsJavaService: false,
        startsMiniKvService: false,
        connectsManagedAudit: false,
        sendsManagedAuditHttpTcp: false,
        credentialValueRequested: false,
        rawEndpointUrlRequested: false,
        executionAllowed: false,
      },
      archiveVerification: {
        verificationMode: "sandbox-handle-review-prerequisite-intake-archive-verification",
        sourceSpan: "Node v354 sandbox handle review prerequisite intake",
        archiveRoot: "d/354",
        archiveVerificationDecision: "archive-sandbox-handle-review-prerequisite-intake",
        verifiesJsonMarkdownAndSummary: true,
        verifiesScreenshotExplanationAndWalkthrough: true,
        verifiesPlanAndArchiveIndexes: true,
        rerunsLiveProbe: false,
        startsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        requestsJavaMiniKvEcho: false,
        nextNodeVersionSuggested: "Node v356",
      },
      checks: {
        archiveFilesPresent: true,
        jsonEvidenceReadable: true,
        jsonProfileVersionValid: true,
        jsonReadyForV355Verification: true,
        jsonIntakeDecisionValid: true,
        prerequisiteInputsRecorded: true,
        closedScopesRecorded: true,
        allChecksPassedInSourceIntake: true,
        summaryMatchesJson: true,
        markdownRecordsPrerequisiteIntake: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsPrerequisiteBoundary: true,
        codeWalkthroughPresent: true,
        planIndexReferencesV354AndV355: true,
        archiveIndexReferencesV354: true,
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
        readyForSandboxHandleReviewPrerequisiteIntakeArchiveVerification: true,
      },
      summary: {
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        prerequisiteInputCount: 5,
        closedScopeCount: 9,
        sourceCheckCount: 24,
        sourcePassedCheckCount: 24,
        sourceProductionBlockerCount: 0,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV354.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV354.sourceDecisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("fails closed when the v354 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v355-empty-"));

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerification({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        });

      expect(profile.archiveVerificationState).toBe("blocked");
      expect(profile.archiveVerificationDecision).toBe("blocked");
      expect(profile.readyForSandboxHandleReviewPrerequisiteIntakeArchiveVerification).toBe(false);
      expect(profile.readyForNodeV356SandboxHandleReviewContractDecision).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-intake-archive-verification.v1",
        archiveVerificationState: "sandbox-handle-review-prerequisite-intake-archive-verified",
        archiveVerificationDecision: "archive-sandbox-handle-review-prerequisite-intake",
        activeNodeVersion: "Node v355",
        sourceNodeVersion: "Node v354",
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
        "# Managed audit manual sandbox connection credential resolver sandbox handle review prerequisite intake archive verification",
      );
      expect(markdown.body).toContain("Archive verification decision: archive-sandbox-handle-review-prerequisite-intake");
      expect(markdown.body).toContain("Ready for v356 sandbox handle review contract decision: true");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("Starts mini-kv service: false");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-355",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v355-prerequisite-archive",
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
