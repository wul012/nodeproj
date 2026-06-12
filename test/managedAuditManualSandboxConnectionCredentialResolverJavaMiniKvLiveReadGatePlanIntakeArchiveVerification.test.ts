import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeArchiveVerification.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-live-read-gate-plan-intake-archive-verification";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv live-read gate plan intake archive verification", () => {
  it("verifies the Node v384 archive and frozen evidence replay", () => {
    const profile = withForcedHistoricalFallback(() =>
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeArchiveVerification({
        config: loadTestConfig(),
      }));

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-live-read-gate-plan-intake-archive-verification.v1",
      archiveVerificationState: "java-mini-kv-live-read-gate-plan-intake-archive-verified",
      archiveVerificationDecision: "archive-live-read-gate-plan-intake-and-prepare-v386",
      readyForLiveReadGatePlanIntakeArchiveVerification: true,
      readyForNodeV386ServiceLifecycleEvidenceOrRuntimeGate: true,
      activeNodeVersion: "Node v385",
      sourceNodeVersion: "Node v384",
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
      sourceNodeV384: {
        sourceVersion: "Node v384",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-live-read-gate-plan-intake.v1",
        intakeState: "java-mini-kv-live-read-gate-plan-intake-ready",
        intakeDecision: "consume-java-v159-and-mini-kv-v150-live-read-gate-plan-evidence",
        readyForJavaMiniKvLiveReadGatePlanIntake: true,
        readyForNodeV385ArchiveVerification: true,
        activeNodeVersion: "Node v384",
        sourceNodeVersion: "Node v383",
        javaLiveReadGatePlanVersion: "Java v159",
        miniKvLiveReadGatePlanReleaseVersion: "v150",
        miniKvFrozenConsumerHandoffReleaseVersion: "v149",
        liveReadGateAllowed: false,
        runtimeProbeAllowed: false,
        activeShardPrototypeEnabled: false,
        checkCount: 46,
        passedCheckCount: 46,
        productionBlockerCount: 0,
        javaLiveReadGatePlanUsesHistoricalFallback: true,
        miniKvLiveReadGatePlanUsesHistoricalFallback: true,
        miniKvFrozenConsumerHandoffUsesHistoricalFallback: true,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        connectsManagedAudit: false,
        executionAllowed: false,
      },
      replay: {
        replayState: "ready",
        readyForJavaMiniKvLiveReadGatePlanIntake: true,
        javaLiveReadGatePlanUsedHistoricalFallback: true,
        miniKvLiveReadGatePlanUsedHistoricalFallback: true,
        miniKvFrozenConsumerHandoffUsedHistoricalFallback: true,
        javaLiveReadGatePlanVersion: "Java v159",
        miniKvLiveReadGatePlanReleaseVersion: "v150",
        miniKvFrozenConsumerHandoffReleaseVersion: "v149",
        liveReadGateAllowed: false,
        runtimeProbeAllowed: false,
        activeShardPrototypeEnabled: false,
        checkCount: 46,
        passedCheckCount: 46,
        productionBlockerCount: 0,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        executionAllowed: false,
      },
      archiveVerification: {
        verificationMode: "java-mini-kv-live-read-gate-plan-intake-archive-verification",
        sourceSpan: "Node v384 live-read gate plan intake",
        archiveRoot: "e/384",
        archiveVerificationDecision: "archive-live-read-gate-plan-intake-and-prepare-v386",
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
        nextNodeVersionSuggested: "Node v386",
      },
      checks: {
        archiveFilesPresent: true,
        jsonEvidenceReadable: true,
        jsonProfileVersionValid: true,
        jsonIntakeReady: true,
        jsonSourceNodeV383Ready: true,
        jsonEvidenceVersionsMatch: true,
        jsonLiveReadGateClosed: true,
        jsonActiveShardPrototypeDisabled: true,
        jsonIntakeDigestStable: true,
        jsonChecksAllPassed: true,
        jsonUsesFrozenHistoricalSnapshots: true,
        summaryMatchesJson: true,
        markdownRecordsLiveReadGatePlan: true,
        browserSnapshotPresent: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsMiniKvV150AndChecks: true,
        codeWalkthroughPresent: true,
        sourcePlanPointsToV385ArchiveVerification: true,
        planIndexReferencesV384AndV385: true,
        archiveIndexReferencesV384: true,
        routeRecordedInArchive: true,
        replayReady: true,
        replayUsesFrozenJavaV159MiniKvV150AndV149: true,
        replayKeepsLiveReadGateClosed: true,
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
        readyForLiveReadGatePlanIntakeArchiveVerification: true,
      },
      summary: {
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        sourceCheckCount: 46,
        sourcePassedCheckCount: 46,
        replayCheckCount: 46,
        replayPassedCheckCount: 46,
        checkCount: 35,
        passedCheckCount: 35,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV384.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("fails closed when the v384 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v385-empty-"));

    try {
      const profile = withForcedHistoricalFallback(() =>
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeArchiveVerification({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        }));

      expect(profile.archiveVerificationState).toBe("blocked");
      expect(profile.archiveVerificationDecision).toBe("blocked");
      expect(profile.readyForLiveReadGatePlanIntakeArchiveVerification).toBe(false);
      expect(profile.readyForNodeV386ServiceLifecycleEvidenceOrRuntimeGate).toBe(false);
      expect(profile.summary.presentArchiveFileCount).toBe(0);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "ARCHIVE_FILES_MISSING",
        "ARCHIVE_JSON_UNREADABLE",
        "SOURCE_V384_NOT_READY",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-live-read-gate-plan-intake-archive-verification.v1",
        archiveVerificationState: "java-mini-kv-live-read-gate-plan-intake-archive-verified",
        activeNodeVersion: "Node v385",
        sourceNodeVersion: "Node v384",
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
        "# Managed audit manual sandbox connection credential resolver Java/mini-kv live-read gate plan intake archive verification",
      );
      expect(markdown.body).toContain(
        "Archive verification decision: archive-live-read-gate-plan-intake-and-prepare-v386",
      );
      expect(markdown.body).toContain("Replay From Frozen Evidence");
      expect(markdown.body).toContain("runtimeProbeAllowed: false");
    } finally {
      await app.close();
      restoreEnv(previous);
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-385",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v385-live-read-gate-plan-intake-archive",
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
