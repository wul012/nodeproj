import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContract,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContract.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-intake-contract";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution approval input intake contract", () => {
  it("accepts Java v164 as source input, records mini-kv v155 as precheck-only, and keeps runtime blocked", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContract({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-intake-contract.v1",
      intakeState: "runtime-execution-approval-input-intake-contract-blocked",
      intakeDecision: "block-runtime-execution-pending-complete-approval-inputs",
      readyForRuntimeExecutionApprovalInputIntakeContract: true,
      readyForRuntimeExecutionPacket: false,
      readyForRuntimeLiveReadGate: false,
      activeNodeVersion: "Node v400",
      sourceNodeVersion: "Node v399",
      javaSourceVersion: "Java v164",
      miniKvSourceVersion: "mini-kv v155",
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
      executionAllowed: false,
      activeShardPrototypeEnabled: false,
      sourceNodeV399: {
        sourceVersion: "Node v399",
        archiveVerificationState: "runtime-execution-packet-approval-gate-review-archive-verified",
        readyForNodeV400RuntimeExecutionPacketApprovalInputIntake: true,
        readyForRuntimeExecutionPacket: false,
        readyForRuntimeLiveReadGate: false,
        checkCount: 38,
        passedCheckCount: 38,
      },
      javaV164ApprovalGateInput: {
        sourceVersion: "Java v164",
        evidenceKind: "java-side-runtime-execution-approval-gate-input",
        present: true,
        complete: true,
        inputScope: "java-side-runtime-execution-approval-gate-input",
        status: "passed",
        readOnly: true,
        executionAllowed: false,
        javaApprovalGateInputPresent: true,
        javaApprovalGateInputComplete: true,
        javaLoopbackPort: "8080",
        javaServiceOwner: "java-platform-operator-confirmed",
        javaOperatorApprovalRecordId: "java-runtime-packet-contribution-approval-record-v163",
        javaApprovalInputArtifactCount: 6,
        javaPacketRowsForCorrelationCount: 6,
        requiredSiblingInputCount: 4,
        nodeApprovalGateInputPathCount: 3,
      },
      miniKvV155ApprovalGateInputPrecheck: {
        sourceVersion: "mini-kv v155",
        evidenceKind: "mini-kv-runtime-execution-approval-gate-input-precheck",
        present: true,
        complete: false,
        releaseVersion: "v155",
        status: "runtime-execution-approval-gate-input-precheck-blocked-read-only",
        readOnly: true,
        executionAllowed: false,
        precheckMode: "blocked-missing-approval-gate-inputs",
        approvalGateInputCount: 0,
        missingApprovalGateInputCount: 3,
        approvalGateInputsComplete: false,
        nodeApprovedRuntimeWindowPresent: false,
        correlatedOperatorApprovalRecordPresent: false,
        completeCrossProjectRuntimeExecutionPacketPresent: false,
        miniKvLoopbackPortCandidate: 6424,
        frozenCandidateReleaseVersion: "v154",
      },
      intakeContract: {
        intakeMode: "runtime-execution-approval-input-intake-contract",
        intakeDecision: "block-runtime-execution-pending-complete-approval-inputs",
        javaInputAcceptedAsSourceEvidence: true,
        miniKvInputAcceptedAsSourceEvidence: true,
        miniKvPrecheckOnly: true,
        requiredNodeApprovalInputCount: 3,
        presentNodeApprovalInputCount: 0,
        missingNodeApprovalInputCount: 3,
        handoffRequirementCount: 5,
        satisfiedHandoffRequirementCount: 1,
        blockedHandoffRequirementCount: 4,
        runtimeGateStillClosed: true,
        nextNodeVersionSuggested: "Node v401",
      },
      checks: {
        sourceNodeV399ArchiveVerified: true,
        javaV164EvidencePresent: true,
        javaV164StatusPassed: true,
        javaV164ApprovalInputPresent: true,
        javaV164ApprovalInputComplete: true,
        javaV164DoesNotApproveRuntime: true,
        javaV164RequiresSiblingInputs: true,
        miniKvV155EvidencePresent: true,
        miniKvV155ReleaseCurrent: true,
        miniKvV155PrecheckStatus: true,
        miniKvV155PrecheckOnly: true,
        miniKvV155ApprovalInputsStillMissing: true,
        nodeApprovalInputCountStable: true,
        nodeApprovalInputsAbsentAndRecorded: true,
        nodeApprovedRuntimeWindowMissing: true,
        correlatedOperatorApprovalRecordMissing: true,
        crossProjectRuntimePacketMissing: true,
        handoffRequirementsExplicit: true,
        handoffRequiresMiniKvFinalInput: true,
        handoffRequiresCrossProjectPacket: true,
        runtimeGateStillClosed: true,
        runtimePacketStillAbsent: true,
        executionStillDenied: true,
        noAutomaticUpstreamStartStop: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        activeShardPrototypeStillDisabled: true,
        intakeDigestStable: true,
        readyForRuntimeExecutionApprovalInputIntakeContract: true,
      },
      summary: {
        checkCount: 31,
        passedCheckCount: 31,
        sourceCheckCount: 38,
        sourcePassedCheckCount: 38,
        javaInputPresent: true,
        javaInputComplete: true,
        miniKvPrecheckPresent: true,
        miniKvFinalApprovalInputPresent: false,
        requiredNodeApprovalInputCount: 3,
        presentNodeApprovalInputCount: 0,
        missingNodeApprovalInputCount: 3,
        handoffRequirementCount: 5,
        satisfiedHandoffRequirementCount: 1,
        blockedHandoffRequirementCount: 4,
        presentRuntimeExecutionArtifactCount: 0,
        missingRuntimeExecutionArtifactCount: 6,
        productionBlockerCount: 4,
        warningCount: 2,
        recommendationCount: 1,
      },
    });
    expect(profile.nodeApprovalGateInputs.map((input) => input.missingReasonCode)).toEqual([
      "NODE_APPROVED_RUNTIME_WINDOW_MISSING",
      "CORRELATED_OPERATOR_APPROVAL_RECORD_MISSING",
      "CROSS_PROJECT_RUNTIME_EXECUTION_PACKET_MISSING",
    ]);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "MINI_KV_FINAL_APPROVAL_GATE_INPUT_MISSING",
      "NODE_APPROVED_RUNTIME_WINDOW_MISSING",
      "CORRELATED_OPERATOR_APPROVAL_RECORD_MISSING",
      "CROSS_PROJECT_RUNTIME_EXECUTION_PACKET_MISSING",
    ]);
    expect(profile.intakeContract.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
  }, 60000);

  it("uses frozen historical fallback for Java v164 and mini-kv v155 evidence", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContract({
          config: loadTestConfig(),
        });

      expect(profile.javaV164ApprovalGateInput.file.resolvedPath.replace(/\\/g, "/")).toContain(
        "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/164/evidence/java-shard-readiness-runtime-execution-approval-gate-input-v164.json",
      );
      expect(profile.miniKvV155ApprovalGateInputPrecheck.file.resolvedPath.replace(/\\/g, "/")).toContain(
        "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v155.json",
      );
      expect(profile.javaV164ApprovalGateInput.complete).toBe(true);
      expect(profile.miniKvV155ApprovalGateInputPrecheck.releaseVersion).toBe("v155");
      expect(profile.summary.passedCheckCount).toBe(profile.summary.checkCount);
    } finally {
      if (previous === undefined) {
        delete process.env[FORCE_FALLBACK_ENV];
      } else {
        process.env[FORCE_FALLBACK_ENV] = previous;
      }
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-intake-contract.v1",
        intakeState: "runtime-execution-approval-input-intake-contract-blocked",
        activeNodeVersion: "Node v400",
        sourceNodeVersion: "Node v399",
        javaSourceVersion: "Java v164",
        miniKvSourceVersion: "mini-kv v155",
        readyForRuntimeExecutionPacket: false,
        readyForRuntimeLiveReadGate: false,
        runtimeExecutionPacketExecutable: false,
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("Java v164 Approval Gate Input");
      expect(markdown.body).toContain("mini-kv v155 Approval Gate Input Precheck");
      expect(markdown.body).toContain("complete-cross-project-runtime-execution-packet");
      expect(markdown.body).toContain("MINI_KV_FINAL_APPROVAL_GATE_INPUT_MISSING");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-400",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v400-input-contract",
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
