import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification,
} from "../src/services/managedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection fake transport packet upstream echo verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies Node v255/v256 with Java v103 and mini-kv v112 without opening a connection", () => {
    const profile = loadManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification.v1",
      verificationState: "fake-transport-packet-upstream-echo-verification-ready",
      readyForManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification: true,
      readOnlyUpstreamEchoVerification: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
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
        fakeTransportOnly: true,
        dryRunOnly: true,
        credentialValueIncluded: false,
        rawEndpointUrlIncluded: false,
        payloadMayContainSecrets: false,
        connectionAttempted: false,
        externalRequestSent: false,
        credentialValueRead: false,
        schemaMigrationExecuted: false,
        productionRecordWritten: false,
        javaStarted: false,
        miniKvStarted: false,
      },
      sourceNodeV256: {
        sourceVersion: "Node v256",
        archiveVerificationState: "fake-transport-packet-archive-verification-ready",
        readyForArchiveVerification: true,
        archiveFileCount: 5,
        requiredSnippetCount: 19,
        matchedSnippetCount: 19,
        archiveVerificationRerunsFakeTransportBehavior: false,
        readOnlyArchiveVerification: true,
        noTempDryRunDirectoryCreated: true,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
      },
      upstreamEchoes: {
        javaV103: {
          sourceVersion: "Java v103",
          responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v25",
          markerField: "managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker",
          consumedByNodeV255Profile:
            "managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet.v1",
          consumedByNodeV256Profile:
            "managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification.v1",
          nextNodeConsumerVersion: "Node v257",
          requestShapeFieldCount: 8,
          responseShapeFieldCount: 9,
          failureMappingCount: 6,
          guardConditionCount: 7,
          timeoutBudgetMs: 15000,
          cleanupArtifactCount: 0,
          credentialValueIncluded: false,
          rawEndpointUrlIncluded: false,
          payloadMayContainSecrets: false,
          connectionAttempted: false,
          externalRequestSent: false,
          credentialValueRead: false,
          schemaMigrationExecuted: false,
          productionRecordWritten: false,
          javaStarted: false,
          miniKvStarted: false,
          externalAuditServiceStarted: false,
          readyForManagedAuditSandboxAdapterConnection: false,
          readyForNodeV257FakeTransportPacketUpstreamEchoVerification: true,
          readyForNodeV257Alignment: true,
        },
        miniKvV112: {
          sourceVersion: "mini-kv v112",
          receiptVersion: "mini-kv-fake-transport-dry-run-packet-non-participation-receipt.v1",
          releaseVersion: "v112",
          consumerHint: "Node v257 fake transport packet upstream echo verification",
          sourcePacketProfileVersion:
            "managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet.v1",
          sourcePacketState: "fake-transport-adapter-dry-run-verification-packet-ready",
          sourceArchiveState: "fake-transport-packet-archive-verification-ready",
          sourceArchiveRerunsFakeTransportBehavior: false,
          sourceReadyForFakeTransportPacket: true,
          sourceReadyForManagedAuditSandboxAdapterConnection: false,
          sourceFakeTransportOnly: true,
          sourceDryRunOnly: true,
          sourceRequestShapeFieldCount: 8,
          sourceResponseShapeFieldCount: 9,
          sourceFailureMappingCount: 6,
          sourceTimeoutBudgetMs: 15000,
          sourceCleanupArtifactCount: 0,
          sourceCleanupVerified: true,
          sourceTemporaryDirectoryCreated: false,
          sourceTemporaryFileCreated: false,
          requestCredentialValueIncluded: false,
          requestRawEndpointUrlIncluded: false,
          requestPayloadMayContainSecrets: false,
          responseConnectionAttempted: false,
          responseExternalRequestSent: false,
          responseCredentialValueRead: false,
          responseSchemaMigrationExecuted: false,
          responseProductionRecordWritten: false,
          readOnly: true,
          executionAllowed: false,
          dryRunOnly: true,
          nodeAutoStartAllowed: false,
          javaAutoStartAllowed: false,
          miniKvAutoStartAllowed: false,
          externalAuditServiceAutoStartAllowed: false,
          storageWriteAllowed: false,
          managedAuditWriteExecuted: false,
          credentialValueReadAllowed: false,
          credentialValueLoaded: false,
          externalRequestSent: false,
          temporaryDirectoryCreated: false,
          temporaryFileCreated: false,
          cleanupArtifactCount: 0,
          restoreExecutionAllowed: false,
          loadRestoreCompactExecuted: false,
          setnxexExecutionAllowed: false,
          managedAuditStorageBackend: false,
          orderAuthoritative: false,
          readyForNodeV257Alignment: true,
        },
      },
      echoVerification: {
        verificationMode: "java-v103-plus-mini-kv-v112-fake-transport-packet-upstream-echo-verification-only",
        sourceSpan: "Node v255 + Node v256 + Java v103 + mini-kv v112",
        requestShapeAligned: true,
        responseShapeAligned: true,
        timeoutBoundaryAligned: true,
        failureMappingAligned: true,
        cleanupBoundaryAligned: true,
        archiveNoRerunAligned: true,
        credentialBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        nodeV257BlocksRealConnection: true,
      },
      checks: {
        sourceNodeV255Ready: true,
        sourceNodeV256Ready: true,
        sourceNodeBoundariesStillClosed: true,
        javaV103EchoReady: true,
        miniKvV112NonParticipationReady: true,
        requestShapeAligned: true,
        responseShapeAligned: true,
        timeoutBoundaryAligned: true,
        failureMappingAligned: true,
        cleanupBoundaryAligned: true,
        archiveNoRerunAligned: true,
        credentialBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification: true,
      },
      summary: {
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV255.packetDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV256.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.upstreamEchoes.miniKvV112.receiptDigest).toMatch(/^fnv1a64:[a-f0-9]{16}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.summary.evidenceFileCount).toBe(6);
    expect(profile.summary.matchedSnippetCount).toBe(33);
  });

  it("uses committed historical fixture fallback for GitHub runner style checks", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile.verificationState).toBe("fake-transport-packet-upstream-echo-verification-ready");
    expect(profile.upstreamEchoes.javaV103.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamEchoes.miniKvV112.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamEchoes.javaV103.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/c/103/解释/说明.md",
    );
    expect(profile.upstreamEchoes.miniKvV112.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/fake-transport-dry-run-packet-non-participation-receipt.json",
    );
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
  });

  it("exposes JSON and Markdown routes through the audit route table", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification.v1",
        verificationState: "fake-transport-packet-upstream-echo-verification-ready",
        upstreamEchoes: {
          javaV103: {
            nextNodeConsumerVersion: "Node v257",
            readyForNodeV257Alignment: true,
          },
          miniKvV112: {
            releaseVersion: "v112",
            sourceArchiveRerunsFakeTransportBehavior: false,
            storageWriteAllowed: false,
          },
        },
        checks: {
          requestShapeAligned: true,
          cleanupBoundaryAligned: true,
          autoStartBoundaryAligned: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection fake transport packet upstream echo verification",
      );
      expect(markdown.body).toContain("fake-transport-packet-upstream-echo-verification-ready");
      expect(markdown.body).toContain("WRITE_NEXT_PLAN_BEFORE_REAL_ENDPOINT");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-257",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v257-fake-transport-packet-upstream-echo-verification",
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
    PORT: "4357",
    ...overrides,
  });
}
