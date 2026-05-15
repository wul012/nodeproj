import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadRealReadWindowOperatorIdentityBinding,
} from "../src/services/realReadWindowOperatorIdentityBinding.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("real-read window operator identity binding", () => {
  it("blocks the binding when operator identity or approval correlation headers are missing", async () => {
    const profile = await loadRealReadWindowOperatorIdentityBinding({
      config: loadTestConfig(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
      headers: {},
    });

    expect(profile).toMatchObject({
      profileVersion: "real-read-window-operator-identity-binding.v1",
      bindingState: "blocked",
      readyForRealReadWindowOperatorIdentityBinding: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnly: true,
      executionAllowed: false,
      operatorIdentity: {
        source: "request-headers",
        operatorId: null,
        roles: [],
        verifiedClaimPresent: false,
        verifiedClaimValue: false,
        verificationMode: "rehearsal-header-claim",
        productionIdpVerified: false,
      },
      approvalBinding: {
        approvalCorrelationId: null,
        approvalCorrelationIdValid: false,
        persistedApprovalRecordExists: false,
      },
      checks: {
        sourceCheckpointReady: true,
        sourceProductionWindowStillBlocked: true,
        operatorIdPresent: false,
        operatorRolesPresent: false,
        operatorVerifiedClaimPresent: false,
        approvalCorrelationIdPresent: false,
        productionIdpNotConnected: true,
        upstreamActionsStillDisabled: true,
        executionStillBlocked: true,
        readyForRealReadWindowOperatorIdentityBinding: false,
      },
    });
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "OPERATOR_ID_MISSING",
      "OPERATOR_ROLES_MISSING",
      "OPERATOR_VERIFIED_CLAIM_MISSING",
      "APPROVAL_CORRELATION_ID_MISSING",
      "REAL_IDP_NOT_CONNECTED",
      "MANUAL_APPROVAL_RECORD_NOT_PERSISTED",
    ]));
  });

  it("accepts a complete rehearsal binding while keeping the production window blocked", async () => {
    const profile = await loadRealReadWindowOperatorIdentityBinding({
      config: loadTestConfig(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
      headers: completeHeaders(),
    });

    expect(profile).toMatchObject({
      profileVersion: "real-read-window-operator-identity-binding.v1",
      bindingState: "ready-for-rehearsal-identity-binding",
      readyForRealReadWindowOperatorIdentityBinding: true,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnly: true,
      executionAllowed: false,
      sourceCheckpoint: {
        checkpointState: "rehearsal-evidence-ready-production-window-blocked",
        readyForCheckpoint: true,
        readyForProductionWindow: false,
      },
      operatorIdentity: {
        operatorId: "operator-198",
        roles: ["operator", "auditor"],
        rejectedRoles: [],
        authenticatedByHeaderContract: true,
        verifiedClaimPresent: true,
        verifiedClaimValue: true,
        productionIdpVerified: false,
      },
      approvalBinding: {
        approvalCorrelationId: "approval-v198-operator-window",
        approvalCorrelationIdValid: true,
        persistedApprovalRecordExists: false,
      },
      packet: {
        hardGateFromV197: "real-operator-identity",
        hardGateProgress: "rehearsal-binding-ready-real-idp-blocked",
        productionIdpConnected: false,
        productionWindowAllowed: false,
        productionOperationAllowed: false,
      },
      summary: {
        checkCount: 17,
        passedCheckCount: 17,
        roleCount: 2,
        rejectedRoleCount: 0,
        bindingRuleCount: 5,
        productionBlockerCount: 2,
      },
    });
    expect(profile.packet.bindingDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.packet.operatorIdentityDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.packet.approvalCorrelationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "REAL_IDP_NOT_CONNECTED",
      "MANUAL_APPROVAL_RECORD_NOT_PERSISTED",
    ]);
    expect(profile.bindingRules.every((rule) =>
      rule.satisfiedForRehearsalBinding && rule.satisfiedForProductionWindow === false
    )).toBe(true);
  });

  it("exposes JSON and Markdown routes using request headers", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-window-operator-identity-binding",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-window-operator-identity-binding?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "real-read-window-operator-identity-binding.v1",
        bindingState: "ready-for-rehearsal-identity-binding",
        readyForRealReadWindowOperatorIdentityBinding: true,
        readyForProductionWindow: false,
        operatorIdentity: {
          operatorId: "operator-198",
          verifiedClaimValue: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Real-read window operator identity binding");
      expect(markdown.body).toContain("ready-for-rehearsal-identity-binding");
      expect(markdown.body).toContain("REAL_IDP_NOT_CONNECTED");
      expect(markdown.body).toContain("PROCEED_TO_JAVA_V70_AND_MINIKV_V79");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "operator-198",
    "x-orderops-roles": "operator,auditor",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v198-operator-window",
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
