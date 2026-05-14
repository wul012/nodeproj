import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadCiEvidenceHardeningPacket,
} from "../src/services/ciEvidenceHardeningPacket.js";

describe("CI evidence hardening packet", () => {
  it("wraps v175 handoff review and CI command evidence without authorizing production actions", () => {
    const profile = loadCiEvidenceHardeningPacket(
      loadTestConfig("memory://ci-evidence-hardening-packet"),
    );

    expect(profile).toMatchObject({
      service: "orderops-node",
      profileVersion: "ci-evidence-hardening-packet.v1",
      packetState: "ready-for-ci-evidence-hardening",
      readyForCiEvidenceHardeningPacket: true,
      readyForProductionRelease: false,
      readyForProductionDeployment: false,
      readyForProductionRollback: false,
      readOnly: true,
      executionAllowed: false,
      packet: {
        sourceHandoffReviewProfileVersion: "release-handoff-readiness-review.v1",
        sourceHandoffReviewState: "ready-for-manual-release-handoff-review",
        sourceCiCommandProfileVersion: "ci-evidence-command-profile.v1",
        sourceCiCommandProfileValid: true,
        packetMode: "ci-evidence-hardening-only",
        upstreamProbesEnabled: false,
        upstreamActionsEnabled: false,
        localSmokeEndpoint: "/api/v1/ci/evidence-hardening-packet",
        githubActionsWorkflowExpected: ".github/workflows/node-evidence.yml",
        screenshotEvidenceRequiredLocally: true,
        screenshotEvidenceRequiredInCi: false,
        productionReleaseAuthorized: false,
        productionDeploymentAuthorized: false,
        productionRollbackAuthorized: false,
      },
      checks: {
        sourceHandoffReviewReady: true,
        sourceHandoffReviewDigestValid: true,
        sourceHandoffReviewStillBlocksProduction: true,
        ciCommandProfileValid: true,
        ciCommandProfileIncludesCoreCommands: true,
        ciCommandProfileSafeByDefault: true,
        evidenceExpectationsComplete: true,
        evidenceExpectationsReadOnly: true,
        cleanupExpectationsPresent: true,
        ciDifferencesComplete: true,
        hardeningStepsComplete: true,
        hardeningStepsReadOnly: true,
        pauseConditionsComplete: true,
        upstreamActionsStillDisabled: true,
        noProductionReleaseAuthorization: true,
        noDeploymentAuthorization: true,
        noRollbackAuthorization: true,
        noWorkflowSecretRead: true,
        noJavaOrMiniKvStart: true,
        packetDigestValid: true,
        readyForCiEvidenceHardeningPacket: true,
      },
      artifacts: {
        releaseHandoffReadinessReview: {
          profileVersion: "release-handoff-readiness-review.v1",
          reviewState: "ready-for-manual-release-handoff-review",
          readyForReleaseHandoffReadinessReview: true,
          readyForProductionRelease: false,
          readyForProductionDeployment: false,
          readyForProductionRollback: false,
          executionAllowed: false,
        },
        ciEvidenceCommandProfile: {
          profileVersion: "ci-evidence-command-profile.v1",
          valid: true,
          readOnly: true,
          executionAllowed: false,
          commandCount: 8,
          ciRunnableCommandCount: 6,
          smokeCommandCount: 3,
          blockerCount: 0,
        },
        safetyBoundary: {
          upstreamProbesEnabled: false,
          upstreamActionsEnabled: false,
          nodeMayStartJava: false,
          nodeMayStartMiniKv: false,
          ciMayReadSecrets: false,
          ciMayDeploy: false,
          ciMayRollback: false,
          ciMayRestore: false,
          ciMayPushDocker: false,
        },
      },
      summary: {
        checkCount: 21,
        passedCheckCount: 21,
        evidenceExpectationCount: 7,
        ciDifferenceCount: 5,
        hardeningStepCount: 6,
        pauseConditionCount: 7,
        productionBlockerCount: 0,
      },
    });
    expect(profile.packet.packetDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.packet.sourceHandoffReviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.evidenceExpectations.map((item) => item.id)).toEqual([
      "npm-ci",
      "typecheck",
      "full-test",
      "build",
      "safe-http-smoke",
      "chrome-screenshot",
      "archive-and-cleanup",
    ]);
    expect(profile.ciDifferences.map((item) => item.id)).toEqual([
      "environment-source",
      "process-lifetime",
      "artifact-retention",
      "browser-availability",
      "authorization-boundary",
    ]);
    expect(profile.hardeningSteps.every((step) => (
      step.readOnly
      && !step.executionAllowed
      && !step.upstreamActionsEnabled
    ))).toBe(true);
    expect(profile.recommendations.map((recommendation) => recommendation.code)).toContain(
      "CREATE_NEXT_NON_OVERLAPPING_PLAN",
    );
  });

  it("blocks the packet when upstream actions are enabled", () => {
    const profile = loadCiEvidenceHardeningPacket(loadTestConfig(
      "memory://ci-evidence-hardening-packet-blocked",
      { UPSTREAM_ACTIONS_ENABLED: "true" },
    ));

    expect(profile.packetState).toBe("blocked");
    expect(profile.readyForCiEvidenceHardeningPacket).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.packet.upstreamActionsEnabled).toBe(true);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes CI evidence hardening packet routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-ci-hardening-packet-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const headers = {
        "x-orderops-operator-id": "approver-1",
        "x-orderops-roles": "approver",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/ci/evidence-hardening-packet",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ci/evidence-hardening-packet?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        packetState: "ready-for-ci-evidence-hardening",
        readyForCiEvidenceHardeningPacket: true,
        checks: {
          sourceHandoffReviewReady: true,
          ciCommandProfileValid: true,
          evidenceExpectationsComplete: true,
          upstreamActionsStillDisabled: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# CI evidence hardening packet");
      expect(markdown.body).toContain("release-handoff-readiness-review.v1");
      expect(markdown.body).toContain("### chrome-screenshot");
      expect(markdown.body).toContain("CREATE_NEXT_NON_OVERLAPPING_PLAN");
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  });
});

function loadTestConfig(auditStorePath: string, overrides: Record<string, string> = {}) {
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
    AUDIT_STORE_KIND: "file",
    AUDIT_STORE_PATH: auditStorePath,
    AUDIT_STORE_URL: "managed-audit://contract-only",
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
    ...overrides,
  });
}
