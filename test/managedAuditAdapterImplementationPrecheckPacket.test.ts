import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditAdapterImplementationPrecheckPacket,
} from "../src/services/managedAuditAdapterImplementationPrecheckPacket.js";

describe("managed audit adapter implementation precheck packet", () => {
  it("consumes Node v218, Java v79, and mini-kv v88 while blocking real adapter wiring", () => {
    const profile = loadManagedAuditAdapterImplementationPrecheckPacket({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-adapter-implementation-precheck-packet.v1",
      precheckState: "ready-for-implementation-precheck-review",
      readyForManagedAuditAdapterImplementationPrecheck: true,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyPrecheck: true,
      executionAllowed: false,
      restoreExecutionAllowed: false,
      connectsManagedAudit: false,
      realAdapterWiringAllowed: false,
      automaticUpstreamStart: false,
      sourceQualityPass: {
        sourceVersion: "Node v218",
        profileVersion: "managed-audit-route-helper-quality-pass.v1",
        qualityPassState: "verified-quality-pass",
        readyForQualityPass: true,
      },
      upstreamReceipts: {
        javaV79: {
          sourceVersion: "Java v79",
          receiptVersion: "java-release-approval-rehearsal-ops-evidence-service-quality-split-receipt.v1",
          consumedByNodeQualityPassVersion: "Node v218",
          nextNodePrecheckVersion: "Node v219",
          readyForNodeV219ImplementationPrecheck: true,
          apiShapeChanged: false,
          approvalLedgerWritten: false,
          managedAuditStoreWritten: false,
          sqlExecuted: false,
        },
        miniKvV88: {
          sourceVersion: "mini-kv v88",
          projectVersion: "0.88.0",
          receiptDigest: "fnv1a64:4aa6d12fb067e2a6",
          dispatchSplitApplied: true,
          writeHandlerChanged: false,
          adminHandlerChanged: false,
          walSnapshotRestoreTouched: false,
          behaviorChanged: false,
          fixtureContractPreserved: true,
          readOnly: true,
          executionAllowed: false,
          orderAuthoritative: false,
        },
      },
      implementationPrecheck: {
        evidenceSpan: "Node v218 + Java v79 + mini-kv v88",
        configSwitchReady: true,
        ownerApprovalRequired: true,
        ownerApprovalPresent: false,
        schemaMigrationRequired: true,
        schemaMigrationApproved: false,
        retentionRecoveryReady: true,
        failureTaxonomyReady: true,
        rollbackDisablePathReady: true,
        dryRunOnly: true,
        externalManagedAuditAccessed: false,
        javaWriteAttempted: false,
        miniKvWriteAttempted: false,
        upstreamActionsEnabled: false,
        productionAuditAllowed: false,
      },
      checks: {
        nodeV218QualityPassReady: true,
        javaV79ReceiptAccepted: true,
        javaV79SplitBoundariesRecorded: true,
        javaV79NoWriteBoundaryValid: true,
        miniKvV88ReceiptAccepted: true,
        miniKvV88DispatchBoundaryValid: true,
        managedAuditStoreUrlConfigured: true,
        ownerApprovalStillRequired: true,
        schemaMigrationStillRequiresReview: true,
        javaMiniKvWritesStillBlocked: true,
        realAdapterWiringStillBlocked: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        readyForManagedAuditAdapterImplementationPrecheck: true,
      },
      summary: {
        precheckGateCount: 6,
        passedPrecheckGateCount: 6,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.implementationPrecheck.precheckDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceQualityPass.qualityDigest).toMatch(/^[a-f0-9]{64}$/);
  });

  it("blocks when the future managed audit target is not configured", () => {
    const profile = loadManagedAuditAdapterImplementationPrecheckPacket({
      config: loadTestConfig({
        AUDIT_STORE_URL: "",
      }),
    });

    expect(profile.precheckState).toBe("blocked");
    expect(profile.readyForManagedAuditAdapterImplementationPrecheck).toBe(false);
    expect(profile.checks.managedAuditStoreUrlConfigured).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("AUDIT_STORE_URL_MISSING");
    expect(profile.realAdapterWiringAllowed).toBe(false);
    expect(profile.readyForProductionAudit).toBe(false);
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditAdapterImplementationPrecheckPacket({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.precheckState).toBe("blocked");
    expect(profile.readyForManagedAuditAdapterImplementationPrecheck).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.realAdapterWiringAllowed).toBe(false);
  });

  it("exposes JSON and Markdown routes and keeps the v218 quality route working", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-adapter-implementation-precheck-packet",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-adapter-implementation-precheck-packet?format=markdown",
        headers: completeHeaders(),
      });
      const quality = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-route-helper-quality-pass",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-adapter-implementation-precheck-packet.v1",
        precheckState: "ready-for-implementation-precheck-review",
        readyForProductionAudit: false,
        realAdapterWiringAllowed: false,
        checks: {
          javaV79ReceiptAccepted: true,
          miniKvV88ReceiptAccepted: true,
          realAdapterWiringStillBlocked: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit adapter implementation precheck packet");
      expect(markdown.body).toContain("Java v79");
      expect(markdown.body).toContain("mini-kv v88");
      expect(markdown.body).toContain("REAL_ADAPTER_WIRING_STILL_BLOCKED");
      expect(quality.statusCode).toBe(200);
      expect(quality.json()).toMatchObject({
        profileVersion: "managed-audit-route-helper-quality-pass.v1",
        qualityPassState: "verified-quality-pass",
      });
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-219",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v219-implementation-precheck",
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
    PORT: "4316",
    ...overrides,
  });
}
