import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification.js";

describe("managed audit manual sandbox connection fake transport packet archive verification", () => {
  it("verifies v255 archive evidence without rerunning fake transport behavior", () => {
    const profile = loadManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification.v1",
      archiveVerificationState: "fake-transport-packet-archive-verification-ready",
      readyForManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyArchiveVerification: true,
      archiveVerificationRerunsFakeTransportBehavior: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV255: {
        sourceVersion: "Node v255",
        packetState: "fake-transport-adapter-dry-run-verification-packet-ready",
        readyForFakeTransportPacket: true,
        requestShapeFieldCount: 8,
        responseShapeFieldCount: 9,
        failureMappingCount: 6,
        timeoutBudgetMs: 15000,
        cleanupArtifactCount: 0,
        cleanupVerified: true,
        temporaryDirectoryCreated: false,
        temporaryFileCreated: false,
        fakeTransportOnly: true,
        connectionAttempted: false,
        externalRequestSent: false,
        credentialValueRead: false,
        schemaMigrationExecuted: false,
        productionRecordWritten: false,
        javaStarted: false,
        miniKvStarted: false,
      },
      archiveVerification: {
        evidenceSpan: "Node v255 fake transport adapter dry-run packet archive",
        sourceRoutePath:
          "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet",
        archiveVerificationReadsFilesOnly: true,
        archiveVerificationRerunsFakeTransportBehavior: false,
        upstreamActionsEnabled: false,
        productionAuditAllowed: false,
      },
      archivedEvidence: {
        archiveRoot: "c/255/",
        sourceVersion: "Node v255",
        requiredSnippetCount: 19,
        matchedSnippetCount: 19,
      },
      checks: {
        sourceNodeV255Ready: true,
        sourcePacketDigestValid: true,
        sourceRequestDigestValid: true,
        sourceResponseDigestValid: true,
        sourceCleanupEvidenceVerified: true,
        archiveFilesPresent: true,
        archiveFilesNonEmpty: true,
        htmlArchivePresent: true,
        screenshotPresent: true,
        screenshotNonEmpty: true,
        explanationPresent: true,
        codeWalkthroughPresent: true,
        archiveSnippetsMatched: true,
        htmlRecordsFakeTransportBlocked: true,
        explanationRecordsSmokeAndCleanup: true,
        walkthroughRecordsImplementationAndVerification: true,
        planPointsToV256: true,
        routeResponseVerified: true,
        noArchiveVerificationFakeTransportRerun: true,
        noTempDryRunDirectoryCreated: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification: true,
      },
      summary: {
        archiveFileCount: 5,
        requiredSnippetCount: 19,
        matchedSnippetCount: 19,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV255.packetDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV255.requestDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV255.responseDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archivedEvidence.files.every((file) => file.exists && file.sizeBytes > 0 && file.digest?.length === 64)).toBe(true);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.archiveVerificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.archiveVerificationRerunsFakeTransportBehavior).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
  });

  it("exposes JSON and Markdown routes through the audit route table", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification.v1",
        archiveVerificationState: "fake-transport-packet-archive-verification-ready",
        readOnlyArchiveVerification: true,
        archiveVerificationRerunsFakeTransportBehavior: false,
        sourceNodeV255: {
          cleanupVerified: true,
          temporaryDirectoryCreated: false,
          temporaryFileCreated: false,
        },
        checks: {
          archiveFilesPresent: true,
          archiveSnippetsMatched: true,
          noArchiveVerificationFakeTransportRerun: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection fake transport packet archive verification",
      );
      expect(markdown.body).toContain("fake-transport-packet-archive-verification-ready");
      expect(markdown.body).toContain("RUN_PARALLEL_JAVA_V103_MINI_KV_V112");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-256",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v256-fake-transport-packet-archive-verification",
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
    ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK: "true",
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
    AUDIT_STORE_URL: "managed-audit://contract-only",
    PORT: "4356",
    ...overrides,
  });
}
