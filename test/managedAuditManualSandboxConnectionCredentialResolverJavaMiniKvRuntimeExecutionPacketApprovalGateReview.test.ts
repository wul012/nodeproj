import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReview.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-approval-gate-review";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution packet approval gate review", () => {
  it("blocks runtime approval when the Node window, correlated approval, and cross-project packet are missing", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReview({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-approval-gate-review.v1",
      approvalGateReviewState: "runtime-execution-packet-approval-gate-reviewed-blocked",
      approvalGateDecision:
        "block-runtime-execution-packet-approval-missing-node-window-correlated-approval-and-cross-project-packet",
      readyForJavaMiniKvRuntimeExecutionPacketApprovalGateReview: true,
      readyForNodeV399RuntimeExecutionPacketApprovalGateArchiveVerification: true,
      readyForRuntimeExecutionPacket: false,
      readyForRuntimeLiveReadGate: false,
      activeNodeVersion: "Node v398",
      sourceNodeVersion: "Node v397",
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
      sourceNodeV397: {
        sourceVersion: "Node v397",
        contributionReviewState: "java-v163-and-mini-kv-v154-contributions-reviewed",
        contributionReviewDecision: "keep-runtime-execution-packet-blocked-pending-node-window-and-correlated-approval",
        readyForJavaMiniKvRuntimeExecutionPacketContributionReview: true,
        readyForNodeV398RuntimeExecutionPacketApprovalGateReview: true,
        readyForRuntimeExecutionPacket: false,
        readyForRuntimeLiveReadGate: false,
        runtimeExecutionArtifactsComplete: false,
        presentRuntimeExecutionArtifactCount: 0,
        missingRuntimeExecutionArtifactCount: 6,
        runtimeExecutionPacketPresent: false,
        runtimeExecutionPacketExecutable: false,
        runtimeGateApprovalPresent: false,
        executionAttempted: false,
        checkCount: 33,
        passedCheckCount: 33,
        sourceCheckCount: 35,
        sourcePassedCheckCount: 35,
        javaEvidenceReady: true,
        miniKvEvidenceReady: true,
        reviewRowCount: 6,
        crossProjectAcceptedRequirementCount: 0,
        crossProjectMissingRequirementCount: 6,
        productionBlockerCount: 0,
        executionAllowed: false,
        activeShardPrototypeEnabled: false,
      },
      approvalGateReview: {
        reviewMode: "java-mini-kv-runtime-execution-packet-approval-gate-review",
        sourceSpan: "Node v397 contribution review + Node v398 approval gate inputs",
        approvalGateDecision:
          "block-runtime-execution-packet-approval-missing-node-window-correlated-approval-and-cross-project-packet",
        requiredApprovalInputCount: 3,
        presentApprovalInputCount: 0,
        missingApprovalInputCount: 3,
        nodeApprovedRuntimeWindowPresent: false,
        correlatedOperatorApprovalPresent: false,
        crossProjectRuntimeExecutionPacketPresent: false,
        crossProjectRuntimeExecutionPacketExecutable: false,
        cleanupProofAfterRuntimeStartPresent: false,
        crossProjectAcceptedRequirementCount: 0,
        crossProjectMissingRequirementCount: 6,
        readyForRuntimeExecutionPacket: false,
        readyForRuntimeLiveReadGate: false,
        executionAttempted: false,
        startsUpstreamServices: false,
        stopsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        activeShardPrototypeEnabled: false,
        nextNodeVersionSuggested: "Node v399",
      },
      checks: {
        sourceNodeV397Ready: true,
        sourceNodeV397ReadyForV398: true,
        sourceNodeV397RuntimeClosed: true,
        sourceNodeV397ChecksPassed: true,
        sourceAcceptedCountsPreserved: true,
        sourceReviewDigestStable: true,
        approvalInputCountStable: true,
        approvalInputsAbsentAndRecorded: true,
        nodeApprovedRuntimeWindowAbsent: true,
        correlatedOperatorApprovalAbsent: true,
        crossProjectRuntimePacketAbsent: true,
        cleanupProofAfterRuntimeStartAbsent: true,
        runtimeArtifactAcceptanceStillZero: true,
        runtimePacketStillAbsent: true,
        runtimeGateStillClosed: true,
        executionStillDenied: true,
        noAutomaticUpstreamStartStop: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        activeShardPrototypeStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        approvalGateDigestStable: true,
        readyForJavaMiniKvRuntimeExecutionPacketApprovalGateReview: true,
      },
      summary: {
        checkCount: 26,
        passedCheckCount: 26,
        sourceCheckCount: 33,
        sourcePassedCheckCount: 33,
        javaEvidenceReady: true,
        miniKvEvidenceReady: true,
        requiredApprovalInputCount: 3,
        presentApprovalInputCount: 0,
        missingApprovalInputCount: 3,
        crossProjectAcceptedRequirementCount: 0,
        crossProjectMissingRequirementCount: 6,
        presentRuntimeExecutionArtifactCount: 0,
        missingRuntimeExecutionArtifactCount: 6,
        productionBlockerCount: 3,
        warningCount: 2,
        recommendationCount: 1,
      },
    });
    expect(profile.approvalGateInputs).toHaveLength(3);
    expect(profile.approvalGateInputs.every((input) => !input.present && !input.gateSatisfied)).toBe(true);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "NODE_APPROVED_RUNTIME_WINDOW_MISSING",
      "CORRELATED_OPERATOR_APPROVAL_RECORD_MISSING",
      "CROSS_PROJECT_RUNTIME_EXECUTION_PACKET_MISSING",
    ]);
    expect(profile.approvalGateReview.approvalGateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when the Node v397 source archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v398-empty-"));

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReview({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        });

      expect(profile.approvalGateReviewState).toBe("blocked");
      expect(profile.approvalGateDecision).toBe("blocked");
      expect(profile.readyForJavaMiniKvRuntimeExecutionPacketApprovalGateReview).toBe(false);
      expect(profile.readyForNodeV399RuntimeExecutionPacketApprovalGateArchiveVerification).toBe(false);
      expect(profile.readyForRuntimeExecutionPacket).toBe(false);
      expect(profile.readyForRuntimeLiveReadGate).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "SOURCE_V397_NOT_READY",
        "SOURCE_V397_NOT_READY_FOR_V398",
        "SOURCE_V397_CHECKS_NOT_PASSED",
      ]));
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-approval-gate-review.v1",
        approvalGateReviewState: "runtime-execution-packet-approval-gate-reviewed-blocked",
        activeNodeVersion: "Node v398",
        sourceNodeVersion: "Node v397",
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
        "# Managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution packet approval gate review",
      );
      expect(markdown.body).toContain("Approval Gate Inputs");
      expect(markdown.body).toContain("Approval Gate Review");
      expect(markdown.body).toContain("missingApprovalInputCount: 3");
      expect(markdown.body).toContain("NODE_APPROVED_RUNTIME_WINDOW_MISSING");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-398",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v398-gate-review",
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
