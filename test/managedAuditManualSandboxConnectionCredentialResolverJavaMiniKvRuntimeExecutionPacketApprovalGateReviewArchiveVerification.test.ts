import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewArchiveVerification.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-approval-gate-review-archive-verification";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution packet approval gate review archive verification", () => {
  it("verifies the Node v398 blocked approval gate archive and frozen replay", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewArchiveVerification({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-approval-gate-review-archive-verification.v1",
      archiveVerificationState: "runtime-execution-packet-approval-gate-review-archive-verified",
      archiveVerificationDecision: "archive-approval-gate-review-and-keep-runtime-gate-closed",
      readyForRuntimeExecutionPacketApprovalGateReviewArchiveVerification: true,
      readyForNodeV400RuntimeExecutionPacketApprovalInputIntake: true,
      readyForRuntimeExecutionPacket: false,
      readyForRuntimeLiveReadGate: false,
      activeNodeVersion: "Node v399",
      sourceNodeVersion: "Node v398",
      archiveVerificationOnly: true,
      runtimeGateRequiresSeparateApproval: true,
      runtimeExecutionArtifactsComplete: false,
      presentRuntimeExecutionArtifactCount: 0,
      missingRuntimeExecutionArtifactCount: 6,
      runtimeExecutionPacketPresent: false,
      runtimeExecutionPacketExecutable: false,
      runtimeGateApprovalPresent: false,
      concreteLoopbackPortsAssigned: false,
      executionAttempted: false,
      rerunsLiveRead: false,
      startsJavaService: false,
      startsMiniKvService: false,
      stopsJavaService: false,
      stopsMiniKvService: false,
      executionAllowed: false,
      activeShardPrototypeEnabled: false,
      sourceNodeV398: {
        sourceVersion: "Node v398",
        approvalGateReviewState: "runtime-execution-packet-approval-gate-reviewed-blocked",
        approvalGateDecision:
          "block-runtime-execution-packet-approval-missing-node-window-correlated-approval-and-cross-project-packet",
        readyForJavaMiniKvRuntimeExecutionPacketApprovalGateReview: true,
        readyForNodeV399RuntimeExecutionPacketApprovalGateArchiveVerification: true,
        readyForRuntimeExecutionPacket: false,
        readyForRuntimeLiveReadGate: false,
        runtimeExecutionArtifactsComplete: false,
        presentRuntimeExecutionArtifactCount: 0,
        missingRuntimeExecutionArtifactCount: 6,
        runtimeExecutionPacketPresent: false,
        runtimeExecutionPacketExecutable: false,
        runtimeGateApprovalPresent: false,
        concreteLoopbackPortsAssigned: false,
        executionAttempted: false,
        requiredApprovalInputCount: 3,
        presentApprovalInputCount: 0,
        missingApprovalInputCount: 3,
        crossProjectAcceptedRequirementCount: 0,
        crossProjectMissingRequirementCount: 6,
        checkCount: 26,
        passedCheckCount: 26,
        sourceCheckCount: 33,
        sourcePassedCheckCount: 33,
        productionBlockerCount: 3,
        warningCount: 2,
        recommendationCount: 1,
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
        activeShardPrototypeEnabled: false,
      },
      replay: {
        replayState: "ready",
        approvalGateReviewState: "runtime-execution-packet-approval-gate-reviewed-blocked",
        approvalGateDecision:
          "block-runtime-execution-packet-approval-missing-node-window-correlated-approval-and-cross-project-packet",
        readyForNodeV399RuntimeExecutionPacketApprovalGateArchiveVerification: true,
        readyForRuntimeExecutionPacket: false,
        readyForRuntimeLiveReadGate: false,
        runtimeExecutionArtifactsComplete: false,
        presentRuntimeExecutionArtifactCount: 0,
        missingRuntimeExecutionArtifactCount: 6,
        runtimeExecutionPacketPresent: false,
        runtimeExecutionPacketExecutable: false,
        runtimeGateApprovalPresent: false,
        concreteLoopbackPortsAssigned: false,
        executionAttempted: false,
        requiredApprovalInputCount: 3,
        presentApprovalInputCount: 0,
        missingApprovalInputCount: 3,
        crossProjectAcceptedRequirementCount: 0,
        crossProjectMissingRequirementCount: 6,
        checkCount: 26,
        passedCheckCount: 26,
        sourceCheckCount: 33,
        sourcePassedCheckCount: 33,
        productionBlockerCount: 3,
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
        activeShardPrototypeEnabled: false,
      },
      archiveVerification: {
        verificationMode: "java-mini-kv-runtime-execution-packet-approval-gate-review-archive-verification",
        sourceSpan: "Node v398 runtime execution packet approval gate review",
        archiveRoot: "e/398",
        archiveVerificationDecision: "archive-approval-gate-review-and-keep-runtime-gate-closed",
        replayReady: true,
        verifiesJsonMarkdownAndSummary: true,
        verifiesScreenshotExplanationAndWalkthrough: true,
        verifiesPlanAndArchiveIndexes: true,
        verifiesReplayFromFrozenEvidence: true,
        verifiesApprovalGateBlockers: true,
        verifiesRuntimeGateStillBlocked: true,
        rerunsLiveRead: false,
        startsUpstreamServices: false,
        stopsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        activeShardPrototypeEnabled: false,
        nextNodeVersionSuggested: "Node v400",
      },
      checks: {
        archiveFilesPresent: true,
        jsonEvidenceReadable: true,
        jsonProfileVersionValid: true,
        jsonApprovalGateReady: true,
        jsonReadyForNodeV399ArchiveVerification: true,
        jsonRuntimeGateClosed: true,
        jsonRuntimeApprovalBlocked: true,
        jsonApprovalInputCountsPreserved: true,
        jsonRuntimeArtifactCountsPreserved: true,
        jsonDigestStable: true,
        jsonChecksAllPassed: true,
        summaryMatchesJson: true,
        markdownRecordsApprovalGateBlockers: true,
        browserSnapshotPresent: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsApprovalGateBlockersAndChecks: true,
        codeWalkthroughPresent: true,
        sourcePlanPointsToV399ArchiveVerification: true,
        planIndexReferencesV398AndV399: true,
        archiveIndexReferencesV398: true,
        routeRecordedInArchive: true,
        replayReady: true,
        replayKeepsRuntimeGateClosed: true,
        replayKeepsApprovalGateBlocked: true,
        replayPreservesApprovalInputCounts: true,
        replayPreservesRuntimeArtifactCounts: true,
        replayPreservesSourceCheckCounts: true,
        archiveVerificationDoesNotRerunLiveRead: true,
        noAutomaticUpstreamStartStop: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        activeShardPrototypeStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        archiveVerificationDigestStable: true,
        readyForRuntimeExecutionPacketApprovalGateReviewArchiveVerification: true,
      },
      summary: {
        checkCount: 38,
        passedCheckCount: 38,
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        sourceCheckCount: 26,
        sourcePassedCheckCount: 26,
        replayCheckCount: 26,
        replayPassedCheckCount: 26,
        requiredApprovalInputCount: 3,
        presentApprovalInputCount: 0,
        missingApprovalInputCount: 3,
        presentRuntimeExecutionArtifactCount: 0,
        missingRuntimeExecutionArtifactCount: 6,
        sourceProductionBlockerCount: 3,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.archiveVerification.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.productionBlockers).toEqual([]);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("fails closed when the Node v398 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v399-empty-"));

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewArchiveVerification({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        });

      expect(profile.archiveVerificationState).toBe("blocked");
      expect(profile.archiveVerificationDecision).toBe("blocked");
      expect(profile.readyForRuntimeExecutionPacketApprovalGateReviewArchiveVerification).toBe(false);
      expect(profile.readyForNodeV400RuntimeExecutionPacketApprovalInputIntake).toBe(false);
      expect(profile.readyForRuntimeExecutionPacket).toBe(false);
      expect(profile.readyForRuntimeLiveReadGate).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "ARCHIVE_FILES_MISSING",
        "ARCHIVE_JSON_UNREADABLE",
        "SOURCE_V398_NOT_READY",
      ]));
      expect(profile.executionAttempted).toBe(false);
      expect(profile.startsJavaService).toBe(false);
      expect(profile.startsMiniKvService).toBe(false);
      expect(profile.executionAllowed).toBe(false);
      expect(profile.activeShardPrototypeEnabled).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-approval-gate-review-archive-verification.v1",
        archiveVerificationState: "runtime-execution-packet-approval-gate-review-archive-verified",
        activeNodeVersion: "Node v399",
        sourceNodeVersion: "Node v398",
        readyForRuntimeExecutionPacket: false,
        readyForRuntimeLiveReadGate: false,
        archiveVerificationOnly: true,
        runtimeExecutionArtifactsComplete: false,
        presentRuntimeExecutionArtifactCount: 0,
        missingRuntimeExecutionArtifactCount: 6,
        executionAttempted: false,
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
        activeShardPrototypeEnabled: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution packet approval gate review archive verification",
      );
      expect(markdown.body).toContain("Replay From Frozen Evidence");
      expect(markdown.body).toContain("Archive Verification");
      expect(markdown.body).toContain("sourceProductionBlockerCount: 3");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-399",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v399-archive-verification",
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
