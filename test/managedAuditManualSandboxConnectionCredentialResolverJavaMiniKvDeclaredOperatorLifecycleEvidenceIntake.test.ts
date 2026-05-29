import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntake.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-evidence-intake";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle evidence intake", () => {
  it("consumes Java v161 and mini-kv v152 declared lifecycle evidence without opening runtime", () => {
    const profile = withForcedHistoricalFallback(() =>
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntake({
        config: loadTestConfig(),
      }));

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-evidence-intake.v1",
      intakeState: "java-mini-kv-declared-operator-lifecycle-evidence-intake-ready",
      intakeDecision: "consume-java-v161-and-mini-kv-v152-declared-operator-lifecycle-evidence",
      readyForDeclaredOperatorLifecycleEvidenceIntake: true,
      readyForNodeV389ArchiveVerification: true,
      readyForRuntimeLiveReadGate: false,
      activeNodeVersion: "Node v388",
      sourceNodeVersion: "Node v387",
      evidenceIntakeOnly: true,
      declaredOperatorLifecycleEvidencePresent: true,
      runtimeGateRequiresSeparateApproval: true,
      liveReadGateAllowed: false,
      runtimeProbeAllowed: false,
      startsJavaService: false,
      startsMiniKvService: false,
      stopsJavaService: false,
      stopsMiniKvService: false,
      executionAllowed: false,
      activeShardPrototypeEnabled: false,
      sourceNodeV387: {
        sourceVersion: "Node v387",
        archiveVerificationState: "java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verified",
        archiveVerificationDecision: "archive-operator-service-lifecycle-evidence-intake-and-prepare-v388",
        readyForOperatorServiceLifecycleEvidenceIntakeArchiveVerification: true,
        readyForNodeV388DeclaredOperatorEvidenceOrRuntimeGate: true,
        readyForRuntimeLiveReadGate: false,
        activeNodeVersion: "Node v387",
        sourceNodeVersion: "Node v386",
        sourceCheckCount: 45,
        sourcePassedCheckCount: 45,
        replayCheckCount: 45,
        replayPassedCheckCount: 45,
        declaredMiniKvOperatorEvidenceCount: 0,
        productionBlockerCount: 0,
      },
      javaDeclaredOperatorLifecycle: {
        project: "advanced-order-platform",
        version: "Java v161",
        readOnly: true,
        executionAllowed: false,
        operatorOwned: true,
        operatorLifecycleDeclared: true,
        startupCommandDeclared: true,
        portDeclared: true,
        getOnlySmokeDeclared: true,
        cleanupDeclared: true,
        failClosedDeclared: true,
        runtimeProbeAllowed: false,
        nodeMayStartService: false,
        nodeMayStopService: false,
        sourceLifecycleEvidenceVersion: "Java v160",
        lastVerifiedByNodeVersion: "Node v387",
        nextNodeConsumerHint: "Node v388",
        javaServiceOwner: "java-platform-operator",
        javaStartOwner: "java-platform-operator",
        javaStopOwner: "java-platform-operator",
        declaredWorkingDirectory: "advanced-order-platform",
        javaBaseUrlHandle: "java-local-readonly-base-url",
        status: "passed",
      },
      miniKvDeclaredOperatorLifecycle: {
        project: "mini-kv",
        releaseVersion: "v152",
        readOnly: true,
        executionAllowed: false,
        shardEnabled: false,
        status: "declared-operator-lifecycle-no-runtime-read-only",
        previousConsumedReleaseVersion: "v151",
        previousConsumedFixturePath: "fixtures/release/shard-readiness-v151.json",
        previousConsumptionNodeVersion: "Node v388 pending separate runtime gate approval",
        nodeV387ArchiveVerificationPreserved: true,
        nodeV388ReadsUnfinishedUpstream: false,
        operatorEvidenceMode: "declared-lifecycle-no-runtime",
        operatorSourceFrozenReleaseVersion: "v151",
        operatorSourceFrozenFixturePath: "fixtures/release/shard-readiness-v151.json",
        operatorOwnedServiceLifecycleDeclared: true,
        serviceOwnerDeclared: true,
        serviceOwnerHandle: "mini-kv-local-operator",
        startupCommandDeclared: true,
        portListDeclared: true,
        getOnlySmokeTargetDeclared: true,
        failClosedBehaviorDeclared: true,
        cleanupResponsibilityDeclared: true,
        runtimeGateApproved: false,
        startsServices: false,
        runtimeProbeAllowed: false,
        liveReadAllowed: false,
        activeShardPrototypeEnabled: false,
        routerActivationAllowed: false,
        writeRoutingAllowed: false,
        operatorExecutionAllowed: false,
        requiresSeparateRuntimeGate: true,
      },
      miniKvFrozenOperatorTemplate: {
        project: "mini-kv",
        releaseVersion: "v151",
        readOnly: true,
        executionAllowed: false,
        shardEnabled: false,
        status: "operator-service-lifecycle-template-read-only",
        operatorEvidenceMode: "template-only-no-runtime",
        serviceOwnerDeclared: false,
        runtimeProbeAllowed: false,
      },
      intake: {
        intakeMode: "java-mini-kv-declared-operator-lifecycle-evidence-intake",
        sourceSpan: "Node v387 + Java v161 + mini-kv v152",
        usesFrozenJavaV161DeclaredLifecycleEvidence: true,
        usesFrozenMiniKvV152DeclaredLifecycleEvidence: true,
        verifiesMiniKvV151OperatorTemplateFreeze: true,
        javaDeclaredOperatorLifecyclePresent: true,
        miniKvDeclaredOperatorLifecyclePresent: true,
        miniKvRuntimeGateApproved: false,
        runtimeGateStillBlocked: true,
        startsUpstreamServices: false,
        stopsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        nextNodeVersionSuggested: "Node v389",
        ready: true,
      },
      checks: {
        sourceNodeV387Ready: true,
        sourceNodeV387ArchiveVerified: true,
        sourceNodeV387ChecksAllPassed: true,
        javaV161DeclaredLifecycleComplete: true,
        miniKvV152DeclaredLifecycleComplete: true,
        miniKvV152RuntimeGateStillBlocked: true,
        miniKvV152RequiresSeparateRuntimeGate: true,
        miniKvV151FrozenTemplateSafe: true,
        allEvidenceUsesHistoricalFallbackSnapshots: true,
        runtimeGateStillBlocked: true,
        readyForDeclaredOperatorLifecycleEvidenceIntake: true,
      },
      summary: {
        evidenceSourceCount: 3,
        readyEvidenceSourceCount: 3,
        javaSmokeTargetCount: 4,
        javaDeclaredPortCount: 1,
        miniKvArchivedNodeVersionCount: 18,
        miniKvDeclaredPortHandleCount: 1,
        miniKvRequiredBeforeRuntimeGateCount: 4,
        declaredOperatorEvidenceSourceCount: 2,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV387.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.intake.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.javaDeclaredOperatorLifecycleFile.usedHistoricalFallback).toBe(true);
    expect(profile.miniKvDeclaredOperatorLifecycleFile.configuredPath).toContain("shard-readiness-v152.json");
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when the Node v387 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v388-empty-"));

    try {
      const profile = withForcedHistoricalFallback(() =>
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntake({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        }));

      expect(profile.intakeState).toBe("blocked");
      expect(profile.intakeDecision).toBe("blocked");
      expect(profile.readyForDeclaredOperatorLifecycleEvidenceIntake).toBe(false);
      expect(profile.readyForRuntimeLiveReadGate).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "SOURCE_NODE_V387_NOT_READY",
        "SOURCE_NODE_V387_ARCHIVE_NOT_VERIFIED",
      ]));
      expect(profile.startsJavaService).toBe(false);
      expect(profile.startsMiniKvService).toBe(false);
      expect(profile.executionAllowed).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-evidence-intake.v1",
        intakeState: "java-mini-kv-declared-operator-lifecycle-evidence-intake-ready",
        activeNodeVersion: "Node v388",
        sourceNodeVersion: "Node v387",
        evidenceIntakeOnly: true,
        declaredOperatorLifecycleEvidencePresent: true,
        readyForRuntimeLiveReadGate: false,
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle evidence intake",
      );
      expect(markdown.body).toContain(
        "Intake decision: consume-java-v161-and-mini-kv-v152-declared-operator-lifecycle-evidence",
      );
      expect(markdown.body).toContain("mini-kv v152 Declared Operator Lifecycle");
      expect(markdown.body).toContain("Ready for runtime live-read gate: false");
    } finally {
      await app.close();
      restoreEnv(previous);
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-388",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v388-declared-operator-lifecycle-evidence-intake",
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
