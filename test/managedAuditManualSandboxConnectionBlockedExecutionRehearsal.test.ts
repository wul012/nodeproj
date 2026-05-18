import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionBlockedExecutionRehearsal,
} from "../src/services/managedAuditManualSandboxConnectionBlockedExecutionRehearsal.js";

describe("managed audit manual sandbox connection blocked execution rehearsal", () => {
  it("rehearses dangerous operation blocking without executing a connection or write", () => {
    const profile = loadManagedAuditManualSandboxConnectionBlockedExecutionRehearsal({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-blocked-execution-rehearsal.v1",
      rehearsalState: "manual-sandbox-connection-blocked-execution-rehearsal-ready",
      readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal: true,
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
      sourceNodeV233: {
        sourceVersion: "Node v233",
        profileVersion: "managed-audit-manual-sandbox-connection-rehearsal-packet-review.v1",
        reviewState: "manual-sandbox-connection-rehearsal-packet-review-ready",
        readyForRehearsalPacketReview: true,
        readyForSandboxAdapterConnectionFromSource: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        schemaMigrationExecuted: false,
        managedAuditWritesStillBlocked: true,
        upstreamOptimizationEvidenceAccepted: true,
      },
      upstreamOptimizationEvidence: {
        javaV90: {
          sourceVersion: "Java v90",
          headTag: "v90订单平台release-approval-context-normalization-helper",
          evidencePresent: true,
          normalizeValuePresent: true,
          normalizedFactoryPresent: true,
          missingWarningCentralized: true,
          allEchoedRetained: true,
          contractPreservingRefactorDocumented: true,
          noLombokIntroduced: true,
          approvalLedgerWrittenByJava: false,
          schemaSqlExecutedByJava: false,
          credentialValueReadByJava: false,
          managedAuditConnectionOpenedByJava: false,
          readyForNodeV234BlockedExecutionRehearsal: true,
        },
        miniKvV99: {
          sourceVersion: "mini-kv v99",
          headTag: "第九十九版execute-with-wal回归补强",
          evidencePresent: true,
          projectVersion: "0.102.0",
          releaseVersion: "v102",
          consumerHint: "Node v244 manual sandbox dry-run command upstream echo verification",
          writeWalHelper: "CommandProcessor::execute_with_wal",
          writeWalHelperBehaviorPreserved: true,
          regressionCoverageDocumented: true,
          usageErrorsNoWal: true,
          missingExpiredNoOpNoWal: true,
          appendBeforeMutationPreserved: true,
          readOnly: true,
          executionAllowed: false,
          restoreExecutionAllowed: false,
          orderAuthoritative: false,
          noRuntimeWriteCommandAdded: true,
          runtimeWriteObserved: false,
          writeCommandsExecuted: false,
          readyForNodeV234BlockedExecutionRehearsal: true,
        },
      },
      blockedExecutionRehearsal: {
        markerSpan: "Node v233 + Java v90 + mini-kv v99",
        rehearsalMode: "manual-sandbox-connection-blocked-execution-rehearsal-only",
        simulatedAttemptCount: 8,
        blockedAttemptCount: 8,
        actualExecutionAttemptCount: 0,
        connectionExecutionAllowed: false,
        credentialValueReadAllowed: false,
        schemaMigrationExecutionAllowed: false,
        managedAuditWriteAllowed: false,
        upstreamServiceAutoStartAllowed: false,
        miniKvWriteOrRestoreAllowed: false,
        javaLedgerOrSqlAllowed: false,
        nodeV234BlocksDangerousOperations: true,
      },
      checks: {
        sourceNodeV233ReviewReady: true,
        sourceNodeV233DigestPresent: true,
        sourceNodeV233StillConnectionBlocked: true,
        sourceNodeV233StillWriteBlocked: true,
        javaV90EvidencePresent: true,
        javaV90ContextNormalizationAccepted: true,
        javaV90BoundaryAccepted: true,
        miniKvV99EvidencePresent: true,
        miniKvV99WalRegressionAccepted: true,
        miniKvV99RuntimeBoundaryAccepted: true,
        allDangerousOperationsSimulatedOnly: true,
        allDangerousOperationsBlocked: true,
        credentialValueStillForbidden: true,
        schemaMigrationStillBlocked: true,
        externalConnectionStillBlocked: true,
        managedAuditWritesStillBlocked: true,
        upstreamServiceAutoStartStillBlocked: true,
        miniKvWriteOrRestoreStillBlocked: true,
        javaLedgerOrSqlStillBlocked: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal: true,
      },
      summary: {
        simulatedAttemptCount: 8,
        blockedAttemptCount: 8,
        actualExecutionAttemptCount: 0,
        productionBlockerCount: 0,
      },
    });
    expect(profile.sourceNodeV233.reviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.blockedExecutionRehearsal.rehearsalDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.simulatedBlockedAttempts.every((attempt) => attempt.simulatedOnly)).toBe(true);
    expect(profile.simulatedBlockedAttempts.every((attempt) => !attempt.actualExecutionAttempted)).toBe(true);
  });

  it("blocks rehearsal readiness when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionBlockedExecutionRehearsal({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.rehearsalState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
    expect(profile.blockedExecutionRehearsal.actualExecutionAttemptCount).toBe(0);
  });

  it("exposes JSON and Markdown routes for v234 blocked execution rehearsal", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-blocked-execution-rehearsal",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-blocked-execution-rehearsal?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-blocked-execution-rehearsal.v1",
        rehearsalState: "manual-sandbox-connection-blocked-execution-rehearsal-ready",
        readyForManagedAuditSandboxAdapterConnection: false,
        readyForProductionAudit: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        upstreamOptimizationEvidence: {
          javaV90: {
            readyForNodeV234BlockedExecutionRehearsal: true,
          },
          miniKvV99: {
            readyForNodeV234BlockedExecutionRehearsal: true,
          },
        },
        blockedExecutionRehearsal: {
          nodeV234BlocksDangerousOperations: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit manual sandbox connection blocked execution rehearsal");
      expect(markdown.body).toContain("BLOCKED_EXECUTION_REHEARSAL_ONLY_NO_REAL_ATTEMPT");
      expect(markdown.body).toContain("Node v233 + Java v90 + mini-kv v99");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-234",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v234-blocked-execution-rehearsal",
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
