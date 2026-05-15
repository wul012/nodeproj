import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadRealReadAdapterRehearsal,
} from "../src/services/realReadAdapterRehearsal.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("real-read adapter rehearsal", () => {
  it("stays closed by default and does not contact upstreams", async () => {
    const config = loadTestConfig();
    const profile = await loadRealReadAdapterRehearsal({
      config,
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
    });

    expect(profile).toMatchObject({
      profileVersion: "real-read-adapter-rehearsal.v1",
      rehearsalState: "closed-skipped",
      readyForRealReadAdapterReview: true,
      readyForProductionPassEvidenceCandidate: false,
      readyForProductionOperations: false,
      readOnly: true,
      executionAllowed: false,
      adapter: {
        upstreamProbesEnabled: false,
        upstreamActionsEnabled: false,
        automaticUpstreamStart: false,
        manualJavaStartRequired: true,
        manualMiniKvStartRequired: true,
        javaDependencyVersion: "Java v67",
        miniKvDependencyVersion: "mini-kv v76",
        plannedProbeCount: 5,
        attemptedProbeCount: 0,
        passedProbeCount: 0,
        skippedProbeCount: 5,
        blockedProbeCount: 0,
      },
      checks: {
        javaV67EvidenceAccepted: true,
        miniKvV76EvidenceAccepted: true,
        smokeHarnessReady: true,
        allowedAdapterSurfaceOnly: true,
        allProbeResultsRecorded: true,
        allProbeResultsReadOnly: true,
        noWriteProbeAttempted: true,
        upstreamActionsStillDisabled: true,
        noAutomaticUpstreamStart: true,
        closedWindowSkipsWithoutAttempt: true,
        passEvidenceRequiresOpenWindow: true,
        readyForProductionOperationsStillFalse: true,
        readyForRealReadAdapterReview: true,
        readyForProductionPassEvidenceCandidate: false,
      },
      summary: {
        recordCount: 5,
        attemptedProbeCount: 0,
        passedProbeCount: 0,
        skippedProbeCount: 5,
        blockedProbeCount: 0,
        productionBlockerCount: 0,
      },
    });
    expect(profile.adapter.adapterDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.records.every((record) => record.adapterStatus === "skipped-read")).toBe(true);
    expect(profile.records.every((record) => !record.attempted)).toBe(true);
    expect(profile.warnings.map((warning) => warning.code)).toContain("REAL_READ_ADAPTER_REHEARSAL_CLOSED");
  });

  it("records pass evidence candidate when the manual probe window is open and read-only upstreams respond", async () => {
    const config = loadTestConfig({
      UPSTREAM_PROBES_ENABLED: "true",
    });
    const profile = await loadRealReadAdapterRehearsal({
      config,
      orderPlatform: new PassingOrderPlatformClient(),
      miniKv: new PassingMiniKvClient(),
    });

    expect(profile).toMatchObject({
      rehearsalState: "open-pass",
      readyForRealReadAdapterReview: true,
      readyForProductionPassEvidenceCandidate: true,
      readyForProductionOperations: false,
      adapter: {
        upstreamProbesEnabled: true,
        upstreamActionsEnabled: false,
        attemptedProbeCount: 5,
        passedProbeCount: 5,
        skippedProbeCount: 0,
        blockedProbeCount: 0,
      },
      checks: {
        upstreamActionsStillDisabled: true,
        passEvidenceRequiresOpenWindow: true,
        readyForProductionPassEvidenceCandidate: true,
      },
    });
    expect(profile.records.every((record) => record.adapterStatus === "passed-read")).toBe(true);
    expect(profile.records.every((record) => record.allowedByAdapter)).toBe(true);
    expect(profile.productionBlockers).toHaveLength(0);
    expect(profile.warnings.map((warning) => warning.code)).toContain("REAL_READ_ADAPTER_REHEARSAL_PASS");
  });

  it("exposes real-read adapter rehearsal routes in JSON and Markdown", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const headers = {
        "x-orderops-operator-id": "viewer-1",
        "x-orderops-roles": "viewer",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-adapter-rehearsal",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-adapter-rehearsal?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "real-read-adapter-rehearsal.v1",
        rehearsalState: "closed-skipped",
        readyForRealReadAdapterReview: true,
        readyForProductionPassEvidenceCandidate: false,
        adapter: {
          javaDependencyVersion: "Java v67",
          miniKvDependencyVersion: "mini-kv v76",
          skippedProbeCount: 5,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Real-read adapter rehearsal");
      expect(markdown.body).toContain("REAL_READ_ADAPTER_REHEARSAL_CLOSED");
      expect(markdown.body).toContain("java-actuator-health");
      expect(markdown.body).toContain("mini-kv-infojson");
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

class PassingOrderPlatformClient {
  health(): Promise<UpstreamJsonResponse> {
    return Promise.resolve({
      statusCode: 200,
      latencyMs: 5,
      data: { status: "UP" },
    });
  }

  opsOverview(): Promise<UpstreamJsonResponse> {
    return Promise.resolve({
      statusCode: 200,
      latencyMs: 7,
      data: {
        sampledAt: "2026-05-15T00:00:00.000Z",
        application: { name: "advanced-order-platform" },
        orders: { total: 3 },
        outbox: { pending: 0 },
        failedEvents: { total: 0, pendingReplayApprovals: 0 },
      },
    });
  }
}

class PassingMiniKvClient {
  health(): Promise<{ command: string; response: string; latencyMs: number }> {
    return Promise.resolve({
      command: "HEALTH",
      response: "OK",
      latencyMs: 4,
    });
  }

  infoJson(): Promise<{ command: string; response: string; latencyMs: number; info: Record<string, unknown> }> {
    return Promise.resolve({
      command: "INFOJSON",
      response: "{\"version\":\"0.76.0\"}",
      latencyMs: 4,
      info: {
        version: "0.76.0",
        server: { protocol: ["tcp-inline"] },
        store: { live_keys: 0 },
      },
    });
  }

  statsJson(): Promise<{ command: string; response: string; latencyMs: number; stats: Record<string, unknown> }> {
    return Promise.resolve({
      command: "STATSJSON",
      response: "{\"keys\":0}",
      latencyMs: 4,
      stats: {
        keys: 0,
        commands_total: 3,
      },
    });
  }
}
