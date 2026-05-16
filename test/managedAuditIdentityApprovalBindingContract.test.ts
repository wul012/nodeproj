import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { AuditLog } from "../src/services/auditLog.js";
import {
  describeAuditStoreRuntime,
} from "../src/services/auditStoreFactory.js";
import {
  loadManagedAuditIdentityApprovalBindingContract,
} from "../src/services/managedAuditIdentityApprovalBindingContract.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("managed audit identity approval binding contract", () => {
  it("binds operator identity, approval request, approval decision, and correlation fields", async () => {
    const config = loadTestConfig();
    const profile = await loadManagedAuditIdentityApprovalBindingContract({
      config,
      runtime: describeAuditStoreRuntime(config),
      auditLog: new AuditLog(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-identity-approval-binding-contract.v1",
      contractState: "ready-for-identity-approval-dry-run-packet",
      readyForManagedAuditIdentityApprovalBindingContract: true,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnly: true,
      executionAllowed: false,
      sourceDryRunVerification: {
        profileVersion: "managed-audit-persistence-dry-run-verification.v1",
        verificationState: "dry-run-verified",
        dryRunRecordVersion: "managed-audit-dry-run-record.v1",
      },
      contract: {
        targetRecordVersion: "managed-audit-dry-run-record.v2-candidate",
        sourceRecordVersion: "managed-audit-dry-run-record.v1",
        schemaOnly: true,
        realApprovalDecisionCreated: false,
        realApprovalLedgerWritten: false,
        externalAuditSystemAccessed: false,
        javaWriteAttempted: false,
        miniKvWriteAttempted: false,
        productionAuditRecordAllowed: false,
      },
      bindingShape: {
        identity: {
          identityVersion: "operator-identity-contract.v1",
          operatorIdPath: "operatorIdentity.operatorId",
          verifiedTokenPath: "operatorIdentity.verifiedToken",
        },
        approvalRequest: {
          requestIdPath: "approvalRequest.requestId",
          previewDigestPath: "approvalRequest.previewDigest",
          preflightDigestPath: "approvalRequest.preflightDigest",
          requiredStatus: ["pending", "approved", "rejected"],
        },
        approvalDecision: {
          decisionIdPath: "approvalDecision.decisionId",
          decisionDigestPath: "approvalDecision.decisionDigest",
          upstreamTouchedPath: "approvalDecision.upstreamTouched",
          allowedValues: ["approved", "rejected"],
          requiredBeforeProductionExecution: true,
        },
        correlation: {
          approvalCorrelationIdPath: "headers.x-orderops-approval-correlation-id",
          auditRequestIdPath: "auditRecord.requestId",
          traceDigestPath: "bindingContract.contractDigest",
        },
      },
      checks: {
        sourceDryRunVerified: true,
        sourceDryRunStillBlocksProduction: true,
        contractDigestValid: true,
        operatorIdentityFieldsBound: true,
        approvalRequestFieldsBound: true,
        approvalDecisionFieldsBound: true,
        correlationFieldsBound: true,
        missingFieldRulesDefined: true,
        noRealApprovalDecisionCreated: true,
        noRealLedgerWritten: true,
        noExternalAuditAccessed: true,
        javaMiniKvWriteBlocked: true,
        upstreamActionsStillDisabled: true,
        executionStillBlocked: true,
        productionAuditStillBlocked: true,
        readyForManagedAuditIdentityApprovalBindingContract: true,
      },
      summary: {
        requiredBindingCount: 5,
        missingFieldRuleCount: 5,
        productionBlockerCount: 0,
      },
    });
    expect(profile.contract.contractDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceDryRunVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceDryRunVerification.sourceCandidateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.requiredBindings.map((binding) => binding.id)).toEqual([
      "operator-identity",
      "approval-request",
      "approval-decision",
      "approval-correlation",
      "digest-linkage",
    ]);
    expect(profile.missingFieldRules.map((rule) => rule.id)).toEqual([
      "missing-operator-identity",
      "missing-approval-request",
      "missing-approval-decision",
      "missing-correlation-id",
      "missing-digest-linkage",
    ]);
  });

  it("blocks when upstream actions are enabled", async () => {
    const config = loadTestConfig({
      UPSTREAM_ACTIONS_ENABLED: "true",
    });
    const profile = await loadManagedAuditIdentityApprovalBindingContract({
      config,
      runtime: describeAuditStoreRuntime(config),
      auditLog: new AuditLog(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
    });

    expect(profile.contractState).toBe("blocked");
    expect(profile.readyForManagedAuditIdentityApprovalBindingContract).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.contract.realApprovalDecisionCreated).toBe(false);
    expect(profile.contract.realApprovalLedgerWritten).toBe(false);
  });

  it("exposes JSON and Markdown routes", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-identity-approval-binding-contract",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-identity-approval-binding-contract?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-identity-approval-binding-contract.v1",
        contractState: "ready-for-identity-approval-dry-run-packet",
        readyForProductionAudit: false,
        contract: {
          schemaOnly: true,
          realApprovalDecisionCreated: false,
          realApprovalLedgerWritten: false,
        },
        bindingShape: {
          identity: {
            operatorIdPath: "operatorIdentity.operatorId",
          },
          approvalDecision: {
            upstreamTouchedPath: "approvalDecision.upstreamTouched",
          },
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit identity and approval binding contract");
      expect(markdown.body).toContain("operatorIdentity.operatorId");
      expect(markdown.body).toContain("START_NODE_V211_IDENTITY_APPROVAL_DRY_RUN_PACKET");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-210",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v210-binding-contract",
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
    PORT: "4307",
    ...overrides,
  });
}

class ThrowingOrderPlatformClient {
  health(): Promise<UpstreamJsonResponse> {
    throw new Error("managed audit binding contract must not call Java");
  }

  opsOverview(): Promise<UpstreamJsonResponse> {
    throw new Error("managed audit binding contract must not call Java");
  }

  releaseApprovalRehearsal(): Promise<UpstreamJsonResponse<Record<string, unknown>>> {
    throw new Error("managed audit binding contract must not call Java");
  }
}

class ThrowingMiniKvClient {
  health(): Promise<{ command: string; response: string; latencyMs: number }> {
    throw new Error("managed audit binding contract must not call mini-kv");
  }

  infoJson(): Promise<{ command: string; response: string; latencyMs: number; info: Record<string, unknown> }> {
    throw new Error("managed audit binding contract must not call mini-kv");
  }

  statsJson(): Promise<{ command: string; response: string; latencyMs: number; stats: Record<string, unknown> }> {
    throw new Error("managed audit binding contract must not call mini-kv");
  }

  execute(): Promise<{ command: string; response: string; latencyMs: number }> {
    throw new Error("managed audit binding contract must not call mini-kv");
  }
}
