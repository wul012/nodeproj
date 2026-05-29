import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntake.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-boundary-handoff-intake";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv active shard plan boundary handoff intake", () => {
  it("consumes Java v158 and mini-kv v149 frozen boundary handoff evidence", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntake({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-boundary-handoff-intake.v1",
      intakeState: "java-mini-kv-active-shard-plan-boundary-handoff-intake-ready",
      intakeDecision: "consume-java-v158-and-mini-kv-v149-boundary-handoff-evidence",
      readyForActiveShardPlanBoundaryHandoffIntake: true,
      readyForNodeV383ArchiveVerification: true,
      activeNodeVersion: "Node v382",
      sourceNodeVersion: "Node v381",
      evidenceIntakeOnly: true,
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
      sourceNodeV381: {
        sourceVersion: "Node v381",
        archiveVerificationState: "java-mini-kv-active-shard-plan-evidence-intake-archive-verified",
        archiveVerificationDecision: "archive-active-shard-plan-evidence-intake-and-prepare-v381",
        readyForActiveShardPlanEvidenceIntakeArchiveVerification: true,
        readyForNodeV381NextArchiveVerification: true,
        activeNodeVersion: "Node v381",
        sourceNodeVersion: "Node v380",
        checkCount: 33,
        passedCheckCount: 33,
        productionBlockerCount: 0,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        connectsManagedAudit: false,
        executionAllowed: false,
        activeShardPrototypeEnabled: false,
      },
      javaHandoff: {
        project: "advanced-order-platform",
        version: "Java v158",
        readOnly: true,
        executionAllowed: false,
        activeShardPrototypeEnabled: false,
        liveReadAllowed: false,
        sourceHandoffVersion: "Java v157",
        lastConsumedByNodeVersion: "Node v380",
        nodeArchiveVerificationVersion: "Node v381",
        javaRole: "read-only-active-shard-plan-boundary-handoff",
        activePrototypeAuthority: "mini-kv-active-prototype-plan",
        status: "passed",
      },
      miniKvHandoff: {
        project: "mini-kv",
        contract: "shard-readiness.v1",
        releaseVersion: "v149",
        readOnly: true,
        executionAllowed: false,
        shardEnabled: false,
        shardCount: 1,
        slotCount: 16,
        routingMode: "single-shard-readiness-prototype",
        status: "frozen-evidence-handoff-read-only",
        writeCommandsAllowed: false,
        adminCommandsAllowed: false,
        loadRestoreCompactAllowed: false,
        setnxexExecutionAllowed: false,
        activeRouterInstalled: false,
        storageDirectoriesCreated: false,
        multiProcessStarted: false,
        archivedNodeEvidenceMutated: false,
        activeShardPrototypeAllowed: false,
        routerActivationAllowed: false,
        shardDirectoryCreationAllowed: false,
        multiProcessStartAllowed: false,
        writeRoutingAllowed: false,
        activePlanFreezeFrozenReleaseVersion: "v148",
        activePlanFreezeFrozenFixturePath: "fixtures/release/shard-readiness-v148.json",
        consumerHandoffMode: "frozen-evidence-only",
        consumerFrozenReleaseVersion: "v148",
        consumerFrozenFixturePath: "fixtures/release/shard-readiness-v148.json",
        readyForNodeConsumption: true,
        liveReadGateRequiredBeforeRuntimeProbe: true,
        consumerStartsServices: false,
        consumerActiveShardPrototypeEnabled: false,
        consumerRouterActivationAllowed: false,
        consumerWriteRoutingAllowed: false,
        consumerExecutionAllowed: false,
        previousConsumedReleaseVersion: "v148",
        previousConsumedFixturePath: "fixtures/release/shard-readiness-v148.json",
        previousConsumptionNodeVersion: "Node v382 pending completed evidence intake",
        rollingCurrentUsedForHistoricalBaseline: false,
        nodeV381ArchiveVerificationPreserved: true,
        nodeV382ReadsUnfinishedUpstream: false,
        changesArchivedNodeEvidence: false,
      },
      miniKvFrozenPlan: {
        project: "mini-kv",
        releaseVersion: "v148",
        readOnly: true,
        executionAllowed: false,
        status: "active-prototype-plan-frozen-read-only",
        activeShardPrototypeAllowed: false,
        routerActivationAllowed: false,
        writeRoutingAllowed: false,
        rollingCurrentUsedForFrozenBaseline: false,
      },
      checks: {
        sourceNodeV381Ready: true,
        sourceNodeV381ArchiveVerified: true,
        sourceNodeV381BoundariesClosed: true,
        javaV158HandoffFilePresent: true,
        javaV158VersionValid: true,
        javaV158ReadOnly: true,
        javaV158ExecutionBlocked: true,
        javaV158ActivePrototypeDisabled: true,
        javaV158LiveReadDisabled: true,
        javaV158StatusPassed: true,
        javaV158SourceReferencesV157: true,
        javaV158ReferencesNodeV380AndV381: true,
        javaV158BoundaryRulesSafe: true,
        javaV158StopConditionsSafe: true,
        miniKvV149HandoffFilePresent: true,
        miniKvV149ReleaseVersionValid: true,
        miniKvV149ReadOnly: true,
        miniKvV149ExecutionBlocked: true,
        miniKvV149StatusAccepted: true,
        miniKvV149ConsumerHandoffReady: true,
        miniKvV149ConsumerHandoffRequiresLiveGate: true,
        miniKvV149BoundarySafe: true,
        miniKvV149ActivePrototypeStillDisabled: true,
        miniKvV149ActivePlanFreezeSafe: true,
        miniKvV149HistoricalFallbackSafe: true,
        miniKvV149PreservesNodeV381Path: true,
        miniKvV148FrozenPlanFilePresent: true,
        miniKvV148FrozenPlanValid: true,
        allEvidenceUsesHistoricalFallbackSnapshots: true,
        intakeDigestStable: true,
        noRollingCurrentHistoricalBaseline: true,
        noAutomaticUpstreamStartStop: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForActiveShardPlanBoundaryHandoffIntake: true,
      },
      summary: {
        evidenceSourceCount: 3,
        readyEvidenceSourceCount: 3,
        javaBoundaryRuleCount: 5,
        miniKvArchivedNodeVersionCount: 12,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV381.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.javaHandoffFile.digest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.miniKvHandoffFile.digest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.miniKvFrozenPlanFile.digest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.intake.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.javaHandoffFile.resolvedPath.replace(/\\/g, "/"))
      .toContain("fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/158/evidence/java-shard-readiness-active-shard-plan-handoff-v158.json");
    expect(profile.miniKvHandoffFile.resolvedPath.replace(/\\/g, "/"))
      .toContain("fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v149.json");
    expect(profile.miniKvFrozenPlanFile.resolvedPath.replace(/\\/g, "/"))
      .toContain("fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v148.json");
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("keeps the same frozen evidence behavior when historical fallback is forced", () => {
    const previous = process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK;
    process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK = "true";
    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntake({
          config: loadTestConfig(),
        });

      expect(profile.readyForActiveShardPlanBoundaryHandoffIntake).toBe(true);
      expect(profile.javaHandoffFile.usedHistoricalFallback).toBe(true);
      expect(profile.miniKvHandoffFile.usedHistoricalFallback).toBe(true);
      expect(profile.miniKvFrozenPlanFile.usedHistoricalFallback).toBe(true);
      expect(profile.javaHandoff.version).toBe("Java v158");
      expect(profile.miniKvHandoff.releaseVersion).toBe("v149");
      expect(profile.miniKvFrozenPlan.releaseVersion).toBe("v148");
      expect(profile.miniKvHandoff.readyForNodeConsumption).toBe(true);
      expect(profile.miniKvHandoff.consumerStartsServices).toBe(false);
    } finally {
      if (previous === undefined) {
        delete process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK;
      } else {
        process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK = previous;
      }
    }
  }, 60000);

  it("fails closed when the Node v381 source archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v382-empty-"));
    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntake({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        });

      expect(profile.sourceNodeV381.archiveVerificationState).toBe("");
      expect(profile.intakeState).toBe("blocked");
      expect(profile.intakeDecision).toBe("blocked");
      expect(profile.readyForActiveShardPlanBoundaryHandoffIntake).toBe(false);
      expect(profile.readyForNodeV383ArchiveVerification).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "SOURCE_NODE_V381_NOT_READY",
      ]));
      expect(profile.startsJavaService).toBe(false);
      expect(profile.startsMiniKvService).toBe(false);
      expect(profile.executionAllowed).toBe(false);
      expect(profile.activeShardPrototypeEnabled).toBe(false);
    } finally {
      rmSync(emptyProjectRoot, { force: true, recursive: true });
    }
  }, 60000);

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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-boundary-handoff-intake.v1",
        intakeState: "java-mini-kv-active-shard-plan-boundary-handoff-intake-ready",
        intakeDecision: "consume-java-v158-and-mini-kv-v149-boundary-handoff-evidence",
        activeNodeVersion: "Node v382",
        sourceNodeVersion: "Node v381",
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
        activeShardPrototypeEnabled: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver Java/mini-kv active shard plan boundary handoff intake",
      );
      expect(markdown.body).toContain("Intake decision: consume-java-v158-and-mini-kv-v149-boundary-handoff-evidence");
      expect(markdown.body).toContain("Java v158 Boundary Handoff");
      expect(markdown.body).toContain("mini-kv v149 Consumer Handoff");
      expect(markdown.body).toContain("Active shard prototype enabled: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-382",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v382-active-shard-plan-boundary-handoff",
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
