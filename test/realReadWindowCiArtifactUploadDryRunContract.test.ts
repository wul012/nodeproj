import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadRealReadWindowCiArtifactUploadDryRunContract,
} from "../src/services/realReadWindowCiArtifactUploadDryRunContract.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("real-read window CI artifact upload dry-run contract", () => {
  it("is blocked when the source v201 verification is not ready", async () => {
    const profile = await loadRealReadWindowCiArtifactUploadDryRunContract({
      config: loadTestConfig(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
      headers: {},
    });

    expect(profile).toMatchObject({
      profileVersion: "real-read-window-ci-artifact-upload-dry-run-contract.v1",
      contractState: "blocked",
      readyForRealReadWindowCiArtifactUploadDryRunContract: false,
      readyForRealCiArtifactUpload: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      sourceVerification: {
        ready: false,
        readyForCiArtifactUpload: false,
      },
      dryRunContract: {
        artifactName: "orderops-real-read-window-evidence-v191-v201",
        retentionDays: 30,
        uploadMode: "dry-run-contract-only",
        githubTokenRequiredNow: false,
        githubArtifactUploadAttempted: false,
      },
      checks: {
        sourceVerificationReady: false,
        sourceCiUploadStillBlocked: true,
        pathAllowlistComplete: true,
        forbiddenPathsComplete: true,
        githubTokenNotRequiredYet: true,
        githubArtifactUploadNotAttempted: true,
        readyForRealReadWindowCiArtifactUploadDryRunContract: false,
      },
    });
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "SOURCE_VERIFICATION_NOT_READY",
      "REAL_GITHUB_ARTIFACT_UPLOAD_NOT_CONFIGURED",
    ]));
  });

  it("defines a dry-run upload contract without uploading GitHub artifacts", async () => {
    const profile = await loadRealReadWindowCiArtifactUploadDryRunContract({
      config: loadTestConfig(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
      headers: completeHeaders(),
    });

    expect(profile).toMatchObject({
      profileVersion: "real-read-window-ci-artifact-upload-dry-run-contract.v1",
      contractState: "ready-for-upload-dry-run",
      readyForRealReadWindowCiArtifactUploadDryRunContract: true,
      readyForRealCiArtifactUpload: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      sourceVerification: {
        profileVersion: "real-read-window-ci-artifact-manifest-verification.v1",
        verificationState: "verified-manifest-ci-upload-blocked",
        ready: true,
        readyForCiArtifactUpload: false,
      },
      dryRunContract: {
        artifactName: "orderops-real-read-window-evidence-v191-v201",
        artifactRoot: "c/",
        retentionDays: 30,
        uploadMode: "dry-run-contract-only",
        githubTokenRequiredNow: false,
        githubArtifactUploadAttempted: false,
        pathAllowlistCount: 4,
        forbiddenPathCount: 8,
        productionWindowAllowed: false,
      },
      checks: {
        sourceVerificationReady: true,
        sourceVerificationDigestValid: true,
        sourceCiUploadStillBlocked: true,
        artifactNameStable: true,
        retentionDaysConfigured: true,
        pathAllowlistComplete: true,
        forbiddenPathsComplete: true,
        allowlistRootConfined: true,
        forbiddenPathsExcludeSecrets: true,
        githubTokenNotRequiredYet: true,
        githubArtifactUploadNotAttempted: true,
        upstreamActionsStillDisabled: true,
        productionWindowStillBlocked: true,
        executionStillBlocked: true,
        readyForRealReadWindowCiArtifactUploadDryRunContract: true,
      },
      summary: {
        checkCount: 15,
        passedCheckCount: 15,
        allowlistPathCount: 4,
        forbiddenPathCount: 8,
        retentionDays: 30,
        productionBlockerCount: 1,
      },
    });
    expect(profile.dryRunContract.contractDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.pathAllowlist.map((rule) => rule.path)).toEqual([
      "c/{191..201}/**",
      "代码讲解记录_生产雏形阶段/*-v{191..202}.md",
      "docs/plans/v200-post-ci-artifact-manifest-roadmap.md",
      "package.json",
    ]);
    expect(profile.forbiddenPaths.map((path) => path.pattern)).toEqual(expect.arrayContaining([
      "**/.env*",
      ".git/**",
      "node_modules/**",
      "dist/**",
      ".tmp/**",
      "data/audit/**",
      "**/*secret*",
      "**/*.pem",
    ]));
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "REAL_GITHUB_ARTIFACT_UPLOAD_NOT_CONFIGURED",
    ]);
  });

  it("exposes JSON and Markdown routes using the v201 verification headers", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-window-ci-artifact-upload-dry-run-contract",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-window-ci-artifact-upload-dry-run-contract?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "real-read-window-ci-artifact-upload-dry-run-contract.v1",
        contractState: "ready-for-upload-dry-run",
        readyForRealReadWindowCiArtifactUploadDryRunContract: true,
        readyForRealCiArtifactUpload: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Real-read window CI artifact upload dry-run contract");
      expect(markdown.body).toContain("orderops-real-read-window-evidence-v191-v201");
      expect(markdown.body).toContain("REAL_GITHUB_ARTIFACT_UPLOAD_NOT_CONFIGURED");
      expect(markdown.body).toContain("PROCEED_TO_RECOMMENDED_PARALLEL_JAVA_V72_MINI_KV_V81");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "operator-202",
    "x-orderops-roles": "operator,auditor",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v202-ci-upload-dry-run",
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
