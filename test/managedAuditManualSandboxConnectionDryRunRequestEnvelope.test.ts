import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionDryRunRequestEnvelope,
} from "../src/services/managedAuditManualSandboxConnectionDryRunRequestEnvelope.js";

describe("managed audit manual sandbox connection dry-run request envelope", () => {
  it("builds a handle-only dry-run envelope from v235 precondition intake", () => {
    const profile = loadManagedAuditManualSandboxConnectionDryRunRequestEnvelope({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-dry-run-request-envelope.v1",
      envelopeState: "manual-sandbox-connection-dry-run-request-envelope-ready",
      readyForManagedAuditManualSandboxConnectionDryRunRequestEnvelope: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyReview: true,
      executionAllowed: false,
      restoreExecutionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV235: {
        sourceVersion: "Node v235",
        profileVersion: "managed-audit-manual-sandbox-connection-precondition-intake.v1",
        intakeState: "manual-sandbox-connection-precondition-intake-ready",
        readyForPreconditionIntake: true,
        readyForDryRunRequestEnvelope: true,
        requiredPreconditionCount: 6,
        documentedPreconditionCount: 6,
        handlesOnly: true,
        readyForSandboxAdapterConnectionFromSource: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        schemaMigrationExecuted: false,
        managedAuditStateWritten: false,
      },
      dryRunRequestEnvelope: {
        markerSpan: "Node v235 precondition intake",
        requestMode: "manual-sandbox-connection-dry-run-request-envelope-only",
        requiredPreconditionCount: 6,
        documentedPreconditionCount: 6,
        operatorReviewFieldCount: 6,
        credentialHandleOnly: true,
        credentialValueIncluded: false,
        ownerApprovalArtifactIdField: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID",
        credentialHandleNameField: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
        schemaRehearsalIdField: "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID",
        rollbackPathIdField: "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID",
        timeoutBudgetMs: 15000,
        manualAbortMarkerField: "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT",
        actualConnectionAttempted: false,
        schemaMigrationRequested: false,
        managedAuditStateWriteRequested: false,
        upstreamServiceAutoStartRequested: false,
        miniKvPermissionRequested: false,
        readyForOperatorReview: true,
        readyForManagedAuditSandboxAdapterConnection: false,
      },
      checks: {
        sourceNodeV235PreconditionIntakeReady: true,
        sourceIntakeDigestPresent: true,
        sourceReadyForDryRunRequestEnvelope: true,
        sourceStillBlocksSandboxAdapterConnection: true,
        requiredPreconditionsCarried: true,
        envelopeDigestPresent: true,
        operatorReviewFieldsComplete: true,
        credentialHandleOnly: true,
        noCredentialValueIncluded: true,
        noConnectionAttempted: true,
        noSchemaMigrationRequested: true,
        noManagedAuditStateWriteRequested: true,
        noUpstreamServiceAutoStartRequested: true,
        noMiniKvPermissionRequested: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionDryRunRequestEnvelope: true,
      },
      summary: {
        operatorReviewFieldCount: 6,
        requiredPreconditionCount: 6,
        documentedPreconditionCount: 6,
        secretValueFieldCount: 0,
        productionBlockerCount: 0,
      },
    });
    expect(profile.sourceNodeV235.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.dryRunRequestEnvelope.envelopeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.dryRunRequestEnvelope.envelopeId).toBe(
      `manual-sandbox-dry-run-${profile.dryRunRequestEnvelope.envelopeDigest.slice(0, 16)}`,
    );
    expect(profile.operatorReviewFields).toHaveLength(6);
    expect(profile.operatorReviewFields.every((field) => field.operatorMustReview)).toBe(true);
    expect(profile.operatorReviewFields.every((field) => !field.secretValueAllowed)).toBe(true);
    expect(profile.operatorReviewFields.every((field) => !field.envelopeCarriesValue)).toBe(true);
  });

  it("blocks envelope readiness when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionDryRunRequestEnvelope({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.envelopeState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionDryRunRequestEnvelope).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
    expect(profile.dryRunRequestEnvelope.actualConnectionAttempted).toBe(false);
    expect(profile.dryRunRequestEnvelope.credentialValueIncluded).toBe(false);
  });

  it("exposes JSON and Markdown routes for v236 dry-run envelope", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-request-envelope",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-request-envelope?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-dry-run-request-envelope.v1",
        envelopeState: "manual-sandbox-connection-dry-run-request-envelope-ready",
        readyForManagedAuditSandboxAdapterConnection: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        dryRunRequestEnvelope: {
          readyForOperatorReview: true,
          credentialValueIncluded: false,
          actualConnectionAttempted: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit manual sandbox connection dry-run request envelope");
      expect(markdown.body).toContain("Node v235 precondition intake");
      expect(markdown.body).toContain("DRY_RUN_ENVELOPE_IS_NOT_CONNECTION_APPROVAL");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-236",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v236-dry-run-envelope",
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
