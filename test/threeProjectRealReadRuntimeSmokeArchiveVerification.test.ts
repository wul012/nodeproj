import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadThreeProjectRealReadRuntimeSmokeArchiveVerification,
} from "../src/services/threeProjectRealReadRuntimeSmokeArchiveVerification.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("three-project real-read runtime smoke archive verification", () => {
  it("verifies v205 archive files without rerunning Java or mini-kv", async () => {
    const profile = await loadThreeProjectRealReadRuntimeSmokeArchiveVerification({
      config: loadTestConfig(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
      headers: completeHeaders(),
    });

    expect(profile).toMatchObject({
      profileVersion: "three-project-real-read-runtime-smoke-archive-verification.v1",
      verificationState: "verified-real-read-runtime-smoke-archive",
      readyForThreeProjectRealReadRuntimeSmokeArchiveVerification: true,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnly: true,
      executionAllowed: false,
      verification: {
        sourceExecutionPacketProfileVersion: "three-project-real-read-runtime-smoke-execution-packet.v1",
        sourceExecutionPacketState: "closed-window-skipped",
        archivedExecutionDigest: "1bb5dcd900100feb0ce0bccb96a9db371c03f90cab7199edc98433b5a21f36c1",
        archiveRoot: "c/205",
        evidenceSpan: "Node v205 + Java v73 + mini-kv v82",
        runtimeSmokeExecutedInSource: true,
        archiveVerificationRerunsUpstreams: false,
        upstreamActionsEnabled: false,
        productionWindowAllowed: false,
      },
      closedWindowRecheck: {
        packetState: "closed-window-skipped",
        attemptedTargetCount: 0,
        skippedTargetCount: 8,
        realRuntimeSmokeExecuted: false,
        productionWindowReady: false,
        archiveVerificationReusedEndpointShape: true,
      },
      checks: {
        sourcePacketProfileVersionValid: true,
        sourcePacketClosedWindowSafe: true,
        sourcePacketDigestValid: true,
        archivedDigestDocumented: true,
        archiveFilesPresent: true,
        archiveFilesNonEmpty: true,
        screenshotPresent: true,
        screenshotNonEmpty: true,
        htmlArchivePresent: true,
        explanationMentionsExecutedPass: true,
        explanationMentionsEightTargets: true,
        explanationMentionsCleanup: true,
        walkthroughPresent: true,
        walkthroughMentionsRuntimeBoundary: true,
        planMarksV205Done: true,
        planPointsToV206: true,
        noArchiveVerificationUpstreamRerun: true,
        upstreamActionsStillDisabled: true,
        productionWindowStillBlocked: true,
        readyForProductionOperationsStillFalse: true,
        readyForThreeProjectRealReadRuntimeSmokeArchiveVerification: true,
      },
      summary: {
        archiveFileCount: 5,
        snippetMatchCount: 9,
        productionBlockerCount: 0,
      },
    });
    expect(profile.verification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.verification.sourceExecutionPacketDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archivedEvidence.files.every((file) => file.exists && file.sizeBytes > 0 && file.digest?.length === 64)).toBe(true);
    expect(profile.archivedEvidence.snippetMatches.every((snippet) => snippet.matched)).toBe(true);
  });

  it("blocks when upstream actions are enabled", async () => {
    const profile = await loadThreeProjectRealReadRuntimeSmokeArchiveVerification({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
      headers: completeHeaders(),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForThreeProjectRealReadRuntimeSmokeArchiveVerification).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes JSON and Markdown routes", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/three-project-real-read-runtime-smoke-archive-verification",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/three-project-real-read-runtime-smoke-archive-verification?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "three-project-real-read-runtime-smoke-archive-verification.v1",
        verificationState: "verified-real-read-runtime-smoke-archive",
        readyForProductionWindow: false,
        closedWindowRecheck: {
          packetState: "closed-window-skipped",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Three-project real-read runtime smoke archive verification");
      expect(markdown.body).toContain("verified-real-read-runtime-smoke-archive");
      expect(markdown.body).toContain("archiveFilesPresent: true");
      expect(markdown.body).toContain("CREATE_NEXT_REAL_READ_HARDENING_PLAN");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "operator-206",
    "x-orderops-roles": "operator,auditor",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v206-archive-verification",
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
    throw new Error("archive verification must not call Java");
  }

  opsOverview(): Promise<UpstreamJsonResponse> {
    throw new Error("archive verification must not call Java");
  }

  releaseApprovalRehearsal(): Promise<UpstreamJsonResponse<Record<string, unknown>>> {
    throw new Error("archive verification must not call Java");
  }
}

class ThrowingMiniKvClient {
  health(): Promise<{ command: string; response: string; latencyMs: number }> {
    throw new Error("archive verification must not call mini-kv");
  }

  infoJson(): Promise<{ command: string; response: string; latencyMs: number; info: Record<string, unknown> }> {
    throw new Error("archive verification must not call mini-kv");
  }

  statsJson(): Promise<{ command: string; response: string; latencyMs: number; stats: Record<string, unknown> }> {
    throw new Error("archive verification must not call mini-kv");
  }

  execute(): Promise<{ command: string; response: string; latencyMs: number }> {
    throw new Error("archive verification must not call mini-kv");
  }
}
