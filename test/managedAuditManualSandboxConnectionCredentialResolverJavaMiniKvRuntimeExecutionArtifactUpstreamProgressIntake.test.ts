import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-artifact-upstream-progress-intake";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution artifact upstream progress intake", () => {
  it("records Java v162 and mini-kv v153 progress while keeping runtime blocked", () => {
    const profile = withForcedHistoricalFallback(() =>
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake({
        config: loadTestConfig(),
      }));

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-artifact-upstream-progress-intake.v1",
      upstreamProgressIntakeState: "java-v162-candidate-and-mini-kv-v153-blocked-preflight-intaken",
      upstreamProgressDecision: "clarify-prerequisite-gap-and-keep-runtime-gate-closed",
      readyForJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake: true,
      readyForNodeV397RuntimeExecutionPacketPrerequisiteReview: true,
      readyForRuntimeExecutionPacket: false,
      readyForRuntimeLiveReadGate: false,
      activeNodeVersion: "Node v396",
      sourceNodeVersion: "Node v395",
      runtimeExecutionArtifactsComplete: false,
      presentRuntimeExecutionArtifactCount: 0,
      missingRuntimeExecutionArtifactCount: 6,
      runtimeExecutionPacketPresent: false,
      runtimeExecutionPacketExecutable: false,
      runtimeGateApprovalPresent: false,
      concreteLoopbackPortsAssigned: false,
      executionAttempted: false,
      startsJavaService: false,
      startsMiniKvService: false,
      stopsJavaService: false,
      stopsMiniKvService: false,
      executionAllowed: false,
      activeShardPrototypeEnabled: false,
      sourceNodeV395: {
        sourceVersion: "Node v395",
        readyForNodeV396RuntimeExecutionArtifactIntake: true,
        readyForRuntimeExecutionPacket: false,
        readyForRuntimeLiveReadGate: false,
        runtimeExecutionArtifactsComplete: false,
        presentRuntimeExecutionArtifactCount: 0,
        missingRuntimeExecutionArtifactCount: 6,
        checkCount: 37,
        passedCheckCount: 37,
        sourceCheckCount: 43,
        sourcePassedCheckCount: 43,
        replayCheckCount: 43,
        replayPassedCheckCount: 43,
        productionBlockerCount: 0,
        executionAllowed: false,
        activeShardPrototypeEnabled: false,
      },
      javaV162RuntimeArtifactCandidate: {
        sourceVersion: "Java v162",
        status: "passed",
        project: "advanced-order-platform",
        candidatePresent: true,
        javaRuntimeArtifactsDeclared: true,
        javaRuntimeArtifactsComplete: true,
        crossProjectRuntimeArtifactsComplete: false,
        runtimeExecutionPacketPresent: false,
        runtimeExecutionPacketExecutable: false,
        readyForRuntimeExecutionPacket: false,
        readyForRuntimeLiveReadGate: false,
        operatorApprovalScope: "java-side-artifact-candidate-only",
        serviceOwner: "java-platform-operator",
        javaLoopbackPort: "8080",
        miniKvLoopbackPort: "requires-mini-kv-runtime-artifact",
        getOnlySmokeCommandCount: 3,
        cleanupProofCount: 3,
        processCleanupRuleCount: 4,
        missingCrossProjectArtifactCount: 3,
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
        evidenceReady: true,
      },
      miniKvV153RuntimeArtifactPreflight: {
        sourceVersion: "mini-kv v153",
        project: "mini-kv",
        releaseVersion: "v153",
        status: "runtime-execution-artifact-intake-preflight-blocked-read-only",
        readOnly: true,
        executionAllowed: false,
        sourceFrozenReleaseVersion: "v152",
        sourceFrozenFixturePath: "fixtures/release/shard-readiness-v152.json",
        preflightMode: "blocked-missing-runtime-execution-artifacts",
        runtimeExecutionArtifactsComplete: false,
        presentRuntimeExecutionArtifactCount: 0,
        missingRuntimeExecutionArtifactCount: 6,
        requiredRuntimeExecutionArtifactCount: 6,
        runtimeExecutionPacketPresent: false,
        runtimeExecutionPacketExecutable: false,
        executionAttempted: false,
        startsMiniKvService: false,
        startsServices: false,
        runtimeProbeAllowed: false,
        liveReadAllowed: false,
        routerActivationAllowed: false,
        writeRoutingAllowed: false,
        failClosedOnMissingArtifacts: true,
        evidenceReady: true,
      },
      upstreamProgressClarification: {
        clarificationMode: "java-mini-kv-runtime-execution-artifact-upstream-progress-intake",
        sourceSpan: "Node v395 + Java v162 + mini-kv v153",
        intakeDecision: "record-upstream-progress-and-clarify-prerequisites-runtime-still-closed",
        javaV162CandidateReceived: true,
        miniKvV153BlockedPreflightReceived: true,
        bothUpstreamsFollowedNodePlanDirection: true,
        nodePlanAcceptanceCriteriaClarified: true,
        candidateIsNotCrossProjectApproval: true,
        blockedPreflightIsNotRuntimeArtifactSet: true,
        runtimeExecutionArtifactsComplete: false,
        satisfiedRuntimePacketRequirementCount: 0,
        unsatisfiedRuntimePacketRequirementCount: 6,
        runtimeExecutionPacketPresent: false,
        runtimeExecutionPacketExecutable: false,
        readyForRuntimeExecutionPacket: false,
        readyForRuntimeLiveReadGate: false,
        executionAttempted: false,
        startsUpstreamServices: false,
        stopsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        activeShardPrototypeEnabled: false,
        nextNodeVersionSuggested: "Node v397",
      },
      checks: {
        sourceNodeV395Ready: true,
        sourceNodeV395ReadyForV396: true,
        sourceNodeV395RuntimeGateClosed: true,
        sourceNodeV395ChecksPassed: true,
        javaEvidenceFilePresent: true,
        javaEvidenceStatusPassed: true,
        javaNextNodeHintV396: true,
        javaCandidatePresent: true,
        javaCandidateCompleteForJavaSide: true,
        javaCandidateNotCrossProjectComplete: true,
        javaCandidateNotExecutable: true,
        javaOwnerPortSmokeCleanupRecorded: true,
        miniKvEvidenceFilePresent: true,
        miniKvReleaseVersionV153: true,
        miniKvBlockedPreflightStatus: true,
        miniKvPreflightCountsPreserved: true,
        miniKvFailClosed: true,
        miniKvNoExecutionAllowed: true,
        miniKvFrozenFromV152: true,
        upstreamDirectionFollowed: true,
        nodePlanGapClarified: true,
        runtimeRequirementCountStable: true,
        noRuntimePacketRequirementsSatisfied: true,
        runtimeExecutionPacketStillAbsent: true,
        runtimeGateStillClosed: true,
        noAutomaticUpstreamStartStop: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        activeShardPrototypeStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        clarificationDigestStable: true,
        readyForJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake: true,
      },
      summary: {
        checkCount: 35,
        passedCheckCount: 35,
        sourceCheckCount: 37,
        sourcePassedCheckCount: 37,
        javaEvidenceReady: true,
        miniKvEvidenceReady: true,
        runtimePacketRequirementCount: 6,
        satisfiedRuntimePacketRequirementCount: 0,
        unsatisfiedRuntimePacketRequirementCount: 6,
        requiredRuntimeExecutionArtifactCount: 6,
        presentRuntimeExecutionArtifactCount: 0,
        missingRuntimeExecutionArtifactCount: 6,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 1,
      },
    });
    expect(profile.javaV162RuntimeArtifactCandidate.evidenceFile.resolvedPath).toContain(
      "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/162/evidence/java-shard-readiness-runtime-execution-artifact-candidate-v162.json",
    );
    expect(profile.miniKvV153RuntimeArtifactPreflight.evidenceFile.resolvedPath).toContain(
      "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v153.json",
    );
    expect(profile.runtimePacketRequirements).toHaveLength(6);
    expect(profile.runtimePacketRequirements.every((requirement) => !requirement.packetSatisfied)).toBe(true);
    expect(profile.upstreamProgressClarification.clarificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when the Node v395 source archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v396-empty-"));

    try {
      const profile = withForcedHistoricalFallback(() =>
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        }));

      expect(profile.upstreamProgressIntakeState).toBe("blocked");
      expect(profile.upstreamProgressDecision).toBe("blocked");
      expect(profile.readyForJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake).toBe(false);
      expect(profile.readyForNodeV397RuntimeExecutionPacketPrerequisiteReview).toBe(false);
      expect(profile.readyForRuntimeExecutionPacket).toBe(false);
      expect(profile.readyForRuntimeLiveReadGate).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "SOURCE_V395_NOT_READY",
        "SOURCE_V395_NOT_READY_FOR_V396",
        "SOURCE_V395_CHECKS_NOT_PASSED",
      ]));
      expect(profile.javaV162RuntimeArtifactCandidate.evidenceReady).toBe(true);
      expect(profile.miniKvV153RuntimeArtifactPreflight.evidenceReady).toBe(true);
      expect(profile.executionAttempted).toBe(false);
      expect(profile.startsJavaService).toBe(false);
      expect(profile.startsMiniKvService).toBe(false);
      expect(profile.executionAllowed).toBe(false);
      expect(profile.activeShardPrototypeEnabled).toBe(false);
    } finally {
      rmSync(emptyProjectRoot, { force: true, recursive: true });
    }
  }, 60000);

  it("exposes JSON and Markdown through the audit route table", async () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: ROUTE,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${ROUTE}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-artifact-upstream-progress-intake.v1",
        upstreamProgressIntakeState: "java-v162-candidate-and-mini-kv-v153-blocked-preflight-intaken",
        activeNodeVersion: "Node v396",
        sourceNodeVersion: "Node v395",
        readyForRuntimeExecutionPacket: false,
        readyForRuntimeLiveReadGate: false,
        runtimeExecutionArtifactsComplete: false,
        presentRuntimeExecutionArtifactCount: 0,
        missingRuntimeExecutionArtifactCount: 6,
        executionAttempted: false,
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
        activeShardPrototypeEnabled: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution artifact upstream progress intake",
      );
      expect(markdown.body).toContain("Java v162 Runtime Artifact Candidate");
      expect(markdown.body).toContain("mini-kv v153 Runtime Artifact Preflight");
      expect(markdown.body).toContain("Runtime Packet Requirement Clarification");
      expect(markdown.body).toContain("unsatisfiedRuntimePacketRequirementCount: 6");
    } finally {
      await app.close();
      restoreEnv(previous);
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-396",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v396-upstream-progress-intake",
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

function withForcedHistoricalFallback<T>(callback: () => T): T {
  const previous = process.env[FORCE_FALLBACK_ENV];
  process.env[FORCE_FALLBACK_ENV] = "true";
  try {
    return callback();
  } finally {
    restoreEnv(previous);
  }
}

function restoreEnv(previous: string | undefined): void {
  if (previous === undefined) {
    delete process.env[FORCE_FALLBACK_ENV];
    return;
  }
  process.env[FORCE_FALLBACK_ENV] = previous;
}
