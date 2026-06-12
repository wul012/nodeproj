import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerification.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-regular-gate-archive-verification";

describe("managed audit manual sandbox connection credential resolver minimal shard readiness regular gate archive verification", () => {
  it("verifies the Node v374 regular gate archive without rerunning Java or mini-kv reads", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerification({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-regular-gate-archive-verification.v1",
      archiveVerificationState: "minimal-shard-readiness-regular-gate-archive-verified",
      archiveVerificationDecision: "archive-minimal-shard-readiness-regular-gate-and-consume-v154-v145",
      readyForMinimalShardReadinessRegularGateArchiveVerification: true,
      readyForNodeV376JavaMiniKvShardEvidenceConsumption: true,
      consumesNodeV374MinimalShardReadinessRegularGate: true,
      activeNodeVersion: "Node v375",
      sourceNodeVersion: "Node v374",
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
      sourceNodeV374: {
        sourceVersion: "Node v374",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-regular-gate.v1",
        gateState: "minimal-shard-readiness-regular-gate-ready",
        gateDecision: "freeze-minimal-shard-readiness-regular-gate",
        readyForMinimalShardReadinessRegularGate: true,
        readyForNodeV375RegularGateArchiveVerification: true,
        activeNodeVersion: "Node v374",
        sourceNodeVersion: "Node v373",
        sourceNodeV373Ready: true,
        sourceProjectReportCount: 2,
        sourceCompatibleProjectCount: 2,
        sourceFieldCheckCount: 18,
        sourceMatchedFieldCheckCount: 18,
        sourceMismatchedFieldCount: 0,
        checkCount: 18,
        passedCheckCount: 18,
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
      archiveVerification: {
        verificationMode: "minimal-shard-readiness-regular-gate-archive-verification",
        sourceSpan: "Node v374 minimal shard readiness regular gate",
        archiveRoot: "e/374",
        archiveVerificationDecision: "archive-minimal-shard-readiness-regular-gate-and-consume-v154-v145",
        verifiesJsonMarkdownAndSummary: true,
        verifiesScreenshotExplanationAndWalkthrough: true,
        verifiesPlanAndArchiveIndexes: true,
        verifiesNoLiveReadRerun: true,
        rerunsLiveRead: false,
        startsUpstreamServices: false,
        stopsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        nextNodeVersionSuggested: "Node v376",
      },
      checks: {
        archiveFilesPresent: true,
        jsonEvidenceReadable: true,
        jsonProfileVersionValid: true,
        jsonGateReady: true,
        jsonSourceNodeV373Ready: true,
        jsonRegularGateDigestStable: true,
        jsonChecksAllPassed: true,
        summaryMatchesJson: true,
        markdownRecordsRegularGate: true,
        browserSnapshotPresent: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsRegularGateAndBoundary: true,
        codeWalkthroughPresent: true,
        sourcePlanPointsToV375AndV376: true,
        planIndexReferencesV374AndV375: true,
        archiveIndexReferencesV374: true,
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
        readyForMinimalShardReadinessRegularGateArchiveVerification: true,
      },
      summary: {
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        sourceCheckCount: 18,
        sourcePassedCheckCount: 18,
        sourceFieldCheckCount: 18,
        sourceMatchedFieldCheckCount: 18,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV374.regularGateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV374.sourceCompatibilityReportDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("fails closed when the v374 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v375-empty-"));

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerification({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        });

      expect(profile.archiveVerificationState).toBe("blocked");
      expect(profile.archiveVerificationDecision).toBe("blocked");
      expect(profile.readyForMinimalShardReadinessRegularGateArchiveVerification).toBe(false);
      expect(profile.readyForNodeV376JavaMiniKvShardEvidenceConsumption).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-regular-gate-archive-verification.v1",
        archiveVerificationState: "minimal-shard-readiness-regular-gate-archive-verified",
        activeNodeVersion: "Node v375",
        sourceNodeVersion: "Node v374",
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
        "# Managed audit manual sandbox connection credential resolver minimal shard readiness regular gate archive verification",
      );
      expect(markdown.body).toContain(
        "Archive verification decision: archive-minimal-shard-readiness-regular-gate-and-consume-v154-v145",
      );
      expect(markdown.body).toContain("Ready for Node v376 Java/mini-kv shard evidence consumption: true");
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
    "x-orderops-operator-id": "auditor-375",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v375-shard-regular-gate-archive",
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
