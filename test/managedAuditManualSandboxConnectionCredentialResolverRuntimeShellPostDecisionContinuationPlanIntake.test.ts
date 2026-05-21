import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-plan-intake";

describe("managed audit manual sandbox connection credential resolver runtime shell post-decision continuation plan intake", () => {
  it("turns Node v300 into a read-only post-decision continuation intake", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-plan-intake.v1",
      planIntakeState: "runtime-shell-post-decision-continuation-plan-intake-ready",
      readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake: true,
      runtimeShellPostDecisionContinuationPlanIntakeOnly: true,
      readOnlyPlanIntake: true,
      consumesNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification: true,
      readyForParallelJavaV136MiniKvV133EchoRequest: true,
      readyForNodeV302PostDecisionPlanIntakeUpstreamEchoVerification: false,
      readyForNodeV303PostDecisionPlanIntakeUpstreamEchoVerification: false,
      readyForDisabledRuntimeShellImplementation: false,
      readyForDisabledRuntimeShellInvocation: false,
      readyForManagedAuditResolverImplementation: false,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
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
      sourceNodeV300: {
        sourceVersion: "Node v300",
        verificationState: "runtime-shell-decision-record-upstream-echo-verification-ready",
        readyForRuntimeShellDecisionRecordUpstreamEchoVerification: true,
        readOnlyUpstreamEchoVerification: true,
        runtimeShellDecisionRecordUpstreamEchoVerificationOnly: true,
        consumesNodeV299RuntimeShellCandidateGateDecisionRecord: true,
        consumesJavaV135RuntimeShellDecisionRecordEcho: true,
        consumesMiniKvV132RuntimeShellDecisionRecordNonParticipationReceipt: true,
        readyForPostRuntimeShellDecisionPlan: true,
        upstreamEchoAligned: true,
        blockedDecisionAligned: true,
        requiredEvidenceAligned: true,
        noGoConditionsAligned: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
        sourceNodeV299Ready: true,
        javaV135EchoReady: true,
        miniKvV132ReceiptReady: true,
        productionBlockerCount: 0,
        runtimeShellImplemented: false,
        runtimeShellInvocationAllowed: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
      },
      continuationPlanIntake: {
        intakeMode: "runtime-shell-post-decision-continuation-plan-intake-only",
        sourceSpan: "Node v300",
        selectedContinuationDecision: "continue-blocked-planning",
        decisionOptionCount: 4,
        selectedDecisionOptionCount: 1,
        rejectedRuntimeImplementationOptionCount: 1,
        catalogVersion: "runtime-shell-post-decision-continuation-catalog.v1",
        legacyNextNodeVerificationVersion: "Node v302",
        nextJavaEchoVersion: "Java v136",
        nextMiniKvReceiptVersion: "mini-kv v133",
        nextNodeVerificationVersion: "Node v303",
        runtimeShellImplementationAllowed: false,
        runtimeShellInvocationAllowed: false,
        credentialValueReadAllowed: false,
        rawEndpointUrlParseAllowed: false,
        providerClientInstantiationAllowed: false,
        externalRequestAllowed: false,
        schemaMigrationAllowed: false,
        approvalLedgerWriteAllowed: false,
        automaticUpstreamStartAllowed: false,
      },
      necessityProof: {
        proofComplete: true,
      },
      checks: {
        sourceNodeV300Loaded: true,
        sourceNodeV300Ready: true,
        sourceNodeV300ReadyForPostDecisionPlan: true,
        sourceNodeV300KeepsRuntimeBlocked: true,
        sourceNodeV300KeepsCredentialBoundaryClosed: true,
        sourceNodeV300KeepsEndpointBoundaryClosed: true,
        sourceNodeV300KeepsConnectionBoundaryClosed: true,
        sourceNodeV300KeepsWriteBoundaryClosed: true,
        continuationDecisionSelected: true,
        decisionOptionsDocumented: true,
        runtimeImplementationOptionRejected: true,
        necessityProofHasBlocker: true,
        necessityProofHasConsumer: true,
        necessityProofExplainsV300ReuseBoundary: true,
        necessityProofDefinesStopCondition: true,
        necessityProofComplete: true,
        runtimeShellImplementationStillForbidden: true,
        runtimeShellInvocationStillForbidden: true,
        providerClientInstantiationStillForbidden: true,
        externalRequestStillForbidden: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake: true,
      },
      summary: {
        continuationOptionCount: 4,
        selectedContinuationOptionCount: 1,
        rejectedRuntimeImplementationOptionCount: 1,
        proofComplete: true,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV300.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.continuationPlanIntake.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.necessityProof.proofDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.necessityProof.consumer).toContain("Java v136");
    expect(profile.necessityProof.consumer).toContain("mini-kv v133");
    expect(profile.necessityProof.consumer).toContain("Node v303");
    expect(profile.necessityProof.whyV300CannotBeReused).toContain("selected continuation option");
    expect(profile.necessityProof.stopCondition).toContain("HTTP/TCP");
    expect(profile.continuationPlanIntake.continuationOptions.map((option) => option.code)).toEqual([
      "CONTINUE_BLOCKED_PLANNING",
      "PAUSE_RUNTIME_SHELL_CHAIN",
      "REQUIRE_EXPLICIT_APPROVAL_PREREQUISITES",
      "IMPLEMENT_RUNTIME_SHELL_NOW",
    ]);
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.planIntakeState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake)
      .toBe(false);
    expect(profile.readyForParallelJavaV136MiniKvV133EchoRequest).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.runtimeShellImplemented).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-plan-intake.v1",
        planIntakeState: "runtime-shell-post-decision-continuation-plan-intake-ready",
        readyForParallelJavaV136MiniKvV133EchoRequest: true,
        readyForNodeV302PostDecisionPlanIntakeUpstreamEchoVerification: false,
        readyForNodeV303PostDecisionPlanIntakeUpstreamEchoVerification: false,
        sourceNodeV300: {
          verificationState: "runtime-shell-decision-record-upstream-echo-verification-ready",
          implementationStillBlocked: true,
        },
        continuationPlanIntake: {
          selectedContinuationDecision: "continue-blocked-planning",
          nextJavaEchoVersion: "Java v136",
          nextMiniKvReceiptVersion: "mini-kv v133",
          nextNodeVerificationVersion: "Node v303",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver runtime shell post-decision continuation plan intake",
      );
      expect(markdown.body).toContain("runtime-shell-post-decision-continuation-plan-intake-ready");
      expect(markdown.body).toContain("Continuation Options");
      expect(markdown.body).toContain("Necessity Proof");
    } finally {
      await app.close();
    }
  }, 45000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-301",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v301-runtime-shell-post-decision-plan-intake",
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
