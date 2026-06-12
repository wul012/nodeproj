import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle runtime execution packet stop record", () => {
  it("writes a stopped runtime execution packet record when operator artifacts are absent", () => {
    const profile = withForcedHistoricalFallback(() =>
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord({
        config: loadTestConfig(),
      }));

    expect(profile).toMatchObject({
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
      runtimeGateRequiresSeparateApproval: true,
      runtimeExecutionPacketPresent: false,
      runtimeExecutionPacketExecutable: false,
      runtimeGateApprovalPresent: false,
      concreteLoopbackPortsAssigned: false,
      operatorApprovalRecordRequired: true,
      concreteLoopbackPortsRequired: true,
      getOnlySmokeCommandRequired: true,
      cleanupProofRequired: true,
      serviceOwnerRequired: true,
      processCleanupRulesRequired: true,
      operatorApprovalRecordPresent: false,
      concreteLoopbackPortsPresent: false,
      getOnlySmokeCommandPresent: false,
      cleanupProofPresent: false,
      serviceOwnerPresent: false,
      processCleanupRulesPresent: false,
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
      sourceNodeV391: {
        sourceVersion: "Node v391",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verification.v1",
        archiveVerificationState:
          "java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verified",
        archiveVerificationDecision: "archive-runtime-live-read-gate-plan-and-prepare-v392-runtime-execution-packet",
        readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification: true,
        readyForNodeV392RuntimeExecutionPacket: true,
        readyForRuntimeLiveReadGate: false,
        activeNodeVersion: "Node v391",
        sourceNodeVersion: "Node v390",
        archiveVerificationOnly: true,
        runtimeExecutionPacketPresent: false,
        runtimeGateApprovalPresent: false,
        concreteLoopbackPortsAssigned: false,
        operatorApprovalRecordRequired: true,
        concreteLoopbackPortsRequired: true,
        getOnlySmokeCommandRequired: true,
        cleanupProofRequired: true,
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        sourceCheckCount: 36,
        sourcePassedCheckCount: 36,
        replayCheckCount: 36,
        replayPassedCheckCount: 36,
        requiredRuntimeGateArtifactCount: 4,
        declaredOperatorEvidenceSourceCount: 2,
        checkCount: 38,
        passedCheckCount: 38,
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verification.v1",
        archiveVerificationState:
          "java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verified",
        archiveVerificationDecision: "archive-runtime-live-read-gate-plan-and-prepare-v392-runtime-execution-packet",
        readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification: true,
        readyForNodeV392RuntimeExecutionPacket: true,
        readyForRuntimeLiveReadGate: false,
        archiveVerificationOnly: true,
        runtimeExecutionPacketPresent: false,
        runtimeGateApprovalPresent: false,
        concreteLoopbackPortsAssigned: false,
        sourceCheckCount: 36,
        sourcePassedCheckCount: 36,
        replayCheckCount: 36,
        replayPassedCheckCount: 36,
        requiredRuntimeGateArtifactCount: 4,
        declaredOperatorEvidenceSourceCount: 2,
        checkCount: 38,
        passedCheckCount: 38,
        productionBlockerCount: 0,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        executionAllowed: false,
        activeShardPrototypeEnabled: false,
      },
      runtimeExecutionPacket: {
        packetMode: "java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record",
        sourceSpan: "Node v391 + Node v390 + Node v389 + Node v388 + Java v161 + mini-kv v152",
        packetDecision: "stop-before-runtime-execution-missing-operator-artifacts",
        missingArtifactCount: 6,
        operatorApprovalRecordPresent: false,
        concreteLoopbackPortsPresent: false,
        getOnlySmokeCommandPresent: false,
        cleanupProofPresent: false,
        serviceOwnerPresent: false,
        processCleanupRulesPresent: false,
        runtimeExecutionPacketPresent: false,
        runtimeExecutionPacketExecutable: false,
        executionAttempted: false,
        liveReadGateAllowed: false,
        runtimeProbeAllowed: false,
        startsUpstreamServices: false,
        stopsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        activeShardPrototypeEnabled: false,
        nextNodeVersionSuggested: "Node v393",
      },
      checks: {
        sourceArchiveFilesPresent: true,
        sourceJsonReadable: true,
        sourceProfileVersionValid: true,
        sourceArchiveVerificationReady: true,
        sourceNodeV390PlanReady: true,
        sourceRuntimeGateClosed: true,
        sourceExecutionPacketAbsent: true,
        sourceChecksAllPassed: true,
        sourceArchiveDigestStable: true,
        sourceSummaryMatchesJson: true,
        sourceMarkdownRecordsArchiveVerification: true,
        sourceBrowserSnapshotPresent: true,
        sourceScreenshotAndHtmlPresent: true,
        sourceExplanationRecordsRuntimeBoundary: true,
        sourceCodeWalkthroughPresent: true,
        sourcePlanPointsToV392RuntimeExecutionPacket: true,
        planIndexReferencesV391AndV392: true,
        archiveIndexReferencesV391: true,
        routeRecordedInArchive: true,
        replayReady: true,
        replayKeepsRuntimeGateClosed: true,
        replayKeepsExecutionPacketAbsent: true,
        replayPreservesPlanArtifactCounts: true,
        replayPreservesSourceCheckCounts: true,
        operatorApprovalStillMissing: true,
        concreteLoopbackPortsStillMissing: true,
        getOnlySmokeCommandStillMissing: true,
        cleanupProofStillMissing: true,
        serviceOwnerStillMissing: true,
        processCleanupRulesStillMissing: true,
        stopRecordDoesNotApproveRuntime: true,
        executionAttemptSkipped: true,
        noAutomaticUpstreamStartStop: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        activeShardPrototypeStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        packetDigestStable: true,
        readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord: true,
      },
      summary: {
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
      },
    });
    expect(profile.sourceNodeV391.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.runtimeExecutionPacket.packetDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.stopReasons.map((reason) => reason.code)).toEqual([
      "OPERATOR_APPROVAL_RECORD_MISSING",
      "CONCRETE_LOOPBACK_PORTS_MISSING",
      "GET_ONLY_SMOKE_COMMAND_MISSING",
      "CLEANUP_PROOF_MISSING",
      "SERVICE_OWNER_MISSING",
      "PROCESS_CLEANUP_RULES_MISSING",
    ]);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("fails closed when the v391 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v392-empty-"));

    try {
      const profile = withForcedHistoricalFallback(() =>
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        }));

      expect(profile.stopRecordState).toBe("blocked");
      expect(profile.stopRecordDecision).toBe("blocked");
      expect(profile.readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord).toBe(false);
      expect(profile.readyForNodeV393ArchiveVerification).toBe(false);
      expect(profile.readyForRuntimeLiveReadGate).toBe(false);
      expect(profile.summary.presentArchiveFileCount).toBe(0);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "SOURCE_ARCHIVE_FILES_MISSING",
        "SOURCE_JSON_UNREADABLE",
        "SOURCE_V391_NOT_READY",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record.v1",
        stopRecordState: "java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stopped",
        activeNodeVersion: "Node v392",
        sourceNodeVersion: "Node v391",
        stopRecordOnly: true,
        readyForNodeV393ArchiveVerification: true,
        readyForRuntimeLiveReadGate: false,
        runtimeExecutionPacketPresent: false,
        runtimeExecutionPacketExecutable: false,
        runtimeGateApprovalPresent: false,
        concreteLoopbackPortsAssigned: false,
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
        "# Managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle runtime execution packet stop record",
      );
      expect(markdown.body).toContain(
        "Stop record decision: stop-before-runtime-execution-missing-operator-artifacts",
      );
      expect(markdown.body).toContain("Runtime Execution Packet Stop Record");
      expect(markdown.body).toContain("runtimeExecutionPacketExecutable: false");
    } finally {
      await app.close();
      restoreEnv(previous);
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-392",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v392-runtime-execution-packet-stop-record",
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
