import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-upstream-echo-verification";

describe("managed audit manual sandbox connection credential resolver human approval artifact review post-echo decision upstream echo verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies the v310 post-echo decision gate echoes from Java v144 and mini-kv v137", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-upstream-echo-verification.v1",
      verificationState: "human-approval-artifact-review-post-echo-decision-upstream-echo-verification-ready",
      runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell",
      readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification:
        true,
      readOnlyUpstreamEchoVerification: true,
      humanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationOnly: true,
      consumesNodeV310HumanApprovalArtifactReviewPostEchoDecisionGate: true,
      consumesJavaV144HumanApprovalArtifactReviewPostEchoDecisionGateEcho: true,
      consumesMiniKvV137HumanApprovalArtifactReviewPostEchoDecisionGateNonParticipationReceipt: true,
      activeNodeVerificationVersion: "Node v311",
      readyForDisabledRuntimeShellImplementation: false,
      readyForDisabledRuntimeShellInvocation: false,
      readyForManagedAuditResolverImplementation: false,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      runtimeShellImplemented: false,
      runtimeShellEnabled: false,
      runtimeShellInvocationAllowed: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      credentialValueRead: false,
      rawEndpointUrlParsed: false,
      externalRequestSent: false,
      schemaMigrationExecuted: false,
      approvalLedgerWritten: false,
      automaticUpstreamStart: false,
      sourceNodeV310: {
        sourceVersion: "Node v310",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-gate.v1",
        decisionGateState: "human-approval-artifact-review-post-echo-decision-gate-ready",
        readyForHumanApprovalArtifactReviewPostEchoDecisionGate: true,
        readOnlyDecisionGate: true,
        sourceSpan: "Node v308 + Java v143 + mini-kv v136 + Node v309",
        decision: "continue-only-as-blocked-post-echo-prerequisite-review",
        selectedPath: "request-read-only-upstream-decision-echo-before-any-runtime-shell",
        allowsParallelJavaV144MiniKvV137EchoRequest: true,
        allowsNodeV311BeforeUpstreamEcho: false,
        prerequisiteCount: 6,
        missingPrerequisiteCount: 6,
        noGoConditionCount: 9,
      },
      upstreamEvidence: {
        javaV144: {
          sourceVersion: "Java v144",
          echoMode: "java-v144-human-approval-artifact-review-post-echo-decision-gate-echo-only",
          sourceSpan: "Node v310",
          nextNodeVersion: "Node v311",
          evidencePresent: true,
          verificationDocumented: true,
          echoesNodeV310DecisionGate: true,
          readyForNodeV311: true,
          decisionGateContractEchoed: true,
          prerequisiteCountEchoed: true,
          missingPrerequisiteCountEchoed: true,
          noGoConditionCountEchoed: true,
          necessityProofEchoed: true,
          parallelEchoRequestEchoed: true,
          sideEffectBoundariesClosed: true,
        },
        miniKvV137: {
          sourceVersion: "mini-kv v137",
          receiptVersion:
            "mini-kv-credential-resolver-human-approval-artifact-review-post-echo-decision-gate-non-participation-receipt.v1",
          releaseVersion: "v137",
          consumerHint: "Node v311 human approval artifact review post-echo decision upstream echo verification",
          evidencePresent: true,
          verificationDocumented: true,
          echoesNodeV310DecisionGate: true,
          readyForNodeV311: true,
          sourceNodeV310ProfileVersion:
            "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-gate.v1",
          sourceNodeV310DecisionGateState: "human-approval-artifact-review-post-echo-decision-gate-ready",
          prerequisiteCount: 6,
          missingPrerequisiteCount: 6,
          noGoConditionCount: 9,
          readyForNodeV311BeforeUpstreamEcho: false,
          executionAllowed: false,
          connectsManagedAudit: false,
          credentialValueRead: false,
          rawEndpointUrlParsed: false,
          externalRequestSent: false,
          loadRestoreCompactExecuted: false,
          setnxexExecutionAllowed: false,
          auditAuthoritative: false,
          orderAuthoritative: false,
          sideEffectBoundariesClosed: true,
        },
      },
      echoVerification: {
        verificationMode: "human-approval-artifact-review-post-echo-decision-upstream-echo-verification-only",
        sourceSpan: "Node v310 + Java v144 + mini-kv v137",
        sourceNodeV310Ready: true,
        javaV144EchoReady: true,
        miniKvV137ReceiptReady: true,
        upstreamEchoAligned: true,
        decisionGateContractAligned: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
      },
      checks: {
        sourceNodeV310Ready: true,
        sourceNodeV310RequestsParallelEcho: true,
        sourceNodeV310DecisionGateComplete: true,
        sourceNodeV310KeepsRuntimeBlocked: true,
        sourceNodeV310KeepsSideEffectsClosed: true,
        javaV144EvidencePresent: true,
        javaV144EchoesNodeV310DecisionGate: true,
        javaV144ReadyForNodeV311: true,
        javaV144DecisionGateContractEchoed: true,
        javaV144KeepsRuntimeBlocked: true,
        miniKvV137EvidencePresent: true,
        miniKvV137EchoesNodeV310DecisionGate: true,
        miniKvV137ReadyForNodeV311: true,
        miniKvV137DecisionGateContractEchoed: true,
        miniKvV137KeepsRuntimeBlocked: true,
        upstreamEchoesAligned: true,
        decisionGateContractAligned: true,
        sideEffectBoundariesAligned: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification:
          true,
      },
      summary: {
        prerequisiteCount: 6,
        missingPrerequisiteCount: 6,
        noGoConditionCount: 9,
        javaEvidenceFileCount: 4,
        miniKvEvidenceFileCount: 3,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV310.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.upstreamEvidence.miniKvV137.sourceNodeV310DecisionDigest).toBe(profile.sourceNodeV310.decisionDigest);
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.upstreamEvidence.javaV144.expectedSnippets.every((snippet) => snippet.matched)).toBe(true);
    expect(profile.upstreamEvidence.miniKvV137.expectedSnippets.every((snippet) => snippet.matched)).toBe(true);
  });

  it("uses committed historical fixture fallback for Java v144 and mini-kv v137 evidence", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile.verificationState).toBe("human-approval-artifact-review-post-echo-decision-upstream-echo-verification-ready");
    expect(profile.upstreamEvidence.javaV144.evidenceFiles.every((file) => file.resolvedPath.includes("fixtures"))).toBe(true);
    expect(profile.upstreamEvidence.miniKvV137.evidenceFiles.every((file) => file.resolvedPath.includes("fixtures"))).toBe(true);
    expect(profile.upstreamEvidence.javaV144.readyForNodeV311).toBe(true);
    expect(profile.upstreamEvidence.miniKvV137.readyForNodeV311).toBe(true);
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification)
      .toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.externalRequestSent).toBe(false);
  });

  it("exposes JSON and Markdown routes through the audit route table", async () => {
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
          "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-upstream-echo-verification.v1",
        verificationState: "human-approval-artifact-review-post-echo-decision-upstream-echo-verification-ready",
        activeNodeVerificationVersion: "Node v311",
        upstreamEvidence: {
          javaV144: {
            readyForNodeV311: true,
            sideEffectBoundariesClosed: true,
          },
          miniKvV137: {
            readyForNodeV311: true,
            readyForNodeV311BeforeUpstreamEcho: false,
            sideEffectBoundariesClosed: true,
          },
        },
        checks: {
          upstreamEchoesAligned: true,
          decisionGateContractAligned: true,
          sideEffectBoundariesAligned: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver human approval artifact review post-echo decision upstream echo verification",
      );
      expect(markdown.body).toContain("Node v310 + Java v144 + mini-kv v137");
      expect(markdown.body).toContain("KEEP_RUNTIME_SHELL_BLOCKED_AFTER_V311");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-311",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v311-human-approval-post-echo-decision-verification",
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
    ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK: "true",
    ...overrides,
  });
}
