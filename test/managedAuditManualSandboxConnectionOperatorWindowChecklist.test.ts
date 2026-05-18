import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionOperatorWindowChecklist,
} from "../src/services/managedAuditManualSandboxConnectionOperatorWindowChecklist.js";

describe("managed audit manual sandbox connection operator window checklist", () => {
  it("builds an operator window checklist from Node v237 without opening a connection", () => {
    const profile = loadManagedAuditManualSandboxConnectionOperatorWindowChecklist({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-operator-window-checklist.v1",
      checklistState: "manual-sandbox-connection-operator-window-checklist-ready",
      readyForManagedAuditManualSandboxConnectionOperatorWindowChecklist: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyChecklist: true,
      executionAllowed: false,
      restoreExecutionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV237: {
        sourceVersion: "Node v237",
        profileVersion: "managed-audit-manual-sandbox-connection-readiness-gate.v1",
        gateState: "manual-sandbox-connection-readiness-gate-ready",
        readyForReadinessGate: true,
        readyForOperatorWindowChecklist: true,
        readyForSandboxAdapterConnectionFromSource: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        schemaMigrationExecuted: false,
        productionBlockerCount: 0,
        warningCount: 2,
      },
      operatorWindowChecklist: {
        markerSpan: "Node v237 readiness gate -> Node v238 operator window checklist",
        checklistMode: "manual-sandbox-connection-operator-window-checklist-only",
        checklistMaterialReady: true,
        requiredApprovalCount: 3,
        checklistStepCount: 8,
        pauseConditionCount: 8,
        forbiddenOperationCount: 6,
        ownerApprovalArtifactIdField: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID",
        credentialHandleNameField: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
        schemaRehearsalIdField: "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID",
        rollbackPathIdField: "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID",
        timeoutBudgetMs: 15000,
        manualAbortMarkerField: "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT",
        windowDurationMinutes: 30,
        windowOpenByDefault: false,
        manualReviewRequired: true,
        readyForJavaV93EchoReceipt: true,
        readyForManagedAuditSandboxAdapterConnection: false,
        actualConnectionAttempted: false,
        credentialValueRead: false,
        schemaMigrationRequested: false,
        managedAuditStateWriteRequested: false,
        upstreamServiceAutoStartRequested: false,
        miniKvExecutionPermissionInferred: false,
        productionWindowOpened: false,
      },
      checks: {
        sourceNodeV237ReadinessGateReady: true,
        sourceNodeV237AllowsOperatorChecklist: true,
        sourceNodeV237StillBlocksConnection: true,
        sourceNodeV237DigestPresent: true,
        approvalItemsComplete: true,
        checklistStepsComplete: true,
        pauseConditionsComplete: true,
        forbiddenOperationsComplete: true,
        checklistDigestPresent: true,
        checklistMaterialReady: true,
        readyForJavaV93EchoReceipt: true,
        credentialValueStillForbidden: true,
        schemaMigrationStillBlocked: true,
        externalConnectionStillBlocked: true,
        managedAuditWritesStillBlocked: true,
        automaticServiceStartStillBlocked: true,
        miniKvExecutionStillBlocked: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionOperatorWindowChecklist: true,
      },
      summary: {
        approvalItemCount: 3,
        checklistStepCount: 8,
        pauseConditionCount: 8,
        forbiddenOperationCount: 6,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV237.gateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.operatorWindowChecklist.checklistDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.approvalItems.map((item) => item.id)).toEqual([
      "release-owner",
      "security-reviewer",
      "operations-owner",
    ]);
  });

  it("blocks checklist readiness when upstream actions are enabled while keeping source material readable", () => {
    const profile = loadManagedAuditManualSandboxConnectionOperatorWindowChecklist({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.checklistState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionOperatorWindowChecklist).toBe(false);
    expect(profile.operatorWindowChecklist.checklistMaterialReady).toBe(true);
    expect(profile.operatorWindowChecklist.readyForJavaV93EchoReceipt).toBe(true);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
    expect(profile.operatorWindowChecklist.actualConnectionAttempted).toBe(false);
    expect(profile.operatorWindowChecklist.credentialValueRead).toBe(false);
  });

  it("exposes JSON and Markdown routes for v238 operator window checklist", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-checklist",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-checklist?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-operator-window-checklist.v1",
        checklistState: "manual-sandbox-connection-operator-window-checklist-ready",
        readyForManagedAuditSandboxAdapterConnection: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        operatorWindowChecklist: {
          checklistMode: "manual-sandbox-connection-operator-window-checklist-only",
          credentialHandleNameField: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
          readyForJavaV93EchoReceipt: true,
          actualConnectionAttempted: false,
          credentialValueRead: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit manual sandbox connection operator window checklist");
      expect(markdown.body).toContain("OPERATOR_WINDOW_CHECKLIST_IS_NOT_CONNECTION_APPROVAL");
      expect(markdown.body).toContain("ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-238",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v238-operator-window-checklist",
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
