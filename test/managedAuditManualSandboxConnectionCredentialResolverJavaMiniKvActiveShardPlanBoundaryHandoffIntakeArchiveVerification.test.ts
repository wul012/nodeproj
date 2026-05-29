import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeArchiveVerification.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv active shard plan boundary handoff intake archive verification", () => {
  it("verifies the Node v382 archive and frozen evidence replay", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeArchiveVerification({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification.v1",
      archiveVerificationState: "java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verified",
      archiveVerificationDecision: "archive-active-shard-plan-boundary-handoff-intake-and-prepare-v384",
      readyForActiveShardPlanBoundaryHandoffIntakeArchiveVerification: true,
      readyForNodeV384NextBoundaryEvidenceOrLiveGate: true,
      activeNodeVersion: "Node v383",
      sourceNodeVersion: "Node v382",
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
      sourceNodeV382: {
        sourceVersion: "Node v382",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-boundary-handoff-intake.v1",
        intakeState: "java-mini-kv-active-shard-plan-boundary-handoff-intake-ready",
        intakeDecision: "consume-java-v158-and-mini-kv-v149-boundary-handoff-evidence",
        readyForActiveShardPlanBoundaryHandoffIntake: true,
        readyForNodeV383ArchiveVerification: true,
        activeNodeVersion: "Node v382",
        sourceNodeVersion: "Node v381",
        javaHandoffVersion: "Java v158",
        miniKvHandoffReleaseVersion: "v149",
        miniKvFrozenPlanReleaseVersion: "v148",
        activeShardPrototypeEnabled: false,
        liveReadGateRequiredBeforeRuntimeProbe: true,
        checkCount: 39,
        passedCheckCount: 39,
        productionBlockerCount: 0,
        javaHandoffUsesHistoricalFallback: true,
        miniKvHandoffUsesHistoricalFallback: true,
        miniKvFrozenPlanUsesHistoricalFallback: true,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        connectsManagedAudit: false,
        executionAllowed: false,
      },
      replay: {
        replayState: "ready",
        readyForActiveShardPlanBoundaryHandoffIntake: true,
        javaHandoffUsedHistoricalFallback: true,
        miniKvHandoffUsedHistoricalFallback: true,
        miniKvFrozenPlanUsedHistoricalFallback: true,
        javaHandoffVersion: "Java v158",
        miniKvHandoffReleaseVersion: "v149",
        miniKvFrozenPlanReleaseVersion: "v148",
        activeShardPrototypeEnabled: false,
        liveReadGateRequiredBeforeRuntimeProbe: true,
        checkCount: 39,
        passedCheckCount: 39,
        productionBlockerCount: 0,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        executionAllowed: false,
      },
      archiveVerification: {
        verificationMode: "java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification",
        sourceSpan: "Node v382 active shard plan boundary handoff intake",
        archiveRoot: "e/382",
        archiveVerificationDecision: "archive-active-shard-plan-boundary-handoff-intake-and-prepare-v384",
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
        nextNodeVersionSuggested: "Node v384",
      },
      checks: {
        archiveFilesPresent: true,
        jsonEvidenceReadable: true,
        jsonProfileVersionValid: true,
        jsonIntakeReady: true,
        jsonSourceNodeV381Ready: true,
        jsonEvidenceVersionsMatch: true,
        jsonActiveShardPrototypeDisabled: true,
        jsonLiveReadGateRequiredBeforeRuntimeProbe: true,
        jsonIntakeDigestStable: true,
        jsonChecksAllPassed: true,
        jsonUsesFrozenHistoricalSnapshots: true,
        summaryMatchesJson: true,
        markdownRecordsBoundaryHandoff: true,
        browserSnapshotPresent: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsMiniKvV149AndChecks: true,
        codeWalkthroughPresent: true,
        sourcePlanPointsToV383AndLiveGatePause: true,
        planIndexReferencesV382AndV383: true,
        archiveIndexReferencesV382: true,
        routeRecordedInArchive: true,
        replayReady: true,
        replayUsesFrozenJavaV158MiniKvV149AndV148: true,
        replayKeepsActiveShardPrototypeDisabled: true,
        replayRequiresLiveReadGateBeforeRuntimeProbe: true,
        archiveVerificationDoesNotRerunLiveRead: true,
        noAutomaticUpstreamStartStop: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        archiveVerificationDigestStable: true,
        readyForActiveShardPlanBoundaryHandoffIntakeArchiveVerification: true,
      },
      summary: {
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        sourceCheckCount: 39,
        sourcePassedCheckCount: 39,
        replayCheckCount: 39,
        replayPassedCheckCount: 39,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV382.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when the v382 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v383-empty-"));

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeArchiveVerification({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        });

      expect(profile.archiveVerificationState).toBe("blocked");
      expect(profile.archiveVerificationDecision).toBe("blocked");
      expect(profile.readyForActiveShardPlanBoundaryHandoffIntakeArchiveVerification).toBe(false);
      expect(profile.readyForNodeV384NextBoundaryEvidenceOrLiveGate).toBe(false);
      expect(profile.summary.presentArchiveFileCount).toBe(0);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "ARCHIVE_FILES_MISSING",
        "ARCHIVE_JSON_UNREADABLE",
        "SOURCE_V382_NOT_READY",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification.v1",
        archiveVerificationState: "java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verified",
        activeNodeVersion: "Node v383",
        sourceNodeVersion: "Node v382",
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
        "# Managed audit manual sandbox connection credential resolver Java/mini-kv active shard plan boundary handoff intake archive verification",
      );
      expect(markdown.body).toContain(
        "Archive verification decision: archive-active-shard-plan-boundary-handoff-intake-and-prepare-v384",
      );
      expect(markdown.body).toContain("Replay From Frozen Evidence");
      expect(markdown.body).toContain("Active shard prototype enabled: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-383",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v383-boundary-handoff-archive",
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
