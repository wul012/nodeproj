import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-non-secret-intake-archive-verification";

describe("managed audit manual sandbox connection credential resolver sandbox handle review packet gate non-secret intake archive verification", () => {
  it("verifies the Node v358 packet/gate intake archive and prepares v360", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-non-secret-intake-archive-verification.v1",
      archiveVerificationState: "sandbox-handle-review-packet-gate-non-secret-intake-archive-verified",
      archiveVerificationDecision: "archive-sandbox-handle-review-packet-gate-non-secret-intake",
      readyForSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification: true,
      readyForNodeV360SandboxHandleReviewPacketGateDecisionRecord: true,
      consumesNodeV358SandboxHandleReviewPacketGateNonSecretIntake: true,
      activeNodeVersion: "Node v359",
      sourceNodeVersion: "Node v358",
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
      sourceNodeV358: {
        sourceVersion: "Node v358",
        intakeState: "sandbox-handle-review-packet-gate-non-secret-intake-ready",
        intakeDecision: "define-non-secret-sandbox-handle-review-packet-gate",
        readyForPacketGateIntake: true,
        readyForNodeV359ArchiveVerification: true,
        packetInputCount: 6,
        gateOutputCount: 5,
        stopConditionCount: 7,
        sourceArchiveFileCount: 11,
        sourcePresentArchiveFileCount: 11,
        sourceCheckCount: 30,
        sourcePassedCheckCount: 30,
        checkCount: 27,
        passedCheckCount: 27,
        productionBlockerCount: 0,
        packetGateIntakeOnly: true,
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
        verificationMode: "sandbox-handle-review-packet-gate-non-secret-intake-archive-verification",
        sourceSpan: "Node v358 sandbox handle review packet/gate non-secret intake",
        archiveRoot: "d/358",
        archiveVerificationDecision: "archive-sandbox-handle-review-packet-gate-non-secret-intake",
        verifiesJsonMarkdownAndSummary: true,
        verifiesScreenshotExplanationAndWalkthrough: true,
        verifiesPlanAndArchiveIndexes: true,
        verifiesPacketInputsGateOutputsAndStopConditions: true,
        rerunsLiveProbe: false,
        startsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        requestsJavaMiniKvEcho: false,
        nextNodeVersionSuggested: "Node v360",
      },
      checks: {
        archiveFilesPresent: true,
        jsonEvidenceReadable: true,
        jsonProfileVersionValid: true,
        jsonReadyForV359Verification: true,
        jsonIntakeDecisionValid: true,
        packetInputsRecorded: true,
        gateOutputsRecorded: true,
        stopConditionsRecorded: true,
        allChecksPassedInSourceIntake: true,
        sourceNodeV357ArchiveEvidenceRecorded: true,
        summaryMatchesJson: true,
        markdownRecordsPacketGateIntake: true,
        markdownRecordsInputOutputStopConditionCounts: true,
        browserSnapshotPresent: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsNonSecretBoundary: true,
        codeWalkthroughPresent: true,
        sourcePlanPointsToV359: true,
        planIndexReferencesV358AndV359: true,
        archiveIndexReferencesV358: true,
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
        readyForSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification: true,
      },
      summary: {
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        packetInputCount: 6,
        gateOutputCount: 5,
        stopConditionCount: 7,
        sourceArchiveFileCount: 11,
        sourcePresentArchiveFileCount: 11,
        sourceCheckCount: 27,
        sourcePassedCheckCount: 27,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV358.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV358.sourceArchiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(34);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("fails closed when the v358 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v359-empty-"));

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        });

      expect(profile.archiveVerificationState).toBe("blocked");
      expect(profile.archiveVerificationDecision).toBe("blocked");
      expect(profile.readyForSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification).toBe(false);
      expect(profile.readyForNodeV360SandboxHandleReviewPacketGateDecisionRecord).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-non-secret-intake-archive-verification.v1",
        archiveVerificationState: "sandbox-handle-review-packet-gate-non-secret-intake-archive-verified",
        archiveVerificationDecision: "archive-sandbox-handle-review-packet-gate-non-secret-intake",
        activeNodeVersion: "Node v359",
        sourceNodeVersion: "Node v358",
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
        "# Managed audit manual sandbox connection credential resolver sandbox handle review packet/gate non-secret intake archive verification",
      );
      expect(markdown.body).toContain(
        "Archive verification decision: archive-sandbox-handle-review-packet-gate-non-secret-intake",
      );
      expect(markdown.body).toContain("Ready for v360 packet/gate decision record: true");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("Starts mini-kv service: false");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-359",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v359-packet-gate-intake-archive",
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
