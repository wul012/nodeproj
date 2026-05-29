import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionArchiveVerification.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-shard-readiness-evidence-consumption-archive-verification";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv shard readiness evidence consumption archive verification", () => {
  it("verifies the Node v376 archive and forced historical fallback replay", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionArchiveVerification({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-shard-readiness-evidence-consumption-archive-verification.v1",
      archiveVerificationState: "java-mini-kv-shard-readiness-evidence-consumption-archive-verified",
      archiveVerificationDecision: "archive-java-mini-kv-shard-evidence-consumption-and-prepare-v378",
      readyForJavaMiniKvShardEvidenceConsumptionArchiveVerification: true,
      readyForNodeV378CompletedEvidenceIntake: true,
      consumesNodeV376JavaMiniKvShardEvidenceConsumption: true,
      activeNodeVersion: "Node v377",
      sourceNodeVersion: "Node v376",
      archiveVerificationOnly: true,
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
      sourceNodeV376: {
        sourceVersion: "Node v376",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-shard-readiness-evidence-consumption.v1",
        evidenceConsumptionState: "java-mini-kv-shard-readiness-evidence-consumed",
        evidenceConsumptionDecision: "consume-java-v154-and-mini-kv-v145-hardening",
        readyForJavaMiniKvShardReadinessEvidenceConsumption: true,
        readyForNodeV377ShardReadinessEvidenceConsumptionArchiveVerification: true,
        activeNodeVersion: "Node v376",
        sourceNodeVersion: "Node v375",
        sourceNodeV375Ready: true,
        javaVersion: "Java v154",
        javaSourceCoreVersion: "Java v153",
        miniKvReleaseVersion: "v145",
        checkCount: 30,
        passedCheckCount: 30,
        productionBlockerCount: 0,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        mutatesJavaState: false,
        mutatesMiniKvState: false,
        connectsManagedAudit: false,
        executionAllowed: false,
      },
      forcedHistoricalFallbackReplay: {
        replayState: "ready",
        readyForJavaMiniKvShardReadinessEvidenceConsumption: true,
        javaHardeningUsedHistoricalFallback: true,
        javaSourceCoreUsedHistoricalFallback: true,
        miniKvUsedHistoricalFallback: true,
        miniKvReleaseVersion: "v145",
        checkCount: 30,
        passedCheckCount: 30,
        productionBlockerCount: 0,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        executionAllowed: false,
      },
      archiveVerification: {
        verificationMode: "java-mini-kv-shard-readiness-evidence-consumption-archive-verification",
        sourceSpan: "Node v376 Java/mini-kv shard readiness evidence consumption",
        archiveRoot: "e/376",
        archiveVerificationDecision: "archive-java-mini-kv-shard-evidence-consumption-and-prepare-v378",
        forcedHistoricalFallbackReplayReady: true,
        verifiesJsonMarkdownAndSummary: true,
        verifiesScreenshotExplanationAndWalkthrough: true,
        verifiesPlanAndArchiveIndexes: true,
        verifiesForcedHistoricalFallback: true,
        rerunsLiveRead: false,
        startsUpstreamServices: false,
        stopsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        nextNodeVersionSuggested: "Node v378",
      },
      checks: {
        archiveFilesPresent: true,
        jsonEvidenceReadable: true,
        jsonProfileVersionValid: true,
        jsonEvidenceConsumptionReady: true,
        jsonSourceNodeV375Ready: true,
        jsonEvidenceVersionsMatch: true,
        jsonConsumptionDigestStable: true,
        jsonChecksAllPassed: true,
        summaryMatchesJson: true,
        markdownRecordsConsumption: true,
        browserSnapshotPresent: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsBoundaryAndFallback: true,
        codeWalkthroughPresent: true,
        sourcePlanPointsToV377AndParallelUpstreams: true,
        planIndexReferencesV376AndV377: true,
        archiveIndexReferencesV376: true,
        routeRecordedInArchive: true,
        forcedHistoricalFallbackReplayReady: true,
        forcedFallbackUsesVersionedMiniKvSnapshot: true,
        archiveVerificationDoesNotRerunLiveRead: true,
        noAutomaticUpstreamStartStop: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        archiveVerificationDigestStable: true,
        readyForJavaMiniKvShardEvidenceConsumptionArchiveVerification: true,
      },
      summary: {
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        sourceCheckCount: 30,
        sourcePassedCheckCount: 30,
        forcedFallbackCheckCount: 30,
        forcedFallbackPassedCheckCount: 30,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV376.consumptionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV376.sourceNodeV375Digest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.forcedHistoricalFallbackReplay.miniKvResolvedPath.replace(/\\/g, "/"))
      .toContain("fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v145.json");
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when the v376 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v377-empty-"));

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionArchiveVerification({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        });

      expect(profile.archiveVerificationState).toBe("blocked");
      expect(profile.archiveVerificationDecision).toBe("blocked");
      expect(profile.readyForJavaMiniKvShardEvidenceConsumptionArchiveVerification).toBe(false);
      expect(profile.readyForNodeV378CompletedEvidenceIntake).toBe(false);
      expect(profile.summary.presentArchiveFileCount).toBe(0);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "ARCHIVE_FILES_MISSING",
        "ARCHIVE_JSON_UNREADABLE",
        "SOURCE_V376_NOT_READY",
        "FORCED_FALLBACK_REPLAY_FAILED",
      ]));
      expect(profile.rerunsLiveRead).toBe(false);
      expect(profile.startsJavaService).toBe(false);
      expect(profile.startsMiniKvService).toBe(false);
      expect(profile.executionAllowed).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-shard-readiness-evidence-consumption-archive-verification.v1",
        archiveVerificationState: "java-mini-kv-shard-readiness-evidence-consumption-archive-verified",
        activeNodeVersion: "Node v377",
        sourceNodeVersion: "Node v376",
        archiveVerificationOnly: true,
        rerunsLiveRead: false,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        executionAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver Java/mini-kv shard readiness evidence consumption archive verification",
      );
      expect(markdown.body).toContain(
        "Archive verification decision: archive-java-mini-kv-shard-evidence-consumption-and-prepare-v378",
      );
      expect(markdown.body).toContain("Forced Historical Fallback Replay");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("Stops mini-kv service: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-377",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v377-shard-evidence-consumption-archive",
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
