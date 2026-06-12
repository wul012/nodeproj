import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntake.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-completed-shard-readiness-evidence-intake";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv completed shard readiness evidence intake", () => {
  it("consumes completed Java v156/v155 and mini-kv v146 frozen evidence", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntake({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-completed-shard-readiness-evidence-intake.v1",
      intakeState: "java-mini-kv-completed-shard-readiness-evidence-intake-ready",
      intakeDecision: "consume-java-v156-and-mini-kv-v146-completed-evidence",
      readyForCompletedShardReadinessEvidenceIntake: true,
      readyForNodeV379ArchiveVerification: true,
      activeNodeVersion: "Node v378",
      sourceNodeVersion: "Node v377",
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
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      sourceNodeV377: {
        sourceVersion: "Node v377",
        archiveVerificationState: "java-mini-kv-shard-readiness-evidence-consumption-archive-verified",
        archiveVerificationDecision: "archive-java-mini-kv-shard-evidence-consumption-and-prepare-v378",
        readyForJavaMiniKvShardEvidenceConsumptionArchiveVerification: true,
        readyForNodeV378CompletedEvidenceIntake: true,
        activeNodeVersion: "Node v377",
        sourceNodeVersion: "Node v376",
        productionBlockerCount: 0,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        connectsManagedAudit: false,
        executionAllowed: false,
      },
      javaVerification: {
        project: "advanced-order-platform",
        version: "Java v156",
        readOnly: true,
        executionAllowed: false,
        sourceIndexVersion: "Java v155",
        sourceIndexEvidencePath: "e/155/evidence/java-shard-readiness-evidence-index-v155.json",
        verifiedEntryCount: 2,
        verifiedEvidenceVersions: ["Java v153", "Java v154"],
        checkCount: 8,
        passedCheckCount: 8,
        failedCheckCount: 0,
        status: "passed",
      },
      javaIndex: {
        project: "advanced-order-platform",
        version: "Java v155",
        readOnly: true,
        executionAllowed: false,
        lastConsumedByNodeVersion: "Node v376",
        requiredContractFieldCount: 9,
        evidenceEntryCount: 2,
        frozenEntryCount: 2,
        rollingCurrentPointerCount: 0,
        evidenceVersions: ["Java v153", "Java v154"],
        status: "passed",
      },
      miniKvEvidence: {
        project: "mini-kv",
        contract: "shard-readiness.v1",
        releaseVersion: "v146",
        readOnly: true,
        executionAllowed: false,
        shardEnabled: false,
        shardCount: 1,
        slotCount: 16,
        routingMode: "single-shard-readiness-prototype",
        status: "historical-fallback-hardened-read-only",
        previousConsumedReleaseVersion: "v145",
        previousConsumedFixturePath: "fixtures/release/shard-readiness-v145.json",
        rollingCurrentUsedForHistoricalBaseline: false,
        nodeV376ConsumptionPreserved: true,
        changesArchivedNodeEvidence: false,
        writeCommandsAllowed: false,
        adminCommandsAllowed: false,
        loadRestoreCompactAllowed: false,
        activeRouterInstalled: false,
        storageDirectoriesCreated: false,
        multiProcessStarted: false,
      },
      checks: {
        sourceNodeV377Ready: true,
        sourceNodeV377ArchiveVerified: true,
        sourceNodeV377BoundariesClosed: true,
        javaV156VerificationFilePresent: true,
        javaV155IndexFilePresent: true,
        javaV156VersionValid: true,
        javaV155VersionValid: true,
        javaV156ReadOnly: true,
        javaV156ExecutionBlocked: true,
        javaV156StatusPassed: true,
        javaV156ChecksAllPassed: true,
        javaV156ReferencesJavaV155: true,
        javaV156VerifiedEntryCountValid: true,
        javaV156NoRollingCurrentPolicy: true,
        javaV155EntriesFrozen: true,
        javaV155NoRollingCurrentPointers: true,
        javaV155RequiredFieldsIndexed: true,
        miniKvV146SnapshotPresent: true,
        miniKvV146ReleaseVersionValid: true,
        miniKvV146ReadOnly: true,
        miniKvV146ExecutionBlocked: true,
        miniKvV146StatusAccepted: true,
        miniKvV146HistoricalFallbackHardened: true,
        miniKvV146PreservesNodeV376: true,
        miniKvV146DoesNotMutateArchivedNodeEvidence: true,
        miniKvV146BoundarySafe: true,
        miniKvV146FutureNodeConsumerReady: true,
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
        readyForCompletedShardReadinessEvidenceIntake: true,
      },
      summary: {
        evidenceSourceCount: 3,
        readyEvidenceSourceCount: 3,
        javaVerificationCheckCount: 8,
        javaVerificationPassedCheckCount: 8,
        requiredContractFieldCount: 9,
        productionBlockerCount: 0,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV377.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.javaVerificationFile.digest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.javaIndexFile.digest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.miniKvSnapshotFile.digest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.intake.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.javaVerificationFile.resolvedPath.replace(/\\/g, "/"))
      .toContain("fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/156/evidence/java-shard-readiness-evidence-verification-v156.json");
    expect(profile.javaIndexFile.resolvedPath.replace(/\\/g, "/"))
      .toContain("fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/155/evidence/java-shard-readiness-evidence-index-v155.json");
    expect(profile.miniKvSnapshotFile.resolvedPath.replace(/\\/g, "/"))
      .toContain("fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v146.json");
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("keeps the same frozen evidence behavior when historical fallback is forced", () => {
    const previous = process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK;
    process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK = "true";
    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntake({
          config: loadTestConfig(),
        });

      expect(profile.readyForCompletedShardReadinessEvidenceIntake).toBe(true);
      expect(profile.javaVerificationFile.usedHistoricalFallback).toBe(true);
      expect(profile.javaIndexFile.usedHistoricalFallback).toBe(true);
      expect(profile.miniKvSnapshotFile.usedHistoricalFallback).toBe(true);
      expect(profile.miniKvEvidence.releaseVersion).toBe("v146");
      expect(profile.miniKvEvidence.rollingCurrentUsedForHistoricalBaseline).toBe(false);
    } finally {
      if (previous === undefined) {
        delete process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK;
      } else {
        process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK = previous;
      }
    }
  }, 180_000);

  it("fails closed when the Node v377 source archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v378-empty-"));
    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntake({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        });

      expect(profile.sourceNodeV377.archiveVerificationState).toBe("");
      expect(profile.intakeState).toBe("blocked");
      expect(profile.intakeDecision).toBe("blocked");
      expect(profile.readyForCompletedShardReadinessEvidenceIntake).toBe(false);
      expect(profile.readyForNodeV379ArchiveVerification).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "SOURCE_NODE_V377_NOT_READY",
      ]));
      expect(profile.startsJavaService).toBe(false);
      expect(profile.startsMiniKvService).toBe(false);
      expect(profile.executionAllowed).toBe(false);
    } finally {
      rmSync(emptyProjectRoot, { force: true, recursive: true });
    }
  }, 180_000);

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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-completed-shard-readiness-evidence-intake.v1",
        intakeState: "java-mini-kv-completed-shard-readiness-evidence-intake-ready",
        intakeDecision: "consume-java-v156-and-mini-kv-v146-completed-evidence",
        activeNodeVersion: "Node v378",
        sourceNodeVersion: "Node v377",
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver Java/mini-kv completed shard readiness evidence intake",
      );
      expect(markdown.body).toContain("Intake decision: consume-java-v156-and-mini-kv-v146-completed-evidence");
      expect(markdown.body).toContain("Java v156 Verification");
      expect(markdown.body).toContain("mini-kv v146 Snapshot");
      expect(markdown.body).toContain("Starts Java service: false");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-378",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v378-completed-shard-evidence",
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
