import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionPrecheckPacket,
} from "../src/services/managedAuditManualSandboxConnectionPrecheckPacket.js";

describe("managed audit manual sandbox connection precheck packet", () => {
  it("creates the v245 precheck packet from Node v244 without opening a connection", () => {
    const profile = loadManagedAuditManualSandboxConnectionPrecheckPacket({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-precheck-packet.v1",
      precheckState: "manual-sandbox-connection-precheck-packet-ready",
      readyForManagedAuditManualSandboxConnectionPrecheckPacket: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readOnlyPrecheckPacket: true,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV244: {
        sourceVersion: "Node v244",
        verificationState: "manual-sandbox-dry-run-command-upstream-echo-verification-ready",
        readyForUpstreamEchoVerification: true,
        commandCountAligned: true,
        credentialBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
      },
      precheckPacket: {
        packetMode: "manual-sandbox-connection-precheck-packet-only",
        sourceSpan: "Node v244 upstream echo verification",
        ownerApprovalArtifact: {
          required: true,
          fieldName: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID",
          valueIncluded: false,
          approvedByNode: false,
        },
        credentialHandleReview: {
          required: true,
          credentialHandleOnly: true,
          credentialValueIncluded: false,
          credentialValueRead: false,
        },
        schemaMigrationRehearsal: {
          required: true,
          rehearsalIdOnly: true,
          migrationSqlIncluded: false,
          migrationExecuted: false,
        },
        operatorWindow: {
          required: true,
          mode: "manual-window-required",
          opensByDefault: false,
          operatorVerifiedRequired: true,
        },
        rollbackPath: {
          required: true,
          rollbackPathOnly: true,
          rollbackExecuted: false,
        },
        abortMarker: {
          required: true,
          manualAbortSupported: true,
          automaticAbortExecution: false,
        },
        timeoutPolicy: {
          required: true,
          timeoutBudgetMs: 15000,
          timeoutExecutesRollback: false,
        },
        boundary: {
          dryRunOnly: true,
          actualConnectionAttempted: false,
          managedAuditStateWriteRequested: false,
          schemaMigrationRequested: false,
          approvalLedgerWriteRequested: false,
          javaSqlExecutionRequested: false,
          miniKvWritePermissionRequested: false,
          upstreamServiceAutoStartRequested: false,
        },
      },
      checks: {
        sourceNodeV244Ready: true,
        sourceNodeV244BoundariesAligned: true,
        ownerApprovalArtifactRequired: true,
        credentialHandleReviewHandleOnly: true,
        schemaMigrationRehearsalOnly: true,
        operatorWindowManualOnly: true,
        rollbackPathRequired: true,
        abortMarkerRequired: true,
        timeoutPolicyAccepted: true,
        noCredentialValueRead: true,
        noConnectionAttempted: true,
        noSchemaMigrationExecuted: true,
        noStateMutationRequested: true,
        noUpstreamAutoStart: true,
        routeRegistrationAccepted: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionPrecheckPacket: true,
      },
      summary: {
        precheckItemCount: 7,
        requiredOperatorFieldCount: 6,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV244.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.precheckPacket.precheckDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionPrecheckPacket({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.precheckState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionPrecheckPacket).toBe(false);
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
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-packet",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-packet?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-precheck-packet.v1",
        precheckState: "manual-sandbox-connection-precheck-packet-ready",
        precheckPacket: {
          ownerApprovalArtifact: {
            valueIncluded: false,
          },
          credentialHandleReview: {
            credentialValueRead: false,
          },
          timeoutPolicy: {
            timeoutBudgetMs: 15000,
          },
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit manual sandbox connection precheck packet");
      expect(markdown.body).toContain("manual-sandbox-connection-precheck-packet-ready");
      expect(markdown.body).toContain("REQUEST_UPSTREAM_PRECHECK_RECEIPTS");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-245",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v245-precheck-packet",
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
    PORT: "4346",
    ...overrides,
  });
}
