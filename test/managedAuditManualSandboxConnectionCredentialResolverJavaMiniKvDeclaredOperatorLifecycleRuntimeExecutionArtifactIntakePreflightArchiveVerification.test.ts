import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightArchiveVerification.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verification";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle runtime execution artifact intake preflight archive verification", () => {
  it("verifies the Node v394 blocked preflight archive and frozen evidence replay", () => {
    const profile = withForcedHistoricalFallback(() =>
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightArchiveVerification({
        config: loadTestConfig(),
      }));

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verification.v1",
      archiveVerificationState:
        "java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verified",
      archiveVerificationDecision:
        "archive-runtime-execution-artifact-intake-preflight-and-keep-runtime-gate-closed",
      readyForDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightArchiveVerification: true,
      readyForNodeV396RuntimeExecutionArtifactIntake: true,
      readyForRuntimeExecutionPacket: false,
      readyForRuntimeLiveReadGate: false,
      activeNodeVersion: "Node v395",
      sourceNodeVersion: "Node v394",
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
      sourceNodeV394: {
        sourceVersion: "Node v394",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight.v1",
        intakePreflightState:
          "java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-complete",
        intakeDecision: "block-runtime-execution-artifact-intake-missing-concrete-artifacts",
        readyForDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight: true,
        readyForNodeV395ArchiveVerification: true,
        readyForRuntimeExecutionPacket: false,
        readyForRuntimeLiveReadGate: false,
        activeNodeVersion: "Node v394",
        sourceNodeVersion: "Node v393",
        artifactIntakePreflightOnly: true,
        runtimeExecutionArtifactsComplete: false,
        presentRuntimeExecutionArtifactCount: 0,
        missingRuntimeExecutionArtifactCount: 6,
        runtimeExecutionPacketPresent: false,
        runtimeExecutionPacketExecutable: false,
        runtimeGateApprovalPresent: false,
        concreteLoopbackPortsAssigned: false,
        executionAttempted: false,
        sourceCheckCount: 37,
        sourcePassedCheckCount: 37,
        replayCheckCount: 37,
        replayPassedCheckCount: 37,
        requiredRuntimeGateArtifactCount: 4,
        requiredRuntimeExecutionArtifactCount: 6,
        declaredOperatorEvidenceSourceCount: 2,
        checkCount: 43,
        passedCheckCount: 43,
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
        intakePreflightState:
          "java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-complete",
        intakeDecision: "block-runtime-execution-artifact-intake-missing-concrete-artifacts",
        readyForNodeV395ArchiveVerification: true,
        readyForRuntimeExecutionPacket: false,
        readyForRuntimeLiveReadGate: false,
        artifactIntakePreflightOnly: true,
        runtimeExecutionArtifactsComplete: false,
        presentRuntimeExecutionArtifactCount: 0,
        missingRuntimeExecutionArtifactCount: 6,
        runtimeExecutionPacketPresent: false,
        runtimeExecutionPacketExecutable: false,
        runtimeGateApprovalPresent: false,
        concreteLoopbackPortsAssigned: false,
        executionAttempted: false,
        checkCount: 43,
        passedCheckCount: 43,
        sourceCheckCount: 37,
        sourcePassedCheckCount: 37,
        replayCheckCount: 37,
        replayPassedCheckCount: 37,
        requiredRuntimeGateArtifactCount: 4,
        requiredRuntimeExecutionArtifactCount: 6,
        declaredOperatorEvidenceSourceCount: 2,
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
          "java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verification",
        sourceSpan: "Node v394 runtime execution artifact intake preflight",
        archiveRoot: "e/394",
        archiveVerificationDecision:
          "archive-runtime-execution-artifact-intake-preflight-and-keep-runtime-gate-closed",
        replayReady: true,
        verifiesJsonMarkdownAndSummary: true,
        verifiesScreenshotExplanationAndWalkthrough: true,
        verifiesPlanAndArchiveIndexes: true,
        verifiesReplayFromFrozenEvidence: true,
        verifiesRuntimeGateStillBlocked: true,
        verifiesArtifactSetStillMissing: true,
        rerunsLiveRead: false,
        startsUpstreamServices: false,
        stopsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        activeShardPrototypeEnabled: false,
        nextNodeVersionSuggested: "Node v396",
      },
      checks: {
        archiveFilesPresent: true,
        jsonEvidenceReadable: true,
        jsonProfileVersionValid: true,
        jsonPreflightReady: true,
        jsonReadyForNodeV395ArchiveVerification: true,
        jsonRuntimeGateClosed: true,
        jsonRuntimeExecutionPacketBlocked: true,
        jsonArtifactCountsPreserved: true,
        jsonMissingReasonCodesStable: true,
        jsonDigestStable: true,
        jsonChecksAllPassed: true,
        summaryMatchesJson: true,
        markdownRecordsBlockedPreflight: true,
        browserSnapshotPresent: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsBlockedBoundaryAndChecks: true,
        codeWalkthroughPresent: true,
        sourcePlanPointsToV395ArchiveVerification: true,
        planIndexReferencesV394AndV395: true,
        archiveIndexReferencesV394: true,
        routeRecordedInArchive: true,
        replayReady: true,
        replayKeepsRuntimeGateClosed: true,
        replayKeepsRuntimeExecutionPacketBlocked: true,
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
        readyForDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightArchiveVerification: true,
      },
      summary: {
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        sourceCheckCount: 43,
        sourcePassedCheckCount: 43,
        replayCheckCount: 43,
        replayPassedCheckCount: 43,
        requiredRuntimeGateArtifactCount: 4,
        requiredRuntimeExecutionArtifactCount: 6,
        presentRuntimeExecutionArtifactCount: 0,
        missingRuntimeExecutionArtifactCount: 6,
        declaredOperatorEvidenceSourceCount: 2,
        checkCount: 37,
        passedCheckCount: 37,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV394.artifactIntakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV394.missingReasonCodes).toEqual([
      "OPERATOR_APPROVAL_RECORD_MISSING",
      "CONCRETE_LOOPBACK_PORTS_MISSING",
      "GET_ONLY_SMOKE_COMMAND_MISSING",
      "CLEANUP_PROOF_MISSING",
      "SERVICE_OWNER_MISSING",
      "PROCESS_CLEANUP_RULES_MISSING",
    ]);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when the v394 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v395-empty-"));

    try {
      const profile = withForcedHistoricalFallback(() =>
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightArchiveVerification({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        }));

      expect(profile.archiveVerificationState).toBe("blocked");
      expect(profile.archiveVerificationDecision).toBe("blocked");
      expect(profile.readyForDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightArchiveVerification)
        .toBe(false);
      expect(profile.readyForNodeV396RuntimeExecutionArtifactIntake).toBe(false);
      expect(profile.readyForRuntimeExecutionPacket).toBe(false);
      expect(profile.readyForRuntimeLiveReadGate).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "ARCHIVE_FILES_MISSING",
        "ARCHIVE_JSON_UNREADABLE",
        "SOURCE_V394_NOT_READY",
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
  }, 60000);

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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verification.v1",
        archiveVerificationState:
          "java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verified",
        activeNodeVersion: "Node v395",
        sourceNodeVersion: "Node v394",
        archiveVerificationOnly: true,
        readyForNodeV396RuntimeExecutionArtifactIntake: true,
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
        "# Managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle runtime execution artifact intake preflight archive verification",
      );
      expect(markdown.body).toContain(
        "Archive verification decision: archive-runtime-execution-artifact-intake-preflight-and-keep-runtime-gate-closed",
      );
      expect(markdown.body).toContain("Replay From Frozen Evidence");
      expect(markdown.body).toContain("presentRuntimeExecutionArtifactCount: 0");
    } finally {
      await app.close();
      restoreEnv(previous);
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-395",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v395-runtime-execution-artifact-intake-preflight-archive",
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
