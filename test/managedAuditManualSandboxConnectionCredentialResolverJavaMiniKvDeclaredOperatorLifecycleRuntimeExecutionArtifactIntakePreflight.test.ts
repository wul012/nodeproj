import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle runtime execution artifact intake preflight", () => {
  it("records the missing concrete runtime execution artifacts without opening runtime", () => {
    const profile = withForcedHistoricalFallback(() =>
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight({
        config: loadTestConfig(),
      }));

    expect(profile).toMatchObject({
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
      sourceNodeV393: {
        sourceVersion: "Node v393",
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
        runtimeExecutionPacketPresent: false,
        runtimeExecutionPacketExecutable: false,
        runtimeGateApprovalPresent: false,
        concreteLoopbackPortsAssigned: false,
        missingRuntimeExecutionArtifactCount: 6,
        executionAttempted: false,
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        sourceCheckCount: 42,
        sourcePassedCheckCount: 42,
        replayCheckCount: 42,
        replayPassedCheckCount: 42,
        requiredRuntimeGateArtifactCount: 4,
        requiredRuntimeExecutionArtifactCount: 6,
        declaredOperatorEvidenceSourceCount: 2,
        checkCount: 37,
        passedCheckCount: 37,
        productionBlockerCount: 0,
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
        readyForNodeV394RuntimeExecutionArtifactIntake: true,
        readyForRuntimeLiveReadGate: false,
        archiveVerificationOnly: true,
        runtimeExecutionPacketPresent: false,
        runtimeExecutionPacketExecutable: false,
        runtimeGateApprovalPresent: false,
        concreteLoopbackPortsAssigned: false,
        missingRuntimeExecutionArtifactCount: 6,
        executionAttempted: false,
        sourceCheckCount: 42,
        sourcePassedCheckCount: 42,
        replayCheckCount: 42,
        replayPassedCheckCount: 42,
        requiredRuntimeGateArtifactCount: 4,
        requiredRuntimeExecutionArtifactCount: 6,
        declaredOperatorEvidenceSourceCount: 2,
        checkCount: 37,
        passedCheckCount: 37,
        productionBlockerCount: 0,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        executionAllowed: false,
        activeShardPrototypeEnabled: false,
      },
      siblingWorkspaceSnapshot: {
        latestKnownJavaEvidenceVersion: "Java v161",
        latestKnownMiniKvEvidenceVersion: "mini-kv v152",
        runtimeArtifactFallbackAllowed: false,
      },
      artifactIntakePreflight: {
        preflightMode:
          "java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight",
        sourceSpan: "Node v393 + Java v161 + mini-kv v152 local artifact scan",
        intakeDecision: "block-runtime-execution-artifact-intake-missing-concrete-artifacts",
        scansNodeDropZone: true,
        scansLocalSiblingWorkspaces: true,
        usesHistoricalFallbackForRuntimeArtifacts: false,
        runtimeExecutionArtifactsComplete: false,
        requiredRuntimeExecutionArtifactCount: 6,
        presentRuntimeExecutionArtifactCount: 0,
        missingRuntimeExecutionArtifactCount: 6,
        javaNextRuntimeArtifactPresent: false,
        miniKvNextRuntimeArtifactPresent: false,
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
        nextNodeVersionSuggested: "Node v395",
      },
      checks: {
        sourceArchiveFilesPresent: true,
        sourceJsonReadable: true,
        sourceProfileVersionValid: true,
        sourceArchiveVerificationReady: true,
        sourceReadyForV394Intake: true,
        sourceRuntimeGateClosed: true,
        sourceExecutionPacketStopped: true,
        sourceMissingArtifactsRecorded: true,
        sourceChecksAllPassed: true,
        sourceDigestStable: true,
        sourceSummaryMatchesJson: true,
        sourceMarkdownRecordsV394Intake: true,
        sourceBrowserSnapshotPresent: true,
        sourceScreenshotAndHtmlPresent: true,
        sourceExplanationRecordsV394Boundary: true,
        sourceCodeWalkthroughPresent: true,
        sourcePlanPointsToConcreteArtifacts: true,
        planIndexReferencesV393AndV394: true,
        archiveIndexReferencesV393: true,
        routeRecordedInArchive: true,
        replayReady: true,
        replayKeepsRuntimeGateClosed: true,
        replayKeepsExecutionPacketStopped: true,
        replayPreservesMissingArtifacts: true,
        replayPreservesSourceCheckCounts: true,
        javaWorkspaceScanRecorded: true,
        miniKvWorkspaceScanRecorded: true,
        latestDeclaredLifecycleEvidenceBaselineRecorded: true,
        javaNextRuntimeArtifactAbsent: true,
        miniKvNextRuntimeArtifactAbsent: true,
        artifactRequirementCountStable: true,
        artifactRequirementsAllAbsent: true,
        artifactIntakeDigestStable: true,
        noHistoricalRuntimeArtifactFallback: true,
        noAutomaticUpstreamStartStop: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        activeShardPrototypeStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight: true,
      },
      summary: {
        sourceCheckCount: 37,
        sourcePassedCheckCount: 37,
        replayCheckCount: 37,
        replayPassedCheckCount: 37,
        requiredRuntimeGateArtifactCount: 4,
        requiredRuntimeExecutionArtifactCount: 6,
        presentRuntimeExecutionArtifactCount: 0,
        missingRuntimeExecutionArtifactCount: 6,
        declaredOperatorEvidenceSourceCount: 2,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV393.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.artifactIntakePreflight.artifactIntakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.artifactRequirements.map((artifact) => artifact.missingReasonCode)).toEqual([
      "OPERATOR_APPROVAL_RECORD_MISSING",
      "CONCRETE_LOOPBACK_PORTS_MISSING",
      "GET_ONLY_SMOKE_COMMAND_MISSING",
      "CLEANUP_PROOF_MISSING",
      "SERVICE_OWNER_MISSING",
      "PROCESS_CLEANUP_RULES_MISSING",
    ]);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("fails closed when the v393 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v394-empty-"));

    try {
      const profile = withForcedHistoricalFallback(() =>
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        }));

      expect(profile.intakePreflightState).toBe("blocked");
      expect(profile.intakeDecision).toBe("blocked");
      expect(profile.readyForDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight).toBe(false);
      expect(profile.readyForNodeV395ArchiveVerification).toBe(false);
      expect(profile.readyForRuntimeExecutionPacket).toBe(false);
      expect(profile.readyForRuntimeLiveReadGate).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "SOURCE_ARCHIVE_FILES_MISSING",
        "SOURCE_JSON_UNREADABLE",
        "SOURCE_V393_NOT_READY",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight.v1",
        intakePreflightState:
          "java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-complete",
        activeNodeVersion: "Node v394",
        sourceNodeVersion: "Node v393",
        artifactIntakePreflightOnly: true,
        readyForNodeV395ArchiveVerification: true,
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
        "# Managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle runtime execution artifact intake preflight",
      );
      expect(markdown.body).toContain(
        "Intake decision: block-runtime-execution-artifact-intake-missing-concrete-artifacts",
      );
      expect(markdown.body).toContain("Runtime Execution Artifact Requirements");
      expect(markdown.body).toContain("runtimeExecutionArtifactsComplete: false");
    } finally {
      await app.close();
      restoreEnv(previous);
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-394",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v394-runtime-execution-artifact-intake-preflight",
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
