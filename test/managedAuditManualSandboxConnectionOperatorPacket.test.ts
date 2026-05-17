import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionOperatorPacket,
} from "../src/services/managedAuditManualSandboxConnectionOperatorPacket.js";

describe("managed audit manual sandbox connection operator packet", () => {
  it("turns the v227 checklist into a manual operator packet without opening a connection", () => {
    const profile = loadManagedAuditManualSandboxConnectionOperatorPacket({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-operator-packet.v1",
      packetState: "manual-sandbox-connection-operator-packet-ready",
      readyForManagedAuditManualSandboxConnectionOperatorPacket: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyPacket: true,
      executionAllowed: false,
      restoreExecutionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV227: {
        sourceVersion: "Node v227",
        profileVersion: "managed-audit-manual-sandbox-connection-evidence-checklist.v1",
        checklistState: "manual-sandbox-connection-evidence-checklist-ready",
        readyForChecklist: true,
        readyForConnectionFromSource: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        schemaMigrationExecuted: false,
        checklistItemCount: 8,
        requiredChecklistItemCount: 8,
        productionBlockerCount: 0,
        warningCount: 2,
      },
      operatorPacket: {
        ownerApprovalArtifactIdField: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID",
        credentialHandleName: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
        schemaRehearsalIdField: "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID",
        rollbackPathIdField: "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID",
        timeoutBudgetMs: 15000,
        manualAbortMarker: "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT",
        packetMode: "manual-sandbox-connection-operator-packet-only",
        manualReviewRequired: true,
        connectionExecutionAllowed: false,
        credentialValueRequired: false,
        schemaMigrationExecutionAllowed: false,
        managedAuditWriteAllowed: false,
        nodeAutoStartAllowed: false,
      },
      verification: {
        packetMode: "manual-sandbox-connection-operator-packet-only",
        requiredFieldCount: 6,
        credentialValueRequired: false,
        connectionExecutionAllowed: false,
        schemaMigrationExecutionAllowed: false,
        managedAuditWriteAllowed: false,
        automaticServiceStartAllowed: false,
        nodeV228BlocksRealConnection: true,
      },
      checks: {
        sourceChecklistReady: true,
        sourceChecklistStillConnectionBlocked: true,
        sourceChecklistDigestPresent: true,
        operatorFieldsListed: true,
        ownerArtifactFieldPresent: true,
        credentialHandleNameFieldPresent: true,
        schemaRehearsalFieldPresent: true,
        rollbackPathFieldPresent: true,
        timeoutBudgetFieldPresent: true,
        manualAbortMarkerPresent: true,
        packetDigestPresent: true,
        credentialValueStillForbidden: true,
        schemaMigrationStillBlocked: true,
        externalConnectionStillBlocked: true,
        managedAuditWritesStillBlocked: true,
        automaticServiceStartStillBlocked: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionOperatorPacket: true,
      },
      summary: {
        operatorFieldCount: 6,
        requiredOperatorFieldCount: 6,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV227.checklistDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.operatorPacket.packetDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.verification.packetDigest).toBe(profile.operatorPacket.packetDigest);
    expect(profile.operatorFields.map((field) => field.id)).toEqual([
      "ownerApprovalArtifactId",
      "credentialHandleName",
      "schemaRehearsalId",
      "rollbackPathId",
      "timeoutBudgetMs",
      "manualAbortMarker",
    ]);
  });

  it("blocks the operator packet when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionOperatorPacket({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.packetState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionOperatorPacket).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
    expect(profile.operatorPacket.connectionExecutionAllowed).toBe(false);
  });

  it("exposes JSON and Markdown routes for v228 operator packet", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-packet",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-packet?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-operator-packet.v1",
        packetState: "manual-sandbox-connection-operator-packet-ready",
        readyForManagedAuditSandboxAdapterConnection: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit manual sandbox connection operator packet");
      expect(markdown.body).toContain("OPERATOR_PACKET_ONLY_NO_CONNECTION");
      expect(markdown.body).toContain("ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-228",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v228-operator-packet",
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
