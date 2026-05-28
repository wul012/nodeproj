import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerification.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-decision-record-archive-verification";

describe("managed audit manual sandbox connection credential resolver sandbox handle review packet gate decision record archive verification", () => {
  it("verifies the Node v360 decision record archive and prepares v362", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerification({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-decision-record-archive-verification.v1",
      archiveVerificationState: "sandbox-handle-review-packet-gate-decision-record-archive-verified",
      archiveVerificationDecision: "archive-sandbox-handle-review-packet-gate-decision-record",
      readyForSandboxHandleReviewPacketGateDecisionRecordArchiveVerification: true,
      readyForNodeV362SandboxHandleReviewPrerequisiteClosureReview: true,
      consumesNodeV360SandboxHandleReviewPacketGateDecisionRecord: true,
      activeNodeVersion: "Node v361",
      sourceNodeVersion: "Node v360",
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
      sourceNodeV360: {
        sourceVersion: "Node v360",
        decisionState: "sandbox-handle-review-packet-gate-decision-record-ready",
        decision: "advance-to-sandbox-handle-review-prerequisite-closure-review",
        readyForDecisionRecord: true,
        readyForNodeV361ArchiveVerification: true,
        inputCount: 5,
        packetInputCount: 6,
        gateOutputCount: 5,
        stopConditionCount: 7,
        sourceArchiveFileCount: 11,
        sourcePresentArchiveFileCount: 11,
        sourceCheckCount: 34,
        sourcePassedCheckCount: 34,
        checkCount: 20,
        passedCheckCount: 20,
        productionBlockerCount: 0,
        decisionRecordOnly: true,
        startsJavaService: false,
        startsMiniKvService: false,
        connectsManagedAudit: false,
        sendsManagedAuditHttpTcp: false,
        credentialValueRequested: false,
        rawEndpointUrlRequested: false,
        executionAllowed: false,
      },
      archiveVerification: {
        verificationMode: "sandbox-handle-review-packet-gate-decision-record-archive-verification",
        sourceSpan: "Node v360 sandbox handle review packet/gate decision record",
        archiveRoot: "d/360",
        archiveVerificationDecision: "archive-sandbox-handle-review-packet-gate-decision-record",
        verifiesJsonMarkdownAndSummary: true,
        verifiesScreenshotExplanationAndWalkthrough: true,
        verifiesPlanAndArchiveIndexes: true,
        verifiesDecisionInputsAndBoundaryControls: true,
        rerunsLiveProbe: false,
        startsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        requestsJavaMiniKvEcho: false,
        nextNodeVersionSuggested: "Node v362",
      },
      checks: {
        archiveFilesPresent: true,
        jsonEvidenceReadable: true,
        jsonProfileVersionValid: true,
        jsonReadyForV361Verification: true,
        jsonDecisionValid: true,
        decisionInputsRecorded: true,
        decisionRecordRecorded: true,
        allChecksPassedInSourceDecisionRecord: true,
        sourceNodeV359ArchiveEvidenceRecorded: true,
        summaryMatchesJson: true,
        markdownRecordsDecisionRecord: true,
        markdownRecordsDecisionInputsAndBoundaries: true,
        browserSnapshotPresent: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsDecisionAndBoundary: true,
        codeWalkthroughPresent: true,
        sourcePlanPointsToV361: true,
        planIndexReferencesV360AndV361: true,
        archiveIndexReferencesV360: true,
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
        readyForSandboxHandleReviewPacketGateDecisionRecordArchiveVerification: true,
      },
      summary: {
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        inputCount: 5,
        packetInputCount: 6,
        gateOutputCount: 5,
        stopConditionCount: 7,
        sourceArchiveFileCount: 11,
        sourcePresentArchiveFileCount: 11,
        sourceCheckCount: 20,
        sourcePassedCheckCount: 20,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV360.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV360.sourceArchiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV360.sourceIntakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(33);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when the v360 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v361-empty-"));

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerification({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        });

      expect(profile.archiveVerificationState).toBe("blocked");
      expect(profile.archiveVerificationDecision).toBe("blocked");
      expect(profile.readyForSandboxHandleReviewPacketGateDecisionRecordArchiveVerification).toBe(false);
      expect(profile.readyForNodeV362SandboxHandleReviewPrerequisiteClosureReview).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-decision-record-archive-verification.v1",
        archiveVerificationState: "sandbox-handle-review-packet-gate-decision-record-archive-verified",
        archiveVerificationDecision: "archive-sandbox-handle-review-packet-gate-decision-record",
        activeNodeVersion: "Node v361",
        sourceNodeVersion: "Node v360",
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
        "# Managed audit manual sandbox connection credential resolver sandbox handle review packet/gate decision record archive verification",
      );
      expect(markdown.body).toContain(
        "Archive verification decision: archive-sandbox-handle-review-packet-gate-decision-record",
      );
      expect(markdown.body).toContain("Ready for v362 prerequisite closure review: true");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("Starts mini-kv service: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-361",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v361-packet-gate-decision-record-archive",
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
