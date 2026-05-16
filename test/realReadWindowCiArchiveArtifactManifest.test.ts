import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadRealReadWindowCiArchiveArtifactManifest,
} from "../src/services/realReadWindowCiArchiveArtifactManifest.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("real-read window CI archive artifact manifest", () => {
  it("is blocked when the v198/v199 identity headers are missing", async () => {
    const profile = await loadRealReadWindowCiArchiveArtifactManifest({
      config: loadTestConfig(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
      headers: {},
    });

    expect(profile).toMatchObject({
      profileVersion: "real-read-window-ci-archive-artifact-manifest.v1",
      manifestState: "blocked",
      readyForRealReadWindowCiArchiveArtifactManifest: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnly: true,
      executionAllowed: false,
      sourceProfiles: {
        readinessCheckpoint: {
          ready: true,
        },
        operatorIdentityBinding: {
          ready: false,
        },
        auditStoreHandoffContract: {
          ready: false,
        },
      },
      checks: {
        sourceCheckpointReady: true,
        sourceIdentityBindingReady: false,
        sourceAuditHandoffReady: false,
        artifactRecordsComplete: true,
        artifactRecordsReadOnly: true,
        requiredFileKindsCovered: true,
        githubArtifactNotRequiredYet: true,
        ciArtifactNotConnectedYet: true,
        productionWindowStillBlocked: true,
        readyForRealReadWindowCiArchiveArtifactManifest: false,
      },
    });
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "SOURCE_IDENTITY_BINDING_NOT_READY",
      "SOURCE_AUDIT_HANDOFF_NOT_READY",
      "CI_ARTIFACT_STORE_NOT_CONNECTED",
    ]));
  });

  it("declares Node v191-v199 artifacts without requiring a real GitHub artifact", async () => {
    const profile = await loadRealReadWindowCiArchiveArtifactManifest({
      config: loadTestConfig(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
      headers: completeHeaders(),
    });

    expect(profile).toMatchObject({
      profileVersion: "real-read-window-ci-archive-artifact-manifest.v1",
      manifestState: "ready-for-ci-artifact-publication",
      readyForRealReadWindowCiArchiveArtifactManifest: true,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      manifest: {
        evidenceSpan: "Node v191-v199 + Java v70 + mini-kv v79",
        artifactRecordCount: 9,
        requiredFileKindCount: 4,
        ciArtifactConnected: false,
        githubArtifactRequiredNow: false,
        localArchiveLayoutOnly: true,
        productionWindowAllowed: false,
        productionOperationAllowed: false,
      },
      checks: {
        sourceCheckpointReady: true,
        sourceCheckpointDigestValid: true,
        sourceIdentityBindingReady: true,
        sourceIdentityBindingDigestValid: true,
        sourceAuditHandoffReady: true,
        sourceAuditHandoffDigestValid: true,
        artifactRecordsComplete: true,
        artifactRecordsReadOnly: true,
        artifactRecordDigestsValid: true,
        requiredFileKindsCovered: true,
        localArchivePathsDeclared: true,
        githubArtifactNotRequiredYet: true,
        ciArtifactNotConnectedYet: true,
        upstreamActionsStillDisabled: true,
        productionWindowStillBlocked: true,
        executionStillBlocked: true,
        readyForRealReadWindowCiArchiveArtifactManifest: true,
      },
      summary: {
        checkCount: 17,
        passedCheckCount: 17,
        artifactRecordCount: 9,
        fileKindRequirementCount: 4,
        productionBlockerCount: 1,
      },
    });
    expect(profile.manifest.manifestDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.artifactRecords.map((record) => record.version)).toEqual([
      "Node v191",
      "Node v192",
      "Node v193",
      "Node v194",
      "Node v195",
      "Node v196",
      "Node v197",
      "Node v198",
      "Node v199",
    ]);
    expect(profile.artifactRecords.every((record) =>
      record.localArchiveRoot.startsWith("c/")
        && record.readOnly
        && record.writesNow === false
        && record.ciPublished === false
        && /^[a-f0-9]{64}$/.test(record.recordDigest)
    )).toBe(true);
    expect(profile.fileKindRequirements.map((requirement) => requirement.kind)).toEqual([
      "json-or-endpoint",
      "markdown",
      "screenshot",
      "explanation",
    ]);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "CI_ARTIFACT_STORE_NOT_CONNECTED",
    ]);
  });

  it("exposes JSON and Markdown routes using the v198/v199 identity headers", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-window-ci-archive-artifact-manifest",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-window-ci-archive-artifact-manifest?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "real-read-window-ci-archive-artifact-manifest.v1",
        manifestState: "ready-for-ci-artifact-publication",
        readyForRealReadWindowCiArchiveArtifactManifest: true,
        readyForProductionWindow: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Real-read window CI archive artifact manifest");
      expect(markdown.body).toContain("Node v191");
      expect(markdown.body).toContain("CI_ARTIFACT_STORE_NOT_CONNECTED");
      expect(markdown.body).toContain("PROCEED_TO_POST_V200_PLAN");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "operator-200",
    "x-orderops-roles": "operator,auditor",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v200-ci-manifest",
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
