import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionPreconditionIntake,
} from "../src/services/managedAuditManualSandboxConnectionPreconditionIntake.js";

describe("managed audit manual sandbox connection precondition intake", () => {
  it("ingests Java v91 and mini-kv v100 preconditions without opening a connection", () => {
    const profile = loadManagedAuditManualSandboxConnectionPreconditionIntake({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-precondition-intake.v1",
      intakeState: "manual-sandbox-connection-precondition-intake-ready",
      readyForManagedAuditManualSandboxConnectionPreconditionIntake: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readOnlyReview: true,
      executionAllowed: false,
      restoreExecutionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV234: {
        sourceVersion: "Node v234",
        profileVersion: "managed-audit-manual-sandbox-connection-blocked-execution-rehearsal.v1",
        rehearsalState: "manual-sandbox-connection-blocked-execution-rehearsal-ready",
        readyForBlockedExecutionRehearsal: true,
        simulatedAttemptCount: 8,
        blockedAttemptCount: 8,
        actualExecutionAttemptCount: 0,
        readyForSandboxAdapterConnectionFromSource: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        schemaMigrationExecuted: false,
      },
      upstreamPreconditionEvidence: {
        javaV91: {
          sourceVersion: "Java v91",
          headTag: "v91订单平台release-approval-sandbox-connection-precondition-receipt",
          evidencePresent: true,
          readyForNodeV235ManualSandboxConnectionPreconditionIntake: true,
          consumedNodeV234BlockedExecutionRehearsal: true,
          ownerApprovalArtifactRequired: true,
          credentialHandleReviewRequired: true,
          schemaRehearsalEvidenceRequired: true,
          rollbackPathRequired: true,
          timeoutBudgetRequired: true,
          manualAbortMarkerRequired: true,
          ownerApprovalArtifactProvidedByJava: false,
          credentialValueReadByJava: false,
          schemaMigrationSqlExecutedByJava: false,
          externalManagedAuditConnectionOpenedByJava: false,
          actualConnectionAttemptedByJava: false,
          approvalLedgerWrittenByJava: false,
          readyForNodeV235Intake: true,
        },
        miniKvV100: {
          sourceVersion: "mini-kv v100",
          headTag: "第一百版运行证据滚动守卫",
          evidencePresent: true,
          guardVersion: "mini-kv-current-runtime-fixture-rolling-guard.v1",
          projectVersion: "0.100.0",
          releaseVersion: "v100",
          consumerHint: "Node v235 manual sandbox connection precondition intake",
          currentArtifactPathHint: "c/100/",
          currentLiveReadSessionEcho: "mini-kv-live-read-v100",
          readOnly: true,
          executionAllowed: false,
          restoreExecutionAllowed: false,
          orderAuthoritative: false,
          historicalReceiptAnchorCount: 9,
          historicalReceiptAnchorsStable: true,
          requiredChecksMentionNodeV235: true,
          boundariesForbidExecution: true,
          readyForNodeV235Intake: true,
        },
      },
      preconditionIntake: {
        markerSpan: "Node v234 + Java v91 + mini-kv v100",
        intakeMode: "manual-sandbox-connection-precondition-intake-only",
        requiredPreconditionCount: 6,
        documentedPreconditionCount: 6,
        handlesOnly: true,
        ownerApprovalArtifactIdField: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID",
        credentialHandleNameField: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
        schemaRehearsalIdField: "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID",
        rollbackPathIdField: "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID",
        manualAbortMarkerField: "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT",
        timeoutBudgetMs: 15000,
        actualConnectionAttempted: false,
        credentialValueRead: false,
        schemaMigrationExecuted: false,
        managedAuditStateWritten: false,
        upstreamServiceAutoStarted: false,
        miniKvExecutionPermissionInferred: false,
        readyForDryRunRequestEnvelope: true,
      },
      checks: {
        sourceNodeV234BlockedExecutionRehearsalReady: true,
        sourceNodeV234DigestPresent: true,
        sourceNodeV234StillBlocksAllDangerousOperations: true,
        javaV91EvidencePresent: true,
        javaV91PreconditionsAccepted: true,
        javaV91BoundaryAccepted: true,
        miniKvV100EvidencePresent: true,
        miniKvV100RollingGuardAccepted: true,
        miniKvV100RuntimeBoundaryAccepted: true,
        requiredPreconditionsDocumented: true,
        handlesOnlyIntake: true,
        noConnectionAttempted: true,
        noCredentialValueRead: true,
        noSchemaMigrationExecuted: true,
        noManagedAuditStateWritten: true,
        noUpstreamServiceAutoStarted: true,
        noMiniKvExecutionPermissionInferred: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionPreconditionIntake: true,
      },
      summary: {
        requiredPreconditionCount: 6,
        documentedPreconditionCount: 6,
        historicalMiniKvAnchorCount: 9,
        productionBlockerCount: 0,
      },
    });
    expect(profile.sourceNodeV234.rehearsalDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preconditionIntake.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
  });

  it("blocks intake readiness when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionPreconditionIntake({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.intakeState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionPreconditionIntake).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
    expect(profile.preconditionIntake.actualConnectionAttempted).toBe(false);
  });

  it("exposes JSON and Markdown routes for v235 precondition intake", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-precondition-intake",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-precondition-intake?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-precondition-intake.v1",
        intakeState: "manual-sandbox-connection-precondition-intake-ready",
        readyForManagedAuditSandboxAdapterConnection: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        preconditionIntake: {
          readyForDryRunRequestEnvelope: true,
          actualConnectionAttempted: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit manual sandbox connection precondition intake");
      expect(markdown.body).toContain("Node v234 + Java v91 + mini-kv v100");
      expect(markdown.body).toContain("PRECONDITION_INTAKE_IS_NOT_CONNECTION_APPROVAL");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-235",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v235-precondition-intake",
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
