import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadRealReadWindowAuditStoreHandoffContract,
} from "../src/services/realReadWindowAuditStoreHandoffContract.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("real-read window audit store handoff contract", () => {
  it("is blocked when the v198 identity binding headers are missing", async () => {
    const profile = await loadRealReadWindowAuditStoreHandoffContract({
      config: loadTestConfig(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
      headers: {},
    });

    expect(profile).toMatchObject({
      profileVersion: "real-read-window-audit-store-handoff-contract.v1",
      handoffState: "blocked",
      readyForRealReadWindowAuditStoreHandoff: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      checks: {
        sourceIdentityBindingReady: false,
        sourceProductionWindowStillBlocked: true,
        requiredRecordsComplete: true,
        requiredRecordsReadOnly: true,
        managedAuditStoreNotConnected: true,
        managedAuditWritesStillDisabled: true,
        readyForRealReadWindowAuditStoreHandoff: false,
      },
    });
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("SOURCE_IDENTITY_BINDING_NOT_READY");
  });

  it("defines window open, imported result, and checkpoint records without writing managed audit", async () => {
    const profile = await loadRealReadWindowAuditStoreHandoffContract({
      config: loadTestConfig(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
      headers: completeHeaders(),
    });

    expect(profile).toMatchObject({
      profileVersion: "real-read-window-audit-store-handoff-contract.v1",
      handoffState: "ready-for-managed-audit-handoff",
      readyForRealReadWindowAuditStoreHandoff: true,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      sourceIdentityBinding: {
        profileVersion: "real-read-window-operator-identity-binding.v1",
        bindingState: "ready-for-rehearsal-identity-binding",
        readyForIdentityBinding: true,
        readyForProductionWindow: false,
      },
      handoffContract: {
        managedAuditStoreConnected: false,
        managedAuditWritesAllowed: false,
        realDatabaseConnectionAttempted: false,
        fileAuditMigrationPerformed: false,
        requiredRecordCount: 3,
      },
      checks: {
        sourceIdentityBindingReady: true,
        sourceBindingDigestValid: true,
        sourceProductionWindowStillBlocked: true,
        requiredRecordsComplete: true,
        requiredRecordsReadOnly: true,
        requiredRecordsDigestValid: true,
        handoffRulesComplete: true,
        managedAuditStoreNotConnected: true,
        managedAuditWritesStillDisabled: true,
        fileAuditMigrationNotPerformed: true,
        productionDatabaseNotTouched: true,
        upstreamActionsStillDisabled: true,
        executionStillBlocked: true,
        readyForRealReadWindowAuditStoreHandoff: true,
      },
      summary: {
        checkCount: 14,
        passedCheckCount: 14,
        requiredRecordCount: 3,
        handoffRuleCount: 3,
        productionBlockerCount: 1,
      },
    });
    expect(profile.handoffContract.handoffDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.requiredRecords.map((record) => record.recordKind)).toEqual([
      "window-open",
      "imported-result",
      "checkpoint",
    ]);
    expect(profile.requiredRecords.every((record) =>
      record.appendOnly && record.readOnly && record.writesNow === false && /^[a-f0-9]{64}$/.test(record.digest)
    )).toBe(true);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "MANAGED_AUDIT_STORE_NOT_CONNECTED",
    ]);
  });

  it("exposes JSON and Markdown routes using the v198 identity binding headers", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-window-audit-store-handoff-contract",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-window-audit-store-handoff-contract?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "real-read-window-audit-store-handoff-contract.v1",
        handoffState: "ready-for-managed-audit-handoff",
        readyForRealReadWindowAuditStoreHandoff: true,
        readyForProductionAudit: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Real-read window audit store handoff contract");
      expect(markdown.body).toContain("window-open");
      expect(markdown.body).toContain("MANAGED_AUDIT_STORE_NOT_CONNECTED");
      expect(markdown.body).toContain("PROCEED_TO_NODE_V200_CI_ARTIFACT_MANIFEST");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "operator-199",
    "x-orderops-roles": "operator,auditor",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v199-audit-handoff",
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
    ...overrides,
  });
}

class ThrowingOrderPlatformClient {
  health(): Promise<UpstreamJsonResponse> {
    throw new Error("should not call Java when UPSTREAM_PROBES_ENABLED=false");
  }

  opsOverview(): Promise<UpstreamJsonResponse> {
    throw new Error("should not call Java when UPSTREAM_PROBES_ENABLED=false");
  }
}

class ThrowingMiniKvClient {
  health(): Promise<{ command: string; response: string; latencyMs: number }> {
    throw new Error("should not call mini-kv when UPSTREAM_PROBES_ENABLED=false");
  }

  infoJson(): Promise<{ command: string; response: string; latencyMs: number; info: Record<string, unknown> }> {
    throw new Error("should not call mini-kv when UPSTREAM_PROBES_ENABLED=false");
  }

  statsJson(): Promise<{ command: string; response: string; latencyMs: number; stats: Record<string, unknown> }> {
    throw new Error("should not call mini-kv when UPSTREAM_PROBES_ENABLED=false");
  }
}
