import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeArchiveVerification.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-completed-shard-readiness-evidence-intake-archive-verification";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv completed shard readiness evidence intake archive verification", () => {
  it("verifies the Node v378 archive and frozen evidence replay", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeArchiveVerification({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-completed-shard-readiness-evidence-intake-archive-verification.v1",
      archiveVerificationState: "java-mini-kv-completed-shard-readiness-evidence-intake-archive-verified",
      archiveVerificationDecision: "archive-completed-shard-evidence-intake-and-prepare-v380",
      readyForCompletedShardEvidenceIntakeArchiveVerification: true,
      readyForNodeV380NextCompletedEvidenceOrLiveGate: true,
      activeNodeVersion: "Node v379",
      sourceNodeVersion: "Node v378",
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
      sourceNodeV378: {
        sourceVersion: "Node v378",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-completed-shard-readiness-evidence-intake.v1",
        intakeState: "java-mini-kv-completed-shard-readiness-evidence-intake-ready",
        intakeDecision: "consume-java-v156-and-mini-kv-v146-completed-evidence",
        readyForCompletedShardReadinessEvidenceIntake: true,
        readyForNodeV379ArchiveVerification: true,
        activeNodeVersion: "Node v378",
        sourceNodeVersion: "Node v377",
        javaVerificationVersion: "Java v156",
        javaIndexVersion: "Java v155",
        miniKvReleaseVersion: "v146",
        checkCount: 38,
        passedCheckCount: 38,
        productionBlockerCount: 0,
        javaVerificationUsesHistoricalFallback: true,
        javaIndexUsesHistoricalFallback: true,
        miniKvUsesHistoricalFallback: true,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        connectsManagedAudit: false,
        executionAllowed: false,
      },
      replay: {
        replayState: "ready",
        readyForCompletedShardReadinessEvidenceIntake: true,
        javaVerificationUsedHistoricalFallback: true,
        javaIndexUsedHistoricalFallback: true,
        miniKvUsedHistoricalFallback: true,
        miniKvReleaseVersion: "v146",
        checkCount: 38,
        passedCheckCount: 38,
        productionBlockerCount: 0,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        executionAllowed: false,
      },
      archiveVerification: {
        verificationMode: "java-mini-kv-completed-shard-readiness-evidence-intake-archive-verification",
        sourceSpan: "Node v378 completed shard-readiness evidence intake",
        archiveRoot: "e/378",
        archiveVerificationDecision: "archive-completed-shard-evidence-intake-and-prepare-v380",
        replayReady: true,
        verifiesJsonMarkdownAndSummary: true,
        verifiesScreenshotExplanationAndWalkthrough: true,
        verifiesPlanAndArchiveIndexes: true,
        verifiesReplayFromFrozenEvidence: true,
        rerunsLiveRead: false,
        startsUpstreamServices: false,
        stopsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        nextNodeVersionSuggested: "Node v380",
      },
      checks: {
        archiveFilesPresent: true,
        jsonEvidenceReadable: true,
        jsonProfileVersionValid: true,
        jsonIntakeReady: true,
        jsonSourceNodeV377Ready: true,
        jsonEvidenceVersionsMatch: true,
        jsonIntakeDigestStable: true,
        jsonChecksAllPassed: true,
        jsonUsesFrozenHistoricalSnapshots: true,
        summaryMatchesJson: true,
        markdownRecordsIntake: true,
        browserSnapshotPresent: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsFrozenMiniKvV146: true,
        codeWalkthroughPresent: true,
        sourcePlanPointsToV379AndParallelUpstreams: true,
        planIndexReferencesV378AndV379: true,
        archiveIndexReferencesV378: true,
        routeRecordedInArchive: true,
        replayReady: true,
        replayUsesFrozenMiniKvV146: true,
        archiveVerificationDoesNotRerunLiveRead: true,
        noAutomaticUpstreamStartStop: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        archiveVerificationDigestStable: true,
        readyForCompletedShardEvidenceIntakeArchiveVerification: true,
      },
      summary: {
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        sourceCheckCount: 38,
        sourcePassedCheckCount: 38,
        replayCheckCount: 38,
        replayPassedCheckCount: 38,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV378.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("fails closed when the v378 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v379-empty-"));

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeArchiveVerification({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        });

      expect(profile.archiveVerificationState).toBe("blocked");
      expect(profile.archiveVerificationDecision).toBe("blocked");
      expect(profile.readyForCompletedShardEvidenceIntakeArchiveVerification).toBe(false);
      expect(profile.readyForNodeV380NextCompletedEvidenceOrLiveGate).toBe(false);
      expect(profile.summary.presentArchiveFileCount).toBe(0);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "ARCHIVE_FILES_MISSING",
        "ARCHIVE_JSON_UNREADABLE",
        "SOURCE_V378_NOT_READY",
        "REPLAY_FAILED",
      ]));
      expect(profile.rerunsLiveRead).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-completed-shard-readiness-evidence-intake-archive-verification.v1",
        archiveVerificationState: "java-mini-kv-completed-shard-readiness-evidence-intake-archive-verified",
        activeNodeVersion: "Node v379",
        sourceNodeVersion: "Node v378",
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
        "# Managed audit manual sandbox connection credential resolver Java/mini-kv completed shard readiness evidence intake archive verification",
      );
      expect(markdown.body).toContain("Archive verification decision: archive-completed-shard-evidence-intake-and-prepare-v380");
      expect(markdown.body).toContain("Replay From Frozen Evidence");
      expect(markdown.body).toContain("Starts Java service: false");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-379",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v379-completed-shard-evidence-archive",
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
