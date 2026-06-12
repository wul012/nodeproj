import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerification.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verification";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle runtime execution packet stop record archive verification", () => {
  it("verifies the Node v392 stop record archive and frozen evidence replay", () => {
    const profile = withForcedHistoricalFallback(() =>
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerification({
        config: loadTestConfig(),
      }));

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verification.v1",
      archiveVerificationState:
        "java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verified",
      archiveVerificationDecision: "archive-runtime-execution-packet-stop-record-and-keep-runtime-gate-closed",
      readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerification: true,
      readyForNodeV394RuntimeExecutionArtifactIntake: true,
      readyForRuntimeLiveReadGate: false,
      activeNodeVersion: "Node v393",
      sourceNodeVersion: "Node v392",
      archiveVerificationOnly: true,
      runtimeGateRequiresSeparateApproval: true,
      runtimeExecutionPacketPresent: false,
      runtimeExecutionPacketExecutable: false,
      runtimeGateApprovalPresent: false,
      concreteLoopbackPortsAssigned: false,
      missingRuntimeExecutionArtifactCount: 6,
      executionAttempted: false,
      rerunsLiveRead: false,
      startsJavaService: false,
      startsMiniKvService: false,
      stopsJavaService: false,
      stopsMiniKvService: false,
      mutatesJavaState: false,
      mutatesMiniKvState: false,
      connectsManagedAudit: false,
      sendsManagedAuditHttpTcp: false,
      credentialValueRequested: false,
      credentialValueRead: false,
      rawEndpointUrlRequested: false,
      rawEndpointUrlParsed: false,
      executionAllowed: false,
      activeShardPrototypeEnabled: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      sourceNodeV392: {
        sourceVersion: "Node v392",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record.v1",
        stopRecordState: "java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stopped",
        stopRecordDecision: "stop-before-runtime-execution-missing-operator-artifacts",
        readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord: true,
        readyForNodeV393ArchiveVerification: true,
        readyForRuntimeLiveReadGate: false,
        activeNodeVersion: "Node v392",
        sourceNodeVersion: "Node v391",
        stopRecordOnly: true,
        runtimeExecutionPacketPresent: false,
        runtimeExecutionPacketExecutable: false,
        runtimeGateApprovalPresent: false,
        concreteLoopbackPortsAssigned: false,
        operatorApprovalRecordPresent: false,
        concreteLoopbackPortsPresent: false,
        getOnlySmokeCommandPresent: false,
        cleanupProofPresent: false,
        serviceOwnerPresent: false,
        processCleanupRulesPresent: false,
        executionAttempted: false,
        missingArtifactCount: 6,
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        sourceCheckCount: 38,
        sourcePassedCheckCount: 38,
        replayCheckCount: 38,
        replayPassedCheckCount: 38,
        requiredRuntimeGateArtifactCount: 4,
        requiredRuntimeExecutionArtifactCount: 6,
        missingRuntimeExecutionArtifactCount: 6,
        declaredOperatorEvidenceSourceCount: 2,
        checkCount: 42,
        passedCheckCount: 42,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        connectsManagedAudit: false,
        executionAllowed: false,
        activeShardPrototypeEnabled: false,
      },
      replay: {
        replayState: "ready",
        replayedProfileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record.v1",
        stopRecordState: "java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stopped",
        stopRecordDecision: "stop-before-runtime-execution-missing-operator-artifacts",
        readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord: true,
        readyForNodeV393ArchiveVerification: true,
        readyForRuntimeLiveReadGate: false,
        stopRecordOnly: true,
        runtimeExecutionPacketPresent: false,
        runtimeExecutionPacketExecutable: false,
        runtimeGateApprovalPresent: false,
        concreteLoopbackPortsAssigned: false,
        executionAttempted: false,
        missingArtifactCount: 6,
        sourceCheckCount: 38,
        sourcePassedCheckCount: 38,
        replayCheckCount: 38,
        replayPassedCheckCount: 38,
        requiredRuntimeGateArtifactCount: 4,
        requiredRuntimeExecutionArtifactCount: 6,
        missingRuntimeExecutionArtifactCount: 6,
        declaredOperatorEvidenceSourceCount: 2,
        checkCount: 42,
        passedCheckCount: 42,
        productionBlockerCount: 0,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        executionAllowed: false,
        activeShardPrototypeEnabled: false,
      },
      archiveVerification: {
        verificationMode:
          "java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verification",
        sourceSpan: "Node v392 runtime execution packet stop record",
        archiveRoot: "e/392",
        archiveVerificationDecision: "archive-runtime-execution-packet-stop-record-and-keep-runtime-gate-closed",
        replayReady: true,
        verifiesJsonMarkdownAndSummary: true,
        verifiesScreenshotExplanationAndWalkthrough: true,
        verifiesPlanAndArchiveIndexes: true,
        verifiesReplayFromFrozenEvidence: true,
        verifiesRuntimeGateStillBlocked: true,
        verifiesExecutionPacketStillStopped: true,
        rerunsLiveRead: false,
        startsUpstreamServices: false,
        stopsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        activeShardPrototypeEnabled: false,
        nextNodeVersionSuggested: "Node v394",
      },
      checks: {
        archiveFilesPresent: true,
        jsonEvidenceReadable: true,
        jsonProfileVersionValid: true,
        jsonStopRecordReady: true,
        jsonReadyForNodeV393ArchiveVerification: true,
        jsonRuntimeGateClosed: true,
        jsonExecutionPacketStopped: true,
        jsonMissingArtifactsRecorded: true,
        jsonStopReasonCodesStable: true,
        jsonPacketDigestStable: true,
        jsonChecksAllPassed: true,
        summaryMatchesJson: true,
        markdownRecordsStopRecord: true,
        browserSnapshotPresent: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsStopBoundaryAndChecks: true,
        codeWalkthroughPresent: true,
        sourcePlanPointsToV393ArchiveVerification: true,
        planIndexReferencesV392AndV393: true,
        archiveIndexReferencesV392: true,
        routeRecordedInArchive: true,
        replayReady: true,
        replayKeepsRuntimeGateClosed: true,
        replayKeepsExecutionPacketStopped: true,
        replayPreservesMissingArtifacts: true,
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
        readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerification: true,
      },
      summary: {
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        sourceCheckCount: 42,
        sourcePassedCheckCount: 42,
        replayCheckCount: 42,
        replayPassedCheckCount: 42,
        requiredRuntimeGateArtifactCount: 4,
        requiredRuntimeExecutionArtifactCount: 6,
        missingRuntimeExecutionArtifactCount: 6,
        declaredOperatorEvidenceSourceCount: 2,
        checkCount: 37,
        passedCheckCount: 37,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV392.packetDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV392.stopReasonCodes).toEqual([
      "OPERATOR_APPROVAL_RECORD_MISSING",
      "CONCRETE_LOOPBACK_PORTS_MISSING",
      "GET_ONLY_SMOKE_COMMAND_MISSING",
      "CLEANUP_PROOF_MISSING",
      "SERVICE_OWNER_MISSING",
      "PROCESS_CLEANUP_RULES_MISSING",
    ]);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("fails closed when the v392 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v393-empty-"));

    try {
      const profile = withForcedHistoricalFallback(() =>
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerification({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        }));

      expect(profile.archiveVerificationState).toBe("blocked");
      expect(profile.archiveVerificationDecision).toBe("blocked");
      expect(profile.readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerification).toBe(false);
      expect(profile.readyForNodeV394RuntimeExecutionArtifactIntake).toBe(false);
      expect(profile.readyForRuntimeLiveReadGate).toBe(false);
      expect(profile.summary.presentArchiveFileCount).toBe(0);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "ARCHIVE_FILES_MISSING",
        "ARCHIVE_JSON_UNREADABLE",
        "SOURCE_V392_NOT_READY",
        "REPLAY_FAILED",
      ]));
      expect(profile.runtimeExecutionPacketPresent).toBe(false);
      expect(profile.runtimeExecutionPacketExecutable).toBe(false);
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
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verification.v1",
        archiveVerificationState:
          "java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verified",
        activeNodeVersion: "Node v393",
        sourceNodeVersion: "Node v392",
        archiveVerificationOnly: true,
        readyForNodeV394RuntimeExecutionArtifactIntake: true,
        readyForRuntimeLiveReadGate: false,
        runtimeExecutionPacketPresent: false,
        runtimeExecutionPacketExecutable: false,
        runtimeGateApprovalPresent: false,
        concreteLoopbackPortsAssigned: false,
        missingRuntimeExecutionArtifactCount: 6,
        executionAttempted: false,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        executionAllowed: false,
        activeShardPrototypeEnabled: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle runtime execution packet stop record archive verification",
      );
      expect(markdown.body).toContain(
        "Archive verification decision: archive-runtime-execution-packet-stop-record-and-keep-runtime-gate-closed",
      );
      expect(markdown.body).toContain("Replay From Frozen Evidence");
      expect(markdown.body).toContain("runtimeExecutionPacketExecutable: false");
    } finally {
      await app.close();
      restoreEnv(previous);
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-393",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v393-runtime-execution-packet-stop-record-archive",
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

function withForcedHistoricalFallback<T>(callback: () => T): T {
  const previous = process.env[FORCE_FALLBACK_ENV];
  process.env[FORCE_FALLBACK_ENV] = "true";
  try {
    return callback();
  } finally {
    restoreEnv(previous);
  }
}

function restoreEnv(previous: string | undefined): void {
  if (previous === undefined) {
    delete process.env[FORCE_FALLBACK_ENV];
    return;
  }
  process.env[FORCE_FALLBACK_ENV] = previous;
}
