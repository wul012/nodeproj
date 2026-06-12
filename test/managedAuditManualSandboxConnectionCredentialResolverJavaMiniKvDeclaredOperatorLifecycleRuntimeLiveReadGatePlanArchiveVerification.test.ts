import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verification";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle runtime live-read gate plan archive verification", () => {
  it("verifies the Node v390 runtime live-read gate plan archive and frozen evidence replay", () => {
    const profile = withForcedHistoricalFallback(() =>
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification({
        config: loadTestConfig(),
      }));

    expect(profile).toMatchObject({
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
      runtimeGateRequiresSeparateApproval: true,
      runtimeExecutionPacketPresent: false,
      runtimeGateApprovalPresent: false,
      concreteLoopbackPortsAssigned: false,
      operatorApprovalRecordRequired: true,
      concreteLoopbackPortsRequired: true,
      getOnlySmokeCommandRequired: true,
      cleanupProofRequired: true,
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
      sourceNodeV390: {
        sourceVersion: "Node v390",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan.v1",
        planState: "java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-ready",
        planDecision: "write-separate-runtime-live-read-gate-plan-after-v389-archive-verification",
        readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlan: true,
        readyForNodeV391ArchiveVerification: true,
        readyForRuntimeLiveReadGate: false,
        activeNodeVersion: "Node v390",
        sourceNodeVersion: "Node v389",
        runtimeGatePlanOnly: true,
        runtimeGateRequiresSeparateApproval: true,
        operatorApprovalRecordRequired: true,
        concreteLoopbackPortsRequired: true,
        getOnlySmokeCommandRequired: true,
        cleanupProofRequired: true,
        runtimeGateApprovalPresent: false,
        concreteLoopbackPortsAssigned: false,
        liveReadGateAllowed: false,
        runtimeProbeAllowed: false,
        requiredRuntimeGateArtifactCount: 4,
        declaredOperatorEvidenceSourceCount: 2,
        javaDeclaredPortCount: 1,
        miniKvDeclaredPortHandleCount: 1,
        javaGetOnlySmokeTargetCount: 4,
        checkCount: 36,
        passedCheckCount: 36,
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan.v1",
        planState: "java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-ready",
        planDecision: "write-separate-runtime-live-read-gate-plan-after-v389-archive-verification",
        readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlan: true,
        readyForNodeV391ArchiveVerification: true,
        readyForRuntimeLiveReadGate: false,
        runtimeGatePlanOnly: true,
        runtimeGateRequiresSeparateApproval: true,
        runtimeGateApprovalPresent: false,
        concreteLoopbackPortsAssigned: false,
        liveReadGateAllowed: false,
        runtimeProbeAllowed: false,
        requiredRuntimeGateArtifactCount: 4,
        declaredOperatorEvidenceSourceCount: 2,
        javaDeclaredPortCount: 1,
        miniKvDeclaredPortHandleCount: 1,
        javaGetOnlySmokeTargetCount: 4,
        checkCount: 36,
        passedCheckCount: 36,
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
          "java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verification",
        sourceSpan: "Node v390 declared operator lifecycle runtime live-read gate plan",
        archiveRoot: "e/390",
        archiveVerificationDecision: "archive-runtime-live-read-gate-plan-and-prepare-v392-runtime-execution-packet",
        replayReady: true,
        verifiesJsonMarkdownAndSummary: true,
        verifiesScreenshotExplanationAndWalkthrough: true,
        verifiesPlanAndArchiveIndexes: true,
        verifiesReplayFromFrozenEvidence: true,
        verifiesRuntimeGateStillBlocked: true,
        verifiesExecutionPacketStillAbsent: true,
        rerunsLiveRead: false,
        startsUpstreamServices: false,
        stopsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        activeShardPrototypeEnabled: false,
        nextNodeVersionSuggested: "Node v392",
      },
      checks: {
        archiveFilesPresent: true,
        jsonEvidenceReadable: true,
        jsonProfileVersionValid: true,
        jsonPlanReady: true,
        jsonSourceNodeV389ArchiveVerified: true,
        jsonSourceNodeV388ReplayReady: true,
        jsonRuntimeGateClosed: true,
        jsonExecutionPacketNotApproved: true,
        jsonRuntimeGateArtifactsRequired: true,
        jsonPlanDigestStable: true,
        jsonChecksAllPassed: true,
        jsonPlanSummaryMatches: true,
        summaryMatchesJson: true,
        markdownRecordsRuntimeGatePlan: true,
        browserSnapshotPresent: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsRuntimeBoundaryAndChecks: true,
        codeWalkthroughPresent: true,
        sourcePlanPointsToV391ArchiveVerification: true,
        planIndexReferencesV390AndV391: true,
        archiveIndexReferencesV390: true,
        routeRecordedInArchive: true,
        replayReady: true,
        replayKeepsRuntimeGateClosed: true,
        replayKeepsExecutionPacketUnapproved: true,
        replayKeepsPlanArtifactsRequired: true,
        replayPreservesSourceEvidence: true,
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
        readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification: true,
      },
      summary: {
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
      },
    });
    expect(profile.sourceNodeV390.planDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("fails closed when the v390 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v391-empty-"));

    try {
      const profile = withForcedHistoricalFallback(() =>
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        }));

      expect(profile.archiveVerificationState).toBe("blocked");
      expect(profile.archiveVerificationDecision).toBe("blocked");
      expect(profile.readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification).toBe(false);
      expect(profile.readyForNodeV392RuntimeExecutionPacket).toBe(false);
      expect(profile.readyForRuntimeLiveReadGate).toBe(false);
      expect(profile.summary.presentArchiveFileCount).toBe(0);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "ARCHIVE_FILES_MISSING",
        "ARCHIVE_JSON_UNREADABLE",
        "SOURCE_V390_NOT_READY",
        "REPLAY_FAILED",
      ]));
      expect(profile.runtimeExecutionPacketPresent).toBe(false);
      expect(profile.runtimeGateApprovalPresent).toBe(false);
      expect(profile.concreteLoopbackPortsAssigned).toBe(false);
      expect(profile.rerunsLiveRead).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verification.v1",
        archiveVerificationState:
          "java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verified",
        activeNodeVersion: "Node v391",
        sourceNodeVersion: "Node v390",
        archiveVerificationOnly: true,
        readyForNodeV392RuntimeExecutionPacket: true,
        readyForRuntimeLiveReadGate: false,
        runtimeExecutionPacketPresent: false,
        runtimeGateApprovalPresent: false,
        concreteLoopbackPortsAssigned: false,
        rerunsLiveRead: false,
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
        "# Managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle runtime live-read gate plan archive verification",
      );
      expect(markdown.body).toContain(
        "Archive verification decision: archive-runtime-live-read-gate-plan-and-prepare-v392-runtime-execution-packet",
      );
      expect(markdown.body).toContain("Replay From Frozen Evidence");
      expect(markdown.body).toContain("readyForRuntimeLiveReadGate: false");
    } finally {
      await app.close();
      restoreEnv(previous);
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-391",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v391-runtime-live-read-gate-plan-archive",
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
