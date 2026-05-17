import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionRehearsalPacketReview,
} from "../src/services/managedAuditManualSandboxConnectionRehearsalPacketReview.js";

describe("managed audit manual sandbox connection rehearsal packet review", () => {
  it("reviews the Node v232, Java v89, and mini-kv v98 evidence without opening a connection", () => {
    const profile = loadManagedAuditManualSandboxConnectionRehearsalPacketReview({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-rehearsal-packet-review.v1",
      reviewState: "manual-sandbox-connection-rehearsal-packet-review-ready",
      readyForManagedAuditManualSandboxConnectionRehearsalPacketReview: true,
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
      sourceNodeV231: {
        sourceVersion: "Node v231",
        profileVersion: "managed-audit-manual-sandbox-connection-preflight-verification.v1",
        verificationState: "manual-sandbox-connection-preflight-verification-ready",
        readyForPreflightVerification: true,
        readyForSandboxAdapterConnectionFromSource: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        schemaMigrationExecuted: false,
      },
      sourceNodeV232: {
        sourceVersion: "Node v232",
        guardSourcePath: "D:/nodeproj/orderops-node/src/services/managedAuditSandboxGuards.ts",
        evidencePresent: true,
        readOnlyDryRunGuardsPresent: true,
        sandboxDryRunGuardsPresent: true,
        localDryRunWriteGuardPresent: true,
        profileContractsChecked: 7,
        profileContractsUsingSandboxDryRunGuards: 7,
        profileContractsStillBlocked: true,
        guardAggregationAccepted: true,
      },
      upstreamOptimizationEvidence: {
        javaV89: {
          sourceVersion: "Java v89",
          headTag: "v89订单平台release-approval-context-header-field",
          evidencePresent: true,
          contextHeaderFieldRecordPresent: true,
          contextHeaderFieldFactoryPresent: true,
          contextHeaderFieldWarningHelperPresent: true,
          contextHeaderFieldAllEchoedPresent: true,
          contractPreservingRefactorDocumented: true,
          approvalLedgerWrittenByJava: false,
          schemaSqlExecutedByJava: false,
          credentialValueReadByJava: false,
          managedAuditConnectionOpenedByJava: false,
          readyForNodeV233RehearsalPacketReview: true,
        },
        miniKvV98: {
          sourceVersion: "mini-kv v98",
          headTag: "第九十八版execute-with-wal助手收敛",
          evidencePresent: true,
          projectVersion: "0.99.0",
          releaseVersion: "v99",
          consumerHint: "Node v234 manual sandbox connection blocked execution rehearsal",
          writeWalHelper: "CommandProcessor::execute_with_wal",
          writeWalHelperBehaviorPreserved: true,
          readOnly: true,
          executionAllowed: false,
          restoreExecutionAllowed: false,
          orderAuthoritative: false,
          noRuntimeWriteCommandAdded: true,
          noOpWalRecordAppendBlocked: true,
          runtimeWriteObserved: false,
          writeCommandsExecuted: false,
          readyForNodeV233RehearsalPacketReview: true,
        },
      },
      rehearsalPacketReview: {
        markerSpan: "Node v232 + Java v89 + mini-kv v98",
        reviewMode: "manual-sandbox-connection-rehearsal-packet-review-only",
        nodeGuardAggregationAccepted: true,
        javaContextHeaderFieldAccepted: true,
        miniKvExecuteWithWalAccepted: true,
        upstreamOptimizationEvidenceAccepted: true,
        connectionExecutionAllowed: false,
        credentialValueReadAllowed: false,
        schemaMigrationExecutionAllowed: false,
        managedAuditWriteAllowed: false,
        automaticServiceStartAllowed: false,
        nodeV233BlocksRealConnection: true,
      },
      checks: {
        sourceNodeV231PreflightVerificationReady: true,
        sourceNodeV231StillConnectionBlocked: true,
        sourceNodeV231DigestPresent: true,
        nodeV232GuardAggregationPresent: true,
        nodeV232GuardAggregationAccepted: true,
        nodeV232ProfileContractsStillBlocked: true,
        javaV89EvidencePresent: true,
        javaV89ContextHeaderFieldAccepted: true,
        javaV89BoundaryAccepted: true,
        miniKvV98EvidencePresent: true,
        miniKvV98ExecuteWithWalAccepted: true,
        miniKvV98RuntimeBoundaryAccepted: true,
        credentialValueStillForbidden: true,
        schemaMigrationStillBlocked: true,
        externalConnectionStillBlocked: true,
        managedAuditWritesStillBlocked: true,
        automaticServiceStartStillBlocked: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionRehearsalPacketReview: true,
      },
      summary: {
        productionBlockerCount: 0,
      },
    });
    expect(profile.sourceNodeV231.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.rehearsalPacketReview.reviewDigest).toMatch(/^[a-f0-9]{64}$/);
  });

  it("blocks review when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionRehearsalPacketReview({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.reviewState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionRehearsalPacketReview).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
    expect(profile.rehearsalPacketReview.connectionExecutionAllowed).toBe(false);
  });

  it("exposes JSON and Markdown routes for v233 rehearsal packet review", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-packet-review",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-packet-review?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-rehearsal-packet-review.v1",
        reviewState: "manual-sandbox-connection-rehearsal-packet-review-ready",
        readyForManagedAuditSandboxAdapterConnection: false,
        readyForProductionAudit: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        sourceNodeV232: {
          guardAggregationAccepted: true,
        },
        upstreamOptimizationEvidence: {
          javaV89: {
            readyForNodeV233RehearsalPacketReview: true,
          },
          miniKvV98: {
            readyForNodeV233RehearsalPacketReview: true,
          },
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit manual sandbox connection rehearsal packet review");
      expect(markdown.body).toContain("REHEARSAL_PACKET_REVIEW_ONLY_NO_CONNECTION");
      expect(markdown.body).toContain("Node v232 + Java v89 + mini-kv v98");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-233",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v233-rehearsal-packet-review",
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
