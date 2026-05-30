import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlan,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlan.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle runtime live-read gate plan", () => {
  it("writes a separate runtime live-read gate plan without opening runtime", () => {
    const profile = withForcedHistoricalFallback(() =>
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlan({
        config: loadTestConfig(),
      }));

    expect(profile).toMatchObject({
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
      sourceNodeV389: {
        sourceVersion: "Node v389",
        archiveVerificationState: "java-mini-kv-declared-operator-lifecycle-evidence-intake-archive-verified",
        archiveVerificationDecision: "archive-declared-operator-lifecycle-evidence-intake-and-prepare-v390-runtime-gate-plan",
        readyForDeclaredOperatorLifecycleEvidenceIntakeArchiveVerification: true,
        readyForNodeV390RuntimeGatePlan: true,
        readyForRuntimeLiveReadGate: false,
        activeNodeVersion: "Node v389",
        sourceNodeVersion: "Node v388",
        checkCount: 38,
        passedCheckCount: 38,
        sourceCheckCount: 45,
        sourcePassedCheckCount: 45,
        replayCheckCount: 45,
        replayPassedCheckCount: 45,
        declaredOperatorEvidenceSourceCount: 2,
        productionBlockerCount: 0,
        archiveVerificationOnly: true,
        rerunsLiveRead: false,
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
        activeShardPrototypeEnabled: false,
      },
      sourceNodeV389Replay: {
        replayState: "ready",
        readyForDeclaredOperatorLifecycleEvidenceIntakeArchiveVerification: true,
        readyForNodeV390RuntimeGatePlan: true,
        readyForRuntimeLiveReadGate: false,
        archiveVerificationOnly: true,
        sourceCheckCount: 45,
        sourcePassedCheckCount: 45,
        replayCheckCount: 45,
        replayPassedCheckCount: 45,
        checkCount: 38,
        passedCheckCount: 38,
        declaredOperatorEvidenceSourceCount: 2,
        productionBlockerCount: 0,
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
        activeShardPrototypeEnabled: false,
      },
      sourceNodeV388Replay: {
        replayState: "ready",
        readyForDeclaredOperatorLifecycleEvidenceIntake: true,
        readyForNodeV389ArchiveVerification: true,
        readyForRuntimeLiveReadGate: false,
        declaredOperatorLifecycleEvidencePresent: true,
        runtimeGateRequiresSeparateApproval: true,
        javaDeclaredOperatorLifecycleVersion: "Java v161",
        javaDeclaredPortCount: 1,
        javaGetOnlySmokeTargetCount: 4,
        javaStartupCommandDeclared: true,
        javaCleanupDeclared: true,
        javaFailClosedDeclared: true,
        javaNodeMayStartService: false,
        javaNodeMayStopService: false,
        miniKvDeclaredOperatorLifecycleReleaseVersion: "v152",
        miniKvDeclaredPortHandleCount: 1,
        miniKvRequiredBeforeRuntimeGateCount: 4,
        miniKvStartupCommandDeclared: true,
        miniKvCleanupResponsibilityDeclared: true,
        miniKvFailClosedBehaviorDeclared: true,
        miniKvRuntimeGateApproved: false,
        miniKvStartsServices: false,
        javaDeclaredOperatorLifecycleUsedHistoricalFallback: true,
        miniKvDeclaredOperatorLifecycleUsedHistoricalFallback: true,
        miniKvFrozenOperatorTemplateUsedHistoricalFallback: true,
        checkCount: 45,
        passedCheckCount: 45,
        productionBlockerCount: 0,
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
        activeShardPrototypeEnabled: false,
      },
      runtimeGatePlan: {
        planMode: "java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan",
        sourceSpan: "Node v389 + Node v388 + Java v161 + mini-kv v152",
        operatorApprovalRecordRequired: true,
        concreteLoopbackPortsRequired: true,
        getOnlySmokeCommandRequired: true,
        cleanupProofRequired: true,
        failClosedResultRequired: true,
        runtimeGateApprovalPresent: false,
        concreteLoopbackPortsAssigned: false,
        javaOperatorMustStartService: true,
        miniKvOperatorMustStartService: true,
        nodeMayStartJavaService: false,
        nodeMayStartMiniKvService: false,
        nodeMayStopJavaService: false,
        nodeMayStopMiniKvService: false,
        javaDeclaredPortHandles: ["8080"],
        miniKvDeclaredPortHandles: ["operator-approved-loopback-port"],
        javaGetOnlySmokeTargetCount: 4,
        miniKvGetOnlySmokeTargetDeclared: true,
        requiredBeforeRuntimeGate: [
          "operator approval record",
          "concrete loopback port assignment",
          "GET-only smoke command",
          "cleanup proof",
        ],
        liveReadGateAllowed: false,
        runtimeProbeAllowed: false,
        activeShardPrototypeEnabled: false,
        startsUpstreamServices: false,
        stopsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        nextNodeVersionSuggested: "Node v391",
        ready: true,
      },
      checks: {
        sourceNodeV389Ready: true,
        sourceNodeV389ArchiveVerified: true,
        sourceNodeV389ChecksAllPassed: true,
        sourceNodeV389BoundariesClosed: true,
        sourceNodeV389ReplayReady: true,
        sourceNodeV388DeclaredEvidenceReady: true,
        sourceNodeV388EvidenceVersionsMatch: true,
        sourceNodeV388UsesFrozenHistoricalSnapshots: true,
        javaLifecyclePlanComplete: true,
        javaStartupOwnershipDeclared: true,
        javaGetOnlySmokeDeclared: true,
        javaCleanupAndFailClosedDeclared: true,
        javaRuntimePrerequisitesContainRuntimeGate: true,
        miniKvLifecyclePlanComplete: true,
        miniKvStartupOwnershipDeclared: true,
        miniKvGetOnlySmokeDeclared: true,
        miniKvCleanupAndFailClosedDeclared: true,
        miniKvRequiresSeparateRuntimeGate: true,
        miniKvRuntimeGateStillBlocked: true,
        runtimeApprovalRecordRequired: true,
        concreteLoopbackPortsRequired: true,
        getOnlySmokeCommandRequired: true,
        cleanupProofRequired: true,
        runtimeGatePlanDoesNotApproveRuntime: true,
        runtimeProbeStillBlocked: true,
        liveReadGateStillBlocked: true,
        noAutomaticUpstreamStartStop: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        activeShardPrototypeStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        planDigestStable: true,
        readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlan: true,
      },
      summary: {
        checkCount: 36,
        passedCheckCount: 36,
        requiredRuntimeGateArtifactCount: 4,
        declaredOperatorEvidenceSourceCount: 2,
        javaDeclaredPortCount: 1,
        miniKvDeclaredPortHandleCount: 1,
        javaGetOnlySmokeTargetCount: 4,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV389.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.runtimeGatePlan.planDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when the Node v389 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v390-empty-"));

    try {
      const profile = withForcedHistoricalFallback(() =>
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlan({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        }));

      expect(profile.planState).toBe("blocked");
      expect(profile.planDecision).toBe("blocked");
      expect(profile.readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlan).toBe(false);
      expect(profile.readyForNodeV391ArchiveVerification).toBe(false);
      expect(profile.readyForRuntimeLiveReadGate).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "SOURCE_NODE_V389_NOT_READY",
        "SOURCE_NODE_V389_ARCHIVE_NOT_VERIFIED",
        "SOURCE_NODE_V389_REPLAY_FAILED",
      ]));
      expect(profile.runtimeGateApprovalPresent).toBe(false);
      expect(profile.concreteLoopbackPortsAssigned).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan.v1",
        planState: "java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-ready",
        activeNodeVersion: "Node v390",
        sourceNodeVersion: "Node v389",
        runtimeGatePlanOnly: true,
        readyForRuntimeLiveReadGate: false,
        runtimeGateApprovalPresent: false,
        concreteLoopbackPortsAssigned: false,
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
        activeShardPrototypeEnabled: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle runtime live-read gate plan",
      );
      expect(markdown.body).toContain(
        "Plan decision: write-separate-runtime-live-read-gate-plan-after-v389-archive-verification",
      );
      expect(markdown.body).toContain("Runtime Live Read Gate Plan");
      expect(markdown.body).toContain("Ready for runtime live-read gate: false");
    } finally {
      await app.close();
      restoreEnv(previous);
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-390",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v390-runtime-live-read-gate-plan",
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
