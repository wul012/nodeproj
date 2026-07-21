import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../../src/app.js";
import { loadConfig } from "../../src/config.js";
import {
  loadServiceArchive,
} from "../../src/services/operatorLifecycle/serviceArchive.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verification";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv operator service lifecycle evidence intake archive verification", () => {
  it("verifies the Node v386 archive and frozen evidence replay", () => {
    const profile = withForcedHistoricalFallback(() =>
      loadServiceArchive({
        config: loadTestConfig(),
      }));

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verification.v1",
      archiveVerificationState: "java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verified",
      archiveVerificationDecision: "archive-operator-service-lifecycle-evidence-intake-and-prepare-v388",
      readyForOperatorServiceLifecycleEvidenceIntakeArchiveVerification: true,
      readyForNodeV388DeclaredOperatorEvidenceOrRuntimeGate: true,
      readyForRuntimeLiveReadGate: false,
      activeNodeVersion: "Node v387",
      sourceNodeVersion: "Node v386",
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
      sourceNodeV386: {
        sourceVersion: "Node v386",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-operator-service-lifecycle-evidence-intake.v1",
        intakeState: "java-mini-kv-operator-service-lifecycle-evidence-intake-ready",
        intakeDecision: "consume-java-v160-and-mini-kv-v151-operator-service-lifecycle-evidence",
        readyForOperatorServiceLifecycleEvidenceIntake: true,
        readyForNodeV387ArchiveVerification: true,
        readyForRuntimeLiveReadGate: false,
        activeNodeVersion: "Node v386",
        sourceNodeVersion: "Node v385",
        javaOperatorServiceLifecycleVersion: "Java v160",
        miniKvOperatorServiceLifecycleReleaseVersion: "v151",
        miniKvFrozenLiveReadGatePlanReleaseVersion: "v150",
        javaOperatorLifecycleEvidencePresent: true,
        miniKvLifecycleTemplateOnly: true,
        declaredMiniKvOperatorEvidenceCount: 0,
        liveReadGateAllowed: false,
        runtimeProbeAllowed: false,
        activeShardPrototypeEnabled: false,
        checkCount: 45,
        passedCheckCount: 45,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 1,
        javaOperatorServiceLifecycleUsesHistoricalFallback: true,
        miniKvOperatorServiceLifecycleTemplateUsesHistoricalFallback: true,
        miniKvFrozenLiveReadGatePlanUsesHistoricalFallback: true,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        connectsManagedAudit: false,
        executionAllowed: false,
      },
      replay: {
        replayState: "ready",
        readyForOperatorServiceLifecycleEvidenceIntake: true,
        readyForRuntimeLiveReadGate: false,
        javaOperatorServiceLifecycleUsedHistoricalFallback: true,
        miniKvOperatorServiceLifecycleTemplateUsedHistoricalFallback: true,
        miniKvFrozenLiveReadGatePlanUsedHistoricalFallback: true,
        javaOperatorServiceLifecycleVersion: "Java v160",
        miniKvOperatorServiceLifecycleReleaseVersion: "v151",
        miniKvFrozenLiveReadGatePlanReleaseVersion: "v150",
        javaOperatorLifecycleEvidencePresent: true,
        miniKvLifecycleTemplateOnly: true,
        declaredMiniKvOperatorEvidenceCount: 0,
        liveReadGateAllowed: false,
        runtimeProbeAllowed: false,
        activeShardPrototypeEnabled: false,
        checkCount: 45,
        passedCheckCount: 45,
        productionBlockerCount: 0,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        executionAllowed: false,
      },
      archiveVerification: {
        verificationMode: "java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verification",
        sourceSpan: "Node v386 operator service lifecycle evidence intake",
        archiveRoot: "e/386",
        archiveVerificationDecision: "archive-operator-service-lifecycle-evidence-intake-and-prepare-v388",
        replayReady: true,
        verifiesJsonMarkdownAndSummary: true,
        verifiesScreenshotExplanationAndWalkthrough: true,
        verifiesPlanAndArchiveIndexes: true,
        verifiesReplayFromFrozenEvidence: true,
        verifiesRuntimeGateStillBlocked: true,
        rerunsLiveRead: false,
        startsUpstreamServices: false,
        stopsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        activeShardPrototypeEnabled: false,
        nextNodeVersionSuggested: "Node v388",
      },
      checks: {
        archiveFilesPresent: true,
        jsonEvidenceReadable: true,
        jsonProfileVersionValid: true,
        jsonIntakeReady: true,
        jsonSourceNodeV385Ready: true,
        jsonEvidenceVersionsMatch: true,
        jsonRuntimeGateClosed: true,
        jsonActiveShardPrototypeDisabled: true,
        jsonIntakeDigestStable: true,
        jsonChecksAllPassed: true,
        jsonUsesFrozenHistoricalSnapshots: true,
        jsonMiniKvTemplateOnly: true,
        summaryMatchesJson: true,
        markdownRecordsOperatorServiceLifecycle: true,
        browserSnapshotPresent: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsRuntimeGateBlockedAndChecks: true,
        codeWalkthroughPresent: true,
        sourcePlanPointsToV387ArchiveVerification: true,
        planIndexReferencesV386AndV387: true,
        archiveIndexReferencesV386: true,
        routeRecordedInArchive: true,
        replayReady: true,
        replayUsesFrozenJavaV160MiniKvV151AndV150: true,
        replayKeepsRuntimeGateClosed: true,
        replayKeepsActiveShardPrototypeDisabled: true,
        replayKeepsMiniKvTemplateOnly: true,
        archiveVerificationDoesNotRerunLiveRead: true,
        noAutomaticUpstreamStartStop: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        archiveVerificationDigestStable: true,
        readyForOperatorServiceLifecycleEvidenceIntakeArchiveVerification: true,
      },
      summary: {
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        sourceCheckCount: 45,
        sourcePassedCheckCount: 45,
        replayCheckCount: 45,
        replayPassedCheckCount: 45,
        declaredMiniKvOperatorEvidenceCount: 0,
        checkCount: 37,
        passedCheckCount: 37,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV386.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("fails closed when the v386 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v387-empty-"));

    try {
      const profile = withForcedHistoricalFallback(() =>
        loadServiceArchive({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        }));

      expect(profile.archiveVerificationState).toBe("blocked");
      expect(profile.archiveVerificationDecision).toBe("blocked");
      expect(profile.readyForOperatorServiceLifecycleEvidenceIntakeArchiveVerification).toBe(false);
      expect(profile.readyForNodeV388DeclaredOperatorEvidenceOrRuntimeGate).toBe(false);
      expect(profile.readyForRuntimeLiveReadGate).toBe(false);
      expect(profile.summary.presentArchiveFileCount).toBe(0);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "ARCHIVE_FILES_MISSING",
        "ARCHIVE_JSON_UNREADABLE",
        "SOURCE_V386_NOT_READY",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verification.v1",
        archiveVerificationState: "java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verified",
        activeNodeVersion: "Node v387",
        sourceNodeVersion: "Node v386",
        archiveVerificationOnly: true,
        readyForRuntimeLiveReadGate: false,
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
        "# Managed audit manual sandbox connection credential resolver Java/mini-kv operator service lifecycle evidence intake archive verification",
      );
      expect(markdown.body).toContain(
        "Archive verification decision: archive-operator-service-lifecycle-evidence-intake-and-prepare-v388",
      );
      expect(markdown.body).toContain("Replay From Frozen Evidence");
      expect(markdown.body).toContain("readyForRuntimeLiveReadGate: false");
    } finally {
      await app.close();
      restoreEnv(previous);
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-387",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v387-operator-service-lifecycle-evidence-intake-archive",
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
