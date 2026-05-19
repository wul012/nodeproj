import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket,
} from "../src/services/managedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket.js";

describe("managed audit manual sandbox connection fake transport adapter dry-run verification packet", () => {
  it("builds an in-memory fake transport packet without connection side effects", () => {
    const profile = loadManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet.v1",
      packetState: "fake-transport-adapter-dry-run-verification-packet-ready",
      readyForManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      fakeTransportOnly: true,
      dryRunOnly: true,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV253: {
        sourceVersion: "Node v253",
        shellContractState: "test-only-adapter-shell-contract-ready",
        readyForTestOnlyAdapterShellContract: true,
        transportKind: "fake-in-memory",
        fakeTransportOnly: true,
        realClientImplemented: false,
        realTransportAllowed: false,
        requestShapeFieldCount: 8,
        responseShapeFieldCount: 9,
        failureMappingCount: 6,
        guardConditionCount: 7,
        externalRequestSent: false,
        credentialValueRead: false,
        productionRecordWritten: false,
      },
      sourceNodeV254: {
        sourceVersion: "Node v254",
        verificationState: "disabled-adapter-client-upstream-echo-verification-ready",
        readyForUpstreamEchoVerification: true,
        javaV102EchoReady: true,
        miniKvV111NonParticipationReady: true,
        envHandleCountAligned: true,
        failureClassCountAligned: true,
        dryRunResponseShapeAligned: true,
        fakeTransportShapeAligned: true,
        credentialBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        readyForSandboxAdapterConnection: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
      },
      fakeTransportDryRunPacket: {
        packetMode: "fake-transport-adapter-dry-run-verification-only",
        sourceSpan: "Node v253 + Node v254",
        request: {
          requestId: "managed-audit-v255-fake-transport-dry-run",
          operation: "managed-audit-sandbox-connection-dry-run",
          transportKind: "fake-in-memory",
          credentialHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
          endpointHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
          timeoutBudgetMs: 15000,
          dryRun: true,
          fakeTransportOnly: true,
          credentialValueIncluded: false,
          rawEndpointUrlIncluded: false,
          payloadMayContainSecrets: false,
          requestShapeFieldCount: 8,
        },
        response: {
          requestId: "managed-audit-v255-fake-transport-dry-run",
          status: "fake-transport-dry-run-accepted",
          code: "TEST_ONLY_FAKE_TRANSPORT_DRY_RUN",
          fakeTransportOnly: true,
          timeoutBudgetMs: 15000,
          connectionAttempted: false,
          externalRequestSent: false,
          credentialValueRead: false,
          schemaMigrationExecuted: false,
          productionRecordWritten: false,
          responseShapeFieldCount: 9,
        },
        timeoutBudget: {
          timeoutBudgetMs: 15000,
          finiteBudget: true,
          budgetSource: "operator-review-field",
          budgetSpent: false,
          timerStarted: false,
          timeoutClassifiable: true,
        },
        failureMappingVerification: {
          sourceFailureMappingCount: 6,
          mappedFailureCount: 6,
          allFailuresNonRetryable: true,
          credentialValueRequestStillBlocked: true,
          manualWindowClosedStillBlocked: true,
          failureMappingCovered: true,
        },
        cleanup: {
          inMemoryOnly: true,
          temporaryDirectoryCreated: false,
          temporaryFileCreated: false,
          cleanupRequired: false,
          cleanupArtifactCount: 0,
          cleanupVerified: true,
          nodeServiceStartedByPacket: false,
        },
        boundaries: {
          connectionAttempted: false,
          externalRequestSent: false,
          credentialValueRead: false,
          schemaMigrationExecuted: false,
          productionRecordWritten: false,
          javaStarted: false,
          miniKvStarted: false,
          externalAuditServiceStarted: false,
        },
      },
      checks: {
        sourceNodeV253Ready: true,
        sourceNodeV254Ready: true,
        sourceBoundariesStillClosed: true,
        fakeTransportOnly: true,
        requestShapeMatchesShell: true,
        responseShapeMatchesShell: true,
        timeoutBudgetVerified: true,
        failureMappingVerified: true,
        cleanupVerified: true,
        credentialBoundaryClosed: true,
        connectionBoundaryClosed: true,
        writeBoundaryClosed: true,
        autoStartBoundaryClosed: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket: true,
      },
      summary: {
        requestShapeFieldCount: 8,
        responseShapeFieldCount: 9,
        failureMappingCount: 6,
        timeoutBudgetMs: 15000,
        cleanupArtifactCount: 0,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV253.contractDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV254.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.fakeTransportDryRunPacket.packetDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.fakeTransportDryRunPacket.request.requestDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.fakeTransportDryRunPacket.response.responseDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.packetState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket).toBe(false);
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
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet.v1",
        packetState: "fake-transport-adapter-dry-run-verification-packet-ready",
        fakeTransportDryRunPacket: {
          request: {
            credentialValueIncluded: false,
            rawEndpointUrlIncluded: false,
          },
          response: {
            externalRequestSent: false,
            credentialValueRead: false,
          },
          cleanup: {
            temporaryDirectoryCreated: false,
            cleanupVerified: true,
          },
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection fake transport adapter dry-run verification packet",
      );
      expect(markdown.body).toContain("fake-transport-adapter-dry-run-verification-packet-ready");
      expect(markdown.body).toContain("TEST_ONLY_FAKE_TRANSPORT_DRY_RUN");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-255",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v255-fake-transport-adapter-dry-run-verification-packet",
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
    PORT: "4355",
    ...overrides,
  });
}
