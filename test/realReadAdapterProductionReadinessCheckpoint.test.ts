import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadRealReadAdapterProductionReadinessCheckpoint,
} from "../src/services/realReadAdapterProductionReadinessCheckpoint.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("real-read adapter production readiness checkpoint", () => {
  it("summarizes v191-v196 evidence while keeping the production window blocked", async () => {
    const profile = await loadRealReadAdapterProductionReadinessCheckpoint({
      config: loadTestConfig(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
    });

    expect(profile).toMatchObject({
      profileVersion: "real-read-adapter-production-readiness-checkpoint.v1",
      checkpointState: "rehearsal-evidence-ready-production-window-blocked",
      readyForRealReadAdapterProductionReadinessCheckpoint: true,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnly: true,
      executionAllowed: false,
      checkpoint: {
        evidenceSpan: "Node v191-v196 + Java v69 + mini-kv v78",
        sourcePacketState: "closed-baseline-with-imported-window-sample",
        importedSamplePromotedToProductionPass: false,
        productionWindowAllowed: false,
        productionOperationAllowed: false,
      },
      checks: {
        sourcePacketReady: true,
        sourcePacketDigestValid: true,
        sourceSampleDigestValid: true,
        sourceVerificationDigestValid: true,
        sourceArchiveDigestValid: true,
        evidenceSpanComplete: true,
        closedBaselinePreserved: true,
        importedSampleSeparated: true,
        javaV69VerificationHintAccepted: true,
        miniKvV78SmokeVerificationAccepted: true,
        importedRecordsReadOnly: true,
        upstreamActionsStillDisabled: true,
        noAutomaticUpstreamStart: true,
        importedSampleNotProductionPass: true,
        hardGatesRecorded: true,
        productionWindowStillBlocked: true,
        readyForProductionOperationsStillFalse: true,
        readyForRealReadAdapterProductionReadinessCheckpoint: true,
      },
      summary: {
        checkpointCheckCount: 18,
        passedCheckpointCheckCount: 18,
        evidenceChainItemCount: 8,
        hardGateCount: 4,
        unsatisfiedHardGateCount: 4,
        productionBlockerCount: 4,
      },
    });
    expect(profile.checkpoint.checkpointDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.checkpoint.sourcePacketDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.evidenceChain.map((item) => item.version)).toEqual([
      "Node v191",
      "Node v192",
      "Node v193",
      "Node v194",
      "Node v195",
      "Node v196",
      "Java v69",
      "mini-kv v78",
    ]);
    expect(profile.hardGates.map((gate) => gate.id)).toEqual([
      "real-operator-identity",
      "managed-audit-store",
      "ci-archive-artifact",
      "manual-approval-record",
    ]);
    expect(profile.hardGates.every((gate) => gate.blocking && !gate.satisfied)).toBe(true);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "HARD_GATE_REAL_OPERATOR_IDENTITY",
      "HARD_GATE_MANAGED_AUDIT_STORE",
      "HARD_GATE_CI_ARCHIVE_ARTIFACT",
      "HARD_GATE_MANUAL_APPROVAL_RECORD",
    ]);
  });

  it("blocks the checkpoint when upstream actions are enabled", async () => {
    const profile = await loadRealReadAdapterProductionReadinessCheckpoint({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
    });

    expect(profile.checkpointState).toBe("blocked");
    expect(profile.readyForRealReadAdapterProductionReadinessCheckpoint).toBe(false);
    expect(profile.readyForProductionWindow).toBe(false);
    expect(profile.readyForProductionOperations).toBe(false);
    expect(profile.checks.sourcePacketReady).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes production readiness checkpoint routes in JSON and Markdown", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const headers = {
        "x-orderops-operator-id": "viewer-1",
        "x-orderops-roles": "viewer",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-adapter-production-readiness-checkpoint",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-adapter-production-readiness-checkpoint?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "real-read-adapter-production-readiness-checkpoint.v1",
        checkpointState: "rehearsal-evidence-ready-production-window-blocked",
        readyForRealReadAdapterProductionReadinessCheckpoint: true,
        readyForProductionWindow: false,
        readyForProductionOperations: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Real-read adapter production readiness checkpoint");
      expect(markdown.body).toContain("rehearsal-evidence-ready-production-window-blocked");
      expect(markdown.body).toContain("managed-audit-store");
      expect(markdown.body).toContain("START_POST_V197_HARD_GATE_PLAN");
    } finally {
      await app.close();
    }
  });
});

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
