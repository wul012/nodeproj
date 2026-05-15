import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { AppHttpError } from "../src/errors.js";
import { loadConfig } from "../src/config.js";
import {
  loadRealReadAdapterFailureTaxonomy,
} from "../src/services/realReadAdapterFailureTaxonomy.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("real-read adapter failure taxonomy", () => {
  it("classifies the default closed window without contacting upstreams", async () => {
    const profile = await loadRealReadAdapterFailureTaxonomy({
      config: loadTestConfig(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
    });

    expect(profile).toMatchObject({
      profileVersion: "real-read-adapter-failure-taxonomy.v1",
      taxonomyState: "closed-window-classified",
      readyForRealReadAdapterFailureTaxonomy: true,
      readyForProductionOperations: false,
      readOnly: true,
      executionAllowed: false,
      taxonomy: {
        sourceAdapterProfileVersion: "real-read-adapter-rehearsal.v1",
        operatorWindowRunbookVersion: "real-read-adapter-operator-window-runbook.v1",
        javaFailureTaxonomyVersion: "Java v68",
        miniKvFailureTaxonomyVersion: "mini-kv v77",
        upstreamProbesEnabled: false,
        upstreamActionsEnabled: false,
        automaticUpstreamStart: false,
        productionWriteAuthorized: false,
      },
      checks: {
        adapterReviewReady: true,
        operatorWindowReady: true,
        javaV68TaxonomyAccepted: true,
        miniKvV77TaxonomyAccepted: true,
        allRecordsClassified: true,
        closedWindowClassifiedWhenProbesDisabled: true,
        unsafeSurfaceBlocked: true,
        unexpectedWriteSignalBlocked: true,
        upstreamActionsStillDisabled: true,
        noAutomaticUpstreamStart: true,
        readyForProductionOperationsStillFalse: true,
        readyForRealReadAdapterFailureTaxonomy: true,
      },
      summary: {
        classificationCount: 5,
        closedWindowCount: 5,
        connectionRefusedCount: 0,
        timeoutCount: 0,
        invalidJsonCount: 0,
        unsafeSurfaceCount: 0,
        unexpectedWriteSignalCount: 0,
        passedReadCount: 0,
        productionBlockerCount: 0,
      },
    });
    expect(profile.taxonomy.taxonomyDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.taxonomy.sourceAdapterDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.classifications.every((item) => item.failureClass === "closed-window")).toBe(true);
    expect(profile.classifications.every((item) => item.severity === "info")).toBe(true);
    expect(profile.upstreamEvidence.java.tag).toBe("v68订单平台release-approval-failure-taxonomy");
    expect(profile.upstreamEvidence.miniKv.tag).toBe("第七十七版运行时烟测失败分类");
  });

  it("classifies open-window timeout, invalid-json, and connection-refused failures", async () => {
    const profile = await loadRealReadAdapterFailureTaxonomy({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
      }),
      orderPlatform: new MixedFailureOrderPlatformClient(),
      miniKv: new MixedFailureMiniKvClient(),
    });

    expect(profile).toMatchObject({
      taxonomyState: "open-failure-classified",
      readyForRealReadAdapterFailureTaxonomy: true,
      readyForProductionOperations: false,
      taxonomy: {
        upstreamProbesEnabled: true,
        upstreamActionsEnabled: false,
      },
      summary: {
        classificationCount: 5,
        closedWindowCount: 0,
        connectionRefusedCount: 2,
        timeoutCount: 1,
        invalidJsonCount: 1,
        passedReadCount: 1,
        productionBlockerCount: 0,
      },
    });
    expect(profile.classifications.map((item) => item.failureClass)).toEqual([
      "passed-read",
      "timeout",
      "connection-refused",
      "invalid-json",
      "connection-refused",
    ]);
    expect(profile.classifications.filter((item) => item.severity === "warning")).toHaveLength(4);
  });

  it("blocks the taxonomy when upstream actions are enabled", async () => {
    const profile = await loadRealReadAdapterFailureTaxonomy({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
    });

    expect(profile.taxonomyState).toBe("blocked");
    expect(profile.readyForRealReadAdapterFailureTaxonomy).toBe(false);
    expect(profile.readyForProductionOperations).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes real-read adapter failure taxonomy routes in JSON and Markdown", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const headers = {
        "x-orderops-operator-id": "viewer-1",
        "x-orderops-roles": "viewer",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-adapter-failure-taxonomy",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-adapter-failure-taxonomy?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "real-read-adapter-failure-taxonomy.v1",
        taxonomyState: "closed-window-classified",
        readyForRealReadAdapterFailureTaxonomy: true,
        summary: {
          classificationCount: 5,
          closedWindowCount: 5,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Real-read adapter failure taxonomy");
      expect(markdown.body).toContain("closed-window");
      expect(markdown.body).toContain("Java v68");
      expect(markdown.body).toContain("mini-kv v77");
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

class MixedFailureOrderPlatformClient {
  health(): Promise<UpstreamJsonResponse> {
    return Promise.resolve({
      statusCode: 200,
      latencyMs: 5,
      data: { status: "UP" },
    });
  }

  opsOverview(): Promise<UpstreamJsonResponse> {
    throw new AppHttpError(504, "ORDER_PLATFORM_TIMEOUT", "Order platform timed out after 1200ms");
  }
}

class MixedFailureMiniKvClient {
  health(): Promise<{ command: string; response: string; latencyMs: number }> {
    throw new AppHttpError(502, "MINIKV_UNAVAILABLE", "mini-kv is unavailable: connect ECONNREFUSED 127.0.0.1:6379");
  }

  infoJson(): Promise<{ command: string; response: string; latencyMs: number; info: Record<string, unknown> }> {
    throw new AppHttpError(502, "MINIKV_INFOJSON_INVALID", "mini-kv returned invalid INFOJSON output");
  }

  statsJson(): Promise<{ command: string; response: string; latencyMs: number; stats: Record<string, unknown> }> {
    throw new AppHttpError(502, "MINIKV_CONNECTION_CLOSED", "mini-kv closed the connection before replying");
  }
}
