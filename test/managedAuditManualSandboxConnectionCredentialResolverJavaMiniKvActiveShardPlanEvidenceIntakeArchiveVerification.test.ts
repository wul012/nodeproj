import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeArchiveVerification.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-evidence-intake-archive-verification";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv active shard plan evidence intake archive verification", () => {
  it("verifies the Node v380 archive and frozen evidence replay", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeArchiveVerification({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-evidence-intake-archive-verification.v1",
      archiveVerificationState: "java-mini-kv-active-shard-plan-evidence-intake-archive-verified",
      archiveVerificationDecision: "archive-active-shard-plan-evidence-intake-and-prepare-v381",
      readyForActiveShardPlanEvidenceIntakeArchiveVerification: true,
      readyForNodeV381NextArchiveVerification: true,
      activeNodeVersion: "Node v381",
      sourceNodeVersion: "Node v380",
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
      activeShardPrototypeEnabled: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      sourceNodeV380: {
        sourceVersion: "Node v380",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-evidence-intake.v1",
        intakeState: "java-mini-kv-active-shard-plan-evidence-intake-ready",
        intakeDecision: "consume-java-v157-and-mini-kv-v147-active-plan-evidence",
        readyForActiveShardPlanEvidenceIntake: true,
        readyForNodeV381ArchiveVerification: true,
        activeNodeVersion: "Node v380",
        sourceNodeVersion: "Node v379",
        javaHandoffVersion: "Java v157",
        miniKvReleaseVersion: "v147",
        activeShardPrototypeEnabled: false,
        checkCount: 33,
        passedCheckCount: 33,
        productionBlockerCount: 0,
        javaHandoffUsesHistoricalFallback: true,
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
        readyForActiveShardPlanEvidenceIntake: true,
        javaHandoffUsedHistoricalFallback: true,
        miniKvUsedHistoricalFallback: true,
        javaHandoffVersion: "Java v157",
        miniKvReleaseVersion: "v147",
        activeShardPrototypeEnabled: false,
        checkCount: 33,
        passedCheckCount: 33,
        productionBlockerCount: 0,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        executionAllowed: false,
      },
      archiveVerification: {
        verificationMode: "java-mini-kv-active-shard-plan-evidence-intake-archive-verification",
        sourceSpan: "Node v380 active shard plan evidence intake",
        archiveRoot: "e/380",
        archiveVerificationDecision: "archive-active-shard-plan-evidence-intake-and-prepare-v381",
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
        activeShardPrototypeEnabled: false,
        nextNodeVersionSuggested: "Node v381",
      },
      checks: {
        archiveFilesPresent: true,
        jsonEvidenceReadable: true,
        jsonProfileVersionValid: true,
        jsonIntakeReady: true,
        jsonSourceNodeV379Ready: true,
        jsonEvidenceVersionsMatch: true,
        jsonActiveShardPrototypeDisabled: true,
        jsonIntakeDigestStable: true,
        jsonChecksAllPassed: true,
        jsonUsesFrozenHistoricalSnapshots: true,
        summaryMatchesJson: true,
        markdownRecordsIntake: true,
        browserSnapshotPresent: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsFrozenMiniKvV147: true,
        codeWalkthroughPresent: true,
        sourcePlanPointsToV381AndLiveGatePause: true,
        planIndexReferencesV380AndV381: true,
        archiveIndexReferencesV380: true,
        routeRecordedInArchive: true,
        replayReady: true,
        replayUsesFrozenJavaV157AndMiniKvV147: true,
        replayKeepsActiveShardPrototypeDisabled: true,
        archiveVerificationDoesNotRerunLiveRead: true,
        noAutomaticUpstreamStartStop: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        archiveVerificationDigestStable: true,
        readyForActiveShardPlanEvidenceIntakeArchiveVerification: true,
      },
      summary: {
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        sourceCheckCount: 33,
        sourcePassedCheckCount: 33,
        replayCheckCount: 33,
        replayPassedCheckCount: 33,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV380.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("fails closed when the v380 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v381-empty-"));

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeArchiveVerification({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        });

      expect(profile.archiveVerificationState).toBe("blocked");
      expect(profile.archiveVerificationDecision).toBe("blocked");
      expect(profile.readyForActiveShardPlanEvidenceIntakeArchiveVerification).toBe(false);
      expect(profile.readyForNodeV381NextArchiveVerification).toBe(false);
      expect(profile.summary.presentArchiveFileCount).toBe(0);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "ARCHIVE_FILES_MISSING",
        "ARCHIVE_JSON_UNREADABLE",
        "SOURCE_V380_NOT_READY",
        "REPLAY_FAILED",
      ]));
      expect(profile.rerunsLiveRead).toBe(false);
      expect(profile.startsJavaService).toBe(false);
      expect(profile.startsMiniKvService).toBe(false);
      expect(profile.executionAllowed).toBe(false);
      expect(profile.activeShardPrototypeEnabled).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-evidence-intake-archive-verification.v1",
        archiveVerificationState: "java-mini-kv-active-shard-plan-evidence-intake-archive-verified",
        activeNodeVersion: "Node v381",
        sourceNodeVersion: "Node v380",
        archiveVerificationOnly: true,
        rerunsLiveRead: false,
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
        "# Managed audit manual sandbox connection credential resolver Java/mini-kv active shard plan evidence intake archive verification",
      );
      expect(markdown.body).toContain("Archive verification decision: archive-active-shard-plan-evidence-intake-and-prepare-v381");
      expect(markdown.body).toContain("Replay From Frozen Evidence");
      expect(markdown.body).toContain("Active shard prototype enabled: false");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-381",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v381-active-shard-plan-evidence-archive",
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
