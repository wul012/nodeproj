import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketContributionReview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketContributionReview.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-contribution-review";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution packet contribution review", () => {
  it("reviews Java v163 and mini-kv v154 contributions while keeping runtime blocked", () => {
    const profile = withForcedHistoricalFallback(() =>
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketContributionReview({
        config: loadTestConfig(),
      }));

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-contribution-review.v1",
      contributionReviewState: "java-v163-and-mini-kv-v154-contributions-reviewed",
      contributionReviewDecision: "keep-runtime-execution-packet-blocked-pending-node-window-and-correlated-approval",
      readyForJavaMiniKvRuntimeExecutionPacketContributionReview: true,
      readyForNodeV398RuntimeExecutionPacketApprovalGateReview: true,
      readyForRuntimeExecutionPacket: false,
      readyForRuntimeLiveReadGate: false,
      activeNodeVersion: "Node v397",
      sourceNodeVersion: "Node v396",
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
      sourceNodeV396: {
        sourceVersion: "Node v396",
        readyForJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake: true,
        readyForNodeV397RuntimeExecutionPacketPrerequisiteReview: true,
        readyForRuntimeExecutionPacket: false,
        readyForRuntimeLiveReadGate: false,
        runtimeExecutionArtifactsComplete: false,
        presentRuntimeExecutionArtifactCount: 0,
        missingRuntimeExecutionArtifactCount: 6,
        checkCount: 35,
        passedCheckCount: 35,
        javaEvidenceReady: true,
        miniKvEvidenceReady: true,
        productionBlockerCount: 0,
        executionAllowed: false,
        activeShardPrototypeEnabled: false,
      },
      javaV163RuntimeExecutionPacketContribution: {
        sourceVersion: "Java v163",
        status: "passed",
        project: "advanced-order-platform",
        contributionScope: "java-side-runtime-execution-packet-contribution",
        javaPacketContributionPresent: true,
        javaPacketContributionComplete: true,
        crossProjectRuntimeExecutionPacketPresent: false,
        crossProjectRuntimeExecutionPacketExecutable: false,
        readyForRuntimeExecutionPacket: false,
        readyForRuntimeLiveReadGate: false,
        operatorApprovalRecordId: "java-runtime-packet-contribution-approval-record-v163",
        javaLoopbackPort: "8080",
        miniKvLoopbackPortRequirement: "requires-mini-kv-runtime-packet-contribution",
        serviceOwnerConfirmation: "java-platform-operator-confirmed",
        getOnlySmokeCommandCount: 3,
        cleanupProofArtifactCount: 3,
        processCleanupRuleCount: 4,
        acceptedRequirementRowCount: 6,
        crossProjectMissingArtifactCount: 3,
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
        evidenceReady: true,
      },
      miniKvV154RuntimeExecutionCandidate: {
        sourceVersion: "mini-kv v154",
        project: "mini-kv",
        releaseVersion: "v154",
        status: "mini-kv-runtime-execution-artifact-candidate-no-runtime-read-only",
        readOnly: true,
        executionAllowed: false,
        previousConsumedReleaseVersion: "v153",
        previousConsumedFixturePath: "fixtures/release/shard-readiness-v153.json",
        candidateMode: "mini-kv-side-candidate-no-runtime",
        candidateArtifactCount: 4,
        acceptedRuntimeExecutionArtifactCount: 0,
        missingAcceptedRuntimeExecutionArtifactCount: 6,
        acceptedRuntimeExecutionArtifactsComplete: false,
        miniKvLoopbackPortCandidateDeclared: true,
        miniKvLoopbackPortCandidate: 6424,
        miniKvLoopbackPortOperatorApproved: false,
        getOnlySmokeCommandOperatorApproved: false,
        serviceOwnerCandidateDeclared: true,
        serviceOwnerOperatorConfirmed: false,
        processCleanupRulesCandidateDeclared: true,
        processCleanupRuleCount: 3,
        cleanupProofPresent: false,
        crossProjectRuntimeExecutionPacketPresent: false,
        runtimeExecutionPacketExecutable: false,
        nodeRuntimeWindowApproved: false,
        operatorApprovalRecordPresent: false,
        startsMiniKvService: false,
        startsServices: false,
        runtimeProbeAllowed: false,
        liveReadAllowed: false,
        routerActivationAllowed: false,
        writeRoutingAllowed: false,
        evidenceReady: true,
      },
      contributionReview: {
        reviewMode: "java-mini-kv-runtime-execution-packet-contribution-review",
        sourceSpan: "Node v396 + Java v163 + mini-kv v154",
        reviewDecision: "record-contributions-and-keep-runtime-execution-packet-blocked",
        javaPacketContributionReceived: true,
        miniKvRuntimeCandidateReceived: true,
        contributionRowsReviewed: 6,
        crossProjectAcceptedRequirementCount: 0,
        crossProjectMissingRequirementCount: 6,
        crossProjectRuntimeExecutionPacketPresent: false,
        crossProjectRuntimeExecutionPacketExecutable: false,
        nodeApprovedRuntimeWindowPresent: false,
        correlatedOperatorApprovalPresent: false,
        cleanupProofAfterRuntimeStartPresent: false,
        readyForRuntimeExecutionPacket: false,
        readyForRuntimeLiveReadGate: false,
        executionAttempted: false,
        startsUpstreamServices: false,
        stopsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        activeShardPrototypeEnabled: false,
        nextNodeVersionSuggested: "Node v398",
      },
      checks: {
        sourceNodeV396Ready: true,
        sourceNodeV396ReadyForV397: true,
        sourceNodeV396RuntimeClosed: true,
        sourceNodeV396ChecksPassed: true,
        javaV163EvidencePresent: true,
        javaV163StatusPassed: true,
        javaV163ContributionPresent: true,
        javaV163ContributionComplete: true,
        javaV163NotCrossProjectPacket: true,
        javaV163NotExecutable: true,
        javaV163AllSixRowsAnswered: true,
        miniKvV154EvidencePresent: true,
        miniKvV154ReleaseCurrent: true,
        miniKvV154CandidateStatus: true,
        miniKvV154CandidateCountsStable: true,
        miniKvV154NoAcceptedRuntimeArtifacts: true,
        miniKvV154NotExecutable: true,
        miniKvV154CandidateRowsPresent: true,
        reviewRowsStable: true,
        reviewRowsNotCrossProjectAccepted: true,
        runtimePacketStillAbsent: true,
        nodeOperatorGapsRecorded: true,
        runtimeGateStillClosed: true,
        noAutomaticUpstreamStartStop: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        activeShardPrototypeStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        reviewDigestStable: true,
        readyForJavaMiniKvRuntimeExecutionPacketContributionReview: true,
      },
      summary: {
        checkCount: 33,
        passedCheckCount: 33,
        sourceCheckCount: 35,
        sourcePassedCheckCount: 35,
        javaEvidenceReady: true,
        miniKvEvidenceReady: true,
        reviewRowCount: 6,
        crossProjectAcceptedRequirementCount: 0,
        crossProjectMissingRequirementCount: 6,
        presentRuntimeExecutionArtifactCount: 0,
        missingRuntimeExecutionArtifactCount: 6,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 1,
      },
    });
    expect(profile.javaV163RuntimeExecutionPacketContribution.evidenceFile.resolvedPath).toContain(
      "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/163/evidence/java-shard-readiness-runtime-execution-packet-contribution-v163.json",
    );
    expect(profile.miniKvV154RuntimeExecutionCandidate.evidenceFile.resolvedPath).toContain(
      "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v154.json",
    );
    expect(profile.reviewRows).toHaveLength(6);
    expect(profile.reviewRows.every((row) => !row.crossProjectAccepted)).toBe(true);
    expect(profile.contributionReview.reviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("fails closed when the Node v396 source archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v397-empty-"));

    try {
      const profile = withForcedHistoricalFallback(() =>
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketContributionReview({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        }));

      expect(profile.contributionReviewState).toBe("blocked");
      expect(profile.contributionReviewDecision).toBe("blocked");
      expect(profile.readyForJavaMiniKvRuntimeExecutionPacketContributionReview).toBe(false);
      expect(profile.readyForNodeV398RuntimeExecutionPacketApprovalGateReview).toBe(false);
      expect(profile.readyForRuntimeExecutionPacket).toBe(false);
      expect(profile.readyForRuntimeLiveReadGate).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "SOURCE_V396_NOT_READY",
        "SOURCE_V396_NOT_READY_FOR_V397",
        "SOURCE_V396_CHECKS_NOT_PASSED",
      ]));
      expect(profile.javaV163RuntimeExecutionPacketContribution.evidenceReady).toBe(true);
      expect(profile.miniKvV154RuntimeExecutionCandidate.evidenceReady).toBe(true);
      expect(profile.executionAttempted).toBe(false);
      expect(profile.startsJavaService).toBe(false);
      expect(profile.startsMiniKvService).toBe(false);
      expect(profile.executionAllowed).toBe(false);
      expect(profile.activeShardPrototypeEnabled).toBe(false);
    } finally {
      rmSync(emptyProjectRoot, { force: true, recursive: true });
    }
  }, 180_000);

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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-contribution-review.v1",
        contributionReviewState: "java-v163-and-mini-kv-v154-contributions-reviewed",
        activeNodeVersion: "Node v397",
        sourceNodeVersion: "Node v396",
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
        "# Managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution packet contribution review",
      );
      expect(markdown.body).toContain("Java v163 Runtime Execution Packet Contribution");
      expect(markdown.body).toContain("mini-kv v154 Runtime Execution Candidate");
      expect(markdown.body).toContain("Runtime Execution Packet Review Rows");
      expect(markdown.body).toContain("crossProjectMissingRequirementCount: 6");
    } finally {
      await app.close();
      restoreEnv(previous);
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-397",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v397-contribution-review",
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
