import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntake.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-completion-intake";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution approval input completion intake", () => {
  it("accepts Java v165 and mini-kv v156 while keeping Node/operator/cross-project runtime approval blocked", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntake({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-completion-intake.v1",
      intakeState: "runtime-execution-approval-input-completion-intake-blocked",
      intakeDecision: "block-runtime-execution-pending-node-window-operator-approval-and-cross-project-packet",
      readyForRuntimeExecutionApprovalInputCompletionIntake: true,
      readyForRuntimeExecutionPacket: false,
      readyForRuntimeLiveReadGate: false,
      activeNodeVersion: "Node v401",
      sourceNodeVersion: "Node v400",
      javaSourceVersion: "Java v165",
      miniKvSourceVersion: "mini-kv v156",
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
      sourceNodeV400: {
        sourceVersion: "Node v400",
        intakeState: "runtime-execution-approval-input-intake-contract-blocked",
        readyForRuntimeExecutionApprovalInputIntakeContract: true,
        checkCount: 31,
        passedCheckCount: 31,
        productionBlockerCount: 4,
      },
      javaV165ContractHandoff: {
        sourceVersion: "Java v165",
        evidenceKind: "java-runtime-execution-approval-input-contract-handoff",
        present: true,
        complete: true,
        status: "passed",
        readOnly: true,
        executionAllowed: false,
        sourceApprovalGateInputVersion: "Java v164",
        javaInputRemainsCanonical: true,
        javaInputChangedByThisVersion: false,
        sourceJavaApprovalGateInputPresent: true,
        sourceJavaApprovalGateInputComplete: true,
        nonJavaMissingInputCount: 4,
        finalPacketBindingRequirementCount: 8,
      },
      miniKvV156FinalApprovalInput: {
        sourceVersion: "mini-kv v156",
        evidenceKind: "mini-kv-final-approval-gate-input",
        present: true,
        complete: true,
        releaseVersion: "v156",
        status: "mini-kv-final-approval-gate-input-no-runtime-read-only",
        readOnly: true,
        executionAllowed: false,
        inputMode: "mini-kv-final-approval-gate-input-no-runtime",
        itemCount: 4,
        loopbackHost: "127.0.0.1",
        loopbackPort: 6424,
        serviceOwnerConfirmed: true,
        processCleanupRulesComplete: true,
        cleanupProofPresent: false,
        nodeApprovedRuntimeWindowPresent: false,
        correlatedOperatorApprovalRecordPresent: false,
        completeCrossProjectRuntimeExecutionPacketPresent: false,
      },
      completionIntake: {
        intakeMode: "runtime-execution-approval-input-completion-intake",
        intakeDecision: "block-runtime-execution-pending-node-window-operator-approval-and-cross-project-packet",
        javaCanonicalInputReady: true,
        miniKvFinalInputReady: true,
        requiredInputCount: 5,
        presentInputCount: 2,
        completeInputCount: 2,
        missingRuntimeApprovalInputCount: 3,
        runtimeGateStillClosed: true,
        nextNodeVersionSuggested: "Node v402",
      },
      checks: {
        sourceNodeV400ContractReady: true,
        javaV165EvidencePresent: true,
        javaV165StatusPassed: true,
        javaV165HandoffComplete: true,
        javaV165KeepsJavaV164Canonical: true,
        javaV165DoesNotApproveRuntime: true,
        miniKvV156EvidencePresent: true,
        miniKvV156ReleaseCurrent: true,
        miniKvV156FinalInputStatus: true,
        miniKvV156FinalInputComplete: true,
        miniKvV156DoesNotApproveRuntime: true,
        inputCountStable: true,
        javaAndMiniKvInputsReady: true,
        nodeApprovedRuntimeWindowStillMissing: true,
        correlatedOperatorApprovalStillMissing: true,
        crossProjectRuntimePacketStillMissing: true,
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
        readyForRuntimeExecutionApprovalInputCompletionIntake: true,
      },
      summary: {
        checkCount: 27,
        passedCheckCount: 27,
        sourceCheckCount: 31,
        sourcePassedCheckCount: 31,
        javaCanonicalInputReady: true,
        miniKvFinalInputReady: true,
        requiredInputCount: 5,
        presentInputCount: 2,
        completeInputCount: 2,
        missingRuntimeApprovalInputCount: 3,
        presentRuntimeExecutionArtifactCount: 0,
        missingRuntimeExecutionArtifactCount: 6,
        productionBlockerCount: 3,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.completionInputs.map((input) => [input.key, input.present, input.complete])).toEqual([
      ["javaCanonicalApprovalInput", true, true],
      ["miniKvFinalApprovalInput", true, true],
      ["nodeApprovedRuntimeWindow", false, false],
      ["correlatedOperatorApprovalRecord", false, false],
      ["crossProjectRuntimeExecutionPacket", false, false],
    ]);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "NODE_APPROVED_RUNTIME_WINDOW_MISSING",
      "CORRELATED_OPERATOR_APPROVAL_RECORD_MISSING",
      "CROSS_PROJECT_RUNTIME_EXECUTION_PACKET_MISSING",
    ]);
    expect(profile.completionIntake.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
  }, 60000);

  it("uses frozen historical fallback for Java v165 and mini-kv v156 evidence", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntake({
          config: loadTestConfig(),
        });

      expect(profile.javaV165ContractHandoff.file.resolvedPath.replace(/\\/g, "/")).toContain(
        "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/165/evidence/java-shard-readiness-runtime-execution-approval-input-contract-handoff-v165.json",
      );
      expect(profile.miniKvV156FinalApprovalInput.file.resolvedPath.replace(/\\/g, "/")).toContain(
        "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v156.json",
      );
      expect(profile.javaV165ContractHandoff.complete).toBe(true);
      expect(profile.miniKvV156FinalApprovalInput.complete).toBe(true);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-completion-intake.v1",
        activeNodeVersion: "Node v401",
        sourceNodeVersion: "Node v400",
        javaSourceVersion: "Java v165",
        miniKvSourceVersion: "mini-kv v156",
        readyForRuntimeExecutionPacket: false,
        readyForRuntimeLiveReadGate: false,
        runtimeExecutionPacketExecutable: false,
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("Java v165 Contract Handoff");
      expect(markdown.body).toContain("mini-kv v156 Final Approval Input");
      expect(markdown.body).toContain("NODE_APPROVED_RUNTIME_WINDOW_MISSING");
      expect(markdown.body).toContain("CROSS_PROJECT_RUNTIME_EXECUTION_PACKET_MISSING");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-401",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v401-completion-intake",
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
