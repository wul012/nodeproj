import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../../src/app.js";
import { loadConfig } from "../../src/config.js";
import {
  loadServiceIntake,
} from "../../src/services/operatorLifecycle/serviceIntake.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-operator-service-lifecycle-evidence-intake";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv operator service lifecycle evidence intake", () => {
  it("consumes Java v160 and mini-kv v151 lifecycle evidence without opening the runtime gate", () => {
    const profile = withForcedHistoricalFallback(() =>
      loadServiceIntake({
        config: loadTestConfig(),
      }));

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-operator-service-lifecycle-evidence-intake.v1",
      intakeState: "java-mini-kv-operator-service-lifecycle-evidence-intake-ready",
      intakeDecision: "consume-java-v160-and-mini-kv-v151-operator-service-lifecycle-evidence",
      readyForOperatorServiceLifecycleEvidenceIntake: true,
      readyForNodeV387ArchiveVerification: true,
      readyForRuntimeLiveReadGate: false,
      activeNodeVersion: "Node v386",
      sourceNodeVersion: "Node v385",
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
      sourceNodeV385: {
        sourceVersion: "Node v385",
        archiveVerificationState: "java-mini-kv-live-read-gate-plan-intake-archive-verified",
        archiveVerificationDecision: "archive-live-read-gate-plan-intake-and-prepare-v386",
        readyForLiveReadGatePlanIntakeArchiveVerification: true,
        readyForNodeV386ServiceLifecycleEvidenceOrRuntimeGate: true,
        activeNodeVersion: "Node v385",
        sourceNodeVersion: "Node v384",
        sourceCheckCount: 46,
        sourcePassedCheckCount: 46,
        replayCheckCount: 46,
        replayPassedCheckCount: 46,
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
      javaOperatorServiceLifecycleFile: {
        id: "java-v160-operator-service-lifecycle",
        exists: true,
        usedHistoricalFallback: true,
      },
      miniKvOperatorServiceLifecycleTemplateFile: {
        id: "mini-kv-v151-operator-service-lifecycle-template",
        exists: true,
        usedHistoricalFallback: true,
      },
      miniKvFrozenLiveReadGatePlanFile: {
        id: "mini-kv-v150-frozen-live-read-gate-plan",
        exists: true,
        usedHistoricalFallback: true,
      },
      javaOperatorServiceLifecycle: {
        project: "advanced-order-platform",
        version: "Java v160",
        readOnly: true,
        executionAllowed: false,
        operatorOwned: true,
        runtimeProbeAllowed: false,
        nodeMayStartService: false,
        nodeMayStopService: false,
        sourceGatePlanVersion: "Java v159",
        lastVerifiedByNodeVersion: "Node v385",
        nextNodeConsumerHint: "Node v386",
        javaServiceOwner: "java-service-operator-placeholder",
        javaStartOwner: "java-service-operator-placeholder",
        javaStopOwner: "java-service-operator-placeholder",
        javaPortDeclaration: "operator-declared-port-before-window",
        javaBaseUrlTemplate: "http://127.0.0.1:{java-port}",
        status: "passed",
      },
      miniKvOperatorServiceLifecycleTemplate: {
        project: "mini-kv",
        contract: "shard-readiness.v1",
        releaseVersion: "v151",
        readOnly: true,
        executionAllowed: false,
        shardEnabled: false,
        status: "operator-service-lifecycle-template-read-only",
        previousConsumedReleaseVersion: "v150",
        previousConsumedFixturePath: "fixtures/release/shard-readiness-v150.json",
        previousConsumptionNodeVersion: "Node v386 pending operator-owned service lifecycle evidence",
        rollingCurrentUsedForHistoricalBaseline: false,
        nodeV385ArchiveVerificationPreserved: true,
        nodeV386ReadsUnfinishedUpstream: false,
        liveReadGatePlanFreezeFrozenReleaseVersion: "v150",
        liveReadGatePlanFreezeFrozenFixturePath: "fixtures/release/shard-readiness-v150.json",
        liveReadGatePlanFreezePreservesLiveReadGatePlan: true,
        frozenLiveReadGateAllowed: false,
        frozenRuntimeProbeAllowed: false,
        frozenStartsServices: false,
        frozenRouterActivationAllowed: false,
        frozenWriteRoutingAllowed: false,
        frozenExecutionAllowed: false,
        operatorEvidenceMode: "template-only-no-runtime",
        operatorSourceFrozenReleaseVersion: "v150",
        operatorSourceFrozenFixturePath: "fixtures/release/shard-readiness-v150.json",
        operatorOwnedServiceLifecycleRequired: true,
        serviceOwnerDeclared: false,
        startupCommandDeclared: false,
        portListDeclared: false,
        getOnlySmokeTargetDeclared: false,
        failClosedBehaviorRequired: true,
        cleanupResponsibilityDeclared: false,
        operatorStartsServices: false,
        operatorRuntimeProbeAllowed: false,
        operatorLiveReadAllowed: false,
        operatorRouterActivationAllowed: false,
        operatorWriteRoutingAllowed: false,
        operatorExecutionAllowed: false,
      },
      miniKvFrozenLiveReadGatePlan: {
        project: "mini-kv",
        releaseVersion: "v150",
        readOnly: true,
        executionAllowed: false,
        shardEnabled: false,
        status: "live-read-gate-prerequisite-read-only",
        liveReadGatePlanMode: "service-lifecycle-prerequisite-only",
        liveReadGateAllowed: false,
        runtimeProbeAllowed: false,
        startsServices: false,
        routerActivationAllowed: false,
        writeRoutingAllowed: false,
        liveReadGateExecutionAllowed: false,
      },
      intake: {
        intakeMode: "java-mini-kv-operator-service-lifecycle-evidence-intake",
        sourceSpan: "Node v385 + Java v160 + mini-kv v151",
        usesFrozenJavaV160OperatorLifecycleEvidence: true,
        usesFrozenMiniKvV151LifecycleTemplate: true,
        verifiesMiniKvV150LiveReadGatePlanFreeze: true,
        javaOperatorLifecycleEvidencePresent: true,
        miniKvLifecycleTemplateOnly: true,
        runtimeGateStillBlocked: true,
        consumesRollingCurrentAsHistoricalBaseline: false,
        liveReadGateAllowed: false,
        runtimeProbeAllowed: false,
        activeShardPrototypeEnabled: false,
        startsUpstreamServices: false,
        stopsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        nextNodeVersionSuggested: "Node v387",
        ready: true,
      },
      checks: {
        sourceNodeV385Ready: true,
        sourceNodeV385ArchiveVerified: true,
        sourceNodeV385ChecksAllPassed: true,
        sourceNodeV385BoundariesClosed: true,
        javaV160FilePresent: true,
        javaV160VersionValid: true,
        javaV160ReadOnly: true,
        javaV160ExecutionBlocked: true,
        javaV160OperatorOwned: true,
        javaV160RuntimeProbeBlocked: true,
        javaV160NodeLifecycleBlocked: true,
        javaV160ReferencesV159AndNodeV385: true,
        javaV160OwnerAndPortPlaceholdersPresent: true,
        javaV160OperatorPrerequisitesComplete: true,
        javaV160SmokeTargetsReadOnlyGet: true,
        javaV160FailClosedRulesComplete: true,
        javaV160CleanupResponsibilitiesSafe: true,
        javaV160StopConditionsSafe: true,
        javaV160StatusPassed: true,
        miniKvV151FilePresent: true,
        miniKvV151ReleaseVersionValid: true,
        miniKvV151ReadOnly: true,
        miniKvV151ExecutionBlocked: true,
        miniKvV151ShardDisabled: true,
        miniKvV151StatusAccepted: true,
        miniKvV151BoundarySafe: true,
        miniKvV151HistoricalFallbackSafe: true,
        miniKvV151PreservesNodeV385Archive: true,
        miniKvV151LiveReadGatePlanFreezeSafe: true,
        miniKvV151OperatorTemplateRequiresEvidence: true,
        miniKvV151OperatorTemplateNotRuntimeReady: true,
        miniKvV151NoRollingCurrentBaseline: true,
        miniKvV150FrozenGatePlanPresent: true,
        miniKvV150FrozenGatePlanSafe: true,
        allEvidenceUsesHistoricalFallbackSnapshots: true,
        runtimeGateStillBlocked: true,
        intakeDigestStable: true,
        noAutomaticUpstreamStartStop: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForOperatorServiceLifecycleEvidenceIntake: true,
      },
      summary: {
        evidenceSourceCount: 3,
        readyEvidenceSourceCount: 3,
        javaSmokeTargetCount: 4,
        miniKvArchivedNodeVersionCount: 16,
        requiredOperatorEvidenceCount: 6,
        declaredMiniKvOperatorEvidenceCount: 0,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV385.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.intake.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.javaOperatorServiceLifecycleFile.resolvedPath).toContain("fixtures");
    expect(profile.miniKvOperatorServiceLifecycleTemplateFile.configuredPath).toContain("shard-readiness-v151.json");
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("fails closed when the Node v385 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v386-empty-"));

    try {
      const profile = withForcedHistoricalFallback(() =>
        loadServiceIntake({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        }));

      expect(profile.intakeState).toBe("blocked");
      expect(profile.intakeDecision).toBe("blocked");
      expect(profile.readyForOperatorServiceLifecycleEvidenceIntake).toBe(false);
      expect(profile.readyForNodeV387ArchiveVerification).toBe(false);
      expect(profile.readyForRuntimeLiveReadGate).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "SOURCE_NODE_V385_NOT_READY",
        "SOURCE_NODE_V385_ARCHIVE_NOT_VERIFIED",
        "SOURCE_NODE_V385_CHECKS_NOT_PASSED",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-operator-service-lifecycle-evidence-intake.v1",
        intakeState: "java-mini-kv-operator-service-lifecycle-evidence-intake-ready",
        activeNodeVersion: "Node v386",
        sourceNodeVersion: "Node v385",
        evidenceIntakeOnly: true,
        readyForRuntimeLiveReadGate: false,
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
        "# Managed audit manual sandbox connection credential resolver Java/mini-kv operator service lifecycle evidence intake",
      );
      expect(markdown.body).toContain(
        "Intake decision: consume-java-v160-and-mini-kv-v151-operator-service-lifecycle-evidence",
      );
      expect(markdown.body).toContain("Java v160 Operator Service Lifecycle");
      expect(markdown.body).toContain("mini-kv v151 Operator Service Lifecycle Template");
      expect(markdown.body).toContain("Runtime probe allowed: false");
    } finally {
      await app.close();
      restoreEnv(previous);
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-386",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v386-operator-service-lifecycle-evidence-intake",
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
