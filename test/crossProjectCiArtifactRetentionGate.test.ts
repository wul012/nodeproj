import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadCrossProjectCiArtifactRetentionGate,
} from "../src/services/crossProjectCiArtifactRetentionGate.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("cross-project CI artifact retention gate", () => {
  it("is blocked when the source v202 upload dry-run contract is not ready", async () => {
    const profile = await loadCrossProjectCiArtifactRetentionGate({
      config: loadTestConfig(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
      headers: {},
    });

    expect(profile).toMatchObject({
      profileVersion: "cross-project-ci-artifact-retention-gate.v1",
      gateState: "blocked",
      readyForCrossProjectCiArtifactRetentionGate: false,
      readyForRealCiArtifactUpload: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      sourceUploadDryRunContract: {
        ready: false,
        readyForRealCiArtifactUpload: false,
      },
      checks: {
        sourceUploadDryRunContractReady: false,
        javaV72HintAccepted: true,
        miniKvV81HintAccepted: true,
        realArtifactStoreStillDisconnected: true,
        githubArtifactUploadNotAttempted: true,
        readyForCrossProjectCiArtifactRetentionGate: false,
      },
    });
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "SOURCE_UPLOAD_DRY_RUN_CONTRACT_NOT_READY",
      "REAL_ARTIFACT_RETENTION_STORE_NOT_CONNECTED",
    ]));
  });

  it("accepts Node v202, Java v72, and mini-kv v81 retention evidence while keeping real upload blocked", async () => {
    const profile = await loadCrossProjectCiArtifactRetentionGate({
      config: loadTestConfig(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
      headers: completeHeaders(),
    });

    expect(profile).toMatchObject({
      profileVersion: "cross-project-ci-artifact-retention-gate.v1",
      gateState: "ready-for-retention-review",
      readyForCrossProjectCiArtifactRetentionGate: true,
      readyForRealCiArtifactUpload: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnly: true,
      executionAllowed: false,
      sourceUploadDryRunContract: {
        profileVersion: "real-read-window-ci-artifact-upload-dry-run-contract.v1",
        contractState: "ready-for-upload-dry-run",
        artifactName: "orderops-real-read-window-evidence-v191-v201",
        artifactRoot: "c/",
        retentionDays: 30,
        ready: true,
        readyForRealCiArtifactUpload: false,
      },
      upstreamRetentionHints: {
        javaV72: {
          sourceVersion: "Java v72",
          hintVersion: "java-release-approval-rehearsal-artifact-retention-hint.v1",
          ciRetentionDays: 30,
          javaRetentionDays: 180,
          retentionDaysWithinJavaRetention: true,
          ciArtifactUploadedByJava: false,
          githubArtifactAccessedByJava: false,
          nodeMayTreatAsRetentionAuthorization: false,
        },
        miniKvV81: {
          sourceVersion: "mini-kv v81",
          runtimeSmokeEvidenceVersion: "mini-kv-runtime-smoke-evidence.v6",
          artifactRoot: "c/",
          artifactPathHint: "c/81/",
          retentionDays: 30,
          releaseEvidenceReady: true,
          githubArtifactUploadAttempted: false,
          productionWindowAllowed: false,
          restoreExecutionAllowed: false,
        },
      },
      retentionGate: {
        sourceEvidenceSpan: "Node v202 + Java v72 + mini-kv v81",
        retentionMode: "dry-run-contract-only",
        expectedArtifactRoot: "c/",
        expectedRetentionDays: 30,
        retainedProjectCount: 3,
        realArtifactStoreConnected: false,
        githubArtifactUploadAttempted: false,
        productionWindowAllowed: false,
      },
      checks: {
        sourceUploadDryRunContractReady: true,
        sourceContractDigestValid: true,
        sourceRealUploadStillBlocked: true,
        sourceArtifactShapeStable: true,
        javaV72HintAccepted: true,
        javaV72RetentionDaysCompatible: true,
        javaV72ReadOnly: true,
        javaV72DoesNotUploadCiArtifact: true,
        javaV72DoesNotAccessGitHubArtifact: true,
        javaV72DoesNotAuthorizeNodeRetention: true,
        miniKvV81HintAccepted: true,
        miniKvV81RetentionDaysMatch: true,
        miniKvV81ReadOnly: true,
        miniKvV81DoesNotRestore: true,
        miniKvV81DoesNotUploadCiArtifact: true,
        retentionRecordsComplete: true,
        retentionRecordsReadOnly: true,
        retentionRecordDigestsValid: true,
        upstreamActionsStillDisabled: true,
        realArtifactStoreStillDisconnected: true,
        githubArtifactUploadNotAttempted: true,
        productionWindowStillBlocked: true,
        executionStillBlocked: true,
        readyForCrossProjectCiArtifactRetentionGate: true,
      },
      summary: {
        checkCount: 24,
        passedCheckCount: 24,
        retainedProjectCount: 3,
        retentionDays: 30,
        retentionRecordCount: 3,
        productionBlockerCount: 1,
      },
    });
    expect(profile.retentionGate.gateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.retentionRecords).toHaveLength(3);
    expect(profile.retentionRecords.map((record) => record.project)).toEqual(["node", "java", "mini-kv"]);
    expect(profile.retentionRecords.every((record) => /^[a-f0-9]{64}$/.test(record.recordDigest))).toBe(true);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "REAL_ARTIFACT_RETENTION_STORE_NOT_CONNECTED",
    ]);
  });

  it("exposes JSON and Markdown routes using the v202 verification headers", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/cross-project-ci-artifact-retention-gate",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/cross-project-ci-artifact-retention-gate?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "cross-project-ci-artifact-retention-gate.v1",
        gateState: "ready-for-retention-review",
        readyForCrossProjectCiArtifactRetentionGate: true,
        readyForRealCiArtifactUpload: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Cross-project CI artifact retention gate");
      expect(markdown.body).toContain("Java v72");
      expect(markdown.body).toContain("mini-kv v81");
      expect(markdown.body).toContain("REAL_ARTIFACT_RETENTION_STORE_NOT_CONNECTED");
      expect(markdown.body).toContain("PROCEED_TO_POST_V203_REAL_READ_RUNTIME_SMOKE_PLAN");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "operator-203",
    "x-orderops-roles": "operator,auditor",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v203-retention-gate",
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
