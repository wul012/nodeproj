import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntake.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-evidence-intake";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv active shard plan evidence intake", () => {
  it("consumes Java v157 handoff and mini-kv v147 frozen active plan evidence", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntake({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-evidence-intake.v1",
      intakeState: "java-mini-kv-active-shard-plan-evidence-intake-ready",
      intakeDecision: "consume-java-v157-and-mini-kv-v147-active-plan-evidence",
      readyForActiveShardPlanEvidenceIntake: true,
      readyForNodeV381ArchiveVerification: true,
      activeNodeVersion: "Node v380",
      sourceNodeVersion: "Node v379",
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
      sourceNodeV379: {
        sourceVersion: "Node v379",
        archiveVerificationState: "java-mini-kv-completed-shard-readiness-evidence-intake-archive-verified",
        archiveVerificationDecision: "archive-completed-shard-evidence-intake-and-prepare-v380",
        readyForCompletedShardEvidenceIntakeArchiveVerification: true,
        readyForNodeV380NextCompletedEvidenceOrLiveGate: true,
        activeNodeVersion: "Node v379",
        sourceNodeVersion: "Node v378",
        checkCount: 31,
        passedCheckCount: 31,
        productionBlockerCount: 0,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        connectsManagedAudit: false,
        executionAllowed: false,
      },
      javaHandoff: {
        project: "advanced-order-platform",
        version: "Java v157",
        readOnly: true,
        executionAllowed: false,
        sourceIndexVersion: "Java v155",
        sourceVerificationVersion: "Java v156",
        lastConsumedByNodeVersion: "Node v378",
        completedEvidenceVersions: ["Java v155", "Java v156"],
        status: "passed",
      },
      miniKvEvidence: {
        project: "mini-kv",
        contract: "shard-readiness.v1",
        releaseVersion: "v147",
        readOnly: true,
        executionAllowed: false,
        shardEnabled: false,
        shardCount: 1,
        slotCount: 16,
        routingMode: "single-shard-readiness-prototype",
        status: "active-prototype-prerequisite-read-only",
        previousConsumedReleaseVersion: "v146",
        previousConsumedFixturePath: "fixtures/release/shard-readiness-v146.json",
        previousConsumptionNodeVersion: "Node v378",
        rollingCurrentUsedForHistoricalBaseline: false,
        changesArchivedNodeEvidence: false,
        writeCommandsAllowed: false,
        adminCommandsAllowed: false,
        loadRestoreCompactAllowed: false,
        setnxexExecutionAllowed: false,
        activeRouterInstalled: false,
        storageDirectoriesCreated: false,
        multiProcessStarted: false,
        activeShardPrototypeAllowed: false,
        routerActivationAllowed: false,
        shardDirectoryCreationAllowed: false,
        multiProcessStartAllowed: false,
        writeRoutingAllowed: false,
      },
      checks: {
        sourceNodeV379Ready: true,
        sourceNodeV379ArchiveVerified: true,
        sourceNodeV379BoundariesClosed: true,
        javaV157HandoffFilePresent: true,
        javaV157VersionValid: true,
        javaV157ReadOnly: true,
        javaV157ExecutionBlocked: true,
        javaV157StatusPassed: true,
        javaV157ReferencesJavaV155AndV156: true,
        javaV157CompletedEvidenceVersionsValid: true,
        javaV157ConsumerRulesSafe: true,
        javaV157StopConditionsSafe: true,
        miniKvV147SnapshotPresent: true,
        miniKvV147ReleaseVersionValid: true,
        miniKvV147ReadOnly: true,
        miniKvV147ExecutionBlocked: true,
        miniKvV147StatusAccepted: true,
        miniKvV147ActivePrototypePlanPresent: true,
        miniKvV147ActivePrototypeStillDisabled: true,
        miniKvV147BoundarySafe: true,
        miniKvV147HistoricalFallbackSafe: true,
        miniKvV147PreservesNodeV378Path: true,
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
        readyForActiveShardPlanEvidenceIntake: true,
      },
      summary: {
        evidenceSourceCount: 2,
        readyEvidenceSourceCount: 2,
        completedJavaEvidenceVersionCount: 2,
        miniKvArchivedNodeVersionCount: 9,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV379.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.javaHandoffFile.digest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.miniKvSnapshotFile.digest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.intake.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.javaHandoffFile.resolvedPath.replace(/\\/g, "/"))
      .toContain("fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/157/evidence/java-shard-readiness-evidence-handoff-v157.json");
    expect(profile.miniKvSnapshotFile.resolvedPath.replace(/\\/g, "/"))
      .toContain("fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v147.json");
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("keeps the same frozen evidence behavior when historical fallback is forced", () => {
    const previous = process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK;
    process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK = "true";
    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntake({
          config: loadTestConfig(),
        });

      expect(profile.readyForActiveShardPlanEvidenceIntake).toBe(true);
      expect(profile.javaHandoffFile.usedHistoricalFallback).toBe(true);
      expect(profile.miniKvSnapshotFile.usedHistoricalFallback).toBe(true);
      expect(profile.javaHandoff.version).toBe("Java v157");
      expect(profile.miniKvEvidence.releaseVersion).toBe("v147");
      expect(profile.miniKvEvidence.rollingCurrentUsedForHistoricalBaseline).toBe(false);
      expect(profile.miniKvEvidence.activeShardPrototypeAllowed).toBe(false);
    } finally {
      if (previous === undefined) {
        delete process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK;
      } else {
        process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK = previous;
      }
    }
  }, 60000);

  it("fails closed when the Node v379 source archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v380-empty-"));
    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntake({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        });

      expect(profile.sourceNodeV379.archiveVerificationState).toBe("");
      expect(profile.intakeState).toBe("blocked");
      expect(profile.intakeDecision).toBe("blocked");
      expect(profile.readyForActiveShardPlanEvidenceIntake).toBe(false);
      expect(profile.readyForNodeV381ArchiveVerification).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "SOURCE_NODE_V379_NOT_READY",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-evidence-intake.v1",
        intakeState: "java-mini-kv-active-shard-plan-evidence-intake-ready",
        intakeDecision: "consume-java-v157-and-mini-kv-v147-active-plan-evidence",
        activeNodeVersion: "Node v380",
        sourceNodeVersion: "Node v379",
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
        activeShardPrototypeEnabled: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver Java/mini-kv active shard plan evidence intake",
      );
      expect(markdown.body).toContain("Intake decision: consume-java-v157-and-mini-kv-v147-active-plan-evidence");
      expect(markdown.body).toContain("Java v157 Handoff");
      expect(markdown.body).toContain("mini-kv v147 Frozen Snapshot");
      expect(markdown.body).toContain("Active shard prototype enabled: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-380",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v380-active-shard-plan-evidence",
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
