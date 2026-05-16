import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditAdapterProductionHardeningReadinessGate,
} from "../src/services/managedAuditAdapterProductionHardeningReadinessGate.js";

describe("managed audit adapter production-hardening readiness gate", () => {
  it("consumes Node v216, Java v78, and mini-kv v87 receipts without opening production audit", () => {
    const profile = loadManagedAuditAdapterProductionHardeningReadinessGate({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-adapter-production-hardening-readiness-gate.v1",
      gateState: "ready-for-production-hardening-review",
      readyForManagedAuditAdapterProductionHardeningReadinessGate: true,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyGate: true,
      executionAllowed: false,
      restoreExecutionAllowed: false,
      connectsManagedAudit: false,
      localDryRunWritePerformed: false,
      automaticUpstreamStart: false,
      sourceArchiveVerification: {
        sourceVersion: "Node v216",
        profileVersion: "managed-audit-dry-run-adapter-archive-verification.v1",
        verificationState: "verified-dry-run-adapter-archive",
        readyForArchiveVerification: true,
      },
      upstreamReceipts: {
        javaV78: {
          sourceVersion: "Java v78",
          nextNodeGateVersion: "Node v217",
          readyForNodeV217ProductionHardeningReadinessGate: true,
          nodeV217MayConnectManagedAudit: false,
          nodeV217MayWriteApprovalLedger: false,
          nodeV217MayExecuteSql: false,
          javaCreatesApprovalDecision: false,
          javaWritesManagedAuditStore: false,
        },
        miniKvV87: {
          sourceVersion: "mini-kv v87",
          projectVersion: "0.87.0",
          receiptDigest: "fnv1a64:111f0daf1283eab6",
          managedAuditStore: false,
          storageWriteAllowed: false,
          adminCommandsAllowed: false,
          restoreExecutionAllowed: false,
          orderAuthoritative: false,
        },
      },
      productionHardeningGate: {
        evidenceSpan: "Node v216 + Java v78 + mini-kv v87",
        managedAuditStoreConfigured: true,
        managedAuditStoreConnected: false,
        identityApprovalLedgerBound: true,
        retentionRecoveryOwnerRecorded: true,
        failureHandlingRecorded: true,
        rollbackReviewRecorded: true,
        miniKvConfirmedNonAuthoritative: true,
        externalManagedAuditAccessed: false,
        javaWriteAttempted: false,
        miniKvWriteAttempted: false,
        upstreamActionsEnabled: false,
        productionAuditAllowed: false,
      },
      checks: {
        nodeV216ArchiveVerificationReady: true,
        javaV78ReceiptAccepted: true,
        javaV78PrerequisitesRecorded: true,
        javaV78NoWriteBoundaryValid: true,
        miniKvV87ReceiptAccepted: true,
        miniKvV87NonAuthoritativeBoundaryValid: true,
        managedAuditStoreUrlConfigured: true,
        realManagedAuditAdapterStillDisconnected: true,
        javaMiniKvWritesStillBlocked: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditAdapterProductionHardeningReadinessGate: true,
      },
      summary: {
        hardPrerequisiteCount: 8,
        satisfiedHardPrerequisiteCount: 8,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.productionHardeningGate.gateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceArchiveVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
  });

  it("blocks when the future managed audit target is not configured", () => {
    const profile = loadManagedAuditAdapterProductionHardeningReadinessGate({
      config: loadTestConfig({
        AUDIT_STORE_URL: "",
      }),
    });

    expect(profile.gateState).toBe("blocked");
    expect(profile.readyForManagedAuditAdapterProductionHardeningReadinessGate).toBe(false);
    expect(profile.checks.managedAuditStoreUrlConfigured).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("AUDIT_STORE_URL_MISSING");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readyForProductionAudit).toBe(false);
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditAdapterProductionHardeningReadinessGate({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.gateState).toBe("blocked");
    expect(profile.readyForManagedAuditAdapterProductionHardeningReadinessGate).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.executionAllowed).toBe(false);
    expect(profile.restoreExecutionAllowed).toBe(false);
  });

  it("exposes JSON and Markdown routes", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-adapter-production-hardening-readiness-gate",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-adapter-production-hardening-readiness-gate?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-adapter-production-hardening-readiness-gate.v1",
        gateState: "ready-for-production-hardening-review",
        readyForProductionAudit: false,
        connectsManagedAudit: false,
        checks: {
          javaV78ReceiptAccepted: true,
          miniKvV87ReceiptAccepted: true,
          productionWindowStillBlocked: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit adapter production-hardening readiness gate");
      expect(markdown.body).toContain("Java v78");
      expect(markdown.body).toContain("mini-kv v87");
      expect(markdown.body).toContain("REAL_MANAGED_AUDIT_ADAPTER_STILL_MISSING");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-217",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v217-production-hardening-gate",
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
    PORT: "4314",
    ...overrides,
  });
}
