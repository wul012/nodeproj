import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { AppHttpError } from "../src/errors.js";
import { loadConfig } from "../src/config.js";
import {
  loadRealReadAdapterEvidenceArchive,
} from "../src/services/realReadAdapterEvidenceArchive.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("real-read adapter evidence archive", () => {
  it("archives the closed-window adapter bundle without contacting upstreams", async () => {
    const profile = await loadRealReadAdapterEvidenceArchive({
      config: loadTestConfig(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
    });

    expect(profile).toMatchObject({
      profileVersion: "real-read-adapter-evidence-archive.v1",
      archiveState: "closed-window-evidence-archived",
      readyForRealReadAdapterEvidenceArchive: true,
      readyForProductionOperations: false,
      readOnly: true,
      executionAllowed: false,
      archive: {
        adapterProfileVersion: "real-read-adapter-rehearsal.v1",
        taxonomyProfileVersion: "real-read-adapter-failure-taxonomy.v1",
        operatorWindowRunbookVersion: "real-read-adapter-operator-window-runbook.v1",
        rehearsalState: "closed-skipped",
        taxonomyState: "closed-window-classified",
        upstreamProbesEnabled: false,
        upstreamActionsEnabled: false,
        readOnlyWindowOpen: false,
        automaticUpstreamStart: false,
        productionWriteAuthorized: false,
        archivedAsProductionPassEvidence: false,
      },
      checks: {
        adapterDigestValid: true,
        taxonomyDigestValid: true,
        operatorWindowRunbookDigestValid: true,
        adapterProfileVersionValid: true,
        taxonomyProfileVersionValid: true,
        operatorWindowRunbookVersionValid: true,
        taxonomyReady: true,
        taxonomyMatchesAdapterDigest: true,
        classificationCoverageComplete: true,
        closedWindowArchivedAsNonPass: true,
        unsafeSurfaceNotPromoted: true,
        upstreamActionsStillDisabled: true,
        noAutomaticUpstreamStart: true,
        readyForProductionOperationsStillFalse: true,
        readyForRealReadAdapterEvidenceArchive: true,
      },
      artifacts: {
        adapter: {
          recordCount: 5,
          attemptedProbeCount: 0,
          skippedProbeCount: 5,
          readyForProductionOperations: false,
        },
        operatorWindow: {
          operatorStepCount: 5,
          allowedReadCount: 5,
          readyForProductionOperations: false,
        },
        taxonomy: {
          classificationCount: 5,
          failureClasses: ["closed-window"],
          readyForProductionOperations: false,
        },
      },
      summary: {
        archiveCheckCount: 15,
        passedArchiveCheckCount: 15,
        adapterRecordCount: 5,
        taxonomyClassificationCount: 5,
        distinctFailureClassCount: 1,
        productionBlockerCount: 0,
      },
    });
    expect(profile.archive.archiveDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archive.adapterDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archive.taxonomyDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archive.operatorWindowRunbookDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.productionBlockers).toHaveLength(0);
  });

  it("archives open-window failure taxonomy as non-production evidence", async () => {
    const profile = await loadRealReadAdapterEvidenceArchive({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
      }),
      orderPlatform: new MixedFailureOrderPlatformClient(),
      miniKv: new MixedFailureMiniKvClient(),
    });

    expect(profile).toMatchObject({
      archiveState: "open-window-evidence-archived",
      readyForRealReadAdapterEvidenceArchive: true,
      readyForProductionOperations: false,
      archive: {
        rehearsalState: "open-mixed",
        taxonomyState: "open-failure-classified",
        upstreamProbesEnabled: true,
        upstreamActionsEnabled: false,
        readOnlyWindowOpen: true,
        archivedAsProductionPassEvidence: false,
      },
      artifacts: {
        adapter: {
          attemptedProbeCount: 1,
          passedProbeCount: 1,
          skippedProbeCount: 4,
        },
        taxonomy: {
          classificationCount: 5,
          failureClasses: ["connection-refused", "invalid-json", "passed-read", "timeout"],
        },
      },
      summary: {
        adapterRecordCount: 5,
        taxonomyClassificationCount: 5,
        distinctFailureClassCount: 4,
        productionBlockerCount: 0,
      },
    });
    expect(profile.archive.archiveDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.productionBlockers).toHaveLength(0);
  });

  it("blocks archive when upstream actions are enabled", async () => {
    const profile = await loadRealReadAdapterEvidenceArchive({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
    });

    expect(profile.archiveState).toBe("blocked");
    expect(profile.readyForRealReadAdapterEvidenceArchive).toBe(false);
    expect(profile.readyForProductionOperations).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes real-read adapter evidence archive routes in JSON and Markdown", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const headers = {
        "x-orderops-operator-id": "viewer-1",
        "x-orderops-roles": "viewer",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-adapter-evidence-archive",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-adapter-evidence-archive?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "real-read-adapter-evidence-archive.v1",
        archiveState: "closed-window-evidence-archived",
        readyForRealReadAdapterEvidenceArchive: true,
        archive: {
          taxonomyState: "closed-window-classified",
          archivedAsProductionPassEvidence: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Real-read adapter evidence archive");
      expect(markdown.body).toContain("closed-window-evidence-archived");
      expect(markdown.body).toContain("real-read-adapter-failure-taxonomy");
      expect(markdown.body).toContain("START_POST_V194_PLAN");
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
