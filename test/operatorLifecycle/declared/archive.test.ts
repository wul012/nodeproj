import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../../../src/app.js";
import { loadConfig } from "../../../src/config.js";
import {
  loadDeclaredArchive,
} from "../../../src/services/operatorLifecycle/declared/archive.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-evidence-intake-archive-verification";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle evidence intake archive verification", () => {
  it("verifies the Node v388 archive and frozen evidence replay", () => {
    const profile = withForcedHistoricalFallback(() =>
      loadDeclaredArchive({
        config: loadTestConfig(),
      }));

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-evidence-intake-archive-verification.v1",
      archiveVerificationState: "java-mini-kv-declared-operator-lifecycle-evidence-intake-archive-verified",
      archiveVerificationDecision: "archive-declared-operator-lifecycle-evidence-intake-and-prepare-v390-runtime-gate-plan",
      readyForDeclaredOperatorLifecycleEvidenceIntakeArchiveVerification: true,
      readyForNodeV390RuntimeGatePlan: true,
      readyForRuntimeLiveReadGate: false,
      activeNodeVersion: "Node v389",
      sourceNodeVersion: "Node v388",
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
      sourceNodeV388: {
        sourceVersion: "Node v388",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-evidence-intake.v1",
        intakeState: "java-mini-kv-declared-operator-lifecycle-evidence-intake-ready",
        intakeDecision: "consume-java-v161-and-mini-kv-v152-declared-operator-lifecycle-evidence",
        readyForDeclaredOperatorLifecycleEvidenceIntake: true,
        readyForNodeV389ArchiveVerification: true,
        readyForRuntimeLiveReadGate: false,
        activeNodeVersion: "Node v388",
        sourceNodeVersion: "Node v387",
        evidenceIntakeOnly: true,
        declaredOperatorLifecycleEvidencePresent: true,
        runtimeGateRequiresSeparateApproval: true,
        javaDeclaredOperatorLifecycleVersion: "Java v161",
        miniKvDeclaredOperatorLifecycleReleaseVersion: "v152",
        miniKvFrozenOperatorTemplateReleaseVersion: "v151",
        declaredOperatorEvidenceSourceCount: 2,
        readyEvidenceSourceCount: 3,
        miniKvRequiredBeforeRuntimeGateCount: 4,
        liveReadGateAllowed: false,
        runtimeProbeAllowed: false,
        activeShardPrototypeEnabled: false,
        checkCount: 45,
        passedCheckCount: 45,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
        javaDeclaredOperatorLifecycleUsesHistoricalFallback: true,
        miniKvDeclaredOperatorLifecycleUsesHistoricalFallback: true,
        miniKvFrozenOperatorTemplateUsesHistoricalFallback: true,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        connectsManagedAudit: false,
        executionAllowed: false,
      },
      replay: {
        replayState: "ready",
        readyForDeclaredOperatorLifecycleEvidenceIntake: true,
        readyForRuntimeLiveReadGate: false,
        declaredOperatorLifecycleEvidencePresent: true,
        runtimeGateRequiresSeparateApproval: true,
        javaDeclaredOperatorLifecycleUsedHistoricalFallback: true,
        miniKvDeclaredOperatorLifecycleUsedHistoricalFallback: true,
        miniKvFrozenOperatorTemplateUsedHistoricalFallback: true,
        javaDeclaredOperatorLifecycleVersion: "Java v161",
        miniKvDeclaredOperatorLifecycleReleaseVersion: "v152",
        miniKvFrozenOperatorTemplateReleaseVersion: "v151",
        declaredOperatorEvidenceSourceCount: 2,
        readyEvidenceSourceCount: 3,
        miniKvRequiredBeforeRuntimeGateCount: 4,
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
        verificationMode: "java-mini-kv-declared-operator-lifecycle-evidence-intake-archive-verification",
        sourceSpan: "Node v388 declared operator lifecycle evidence intake",
        archiveRoot: "e/388",
        archiveVerificationDecision: "archive-declared-operator-lifecycle-evidence-intake-and-prepare-v390-runtime-gate-plan",
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
        nextNodeVersionSuggested: "Node v390",
      },
      checks: {
        archiveFilesPresent: true,
        jsonEvidenceReadable: true,
        jsonProfileVersionValid: true,
        jsonIntakeReady: true,
        jsonSourceNodeV387ArchiveVerified: true,
        jsonEvidenceVersionsMatch: true,
        jsonRuntimeGateClosed: true,
        jsonRuntimeGateRequiresSeparateApproval: true,
        jsonActiveShardPrototypeDisabled: true,
        jsonIntakeDigestStable: true,
        jsonChecksAllPassed: true,
        jsonUsesFrozenHistoricalSnapshots: true,
        jsonDeclaredOperatorEvidencePresent: true,
        summaryMatchesJson: true,
        markdownRecordsDeclaredOperatorLifecycle: true,
        browserSnapshotPresent: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsRuntimeGateBlockedAndChecks: true,
        codeWalkthroughPresent: true,
        sourcePlanPointsToV389ArchiveVerification: true,
        planIndexReferencesV388AndV389: true,
        archiveIndexReferencesV388: true,
        routeRecordedInArchive: true,
        replayReady: true,
        replayUsesFrozenJavaV161MiniKvV152AndV151: true,
        replayKeepsRuntimeGateClosed: true,
        replayKeepsActiveShardPrototypeDisabled: true,
        replayKeepsDeclaredOperatorEvidence: true,
        archiveVerificationDoesNotRerunLiveRead: true,
        noAutomaticUpstreamStartStop: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        archiveVerificationDigestStable: true,
        readyForDeclaredOperatorLifecycleEvidenceIntakeArchiveVerification: true,
      },
      summary: {
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        sourceCheckCount: 45,
        sourcePassedCheckCount: 45,
        replayCheckCount: 45,
        replayPassedCheckCount: 45,
        declaredOperatorEvidenceSourceCount: 2,
        checkCount: 38,
        passedCheckCount: 38,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV388.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("fails closed when the v388 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v389-empty-"));

    try {
      const profile = withForcedHistoricalFallback(() =>
        loadDeclaredArchive({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        }));

      expect(profile.archiveVerificationState).toBe("blocked");
      expect(profile.archiveVerificationDecision).toBe("blocked");
      expect(profile.readyForDeclaredOperatorLifecycleEvidenceIntakeArchiveVerification).toBe(false);
      expect(profile.readyForNodeV390RuntimeGatePlan).toBe(false);
      expect(profile.readyForRuntimeLiveReadGate).toBe(false);
      expect(profile.summary.presentArchiveFileCount).toBe(0);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "ARCHIVE_FILES_MISSING",
        "ARCHIVE_JSON_UNREADABLE",
        "SOURCE_V388_NOT_READY",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-evidence-intake-archive-verification.v1",
        archiveVerificationState: "java-mini-kv-declared-operator-lifecycle-evidence-intake-archive-verified",
        activeNodeVersion: "Node v389",
        sourceNodeVersion: "Node v388",
        archiveVerificationOnly: true,
        readyForNodeV390RuntimeGatePlan: true,
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
        "# Managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle evidence intake archive verification",
      );
      expect(markdown.body).toContain(
        "Archive verification decision: archive-declared-operator-lifecycle-evidence-intake-and-prepare-v390-runtime-gate-plan",
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
    "x-orderops-operator-id": "auditor-389",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v389-declared-operator-lifecycle-evidence-intake-archive",
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
