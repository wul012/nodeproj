import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerification.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-live-read-archive-verification";

describe("managed audit manual sandbox connection credential resolver minimal shard readiness live-read archive verification", () => {
  it("verifies the Node v371 live-read archive without rerunning Java or mini-kv reads", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerification({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-live-read-archive-verification.v1",
      archiveVerificationState: "minimal-shard-readiness-live-read-archive-verified",
      archiveVerificationDecision: "archive-minimal-shard-readiness-live-read-and-prepare-compatibility-report",
      readyForMinimalShardReadinessLiveReadArchiveVerification: true,
      readyForNodeV373ShardReadinessCompatibilityReport: true,
      consumesNodeV371MinimalShardReadinessLiveReadGate: true,
      activeNodeVersion: "Node v372",
      sourceNodeVersion: "Node v371",
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
      sourceNodeV371: {
        sourceVersion: "Node v371",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-live-read-gate.v1",
        gateState: "minimal-shard-readiness-live-read-gate-ready",
        gateDecision: "archive-minimal-shard-readiness-live-read",
        readyForMinimalShardReadinessLiveReadGate: true,
        readyForNodeV372LiveReadArchiveVerification: true,
        activeNodeVersion: "Node v371",
        sourceNodeVersion: "Node v370",
        sourceNodeV370Ready: true,
        liveReadOnly: true,
        javaStatus: "passed-read",
        miniKvStatus: "passed-read",
        attemptedReadCount: 2,
        passedReadCount: 2,
        failedReadCount: 0,
        skippedReadCount: 0,
        checkCount: 27,
        passedCheckCount: 27,
        productionBlockerCount: 0,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        mutatesJavaState: false,
        mutatesMiniKvState: false,
        connectsManagedAudit: false,
        sendsManagedAuditHttpTcp: false,
        executionAllowed: false,
      },
      liveReads: {
        java: {
          project: "advanced-order-platform",
          sourceVersion: "Java v153 live",
          attempted: true,
          status: "passed-read",
          transport: "http-json",
          endpoint: "GET /api/v1/ops/shard-readiness",
          command: null,
          readOnlySafe: true,
          executionBlocked: true,
          compatibleWithV370Evidence: true,
          readyForGate: true,
        },
        miniKv: {
          project: "mini-kv",
          sourceVersion: "mini-kv v144 live",
          attempted: true,
          status: "passed-read",
          transport: "tcp-command",
          command: "SHARDJSON",
          readOnlySafe: true,
          executionBlocked: true,
          compatibleWithV370Evidence: true,
          boundarySafe: true,
          readyForGate: true,
        },
      },
      archiveVerification: {
        verificationMode: "minimal-shard-readiness-live-read-archive-verification",
        sourceSpan: "Node v371 minimal shard readiness live-read gate",
        archiveRoot: "e/371",
        archiveVerificationDecision: "archive-minimal-shard-readiness-live-read-and-prepare-compatibility-report",
        verifiesJsonMarkdownAndSummary: true,
        verifiesScreenshotExplanationAndWalkthrough: true,
        verifiesPlanAndArchiveIndexes: true,
        verifiesNoLiveReadRerun: true,
        rerunsLiveRead: false,
        startsUpstreamServices: false,
        stopsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        nextNodeVersionSuggested: "Node v373",
      },
      checks: {
        archiveFilesPresent: true,
        jsonEvidenceReadable: true,
        jsonProfileVersionValid: true,
        jsonGateReady: true,
        jsonSourceNodeV370Ready: true,
        jsonGateDigestStable: true,
        jsonBothLiveReadsPassed: true,
        jsonLiveReadCountsMatch: true,
        jsonChecksAllPassed: true,
        summaryMatchesJson: true,
        markdownRecordsGateAndReads: true,
        browserSnapshotPresent: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsLiveReadAndBoundary: true,
        codeWalkthroughPresent: true,
        sourcePlanPointsToV372: true,
        planIndexReferencesV371AndV372: true,
        archiveIndexReferencesV371: true,
        routeRecordedInArchive: true,
        archiveVerificationDoesNotRerunLiveRead: true,
        noAutomaticUpstreamStartStop: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        archiveVerificationDigestStable: true,
        readyForMinimalShardReadinessLiveReadArchiveVerification: true,
      },
      summary: {
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        sourceCheckCount: 27,
        sourcePassedCheckCount: 27,
        attemptedReadCount: 2,
        passedReadCount: 2,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV371.gateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV371.sourceNodeV370GateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("fails closed when the v371 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v372-empty-"));

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerification({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        });

      expect(profile.archiveVerificationState).toBe("blocked");
      expect(profile.archiveVerificationDecision).toBe("blocked");
      expect(profile.readyForMinimalShardReadinessLiveReadArchiveVerification).toBe(false);
      expect(profile.readyForNodeV373ShardReadinessCompatibilityReport).toBe(false);
      expect(profile.summary.presentArchiveFileCount).toBe(0);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "ARCHIVE_FILES_MISSING",
        "ARCHIVE_JSON_UNREADABLE",
        "SOURCE_GATE_NOT_READY",
      ]));
      expect(profile.rerunsLiveRead).toBe(false);
      expect(profile.startsJavaService).toBe(false);
      expect(profile.startsMiniKvService).toBe(false);
      expect(profile.connectsManagedAudit).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-live-read-archive-verification.v1",
        archiveVerificationState: "minimal-shard-readiness-live-read-archive-verified",
        activeNodeVersion: "Node v372",
        sourceNodeVersion: "Node v371",
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
        "# Managed audit manual sandbox connection credential resolver minimal shard readiness live-read archive verification",
      );
      expect(markdown.body).toContain(
        "Archive verification decision: archive-minimal-shard-readiness-live-read-and-prepare-compatibility-report",
      );
      expect(markdown.body).toContain("Ready for Node v373 shard readiness compatibility report: true");
      expect(markdown.body).toContain("Reruns live read: false");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("Stops mini-kv service: false");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-372",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v372-shard-readiness-archive",
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
