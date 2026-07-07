import { createHash } from "node:crypto";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionRenderer.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-governance-stop-prerequisite-closure-decision";

describe("managed audit manual sandbox connection credential resolver human approval artifact review governance stop prerequisite closure decision", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("closes only the Java plus mini-kv decision echo prerequisite after Node v311", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-governance-stop-prerequisite-closure-decision.v1",
      decisionState: "human-approval-artifact-review-governance-stop-prerequisite-closure-decision-ready",
      governanceChainDecision: "pause-governance-chain-until-concrete-prerequisite-artifacts-exist",
      readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision:
        true,
      readOnlyClosureDecision: true,
      humanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionOnly: true,
      consumesNodeV311HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification: true,
      activeNodeDecisionVersion: "Node v312",
      readyForNewJavaMiniKvEchoRequest: false,
      newJavaMiniKvEchoRequested: false,
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
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      credentialValueRead: false,
      credentialValueProvided: false,
      rawEndpointUrlParsed: false,
      rawEndpointUrlRendered: false,
      externalRequestSent: false,
      secretProviderInstantiated: false,
      resolverClientInstantiated: false,
      fakeSecretProviderInstantiated: false,
      fakeResolverClientInstantiated: false,
      schemaMigrationExecuted: false,
      approvalLedgerWritten: false,
      automaticUpstreamStart: false,
      sourceNodeV311: {
        sourceVersion: "Node v311",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-upstream-echo-verification.v1",
        verificationState: "human-approval-artifact-review-post-echo-decision-upstream-echo-verification-ready",
        readyForPostEchoDecisionUpstreamEchoVerification: true,
        readOnlyUpstreamEchoVerification: true,
        sourceSpan: "Node v310 + Java v144 + mini-kv v137",
        upstreamEchoAligned: true,
        decisionGateContractAligned: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
        originalPrerequisiteCount: 6,
        originalMissingPrerequisiteCount: 6,
        noGoConditionCount: 9,
        sourceProductionBlockerCount: 0,
        runtimeShellImplemented: false,
        runtimeShellInvocationAllowed: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
        schemaMigrationExecuted: false,
        approvalLedgerWritten: false,
        automaticUpstreamStart: false,
      },
      closureDecision: {
        decisionMode: "human-approval-artifact-review-governance-stop-prerequisite-closure-decision-only",
        sourceSpan: "Node v311",
        completedPrerequisiteCount: 1,
        remainingPrerequisiteCount: 5,
        originalPrerequisiteCount: 6,
        noGoConditionCount: 9,
        chainContinuationAllowed: false,
        nextConcretePrerequisiteContractRequired: true,
        nextJavaVersionRequested: null,
        nextMiniKvVersionRequested: null,
        nextNodeVersionSuggested: null,
        pauseReason:
          "Only java-mini-kv-decision-echo is closed; five human/non-secret approval prerequisites still do not exist.",
      },
      checks: {
        sourceNodeV311Ready: true,
        sourceNodeV311AlignedWithJavaMiniKv: true,
        sourceNodeV311KeepsRuntimeBlocked: true,
        sourceNodeV311KeepsSideEffectsClosed: true,
        javaMiniKvDecisionEchoClosed: true,
        exactlyOnePrerequisiteClosed: true,
        fivePrerequisitesRemainMissing: true,
        noNewJavaMiniKvEchoRequested: true,
        chainPausedWithoutConcretePrerequisite: true,
        closureDecisionStillReadOnly: true,
        runtimeShellStillBlocked: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision:
          true,
      },
      summary: {
        originalPrerequisiteCount: 6,
        completedPrerequisiteCount: 1,
        remainingPrerequisiteCount: 5,
        noGoConditionCount: 9,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV311.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.closureDecision.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.closureDecision.sourceVerificationDigest).toBe(profile.sourceNodeV311.verificationDigest);
    expect(profile.closureDecision.completedPrerequisites.map((prerequisite) => prerequisite.id)).toEqual([
      "java-mini-kv-decision-echo",
    ]);
    expect(profile.closureDecision.remainingPrerequisites.map((prerequisite) => prerequisite.id)).toEqual([
      "signed-human-approval-artifact",
      "credential-handle-approval",
      "endpoint-handle-allowlist-approval",
      "no-network-safety-fixture",
      "abort-rollback-semantics",
    ]);
    expect(profile.closureDecision.remainingPrerequisites.every((prerequisite) => prerequisite.opensRuntimeShell === false))
      .toBe(true);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);

    const normalizedMarkdown =
      renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionMarkdown({
        ...profile,
        generatedAt: "2026-07-07T00:00:00.000Z",
      });
    expect(normalizedMarkdown.endsWith("\n")).toBe(true);
    expect((normalizedMarkdown.match(/^## /gm) ?? []).length).toBe(9);
    expect((normalizedMarkdown.match(/^### /gm) ?? []).length).toBe(2);
    expect(normalizedMarkdown.length).toBe(7255);
    expect(sha256(normalizedMarkdown)).toBe("4066f2f00da8224e23dac0c84b2ac6843f1b45d397214bef31dac3aaab4d128b");
  });

  it("keeps the v311 historical fixture fallback path available", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision({
      config: loadTestConfig(),
    });

    expect(profile.decisionState).toBe("human-approval-artifact-review-governance-stop-prerequisite-closure-decision-ready");
    expect(profile.sourceNodeV311.readyForPostEchoDecisionUpstreamEchoVerification).toBe(true);
    expect(profile.closureDecision.completedPrerequisiteCount).toBe(1);
    expect(profile.closureDecision.remainingPrerequisiteCount).toBe(5);
    expect(profile.readyForNewJavaMiniKvEchoRequest).toBe(false);
    expect(profile.newJavaMiniKvEchoRequested).toBe(false);
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.decisionState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision)
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
          "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-governance-stop-prerequisite-closure-decision.v1",
        decisionState: "human-approval-artifact-review-governance-stop-prerequisite-closure-decision-ready",
        governanceChainDecision: "pause-governance-chain-until-concrete-prerequisite-artifacts-exist",
        activeNodeDecisionVersion: "Node v312",
        readyForNewJavaMiniKvEchoRequest: false,
        newJavaMiniKvEchoRequested: false,
        closureDecision: {
          completedPrerequisiteCount: 1,
          remainingPrerequisiteCount: 5,
          chainContinuationAllowed: false,
          nextConcretePrerequisiteContractRequired: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver human approval artifact review governance stop prerequisite closure decision",
      );
      expect(markdown.body).toContain("java-mini-kv-decision-echo");
      expect(markdown.body).toContain("KEEP_CHAIN_PAUSED_UNTIL_CONCRETE_PREREQUISITE_EXISTS");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-312",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v312-human-approval-governance-closure",
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
