import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumption,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumption.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-shard-readiness-evidence-consumption";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv shard readiness evidence consumption", () => {
  it("consumes Java v154 and mini-kv v145 evidence without touching sibling service lifecycle", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumption({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-shard-readiness-evidence-consumption.v1",
      evidenceConsumptionState: "java-mini-kv-shard-readiness-evidence-consumed",
      evidenceConsumptionDecision: "consume-java-v154-and-mini-kv-v145-hardening",
      readyForJavaMiniKvShardReadinessEvidenceConsumption: true,
      readyForNodeV377ShardReadinessEvidenceConsumptionArchiveVerification: true,
      activeNodeVersion: "Node v376",
      sourceNodeVersion: "Node v375",
      consumesNodeV375ArchiveVerification: true,
      consumesJavaV154ShardReadinessHardening: true,
      consumesMiniKvV145ShardReadinessHardening: true,
      evidenceConsumptionOnly: true,
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
      sourceNodeV375: {
        sourceVersion: "Node v375",
        archiveVerificationState: "minimal-shard-readiness-regular-gate-archive-verified",
        archiveVerificationDecision: "archive-minimal-shard-readiness-regular-gate-and-consume-v154-v145",
        readyForMinimalShardReadinessRegularGateArchiveVerification: true,
        readyForNodeV376JavaMiniKvShardEvidenceConsumption: true,
        productionBlockerCount: 0,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        connectsManagedAudit: false,
        executionAllowed: false,
      },
      javaShardReadiness: {
        project: "advanced-order-platform",
        sourceVersion: "Java v154",
        requiredFieldCount: 9,
        presentRequiredFieldCount: 9,
        missingRequiredFields: [],
        readOnlySafe: true,
        executionBlocked: true,
        shardCountValid: true,
        slotCountValid: true,
        routingModePresent: true,
        statusAccepted: true,
        hardeningExplainsFields: true,
        sourceCoreLinked: true,
        boundarySafe: true,
        preservesArchivedNodeEvidence: true,
        readyForNodeConsumption: true,
        evidence: {
          project: "advanced-order-platform",
          version: "Java v154",
          sourceCoreVersion: "Java v153",
          readOnly: true,
          executionAllowed: false,
          shardEnabled: false,
          shardCount: 0,
          slotCount: 0,
          routingMode: "fixture",
          status: "passed",
        },
      },
      miniKvShardReadiness: {
        project: "mini-kv",
        sourceVersion: "mini-kv v145",
        requiredFieldCount: 9,
        presentRequiredFieldCount: 9,
        missingRequiredFields: [],
        readOnlySafe: true,
        executionBlocked: true,
        shardCountValid: true,
        slotCountValid: true,
        routingModePresent: true,
        statusAccepted: true,
        hardeningExplainsFields: true,
        sourceCoreLinked: true,
        boundarySafe: true,
        preservesArchivedNodeEvidence: true,
        readyForNodeConsumption: true,
        contractVersionObserved: "shard-readiness.v1",
        evidence: {
          project: "mini-kv",
          version: "0.102.0",
          releaseVersion: "v145",
          readOnly: true,
          executionAllowed: false,
          shardEnabled: false,
          shardCount: 1,
          slotCount: 16,
          routingMode: "single-shard-readiness-prototype",
          status: "hardened-read-only",
        },
      },
      checks: {
        sourceNodeV375Ready: true,
        sourceNodeV375ArchiveVerified: true,
        sourceNodeV375BoundariesClosed: true,
        javaV154HardeningFilePresent: true,
        javaV153SourceCoreFilePresent: true,
        javaRequiredFieldsComplete: true,
        javaReadOnlySafe: true,
        javaExecutionBlocked: true,
        javaStatusAccepted: true,
        javaHardeningExplainsFields: true,
        javaSourceCoreLinked: true,
        miniKvV145FilePresent: true,
        miniKvReleaseVersionV145: true,
        miniKvRequiredFieldsComplete: true,
        miniKvReadOnlySafe: true,
        miniKvExecutionBlocked: true,
        miniKvStatusAccepted: true,
        miniKvBoundarySafe: true,
        miniKvArchivedEvidencePreserved: true,
        bothEvidenceSourcesReady: true,
        historicalFallbackCovered: true,
        digestCoverageComplete: true,
        nodeDoesNotStartOrStopUpstreams: true,
        nodeDoesNotMutateSiblingState: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForJavaMiniKvShardReadinessEvidenceConsumption: true,
      },
      summary: {
        evidenceSourceCount: 2,
        readyEvidenceSourceCount: 2,
        requiredFieldCount: 18,
        presentRequiredFieldCount: 18,
        missingRequiredFieldCount: 0,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV375.sourceArchiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.evidenceConsumption.consumptionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.javaShardReadiness.hardeningFile.digest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.javaShardReadiness.sourceCoreFile?.digest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.miniKvShardReadiness.hardeningFile.digest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("uses version-specific historical fixtures when forced", () => {
    const previous = process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK;
    process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK = "true";
    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumption({
          config: loadTestConfig(),
        });

      expect(profile.readyForJavaMiniKvShardReadinessEvidenceConsumption).toBe(true);
      expect(profile.javaShardReadiness.hardeningFile.usedHistoricalFallback).toBe(true);
      expect(profile.javaShardReadiness.sourceCoreFile?.usedHistoricalFallback).toBe(true);
      expect(profile.miniKvShardReadiness.hardeningFile.usedHistoricalFallback).toBe(true);
      expect(profile.javaShardReadiness.hardeningFile.resolvedPath.replace(/\\/g, "/"))
        .toContain("fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/154/evidence/java-shard-readiness-hardening-v154.json");
      expect(profile.javaShardReadiness.sourceCoreFile?.resolvedPath.replace(/\\/g, "/"))
        .toContain("fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/153/evidence/java-shard-readiness-v153.json");
      expect(profile.miniKvShardReadiness.hardeningFile.resolvedPath.replace(/\\/g, "/"))
        .toContain("fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v145.json");
      expect(profile.miniKvShardReadiness.evidence.releaseVersion).toBe("v145");
    } finally {
      if (previous === undefined) {
        delete process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK;
      } else {
        process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK = previous;
      }
    }
  }, 180_000);

  it("fails closed when the source archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v376-empty-"));
    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumption({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        });

      expect(profile.sourceNodeV375.archiveVerificationState).toBe("blocked");
      expect(profile.evidenceConsumptionState).toBe("blocked");
      expect(profile.evidenceConsumptionDecision).toBe("blocked");
      expect(profile.readyForJavaMiniKvShardReadinessEvidenceConsumption).toBe(false);
      expect(profile.readyForNodeV377ShardReadinessEvidenceConsumptionArchiveVerification).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "SOURCE_NODE_V375_NOT_READY",
        "SOURCE_NODE_V375_ARCHIVE_INCOMPLETE",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-shard-readiness-evidence-consumption.v1",
        evidenceConsumptionState: "java-mini-kv-shard-readiness-evidence-consumed",
        evidenceConsumptionDecision: "consume-java-v154-and-mini-kv-v145-hardening",
        activeNodeVersion: "Node v376",
        sourceNodeVersion: "Node v375",
        evidenceConsumptionOnly: true,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        mutatesJavaState: false,
        mutatesMiniKvState: false,
        connectsManagedAudit: false,
        executionAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver Java/mini-kv shard readiness evidence consumption",
      );
      expect(markdown.body).toContain("Evidence consumption decision: consume-java-v154-and-mini-kv-v145-hardening");
      expect(markdown.body).toContain("Java v154");
      expect(markdown.body).toContain("mini-kv v145");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("Starts mini-kv service: false");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-376",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v376-java-mini-kv-shard-evidence-consumption",
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
