import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntake.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-live-read-gate-plan-intake";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv live-read gate plan intake", () => {
  it("consumes Java v159 and mini-kv v150 frozen gate-plan evidence without opening live read", () => {
    const profile = withForcedHistoricalFallback(() =>
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntake({
        config: loadTestConfig(),
      }));

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-live-read-gate-plan-intake.v1",
      intakeState: "java-mini-kv-live-read-gate-plan-intake-ready",
      intakeDecision: "consume-java-v159-and-mini-kv-v150-live-read-gate-plan-evidence",
      readyForJavaMiniKvLiveReadGatePlanIntake: true,
      readyForNodeV385ArchiveVerification: true,
      activeNodeVersion: "Node v384",
      sourceNodeVersion: "Node v383",
      evidenceIntakeOnly: true,
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
      sourceNodeV383: {
        sourceVersion: "Node v383",
        archiveVerificationState: "java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verified",
        archiveVerificationDecision: "archive-active-shard-plan-boundary-handoff-intake-and-prepare-v384",
        readyForActiveShardPlanBoundaryHandoffIntakeArchiveVerification: true,
        readyForNodeV384NextBoundaryEvidenceOrLiveGate: true,
        activeNodeVersion: "Node v383",
        sourceNodeVersion: "Node v382",
        sourceCheckCount: 39,
        sourcePassedCheckCount: 39,
        replayCheckCount: 39,
        replayPassedCheckCount: 39,
        productionBlockerCount: 0,
        archiveVerificationOnly: true,
        rerunsLiveRead: false,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        connectsManagedAudit: false,
        executionAllowed: false,
        activeShardPrototypeEnabled: false,
      },
      javaLiveReadGatePlanFile: {
        id: "java-v159-live-read-gate-plan",
        exists: true,
        usedHistoricalFallback: true,
      },
      miniKvLiveReadGatePlanFile: {
        id: "mini-kv-v150-live-read-gate-plan",
        exists: true,
        usedHistoricalFallback: true,
      },
      miniKvFrozenConsumerHandoffFile: {
        id: "mini-kv-v149-frozen-consumer-handoff",
        exists: true,
        usedHistoricalFallback: true,
      },
      javaLiveReadGatePlan: {
        project: "advanced-order-platform",
        version: "Java v159",
        readOnly: true,
        executionAllowed: false,
        liveReadGateAllowed: false,
        serviceStartAllowedByNode: false,
        serviceStopAllowedByNode: false,
        failClosedRequired: true,
        sourceBoundaryHandoffVersion: "Java v158",
        lastVerifiedByNodeVersion: "Node v383",
        nextNodeConsumerHint: "Node v384",
        status: "passed",
      },
      miniKvLiveReadGatePlan: {
        project: "mini-kv",
        contract: "shard-readiness.v1",
        releaseVersion: "v150",
        readOnly: true,
        executionAllowed: false,
        shardEnabled: false,
        status: "live-read-gate-prerequisite-read-only",
        consumerHandoffMode: "frozen-evidence-only",
        consumerFrozenReleaseVersion: "v149",
        consumerFrozenFixturePath: "fixtures/release/shard-readiness-v149.json",
        readyForNodeConsumption: true,
        liveReadGateRequiredBeforeRuntimeProbe: true,
        consumerStartsServices: false,
        consumerActiveShardPrototypeEnabled: false,
        consumerRouterActivationAllowed: false,
        consumerWriteRoutingAllowed: false,
        consumerExecutionAllowed: false,
        liveReadGatePlanMode: "service-lifecycle-prerequisite-only",
        liveReadGateAllowed: false,
        runtimeProbeAllowed: false,
        liveReadGateStartsServices: false,
        requiresServiceOwner: true,
        requiresPortList: true,
        requiresSmokeTarget: true,
        requiresFailClosedBehavior: true,
        requiresCleanup: true,
        liveReadGateRouterActivationAllowed: false,
        liveReadGateWriteRoutingAllowed: false,
        liveReadGateExecutionAllowed: false,
        previousConsumedReleaseVersion: "v149",
        previousConsumedFixturePath: "fixtures/release/shard-readiness-v149.json",
        rollingCurrentUsedForHistoricalBaseline: false,
        nodeV383ArchiveVerificationPreserved: true,
        nodeV384ReadsUnfinishedUpstream: false,
        changesArchivedNodeEvidence: false,
      },
      miniKvFrozenConsumerHandoff: {
        project: "mini-kv",
        releaseVersion: "v149",
        readOnly: true,
        executionAllowed: false,
        shardEnabled: false,
        status: "frozen-evidence-handoff-read-only",
        consumerHandoffMode: "frozen-evidence-only",
        consumerFrozenReleaseVersion: "v148",
        readyForNodeConsumption: true,
        liveReadGateRequiredBeforeRuntimeProbe: true,
        consumerStartsServices: false,
        consumerActiveShardPrototypeEnabled: false,
        consumerRouterActivationAllowed: false,
        consumerWriteRoutingAllowed: false,
        consumerExecutionAllowed: false,
      },
      intake: {
        intakeMode: "java-mini-kv-live-read-gate-plan-intake",
        sourceSpan: "Node v383 + Java v159 + mini-kv v150",
        usesFrozenJavaV159LiveReadGatePlan: true,
        usesFrozenMiniKvV150LiveReadGatePlan: true,
        verifiesMiniKvV149FrozenConsumerHandoff: true,
        consumesRollingCurrentAsHistoricalBaseline: false,
        liveReadGateAllowed: false,
        runtimeProbeAllowed: false,
        activeShardPrototypeEnabled: false,
        startsUpstreamServices: false,
        stopsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        nextNodeVersionSuggested: "Node v385",
        ready: true,
      },
      checks: {
        sourceNodeV383Ready: true,
        sourceNodeV383ArchiveVerified: true,
        sourceNodeV383ChecksAllPassed: true,
        sourceNodeV383BoundariesClosed: true,
        javaV159FilePresent: true,
        javaV159VersionValid: true,
        javaV159ReadOnly: true,
        javaV159ExecutionBlocked: true,
        javaV159LiveReadGateClosed: true,
        javaV159ServiceLifecycleNotOwnedByNode: true,
        javaV159FailClosedRequired: true,
        javaV159ReferencesV158AndNodeV383: true,
        javaV159OwnershipFieldsComplete: true,
        javaV159LifecyclePlanSafe: true,
        javaV159SmokeTargetsReadOnlyGet: true,
        javaV159FailClosedRulesComplete: true,
        javaV159CleanupResponsibilitiesSafe: true,
        javaV159StopConditionsSafe: true,
        javaV159StatusPassed: true,
        miniKvV150FilePresent: true,
        miniKvV150ReleaseVersionValid: true,
        miniKvV150ReadOnly: true,
        miniKvV150ExecutionBlocked: true,
        miniKvV150ShardDisabled: true,
        miniKvV150StatusAccepted: true,
        miniKvV150BoundarySafe: true,
        miniKvV150ConsumerHandoffReady: true,
        miniKvV150LiveReadGatePlanPrerequisiteOnly: true,
        miniKvV150RequiresServicePlanFields: true,
        miniKvV150ActivePlanStillDisabled: true,
        miniKvV150ActivePlanFreezeSafe: true,
        miniKvV150HistoricalFallbackSafe: true,
        miniKvV150PreservesNodeV383Archive: true,
        miniKvV150NoRollingCurrentBaseline: true,
        miniKvV149FrozenConsumerEvidencePresent: true,
        miniKvV149FrozenConsumerEvidenceSafe: true,
        allEvidenceUsesHistoricalFallbackSnapshots: true,
        intakeDigestStable: true,
        noAutomaticUpstreamStartStop: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForJavaMiniKvLiveReadGatePlanIntake: true,
      },
      summary: {
        evidenceSourceCount: 3,
        readyEvidenceSourceCount: 3,
        javaOwnershipFieldCount: 6,
        javaSmokeTargetCount: 4,
        miniKvArchivedNodeVersionCount: 14,
        miniKvRequiredBeforeLiveReadCount: 6,
        checkCount: 46,
        passedCheckCount: 46,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV383.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.intake.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.javaLiveReadGatePlanFile.resolvedPath).toContain("fixtures");
    expect(profile.miniKvLiveReadGatePlanFile.configuredPath).toContain("shard-readiness-v150.json");
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("fails closed when the Node v383 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v384-empty-"));

    try {
      const profile = withForcedHistoricalFallback(() =>
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntake({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        }));

      expect(profile.intakeState).toBe("blocked");
      expect(profile.intakeDecision).toBe("blocked");
      expect(profile.readyForJavaMiniKvLiveReadGatePlanIntake).toBe(false);
      expect(profile.readyForNodeV385ArchiveVerification).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "SOURCE_NODE_V383_NOT_READY",
        "SOURCE_NODE_V383_ARCHIVE_NOT_VERIFIED",
        "SOURCE_NODE_V383_CHECKS_NOT_PASSED",
      ]));
      expect(profile.liveReadGateAllowed).toBe(false);
      expect(profile.runtimeProbeAllowed).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-live-read-gate-plan-intake.v1",
        intakeState: "java-mini-kv-live-read-gate-plan-intake-ready",
        activeNodeVersion: "Node v384",
        sourceNodeVersion: "Node v383",
        evidenceIntakeOnly: true,
        liveReadGateAllowed: false,
        runtimeProbeAllowed: false,
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
        "# Managed audit manual sandbox connection credential resolver Java/mini-kv live-read gate plan intake",
      );
      expect(markdown.body).toContain(
        "Intake decision: consume-java-v159-and-mini-kv-v150-live-read-gate-plan-evidence",
      );
      expect(markdown.body).toContain("Java v159 Live Read Gate Plan");
      expect(markdown.body).toContain("mini-kv v150 Live Read Gate Plan");
      expect(markdown.body).toContain("Runtime probe allowed: false");
    } finally {
      await app.close();
      restoreEnv(previous);
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-384",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v384-live-read-gate-plan-intake",
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
