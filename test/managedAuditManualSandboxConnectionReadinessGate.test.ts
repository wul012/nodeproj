import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionReadinessGate,
} from "../src/services/managedAuditManualSandboxConnectionReadinessGate.js";

describe("managed audit manual sandbox connection readiness gate", () => {
  it("builds a readiness gate from Node v236 plus Java v92 and mini-kv v101 evidence", () => {
    const profile = loadManagedAuditManualSandboxConnectionReadinessGate({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-readiness-gate.v1",
      gateState: "manual-sandbox-connection-readiness-gate-ready",
      readyForManagedAuditManualSandboxConnectionReadinessGate: true,
      readyForOperatorWindowChecklist: true,
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
      sourceNodeV236: {
        sourceVersion: "Node v236",
        profileVersion: "managed-audit-manual-sandbox-connection-dry-run-request-envelope.v1",
        envelopeState: "manual-sandbox-connection-dry-run-request-envelope-ready",
        readyForDryRunRequestEnvelope: true,
        readyForOperatorReview: true,
        operatorReviewFieldCount: 6,
        credentialHandleOnly: true,
        credentialValueIncluded: false,
        actualConnectionAttempted: false,
        readyForSandboxAdapterConnectionFromSource: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        schemaMigrationExecuted: false,
      },
      upstreamReadinessEvidence: {
        javaV92: {
          sourceVersion: "Java v92",
          evidencePresent: true,
          consumedNodeV236DryRunRequestEnvelope: true,
          consumedProfileMatched: true,
          nextNodeReadinessGateVersionMatched: true,
          echoedEnvelopeFieldCount: 6,
          allEnvelopeFieldsEchoed: true,
          credentialHandleOnly: true,
          credentialValueIncludedInEnvelope: false,
          credentialValueReadByJava: false,
          actualConnectionAttemptedByJava: false,
          schemaMigrationSqlExecutedByJava: false,
          approvalLedgerWrittenByJava: false,
          managedAuditStoreWrittenByJava: false,
          readyForNodeV237ManualSandboxConnectionReadinessGate: true,
          readyForManagedAuditSandboxAdapterConnection: false,
          readyForNodeV237Gate: true,
        },
        miniKvV101: {
          sourceVersion: "mini-kv v101",
          evidencePresent: true,
          followUpVersion: "mini-kv-runtime-no-start-no-write-follow-up.v1",
          projectVersion: "0.102.0",
          releaseVersion: "v102",
          consumerHint: "Node v239 manual sandbox connection operator window evidence verification",
          sourceEnvelopeProducer: "Node v236 manual sandbox connection dry-run request envelope",
          operatorReviewFieldCount: 6,
          credentialHandleOnly: true,
          credentialValueIncluded: false,
          actualConnectionAttempted: false,
          schemaMigrationRequested: false,
          managedAuditStateWriteRequested: false,
          upstreamServiceAutoStartRequested: false,
          miniKvPermissionRequested: false,
          readyForOperatorReview: true,
          readyForManagedAuditSandboxAdapterConnection: false,
          readOnly: true,
          executionAllowed: false,
          nodeAutoStartAllowed: false,
          javaAutoStartAllowed: false,
          miniKvAutoStartAllowed: false,
          connectionExecutionAllowed: false,
          writeCommandsExecuted: false,
          adminCommandsExecuted: false,
          runtimeWriteObserved: false,
          managedAuditStore: false,
          storageWriteAllowed: false,
          managedAuditWriteExecuted: false,
          sandboxManagedAuditStateWriteAllowed: false,
          credentialValueReadAllowed: false,
          schemaRehearsalExecutionAllowed: false,
          schemaMigrationExecutionAllowed: false,
          restoreExecutionAllowed: false,
          loadRestoreCompactExecuted: false,
          orderAuthoritative: false,
          historicalReceiptAnchorCount: 9,
          historicalReceiptAnchorsStable: true,
          readyForNodeV237Gate: true,
        },
      },
      readinessGate: {
        markerSpan: "Node v236 + Java v92 + mini-kv v101",
        gateMode: "manual-sandbox-connection-readiness-gate-only",
        sourceEnvelopeAccepted: true,
        javaEchoReceiptAccepted: true,
        miniKvNoStartNoWriteAccepted: true,
        readyForOperatorWindowChecklist: true,
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
        sourceNodeV236DryRunEnvelopeReady: true,
        sourceEnvelopeDigestPresent: true,
        sourceStillHandleOnlyAndNonExecuting: true,
        javaV92EvidencePresent: true,
        javaV92EchoReceiptAccepted: true,
        javaV92BoundaryAccepted: true,
        miniKvV101EvidencePresent: true,
        miniKvV101FollowUpAccepted: true,
        miniKvV101BoundaryAccepted: true,
        readinessGateDigestPresent: true,
        readyForOperatorWindowChecklist: true,
        noCredentialValueRead: true,
        noConnectionAttempted: true,
        noSchemaMigrationRequested: true,
        noManagedAuditStateWriteRequested: true,
        noUpstreamServiceAutoStartRequested: true,
        noMiniKvExecutionPermissionInferred: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionReadinessGate: true,
      },
      summary: {
        evidenceFileCount: 6,
        matchedSnippetCount: 18,
        javaEchoedFieldCount: 6,
        miniKvHistoricalAnchorCount: 9,
        productionBlockerCount: 0,
      },
    });
    expect(profile.sourceNodeV236.envelopeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.readinessGate.gateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  });

  it("blocks gate readiness when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionReadinessGate({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.gateState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionReadinessGate).toBe(false);
    expect(profile.readyForOperatorWindowChecklist).toBe(true);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
    expect(profile.readinessGate.actualConnectionAttempted).toBe(false);
    expect(profile.readinessGate.credentialValueRead).toBe(false);
  });

  it("exposes JSON and Markdown routes for v237 readiness gate", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-readiness-gate",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-readiness-gate?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-readiness-gate.v1",
        gateState: "manual-sandbox-connection-readiness-gate-ready",
        readyForOperatorWindowChecklist: true,
        readyForManagedAuditSandboxAdapterConnection: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        readinessGate: {
          markerSpan: "Node v236 + Java v92 + mini-kv v101",
          readyForOperatorWindowChecklist: true,
          actualConnectionAttempted: false,
          credentialValueRead: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit manual sandbox connection readiness gate");
      expect(markdown.body).toContain("Node v236 + Java v92 + mini-kv v101");
      expect(markdown.body).toContain("READINESS_GATE_IS_NOT_CONNECTION_APPROVAL");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-237",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v237-readiness-gate",
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
