import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadRealReadWindowCiArtifactManifestVerification,
} from "../src/services/realReadWindowCiArtifactManifestVerification.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("real-read window CI artifact manifest verification", () => {
  it("is blocked when the source v200 manifest cannot satisfy identity-bound source profiles", async () => {
    const profile = await loadRealReadWindowCiArtifactManifestVerification({
      config: loadTestConfig(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
      headers: {},
    });

    expect(profile).toMatchObject({
      profileVersion: "real-read-window-ci-artifact-manifest-verification.v1",
      verificationState: "blocked",
      readyForRealReadWindowCiArtifactManifestVerification: false,
      readyForCiArtifactUpload: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnly: true,
      executionAllowed: false,
      checks: {
        sourceManifestReady: false,
        manifestDigestValid: true,
        manifestDigestMatches: true,
        artifactRecordCountMatches: true,
        requiredFileKindsMatch: true,
        sourceProfilesReady: false,
        javaV71HintAccepted: true,
        miniKvV80HintAccepted: true,
        ciArtifactStoreStillDisconnected: true,
        githubArtifactUploadNotAttempted: true,
        productionWindowStillBlocked: true,
        readyForRealReadWindowCiArtifactManifestVerification: false,
      },
    });
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "SOURCE_MANIFEST_NOT_READY",
      "SOURCE_PROFILES_NOT_READY",
      "CI_ARTIFACT_STORE_NOT_CONNECTED",
    ]));
  });

  it("verifies the v200 manifest and Java/mini-kv hints while keeping CI upload blocked", async () => {
    const profile = await loadRealReadWindowCiArtifactManifestVerification({
      config: loadTestConfig(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
      headers: completeHeaders(),
    });

    expect(profile).toMatchObject({
      profileVersion: "real-read-window-ci-artifact-manifest-verification.v1",
      verificationState: "verified-manifest-ci-upload-blocked",
      readyForRealReadWindowCiArtifactManifestVerification: true,
      readyForCiArtifactUpload: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      verification: {
        sourceManifestState: "ready-for-ci-artifact-publication",
        sourceManifestProfileVersion: "real-read-window-ci-archive-artifact-manifest.v1",
        evidenceSpan: "Node v191-v199 + Java v70 + mini-kv v79",
        javaHintVersion: "java-release-approval-rehearsal-ci-evidence-hint.v1",
        miniKvRuntimeSmokeEvidenceVersion: "mini-kv-runtime-smoke-evidence.v5",
        miniKvReleaseVersion: "v80",
        ciArtifactStoreConnected: false,
        githubArtifactUploadAttempted: false,
        productionWindowAllowed: false,
      },
      upstreamHints: {
        javaV71: {
          sourceVersion: "Java v71",
          noLedgerWriteProved: true,
          ciArtifactUploadedByJava: false,
          githubArtifactAccessedByJava: false,
          nodeMayTreatAsCiArtifactPublication: false,
        },
        miniKvV80: {
          sourceVersion: "mini-kv v80",
          artifactPathHint: "c/80/",
          taxonomyDigest: "fnv1a64:f92fcba55feb26a2",
          identityNeutralProof: true,
          noRestoreProof: true,
          uploadAllowed: false,
        },
      },
      checks: {
        sourceManifestReady: true,
        manifestDigestValid: true,
        manifestDigestMatches: true,
        artifactRecordCountMatches: true,
        requiredFileKindsMatch: true,
        sourceProfilesReady: true,
        javaV71HintAccepted: true,
        javaV71NoLedgerWriteProved: true,
        javaV71DoesNotUploadCiArtifact: true,
        miniKvV80HintAccepted: true,
        miniKvV80NoRestoreProved: true,
        miniKvV80IdentityNeutral: true,
        miniKvV80DoesNotUploadCiArtifact: true,
        upstreamActionsStillDisabled: true,
        ciArtifactStoreStillDisconnected: true,
        githubArtifactUploadNotAttempted: true,
        productionWindowStillBlocked: true,
        executionStillBlocked: true,
        readyForRealReadWindowCiArtifactManifestVerification: true,
      },
      summary: {
        checkCount: 19,
        passedCheckCount: 19,
        artifactRecordCount: 9,
        requiredFileKindCount: 4,
        upstreamHintCount: 2,
        productionBlockerCount: 1,
      },
    });
    expect(profile.verification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.verification.storedManifestDigest).toEqual(profile.verification.recomputedManifestDigest);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "CI_ARTIFACT_STORE_NOT_CONNECTED",
    ]);
  });

  it("exposes JSON and Markdown routes using the v200 manifest headers", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-window-ci-artifact-manifest-verification",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-window-ci-artifact-manifest-verification?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "real-read-window-ci-artifact-manifest-verification.v1",
        verificationState: "verified-manifest-ci-upload-blocked",
        readyForRealReadWindowCiArtifactManifestVerification: true,
        readyForCiArtifactUpload: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Real-read window CI artifact manifest verification");
      expect(markdown.body).toContain("Java v71");
      expect(markdown.body).toContain("mini-kv v80");
      expect(markdown.body).toContain("CI_ARTIFACT_STORE_NOT_CONNECTED");
      expect(markdown.body).toContain("PROCEED_TO_NODE_V202_CI_UPLOAD_DRY_RUN_CONTRACT");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "operator-201",
    "x-orderops-roles": "operator,auditor",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v201-ci-verification",
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
