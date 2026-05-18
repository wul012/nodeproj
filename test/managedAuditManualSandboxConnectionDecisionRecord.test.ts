import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionDecisionRecord,
} from "../src/services/managedAuditManualSandboxConnectionDecisionRecord.js";

describe("managed audit manual sandbox connection decision record", () => {
  it("creates a human decision record from v250 while keeping real connection blocked", () => {
    const profile = loadManagedAuditManualSandboxConnectionDecisionRecord({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-decision-record.v1",
      decisionState: "manual-sandbox-connection-decision-record-ready",
      readyForManagedAuditManualSandboxConnectionDecisionRecord: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readOnlyDecisionRecord: true,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV250: {
        sourceVersion: "Node v250",
        guardState: "manual-sandbox-connection-rehearsal-guard-ready",
        readyForRehearsalGuard: true,
        requiredOperatorArtifactCount: 7,
        requiredSecurityMaintenanceCount: 3,
        nodeSecurityMaintenanceReady: true,
        javaSecurityMaintenanceReady: true,
        miniKvSecurityMaintenanceReady: true,
        connectionStillBlocked: true,
        credentialValueStillBlocked: true,
        schemaMigrationStillBlocked: true,
        autoStartStillBlocked: true,
        miniKvStillNonAuthoritative: true,
      },
      decisionRecord: {
        recordMode: "manual-sandbox-connection-decision-record-only",
        decisionScope: "managed-audit-manual-sandbox-connection",
        decisionStatus: "human-review-required-before-connection",
        sourceSpan: "Node v250 rehearsal guard",
        ownerApprovalArtifactId: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID",
        credentialHandleReviewStatus: "required-handle-only-no-value-read",
        schemaRehearsalApprovalId: "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID",
        manualWindowMarker: "ORDEROPS_MANAGED_AUDIT_MANUAL_WINDOW_OPEN",
        rollbackPathId: "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID",
        abortMarker: "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT",
        timeoutPolicy: "ORDEROPS_MANAGED_AUDIT_TIMEOUT_BUDGET_MS",
        requiredDecisionFieldCount: 7,
        noGoConditionCount: 8,
        credentialValueMayBeRead: false,
        managedAuditConnectionMayOpen: false,
        schemaMigrationMayExecute: false,
        nodeMayStartJavaOrMiniKv: false,
        miniKvMayActAsManagedAuditStorage: false,
        approvalLedgerMayBeWritten: false,
        javaSqlMayExecute: false,
      },
      checks: {
        sourceNodeV250Ready: true,
        sourceNodeV250StillBlocksConnection: true,
        sourceNodeV250StillBlocksCredentialValue: true,
        sourceNodeV250StillBlocksSchemaMigration: true,
        sourceNodeV250StillBlocksAutoStart: true,
        sourceNodeV250KeepsMiniKvNonAuthoritative: true,
        requiredSecurityMaintenanceComplete: true,
        ownerApprovalArtifactRecorded: true,
        credentialHandleReviewRecorded: true,
        schemaRehearsalApprovalRecorded: true,
        manualWindowMarkerRecorded: true,
        rollbackPathRecorded: true,
        abortMarkerRecorded: true,
        timeoutPolicyRecorded: true,
        explicitNoGoConditionsRecorded: true,
        decisionRecordStillReadOnly: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionDecisionRecord: true,
      },
      summary: {
        requiredDecisionFieldCount: 7,
        noGoConditionCount: 8,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV250.guardDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.decisionRecord.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.decisionRecord.requiredDecisionFields.map((field) => field.id)).toEqual([
      "owner-approval-artifact",
      "credential-handle-review",
      "schema-rehearsal-approval",
      "manual-window-marker",
      "rollback-path",
      "abort-marker",
      "timeout-policy",
    ]);
    expect(profile.decisionRecord.explicitNoGoConditions.map((condition) => condition.code)).toContain(
      "CREDENTIAL_VALUE_REQUIRED",
    );
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionDecisionRecord({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.decisionState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionDecisionRecord).toBe(false);
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
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-decision-record",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-decision-record?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-decision-record.v1",
        decisionState: "manual-sandbox-connection-decision-record-ready",
        decisionRecord: {
          decisionStatus: "human-review-required-before-connection",
          credentialValueMayBeRead: false,
          managedAuditConnectionMayOpen: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit manual sandbox connection decision record");
      expect(markdown.body).toContain("manual-sandbox-connection-decision-record-ready");
      expect(markdown.body).toContain("CREDENTIAL_VALUE_REQUIRED");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-251",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v251-decision-record",
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
    PORT: "4351",
    ...overrides,
  });
}
