import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionPacketVerification,
} from "../src/services/managedAuditManualSandboxConnectionPacketVerification.js";

describe("managed audit manual sandbox connection packet verification", () => {
  it("verifies the v228 operator packet against Java v87 and mini-kv v96 markers without connecting", () => {
    const profile = loadManagedAuditManualSandboxConnectionPacketVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-packet-verification.v1",
      verificationState: "manual-sandbox-connection-packet-verification-ready",
      readyForManagedAuditManualSandboxConnectionPacketVerification: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyVerification: true,
      executionAllowed: false,
      restoreExecutionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV228: {
        sourceVersion: "Node v228",
        profileVersion: "managed-audit-manual-sandbox-connection-operator-packet.v1",
        packetState: "manual-sandbox-connection-operator-packet-ready",
        readyForOperatorPacket: true,
        readyForConnectionFromSource: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        schemaMigrationExecuted: false,
        operatorFieldCount: 6,
        requiredOperatorFieldCount: 6,
      },
      upstreamMarkers: {
        javaV87: {
          sourceVersion: "Java v87",
          headTag: "v87订单平台release-approval-sandbox-connection-operator-handoff-marker",
          evidencePresent: true,
          markerFieldPresent: true,
          readyFieldDocumented: true,
          ownerArtifactEchoDocumented: true,
          credentialHandleEchoDocumented: true,
          schemaRehearsalEchoDocumented: true,
          rollbackTimeoutAbortEchoDocumented: true,
          noLedgerWriteBoundary: true,
          noSqlBoundary: true,
          noCredentialBoundary: true,
          readyForNodeV229PacketVerification: true,
        },
        miniKvV96: {
          sourceVersion: "mini-kv v96",
          headTag: "第九十六版沙箱连接回声收据标记",
          evidencePresent: true,
          projectVersion: "0.102.0",
          releaseVersion: "v102",
          markerDigest: "fnv1a64:beb8dd6a0b102a11",
          consumedReceiptDigest: "fnv1a64:ceaed265f7f9560c",
          sourceOperatorPacketProfile: "managed-audit-manual-sandbox-connection-operator-packet.v1",
          packetMode: "manual-sandbox-connection-operator-packet-only",
          ownerArtifactEchoed: true,
          credentialHandleEchoed: true,
          schemaRehearsalEchoed: true,
          rollbackPathEchoed: true,
          manualAbortMarkerEchoed: true,
          readOnly: true,
          connectionExecutionAllowed: false,
          credentialValueReadAllowed: false,
          schemaMigrationExecutionAllowed: false,
          managedAuditWriteAllowed: false,
          participatesInSandboxConnection: false,
          nodeAutoStartAllowed: false,
          restoreExecutionAllowed: false,
          readyForNodeV229PacketVerification: true,
        },
      },
      packetVerification: {
        markerSpan: "Node v228 + Java v87 + mini-kv v96",
        verificationMode: "manual-sandbox-connection-packet-verification-only",
        javaMarkerAccepted: true,
        miniKvMarkerAccepted: true,
        operatorFieldsEchoed: true,
        connectionExecutionAllowed: false,
        credentialValueRequired: false,
        schemaMigrationExecutionAllowed: false,
        managedAuditWriteAllowed: false,
        automaticServiceStartAllowed: false,
        nodeV229BlocksRealConnection: true,
      },
      checks: {
        sourceNodeV228PacketReady: true,
        sourceNodeV228StillConnectionBlocked: true,
        sourceNodeV228PacketDigestPresent: true,
        javaV87EvidencePresent: true,
        javaV87OperatorHandoffAccepted: true,
        javaV87NoWriteNoSqlNoCredentialBoundaryAccepted: true,
        miniKvV96EvidencePresent: true,
        miniKvV96ReceiptEchoAccepted: true,
        miniKvV96BoundaryAccepted: true,
        operatorFieldsEchoedByBothUpstreams: true,
        credentialValueStillForbidden: true,
        schemaMigrationStillBlocked: true,
        externalConnectionStillBlocked: true,
        managedAuditWritesStillBlocked: true,
        automaticServiceStartStillBlocked: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionPacketVerification: true,
      },
      summary: {
        evidenceFileCount: 6,
        matchedSnippetCount: 16,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV228.packetDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.packetVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
  });

  it("blocks packet verification when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionPacketVerification({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionPacketVerification).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
    expect(profile.packetVerification.connectionExecutionAllowed).toBe(false);
  });

  it("exposes JSON and Markdown routes for v229 packet verification", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-packet-verification",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-packet-verification?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-packet-verification.v1",
        verificationState: "manual-sandbox-connection-packet-verification-ready",
        readyForManagedAuditSandboxAdapterConnection: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit manual sandbox connection packet verification");
      expect(markdown.body).toContain("PACKET_VERIFICATION_ONLY_NO_CONNECTION");
      expect(markdown.body).toContain("mini-kv v96");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-229",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v229-packet-verification",
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
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
    AUDIT_STORE_URL: "managed-audit://contract-only",
    PORT: "4320",
    ...overrides,
  });
}
