import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadCrossProjectReleaseBundleGate,
} from "../src/services/crossProjectReleaseBundleGate.js";

describe("cross-project release bundle gate", () => {
  it("combines Java v56 and mini-kv v65 bundle manifests into a read-only release gate", () => {
    const profile = loadCrossProjectReleaseBundleGate(loadTestConfig("memory://cross-project-release-bundle-gate"));

    expect(profile).toMatchObject({
      profileVersion: "cross-project-release-bundle-gate.v1",
      gateState: "ready-for-release-bundle-review",
      readyForCrossProjectReleaseBundleGate: true,
      readyForProductionRelease: false,
      readyForProductionRollback: false,
      readyForProductionOperations: false,
      readOnly: true,
      executionAllowed: false,
      gate: {
        previousRunbookVersion: "release-rollback-readiness-runbook.v1",
        javaVersion: "Java v56",
        javaManifestVersion: "java-release-bundle-manifest.v1",
        miniKvVersion: "mini-kv v65",
        miniKvManifestVersion: "mini-kv-runtime-artifact-bundle.v1",
        nodeBaselineTag: "v164",
        bundleMode: "archived-release-bundle-only",
        nodeMayExecuteJavaMaven: false,
        nodeMayExecuteMiniKvCmake: false,
        nodeMayTriggerJavaWrites: false,
        nodeMayTriggerJavaRollback: false,
        nodeMayExecuteMiniKvWrites: false,
        nodeMayExecuteMiniKvAdminCommands: false,
        upstreamActionsEnabled: false,
        automaticUpstreamStart: false,
        mutatesUpstreamState: false,
        runtimeFileRead: false,
        productionReleaseAuthorized: false,
        productionRollbackAuthorized: false,
      },
      checks: {
        previousRunbookReady: true,
        previousRunbookDoesNotAuthorizeRollback: true,
        javaV56BundleReady: true,
        javaBundleManifestVersionReady: true,
        javaBundleInputsComplete: true,
        javaVerificationEvidenceComplete: true,
        javaContractEndpointsComplete: true,
        javaNodeConsumptionBoundariesClosed: true,
        javaProductionBoundariesClosed: true,
        javaForbiddenOperationsComplete: true,
        javaArchiveRootUsesC: true,
        miniKvV65BundleReady: true,
        miniKvBundleManifestVersionReady: true,
        miniKvArtifactsComplete: true,
        miniKvCommandEvidenceComplete: true,
        miniKvReadOnlySmokeExplainsDangerousCommands: true,
        miniKvWriteAndAdminCommandsNotExecuted: true,
        miniKvBoundariesClosed: true,
        miniKvArchiveRootUsesC: true,
        nodeConsumesArchivedBundlesOnly: true,
        nodeDoesNotExecuteUpstreamBuilds: true,
        nodeDoesNotExecuteReleaseOrRollback: true,
        upstreamActionsStillDisabled: true,
        noAutomaticUpstreamStart: true,
        readyForProductionReleaseStillFalse: true,
        readyForProductionRollbackStillFalse: true,
        readyForCrossProjectReleaseBundleGate: true,
      },
      artifacts: {
        javaReleaseBundleManifest: {
          plannedVersion: "Java v56",
          evidenceTag: "v56订单平台release-bundle-manifest",
          manifestEndpoint: "/contracts/release-bundle-manifest.sample.json",
          bundleMode: "READ_ONLY_RELEASE_BUNDLE",
          artifact: "target/advanced-order-platform-0.1.0-SNAPSHOT.jar",
          verificationEvidence: [
            "focused-maven-tests",
            "non-docker-regression-tests",
            "maven-package",
            "http-smoke",
            "static-contract-json-validation",
          ],
          nodeMayExecuteMaven: false,
          nodeMayTriggerJavaWrites: false,
          nodeMayTriggerRollback: false,
          requiresProductionDatabase: false,
          requiresProductionSecrets: false,
          connectsMiniKv: false,
          archivePath: "c/56",
        },
        miniKvRuntimeArtifactBundleManifest: {
          plannedVersion: "mini-kv v65",
          evidenceTag: "第六十五版运行时产物包清单",
          projectVersion: "0.65.0",
          releaseVersion: "v65",
          artifactIds: [
            "binary-version",
            "release-verification-manifest",
            "runtime-artifact-rollback-evidence",
            "wal-snapshot-compatibility",
            "fixture-inventory",
          ],
          commandEvidence: [
            "cmake-configure",
            "cmake-build",
            "ctest",
            "targeted-tests",
            "read-only-smoke",
          ],
          writeCommandsExecuted: false,
          adminCommandsExecuted: false,
          orderAuthoritative: false,
          connectedToJavaTransactionChain: false,
          archivePath: "c/65",
        },
      },
      summary: {
        gateCheckCount: 27,
        passedGateCheckCount: 27,
        bundleManifestCount: 2,
        bundleStepCount: 5,
        forbiddenOperationCount: 7,
        productionBlockerCount: 0,
      },
    });
    expect(profile.gate.gateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.gate.previousRunbookDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.bundleSteps.every((step) => (
      step.readOnly
      && !step.executesExternalBuild
      && !step.executesRelease
      && !step.executesRollback
      && !step.mutatesState
    ))).toBe(true);
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toContain("Run Maven from Node v165");
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toContain(
      "Run CMake or CTest from Node v165",
    );
    expect(profile.recommendations.map((recommendation) => recommendation.code)).toContain(
      "PROCEED_TO_HANDOFF_SAMPLE_STAGE",
    );
  });

  it("blocks the release bundle gate when upstream actions are enabled", () => {
    const profile = loadCrossProjectReleaseBundleGate(loadTestConfig(
      "memory://cross-project-release-bundle-gate-blocked",
      { UPSTREAM_ACTIONS_ENABLED: "true" },
    ));

    expect(profile.gateState).toBe("blocked");
    expect(profile.readyForCrossProjectReleaseBundleGate).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.gate.upstreamActionsEnabled).toBe(true);
    expect(profile.gate.productionReleaseAuthorized).toBe(false);
    expect(profile.gate.productionRollbackAuthorized).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes cross-project release bundle gate routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-release-bundle-gate-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const headers = {
        "x-orderops-operator-id": "approver-1",
        "x-orderops-roles": "approver",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/cross-project-release-bundle-gate",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/cross-project-release-bundle-gate?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        gateState: "ready-for-release-bundle-review",
        readyForCrossProjectReleaseBundleGate: true,
        checks: {
          javaNodeConsumptionBoundariesClosed: true,
          miniKvWriteAndAdminCommandsNotExecuted: true,
          upstreamActionsStillDisabled: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Cross-project release bundle gate");
      expect(markdown.body).toContain("Java v56");
      expect(markdown.body).toContain("mini-kv v65");
      expect(markdown.body).toContain("PROCEED_TO_HANDOFF_SAMPLE_STAGE");
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
