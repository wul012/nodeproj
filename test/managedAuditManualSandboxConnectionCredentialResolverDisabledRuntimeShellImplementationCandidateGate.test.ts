import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-implementation-candidate-gate";

describe("managed audit manual sandbox connection credential resolver disabled runtime shell implementation candidate gate", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("reviews the v297 candidate gate while keeping runtime implementation blocked", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-implementation-candidate-gate.v1",
      candidateGateState: "disabled-runtime-shell-implementation-candidate-gate-reviewed",
      readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate: true,
      readOnlyCandidateGate: true,
      implementationCandidateGateOnly: true,
      consumesNodeV296DisabledRuntimeShellUpstreamEchoVerification: true,
      readyForParallelJavaV134MiniKvV131EchoRequest: true,
      readyForNodeV298RuntimeShellCandidateGateUpstreamEchoVerification: false,
      readyForNodeV298RuntimeShellImplementation: false,
      readyForDisabledRuntimeShellImplementation: false,
      readyForDisabledRuntimeShellInvocation: false,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      runtimeShellImplemented: false,
      runtimeShellEnabled: false,
      runtimeShellInvocationAllowed: false,
      realResolverImplementationAllowed: false,
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
      sourceNodeV296: {
        sourceVersion: "Node v296",
        verificationState: "disabled-runtime-shell-upstream-echo-verification-ready",
        readyForUpstreamEchoVerification: true,
        readOnlyUpstreamEchoVerification: true,
        disabledRuntimeShellUpstreamEchoVerificationOnly: true,
        consumesJavaV133: true,
        consumesMiniKvV130: true,
        planVersionCorrectionApplied: true,
        plannedJavaVersion: "Java v132",
        actualJavaEchoVersion: "Java v133",
        readyForNodeV297CandidateGate: true,
        readyForNodeV297RuntimeShellImplementation: false,
        sourceSpan: "Node v295 + Java v133 + mini-kv v130",
        checkCount: 24,
        passedCheckCount: 24,
        productionBlockerCount: 0,
        runtimeShellImplemented: false,
        runtimeShellInvocationAllowed: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
        secretProviderInstantiated: false,
        resolverClientInstantiated: false,
        schemaMigrationExecuted: false,
        approvalLedgerWritten: false,
        automaticUpstreamStart: false,
      },
      candidateGate: {
        gateVersion: "node-v297-disabled-runtime-shell-implementation-candidate-gate.v1",
        gateMode: "candidate-gate-only-default-blocked",
        sourceSpan: "Node v296",
        gateDecision: "blocked-request-parallel-java-v134-and-mini-kv-v131-before-implementation",
        requiredGateCount: 5,
        documentedGateCount: 5,
        reviewEvidenceSatisfiedCount: 5,
        runtimePrerequisiteSatisfiedCount: 0,
        implementationAllowedGateCount: 0,
        necessity: {
          blocker: "candidate-gate-lacks-upstream-echo-and-runtime-prerequisite-proof",
          consumer: "Java v134 and mini-kv v131, then Node v298",
        },
      },
      checks: {
        sourceNodeV296Ready: true,
        sourceNodeV296KeepsImplementationBlocked: true,
        sourceNodeV296KeepsSideEffectsClosed: true,
        candidateGateCountStable: true,
        allCandidateGatesDocumented: true,
        allCandidateGatesReviewEvidenceSatisfied: true,
        candidateGateKeepsRuntimeBlocked: true,
        dedicatedDisabledByDefaultFlagRequired: true,
        operatorApprovalRequired: true,
        abortSemanticsRequired: true,
        noNetworkTestsRequired: true,
        historicalFallbackEvidenceRequired: true,
        necessityDocumented: true,
        parallelUpstreamEchoRecommended: true,
        noRuntimeImplementationCreated: true,
        noRuntimeInvocationAllowed: true,
        credentialBoundaryClosed: true,
        rawEndpointBoundaryClosed: true,
        providerClientBoundaryClosed: true,
        connectionBoundaryClosed: true,
        writeBoundaryClosed: true,
        autoStartBoundaryClosed: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate: true,
      },
      summary: {
        sourceCheckCount: 24,
        sourcePassedCheckCount: 24,
        requiredGateCount: 5,
        documentedGateCount: 5,
        reviewEvidenceSatisfiedCount: 5,
        runtimePrerequisiteSatisfiedCount: 0,
        implementationAllowedGateCount: 0,
        stopConditionCount: 6,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.candidateGate.gateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV296.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.candidateGate.requiredGates.map((gate) => gate.code)).toEqual([
      "DEDICATED_DISABLED_BY_DEFAULT_FLAG",
      "OPERATOR_APPROVAL",
      "ABORT_SEMANTICS",
      "NO_NETWORK_TESTS",
      "HISTORICAL_FALLBACK_EVIDENCE",
    ]);
    expect(profile.candidateGate.requiredGates.every((gate) =>
      gate.documentedForGateReview
      && gate.reviewEvidenceSatisfied
      && !gate.runtimePrerequisiteSatisfied
      && !gate.implementationAllowed)).toBe(true);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  });

  it("uses committed historical fixture fallback through the v296 source chain", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate({
      config: loadTestConfig(),
    });

    expect(profile.candidateGateState).toBe("disabled-runtime-shell-implementation-candidate-gate-reviewed");
    expect(profile.sourceNodeV296.readyForUpstreamEchoVerification).toBe(true);
    expect(profile.sourceNodeV296.actualJavaEchoVersion).toBe("Java v133");
    expect(profile.checks.historicalFallbackEvidenceRequired).toBe(true);
    expect(profile.readyForParallelJavaV134MiniKvV131EchoRequest).toBe(true);
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.candidateGateState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate)
      .toBe(false);
    expect(profile.readyForParallelJavaV134MiniKvV131EchoRequest).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-implementation-candidate-gate.v1",
        candidateGateState: "disabled-runtime-shell-implementation-candidate-gate-reviewed",
        readyForParallelJavaV134MiniKvV131EchoRequest: true,
        readyForDisabledRuntimeShellImplementation: false,
        candidateGate: {
          gateDecision: "blocked-request-parallel-java-v134-and-mini-kv-v131-before-implementation",
          requiredGateCount: 5,
          runtimePrerequisiteSatisfiedCount: 0,
          implementationAllowedGateCount: 0,
        },
        checks: {
          sourceNodeV296Ready: true,
          candidateGateKeepsRuntimeBlocked: true,
          parallelUpstreamEchoRecommended: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver disabled runtime shell implementation candidate gate",
      );
      expect(markdown.body).toContain("DEDICATED_DISABLED_BY_DEFAULT_FLAG");
      expect(markdown.body).toContain("blocked-request-parallel-java-v134-and-mini-kv-v131-before-implementation");
    } finally {
      await app.close();
    }
  }, 45000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-297",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v297-disabled-runtime-shell-candidate-gate",
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
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
    AUDIT_STORE_URL: "managed-audit://contract-only",
    PORT: "4371",
    ...overrides,
  });
}
