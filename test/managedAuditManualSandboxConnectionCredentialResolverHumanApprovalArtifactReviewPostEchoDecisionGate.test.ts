import { createHash } from "node:crypto";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateRenderer.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-gate";

describe("managed audit manual sandbox connection credential resolver human approval artifact review post-echo decision gate", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("records the v310 post-echo decision gate while keeping runtime shell blocked", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-gate.v1",
      decisionGateState: "human-approval-artifact-review-post-echo-decision-gate-ready",
      runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell",
      readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate: true,
      readOnlyDecisionGate: true,
      humanApprovalArtifactReviewPostEchoDecisionGateOnly: true,
      consumesNodeV309HumanApprovalArtifactReviewUpstreamEchoVerification: true,
      readyForParallelJavaV144MiniKvV137EchoRequest: true,
      readyForNodeV311PostEchoDecisionUpstreamEchoVerification: false,
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
      sourceNodeV309: {
        sourceVersion: "Node v309",
        verificationState: "human-approval-artifact-review-upstream-echo-verification-ready",
        readyForHumanApprovalArtifactReviewUpstreamEchoVerification: true,
        readOnlyUpstreamEchoVerification: true,
        activeNodeVerificationVersion: "Node v309",
        verificationMode: "human-approval-artifact-review-upstream-echo-verification-only",
        sourceSpan: "Node v308 + Java v143 + mini-kv v136",
        sourceNodeV308Ready: true,
        javaV143EchoReady: true,
        miniKvV136ReceiptReady: true,
        upstreamEchoAligned: true,
        reviewPacketContractAligned: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
        sourceNodeV308RequiredFieldCount: 9,
        sourceNodeV308ProhibitedFieldCount: 9,
        sourceNodeV308RejectionReasonCount: 13,
        sourceNodeV308MissingFieldCheckCount: 9,
        sourceNodeV308NoGoBoundaryCount: 12,
        sourceNodeV308UpstreamEchoRequestCount: 2,
        runtimeShellImplemented: false,
        runtimeShellInvocationAllowed: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
      },
      decisionGate: {
        gateMode: "human-approval-artifact-review-post-echo-decision-gate-only",
        decisionScope: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review",
        sourceSpan: "Node v308 + Java v143 + mini-kv v136 + Node v309",
        decision: "continue-only-as-blocked-post-echo-prerequisite-review",
        selectedPath: "request-read-only-upstream-decision-echo-before-any-runtime-shell",
        allowsParallelJavaV144MiniKvV137EchoRequest: true,
        allowsNodeV311BeforeUpstreamEcho: false,
        allowsDisabledRuntimeShellImplementation: false,
        allowsDisabledRuntimeShellInvocation: false,
        allowsRealResolverImplementation: false,
        allowsSecretProviderInstantiation: false,
        allowsResolverClientInstantiation: false,
        allowsCredentialValueRead: false,
        allowsRawEndpointUrlParse: false,
        allowsExternalRequest: false,
        allowsManagedAuditConnection: false,
        allowsSchemaMigration: false,
        allowsApprovalLedgerWrite: false,
        allowsAutomaticUpstreamStart: false,
        prerequisiteCount: 6,
        missingPrerequisiteCount: 6,
        noGoConditionCount: 9,
        necessityProof: {
          consumer: "Java v144 and mini-kv v137, then Node v311",
          proofComplete: true,
        },
      },
      checks: {
        sourceNodeV309Loaded: true,
        sourceNodeV309Ready: true,
        sourceNodeV309UpstreamEchoAligned: true,
        sourceNodeV309KeepsRuntimeBlocked: true,
        sourceNodeV309KeepsSideEffectsClosed: true,
        decisionSelectsPostEchoPrerequisiteGate: true,
        decisionGateBlocksRuntimeShell: true,
        decisionGateStillReadOnly: true,
        postEchoPrerequisitesDocumented: true,
        missingPrerequisitesBlockImplementation: true,
        necessityProofComplete: true,
        parallelJavaV144MiniKvV137EchoRecommended: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate: true,
      },
      summary: {
        requiredFieldCount: 9,
        prohibitedFieldCount: 9,
        rejectionReasonCount: 13,
        missingFieldCheckCount: 9,
        noGoBoundaryCount: 12,
        upstreamEchoRequestCount: 2,
        prerequisiteCount: 6,
        missingPrerequisiteCount: 6,
        noGoConditionCount: 9,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV309.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.decisionGate.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.decisionGate.requiredPrerequisites.map((item) => [item.id, item.status])).toEqual([
      ["signed-human-approval-artifact", "documented-missing"],
      ["credential-handle-approval", "documented-missing"],
      ["endpoint-handle-allowlist-approval", "documented-missing"],
      ["no-network-safety-fixture", "documented-missing"],
      ["abort-rollback-semantics", "documented-missing"],
      ["java-mini-kv-decision-echo", "documented-missing"],
    ]);
    expect(profile.decisionGate.explicitNoGoConditions.map((condition) => condition.code)).toContain(
      "AUTOMATIC_UPSTREAM_START_REQUESTED",
    );

    const normalizedMarkdown =
      renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateMarkdown({
        ...profile,
        generatedAt: "2026-07-07T00:00:00.000Z",
      });
    expect(normalizedMarkdown.endsWith("\n")).toBe(true);
    expect((normalizedMarkdown.match(/^## /gm) ?? []).length).toBe(12);
    expect((normalizedMarkdown.match(/^### /gm) ?? []).length).toBe(0);
    expect(normalizedMarkdown.length).toBe(12160);
    expect(sha256(normalizedMarkdown)).toBe("8e12af44f0a03e8e4176a22ff82d0eb490a679ae16e0e8086f4b1a4ded8bec3c");
  });

  it("uses committed historical fixture fallback through the v309 source chain", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate({
      config: loadTestConfig(),
    });

    expect(profile.decisionGateState).toBe("human-approval-artifact-review-post-echo-decision-gate-ready");
    expect(profile.sourceNodeV309.upstreamEchoAligned).toBe(true);
    expect(profile.sourceNodeV309.reviewPacketContractAligned).toBe(true);
    expect(profile.decisionGate.necessityProof.whyV309CannotBeReused).toContain("v309");
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.decisionGateState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate)
      .toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-gate.v1",
        decisionGateState: "human-approval-artifact-review-post-echo-decision-gate-ready",
        readyForParallelJavaV144MiniKvV137EchoRequest: true,
        decisionGate: {
          decision: "continue-only-as-blocked-post-echo-prerequisite-review",
          allowsDisabledRuntimeShellImplementation: false,
          allowsCredentialValueRead: false,
          allowsManagedAuditConnection: false,
          missingPrerequisiteCount: 6,
        },
        checks: {
          sourceNodeV309UpstreamEchoAligned: true,
          decisionGateBlocksRuntimeShell: true,
          decisionGateStillReadOnly: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver human approval artifact review post-echo decision gate",
      );
      expect(markdown.body).toContain("human-approval-artifact-review-post-echo-decision-gate-ready");
      expect(markdown.body).toContain("RUN_JAVA_V144_AND_MINIKV_V137_IN_PARALLEL");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-310",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v310-human-approval-post-echo-decision-gate",
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

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}
