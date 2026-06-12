import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-plan-intake-upstream-echo-verification";

describe("managed audit manual sandbox connection credential resolver runtime shell post-decision plan intake upstream echo verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies Java v136 and mini-kv v133 echoes after Node v302 catalog quality pass", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-plan-intake-upstream-echo-verification.v1",
      verificationState: "runtime-shell-post-decision-plan-intake-upstream-echo-verification-ready",
      readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification: true,
      readOnlyUpstreamEchoVerification: true,
      runtimeShellPostDecisionPlanIntakeUpstreamEchoVerificationOnly: true,
      consumesNodeV301PostDecisionContinuationPlanIntake: true,
      consumesNodeV302PostDecisionContinuationCatalogQualityPass: true,
      consumesJavaV136PostDecisionPlanIntakeEcho: true,
      consumesMiniKvV133PostDecisionPlanIntakeNonParticipationReceipt: true,
      legacyNodeV302ConsumerMarkerAccepted: true,
      activeNodeVerificationVersion: "Node v303",
      readyForPostDecisionRuntimeShellChainStopDecision: true,
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
      sourceNodeV301: {
        sourceVersion: "Node v301",
        planIntakeState: "runtime-shell-post-decision-continuation-plan-intake-ready",
        readyForPlanIntake: true,
        selectedContinuationDecision: "continue-blocked-planning",
        legacyNextNodeVerificationVersion: "Node v302",
        nextNodeVerificationVersion: "Node v303",
        nextJavaEchoVersion: "Java v136",
        nextMiniKvReceiptVersion: "mini-kv v133",
        proofComplete: true,
        runtimeShellImplemented: false,
        runtimeShellInvocationAllowed: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
      },
      sourceNodeV302: {
        sourceVersion: "Node v302",
        qualityPassState: "runtime-shell-post-decision-continuation-catalog-quality-pass-ready",
        readyForCatalogQualityPass: true,
        activeNodeVerificationTarget: "Node v303",
        consumesNodeV301PostDecisionContinuationPlanIntake: true,
        consumesJavaV136PostDecisionPlanIntakeEcho: false,
        consumesMiniKvV133PostDecisionPlanIntakeReceipt: false,
      },
      upstreamEvidence: {
        javaV136: {
          sourceVersion: "Java v136",
          receiptVersion:
            "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-runtime-shell-post-decision-plan-intake-echo-receipt.v1",
          echoMode: "java-v136-credential-resolver-runtime-shell-post-decision-plan-intake-echo-only",
          sourceSpan: "Node v301",
          legacyNextNodeVersion: "Node v302",
          evidencePresent: true,
          verificationDocumented: true,
          legacyReadyForNodeV302: true,
          echoesNodeV301PlanIntake: true,
          selectedContinuationDecisionEchoed: true,
          continuationOptionsEchoed: true,
          necessityProofEchoed: true,
          runtimeImplementationRejectedEchoed: true,
          sideEffectBoundariesClosed: true,
        },
        miniKvV133: {
          sourceVersion: "mini-kv v133",
          receiptVersion: "mini-kv-credential-resolver-runtime-shell-post-decision-plan-intake-non-participation-receipt.v1",
          releaseVersion: "v133",
          consumerHint: "Node v302 runtime shell post-decision plan intake upstream echo verification",
          evidencePresent: true,
          verificationDocumented: true,
          legacyReadyForNodeV302: true,
          echoesNodeV301PlanIntake: true,
          planIntakeState: "runtime-shell-post-decision-continuation-plan-intake-ready",
          selectedContinuationDecision: "continue-blocked-planning",
          nonParticipationReceiptOnly: true,
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
          loadRestoreCompactExecuted: false,
          setnxexExecutionAllowed: false,
          auditAuthoritative: false,
          orderAuthoritative: false,
          sideEffectBoundariesClosed: true,
        },
      },
      echoVerification: {
        verificationMode: "runtime-shell-post-decision-plan-intake-upstream-echo-verification-only",
        sourceSpan: "Node v301 + Node v302 + Java v136 + mini-kv v133",
        sourceNodeV301Ready: true,
        sourceNodeV302QualityPassReady: true,
        javaV136EchoReady: true,
        miniKvV133ReceiptReady: true,
        upstreamEchoAligned: true,
        legacyNodeV302MarkersAccepted: true,
        activeNodeV303TargetConfirmed: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
      },
      checks: {
        sourceNodeV301Ready: true,
        sourceNodeV301UsesActiveNodeV303Target: true,
        sourceNodeV301KeepsRuntimeBlocked: true,
        sourceNodeV301KeepsSideEffectsClosed: true,
        sourceNodeV302QualityPassReady: true,
        sourceNodeV302ConfirmsActiveNodeV303Target: true,
        sourceNodeV302DidNotConsumeUpstreamEchoes: true,
        javaV136EvidencePresent: true,
        javaV136LegacyReadyForNodeV302: true,
        javaV136EchoesNodeV301: true,
        javaV136KeepsRuntimeBlocked: true,
        miniKvV133EvidencePresent: true,
        miniKvV133LegacyReadyForNodeV302: true,
        miniKvV133EchoesNodeV301: true,
        miniKvV133KeepsRuntimeBlocked: true,
        upstreamEchoesAligned: true,
        legacyNodeV302ConsumerMarkersAccepted: true,
        activeNodeV303VerificationTargetConfirmed: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification: true,
      },
      summary: {
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV301.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.upstreamEvidence.javaV136.expectedSnippets.every((expected) => expected.matched)).toBe(true);
    expect(profile.upstreamEvidence.miniKvV133.expectedSnippets.every((expected) => expected.matched)).toBe(true);
  });

  it("uses committed historical fixture fallback for Java v136 and mini-kv v133", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile.verificationState).toBe("runtime-shell-post-decision-plan-intake-upstream-echo-verification-ready");
    expect(profile.upstreamEvidence.javaV136.evidenceFiles.every((file) =>
      normalizePath(file.resolvedPath).includes("fixtures/historical/sibling-workspaces"))).toBe(true);
    expect(profile.upstreamEvidence.miniKvV133.evidenceFiles.every((file) =>
      normalizePath(file.resolvedPath).includes("fixtures/historical/sibling-workspaces"))).toBe(true);
    expect(profile.checks.activeNodeV303VerificationTargetConfirmed).toBe(true);
    expect(profile.checks.legacyNodeV302ConsumerMarkersAccepted).toBe(true);
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification)
      .toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.readyForDisabledRuntimeShellImplementation).toBe(false);
    expect(profile.runtimeShellImplemented).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.executionAllowed).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-plan-intake-upstream-echo-verification.v1",
        verificationState: "runtime-shell-post-decision-plan-intake-upstream-echo-verification-ready",
        activeNodeVerificationVersion: "Node v303",
        upstreamEvidence: {
          javaV136: {
            legacyReadyForNodeV302: true,
            sideEffectBoundariesClosed: true,
          },
          miniKvV133: {
            legacyReadyForNodeV302: true,
            sideEffectBoundariesClosed: true,
          },
        },
        echoVerification: {
          upstreamEchoAligned: true,
          implementationStillBlocked: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver runtime shell post-decision plan intake upstream echo verification",
      );
      expect(markdown.body).toContain("runtime-shell-post-decision-plan-intake-upstream-echo-verification-ready");
      expect(markdown.body).toContain("Java v136 Echo");
      expect(markdown.body).toContain("mini-kv v133 Receipt");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-303",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v303-runtime-shell-post-decision-plan-intake-upstream-echo",
  };
}

function loadTestConfig(extraEnv: Record<string, string> = {}) {
  return loadConfig({
    ORDEROPS_AUDIT_LOG_PATH: ".tmp/test-audit.log",
    ORDEROPS_AUDIT_HASH_SALT: "test-salt",
    ORDEROPS_RATE_LIMIT_MAX: "1000",
    ORDEROPS_RATE_LIMIT_WINDOW_MS: "1000",
    ORDEROPS_ACCESS_GUARD_ENFORCEMENT_ENABLED: "true",
    ORDEROPS_TEST_BYPASS_CLIENT_INIT: "true",
    ...extraEnv,
  });
}

function normalizePath(value: string) {
  return value.replace(/\\/g, "/");
}
