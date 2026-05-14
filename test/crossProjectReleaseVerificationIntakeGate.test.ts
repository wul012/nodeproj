import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadCrossProjectReleaseVerificationIntakeGate,
} from "../src/services/crossProjectReleaseVerificationIntakeGate.js";

describe("cross-project release verification intake gate", () => {
  it("combines Java v54 and mini-kv v63 release manifests into a read-only intake gate", () => {
    const profile = loadCrossProjectReleaseVerificationIntakeGate(
      loadTestConfig("memory://cross-project-release-verification-intake-gate"),
    );

    expect(profile).toMatchObject({
      profileVersion: "cross-project-release-verification-intake-gate.v1",
      gateState: "ready-for-release-verification-intake",
      readyForCrossProjectReleaseVerificationIntakeGate: true,
      readyForProductionRelease: false,
      readyForProductionOperations: false,
      readOnly: true,
      executionAllowed: false,
      gate: {
        previousRunbookVersion: "controlled-idempotency-drill-runbook.v1",
        javaVersion: "Java v54",
        javaManifestVersion: "java-release-verification-manifest.v1",
        miniKvVersion: "mini-kv v63",
        miniKvManifestVersion: "mini-kv-release-verification-manifest.v1",
        nodeBaselineTag: "v161",
        intakeMode: "archived-evidence-only",
        nodeMayExecuteJavaMaven: false,
        nodeMayExecuteMiniKvCmake: false,
        nodeMayTriggerJavaWrites: false,
        nodeMayExecuteMiniKvWrites: false,
        upstreamActionsEnabled: false,
        automaticUpstreamStart: false,
        mutatesUpstreamState: false,
        runtimeFileRead: false,
        productionReleaseAuthorized: false,
      },
      checks: {
        previousRunbookReady: true,
        previousRunbookDoesNotAuthorizeExecution: true,
        javaV54EvidenceReady: true,
        javaManifestVersionReady: true,
        javaReleaseChecksComplete: true,
        javaStaticContractsListed: true,
        javaArchiveRootUsesC: true,
        javaNodeCannotExecuteMaven: true,
        javaNodeCannotTriggerWrites: true,
        javaBusinessSemanticsUnchanged: true,
        javaDoesNotConnectMiniKv: true,
        miniKvV63EvidenceReady: true,
        miniKvManifestVersionReady: true,
        miniKvReleaseChecksComplete: true,
        miniKvFixtureInventoryReady: true,
        miniKvReadOnlySmokeReady: true,
        miniKvNoRuntimeCommandAdded: true,
        miniKvWriteCommandsNotExecuted: true,
        miniKvOrderAuthoritativeFalse: true,
        miniKvArchiveRootUsesC: true,
        nodeConsumesArchivedEvidenceOnly: true,
        nodeDoesNotExecuteUpstreamBuilds: true,
        upstreamActionsStillDisabled: true,
        noAutomaticUpstreamStart: true,
        readyForProductionReleaseStillFalse: true,
        readyForCrossProjectReleaseVerificationIntakeGate: true,
      },
      artifacts: {
        javaReleaseManifest: {
          plannedVersion: "Java v54",
          evidenceTag: "java-v54-release-verification-manifest",
          requiredChecks: [
            "focused-maven-tests",
            "non-docker-regression-tests",
            "maven-package",
            "http-smoke",
            "static-contract-json-validation",
          ],
          staticContractCount: 5,
          nodeMayExecuteBuild: false,
          nodeMayTriggerWrites: false,
          changesBusinessSemantics: false,
          connectsMiniKv: false,
          archivePath: "c/54",
        },
        miniKvReleaseManifest: {
          plannedVersion: "mini-kv v63",
          evidenceTag: "mini-kv-v63-release-verification-manifest",
          projectVersion: "0.63.0",
          fixtureCount: 11,
          readOnlySmokeCommandCount: 6,
          noRuntimeCommandAdded: true,
          writeCommandsExecuted: false,
          orderAuthoritative: false,
          connectedToJavaTransactionChain: false,
          archivePath: "c/63",
        },
      },
      summary: {
        gateCheckCount: 26,
        passedGateCheckCount: 26,
        manifestCount: 2,
        intakeStepCount: 5,
        forbiddenOperationCount: 6,
        productionBlockerCount: 0,
      },
    });
    expect(profile.gate.gateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.gate.previousRunbookDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.intakeSteps.every((step) => step.readOnly && !step.executesExternalBuild && !step.mutatesState))
      .toBe(true);
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toContain("Run Maven from Node v162");
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toContain("Run CMake or CTest from Node v162");
    expect(profile.recommendations.map((recommendation) => recommendation.code)).toContain(
      "PROCEED_TO_ROLLBACK_EVIDENCE_STAGE",
    );
  });

  it("blocks the intake gate when upstream actions are enabled", () => {
    const profile = loadCrossProjectReleaseVerificationIntakeGate(loadTestConfig(
      "memory://cross-project-release-verification-intake-gate-blocked",
      { UPSTREAM_ACTIONS_ENABLED: "true" },
    ));

    expect(profile.gateState).toBe("blocked");
    expect(profile.readyForCrossProjectReleaseVerificationIntakeGate).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.gate.upstreamActionsEnabled).toBe(true);
    expect(profile.gate.productionReleaseAuthorized).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes cross-project release verification intake gate routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-release-intake-gate-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const headers = {
        "x-orderops-operator-id": "approver-1",
        "x-orderops-roles": "approver",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/cross-project-release-verification-intake-gate",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/cross-project-release-verification-intake-gate?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        gateState: "ready-for-release-verification-intake",
        readyForCrossProjectReleaseVerificationIntakeGate: true,
        checks: {
          javaNodeCannotExecuteMaven: true,
          miniKvWriteCommandsNotExecuted: true,
          upstreamActionsStillDisabled: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Cross-project release verification intake gate");
      expect(markdown.body).toContain("Java v54");
      expect(markdown.body).toContain("mini-kv v63");
      expect(markdown.body).toContain("PROCEED_TO_ROLLBACK_EVIDENCE_STAGE");
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
