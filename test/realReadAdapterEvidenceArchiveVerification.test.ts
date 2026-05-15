import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { AppHttpError } from "../src/errors.js";
import {
  loadRealReadAdapterEvidenceArchiveVerification,
} from "../src/services/realReadAdapterEvidenceArchiveVerification.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("real-read adapter evidence archive verification", () => {
  it("verifies the closed-window archive digest without contacting upstreams", async () => {
    const profile = await loadRealReadAdapterEvidenceArchiveVerification({
      config: loadTestConfig(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
    });

    expect(profile).toMatchObject({
      profileVersion: "real-read-adapter-evidence-archive-verification.v1",
      verificationState: "verified-closed-window-archive",
      readyForRealReadAdapterEvidenceArchiveVerification: true,
      readyForProductionOperations: false,
      readOnly: true,
      executionAllowed: false,
      verification: {
        sourceArchiveProfileVersion: "real-read-adapter-evidence-archive.v1",
        sourceArchiveState: "closed-window-evidence-archived",
        sourceRehearsalState: "closed-skipped",
        sourceTaxonomyState: "closed-window-classified",
        archivedAsProductionPassEvidence: false,
        productionWriteAuthorized: false,
        upstreamActionsEnabled: false,
        automaticUpstreamStart: false,
        classificationCoverageComplete: true,
        readOnlyWindowOpen: false,
        runtimeFileRead: false,
      },
      checks: {
        sourceArchiveReady: true,
        archiveDigestValid: true,
        archiveDigestMatches: true,
        sourceArchiveProfileVersionValid: true,
        adapterDigestValid: true,
        taxonomyDigestValid: true,
        operatorWindowRunbookDigestValid: true,
        classificationCoverageStillComplete: true,
        archiveChecksAllPassed: true,
        archiveProductionBlockersClear: true,
        closedWindowStillNonPass: true,
        productionPassStillFalse: true,
        upstreamActionsStillDisabled: true,
        noAutomaticUpstreamStart: true,
        readyForProductionOperationsStillFalse: true,
        readyForRealReadAdapterEvidenceArchiveVerification: true,
      },
      artifacts: {
        archive: {
          archiveState: "closed-window-evidence-archived",
          readyForRealReadAdapterEvidenceArchive: true,
          readyForProductionOperations: false,
        },
        classificationCoverage: {
          adapterRecordCount: 5,
          taxonomyClassificationCount: 5,
          distinctFailureClassCount: 1,
          failureClasses: ["closed-window"],
        },
      },
      summary: {
        verificationCheckCount: 16,
        passedVerificationCheckCount: 16,
        productionBlockerCount: 0,
      },
    });
    expect(profile.verification.storedArchiveDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.verification.recomputedArchiveDigest).toBe(profile.verification.storedArchiveDigest);
    expect(profile.verification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.artifacts.digestChain.archiveDigest).toBe(profile.verification.storedArchiveDigest);
    expect(profile.productionBlockers).toHaveLength(0);
  });

  it("verifies open-window failure archive evidence as non-production evidence", async () => {
    const profile = await loadRealReadAdapterEvidenceArchiveVerification({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
      }),
      orderPlatform: new MixedFailureOrderPlatformClient(),
      miniKv: new MixedFailureMiniKvClient(),
    });

    expect(profile).toMatchObject({
      verificationState: "verified-open-window-archive",
      readyForRealReadAdapterEvidenceArchiveVerification: true,
      readyForProductionOperations: false,
      verification: {
        sourceArchiveState: "open-window-evidence-archived",
        sourceRehearsalState: "open-mixed",
        sourceTaxonomyState: "open-failure-classified",
        archivedAsProductionPassEvidence: false,
        readOnlyWindowOpen: true,
      },
      checks: {
        archiveDigestMatches: true,
        classificationCoverageStillComplete: true,
        productionPassStillFalse: true,
        upstreamActionsStillDisabled: true,
      },
      artifacts: {
        classificationCoverage: {
          adapterRecordCount: 5,
          taxonomyClassificationCount: 5,
          distinctFailureClassCount: 4,
          failureClasses: ["connection-refused", "invalid-json", "passed-read", "timeout"],
        },
      },
      summary: {
        productionBlockerCount: 0,
      },
    });
    expect(profile.verification.recomputedArchiveDigest).toBe(profile.verification.storedArchiveDigest);
  });

  it("blocks verification when upstream actions are enabled", async () => {
    const profile = await loadRealReadAdapterEvidenceArchiveVerification({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForRealReadAdapterEvidenceArchiveVerification).toBe(false);
    expect(profile.readyForProductionOperations).toBe(false);
    expect(profile.checks.sourceArchiveReady).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes real-read adapter evidence archive verification routes in JSON and Markdown", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const headers = {
        "x-orderops-operator-id": "viewer-1",
        "x-orderops-roles": "viewer",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-adapter-evidence-archive-verification",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-adapter-evidence-archive-verification?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "real-read-adapter-evidence-archive-verification.v1",
        verificationState: "verified-closed-window-archive",
        readyForRealReadAdapterEvidenceArchiveVerification: true,
        verification: {
          sourceArchiveState: "closed-window-evidence-archived",
          archivedAsProductionPassEvidence: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Real-read adapter evidence archive verification");
      expect(markdown.body).toContain("verified-closed-window-archive");
      expect(markdown.body).toContain("archiveDigestMatches: true");
      expect(markdown.body).toContain("WAIT_FOR_UPSTREAM_VERIFICATION_HINTS");
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
