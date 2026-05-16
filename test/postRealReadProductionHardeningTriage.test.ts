import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadPostRealReadProductionHardeningTriage,
} from "../src/services/postRealReadProductionHardeningTriage.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("post-real-read production hardening triage", () => {
  it("selects focused production hardening priorities from the v206 archive verification", async () => {
    const profile = await loadPostRealReadProductionHardeningTriage({
      config: loadTestConfig(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
      headers: completeHeaders(),
    });

    expect(profile).toMatchObject({
      profileVersion: "post-real-read-production-hardening-triage.v1",
      triageState: "ready-for-hardening-roadmap",
      readyForPostRealReadProductionHardeningTriage: true,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnly: true,
      executionAllowed: false,
      triage: {
        sourceArchiveVerificationProfileVersion: "three-project-real-read-runtime-smoke-archive-verification.v1",
        sourceArchiveVerificationState: "verified-real-read-runtime-smoke-archive",
        sourceEvidenceSpan: "Node v205-v206 + Java v73 + mini-kv v82",
        selectedPriorityCount: 3,
        candidateGateCount: 5,
        archiveOnlySummaryAllowed: false,
        upstreamActionsEnabled: false,
        productionWindowAllowed: false,
      },
      checks: {
        sourceArchiveVerificationReady: true,
        sourceArchiveVerificationDigestValid: true,
        sourceArchiveVerificationStillReadOnly: true,
        sourceArchiveVerificationDoesNotRerunUpstreams: true,
        sourceProductionWindowStillBlocked: true,
        candidateGateCountStable: true,
        selectedPriorityCountFocused: true,
        selectedPrioritiesAreTopRanked: true,
        selectedPrioritiesAreActionable: true,
        managedAuditSelectedFirst: true,
        operatorIdentitySelected: true,
        approvalRecordSelected: true,
        deferredGatesRemainTracked: true,
        noArchiveOnlySummaryExpansion: true,
        upstreamActionsStillDisabled: true,
        executionStillBlocked: true,
        readyForPostRealReadProductionHardeningTriage: true,
      },
      summary: {
        selectedPriorityCount: 3,
        deferredGateCount: 2,
        productionBlockerCount: 0,
      },
    });
    expect(profile.triage.triageDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.triage.sourceArchiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.selectedPriorities.map((priority) => priority.id)).toEqual([
      "managed-audit-persistence",
      "operator-identity-boundary",
      "manual-approval-record",
    ]);
    expect(profile.deferredGates.map((gate) => gate.id)).toEqual([
      "ci-artifact-store",
      "rollback-control-boundary",
    ]);
    expect(profile.nextActions).toContain("Use Node v208 for the managed audit persistence boundary candidate after those read-only hints exist.");
  });

  it("blocks when upstream actions are enabled", async () => {
    const profile = await loadPostRealReadProductionHardeningTriage({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
      headers: completeHeaders(),
    });

    expect(profile.triageState).toBe("blocked");
    expect(profile.readyForPostRealReadProductionHardeningTriage).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes JSON and Markdown routes", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/post-real-read-production-hardening-triage",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/post-real-read-production-hardening-triage?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "post-real-read-production-hardening-triage.v1",
        triageState: "ready-for-hardening-roadmap",
        readyForProductionWindow: false,
        triage: {
          selectedPriorityCount: 3,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Post-real-read production hardening triage");
      expect(markdown.body).toContain("ready-for-hardening-roadmap");
      expect(markdown.body).toContain("managed-audit-persistence");
      expect(markdown.body).toContain("RUN_JAVA_V74_AND_MINI_KV_V83_IN_PARALLEL");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "operator-207",
    "x-orderops-roles": "operator,auditor",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v207-hardening-triage",
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
    PORT: "4305",
    ...overrides,
  });
}

class ThrowingOrderPlatformClient {
  health(): Promise<UpstreamJsonResponse> {
    throw new Error("triage must not call Java");
  }

  opsOverview(): Promise<UpstreamJsonResponse> {
    throw new Error("triage must not call Java");
  }

  releaseApprovalRehearsal(): Promise<UpstreamJsonResponse<Record<string, unknown>>> {
    throw new Error("triage must not call Java");
  }
}

class ThrowingMiniKvClient {
  health(): Promise<{ command: string; response: string; latencyMs: number }> {
    throw new Error("triage must not call mini-kv");
  }

  infoJson(): Promise<{ command: string; response: string; latencyMs: number; info: Record<string, unknown> }> {
    throw new Error("triage must not call mini-kv");
  }

  statsJson(): Promise<{ command: string; response: string; latencyMs: number; stats: Record<string, unknown> }> {
    throw new Error("triage must not call mini-kv");
  }

  execute(): Promise<{ command: string; response: string; latencyMs: number }> {
    throw new Error("triage must not call mini-kv");
  }
}
