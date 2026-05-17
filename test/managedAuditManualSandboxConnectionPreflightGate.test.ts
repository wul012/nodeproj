import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionPreflightGate,
} from "../src/services/managedAuditManualSandboxConnectionPreflightGate.js";

describe("managed audit manual sandbox connection preflight gate", () => {
  it("turns v229 packet verification into a preflight gate without opening connection", () => {
    const profile = loadManagedAuditManualSandboxConnectionPreflightGate({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-preflight-gate.v1",
      gateState: "manual-sandbox-connection-preflight-gate-ready",
      readyForManagedAuditManualSandboxConnectionPreflightGate: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyGate: true,
      executionAllowed: false,
      restoreExecutionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV229: {
        sourceVersion: "Node v229",
        profileVersion: "managed-audit-manual-sandbox-connection-packet-verification.v1",
        verificationState: "manual-sandbox-connection-packet-verification-ready",
        readyForPacketVerification: true,
        readyForConnectionFromSource: false,
        javaMarkerAccepted: true,
        miniKvMarkerAccepted: true,
        operatorFieldsEchoed: true,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        schemaMigrationExecuted: false,
      },
      preflightGate: {
        gateMode: "manual-sandbox-connection-preflight-gate-only",
        ownerApprovalArtifactIdField: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID",
        credentialHandleName: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
        schemaRehearsalIdField: "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID",
        rollbackPathIdField: "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID",
        timeoutBudgetMs: 15000,
        manualAbortMarker: "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT",
        manualWindowFlagName: "ORDEROPS_MANAGED_AUDIT_MANUAL_SANDBOX_WINDOW_APPROVED",
        manualWindowFlagRequired: true,
        manualWindowOpenByDefault: false,
        manualReviewRequired: true,
        connectionExecutionAllowed: false,
        credentialValueRequired: false,
        schemaMigrationExecutionAllowed: false,
        managedAuditWriteAllowed: false,
        nodeAutoStartAllowed: false,
      },
      checks: {
        sourceNodeV229VerificationReady: true,
        sourceNodeV229StillConnectionBlocked: true,
        sourceNodeV229DigestPresent: true,
        upstreamMarkersAccepted: true,
        operatorFieldsEchoedBeforeGate: true,
        preflightFieldsListed: true,
        ownerArtifactFieldPresent: true,
        credentialHandleNameFieldPresent: true,
        schemaRehearsalFieldPresent: true,
        rollbackPathFieldPresent: true,
        timeoutBudgetFieldPresent: true,
        manualAbortMarkerPresent: true,
        manualWindowFlagPresent: true,
        manualWindowClosedByDefault: true,
        gateDigestPresent: true,
        credentialValueStillForbidden: true,
        schemaMigrationStillBlocked: true,
        externalConnectionStillBlocked: true,
        managedAuditWritesStillBlocked: true,
        automaticServiceStartStillBlocked: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionPreflightGate: true,
      },
      summary: {
        preflightFieldCount: 7,
        requiredPreflightFieldCount: 7,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV229.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV229.sourcePacketDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preflightGate.gateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preflightFields.map((field) => field.id)).toEqual([
      "ownerApprovalArtifactId",
      "credentialHandleName",
      "schemaRehearsalId",
      "rollbackPathId",
      "timeoutBudgetMs",
      "manualAbortMarker",
      "manualWindowFlag",
    ]);
  });

  it("blocks preflight gate when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionPreflightGate({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.gateState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionPreflightGate).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
    expect(profile.preflightGate.connectionExecutionAllowed).toBe(false);
  });

  it("exposes JSON and Markdown routes for v230 preflight gate", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-preflight-gate",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-preflight-gate?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-preflight-gate.v1",
        gateState: "manual-sandbox-connection-preflight-gate-ready",
        readyForManagedAuditSandboxAdapterConnection: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit manual sandbox connection preflight gate");
      expect(markdown.body).toContain("PREFLIGHT_GATE_ONLY_NO_CONNECTION");
      expect(markdown.body).toContain("ORDEROPS_MANAGED_AUDIT_MANUAL_SANDBOX_WINDOW_APPROVED");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-230",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v230-preflight-gate",
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
