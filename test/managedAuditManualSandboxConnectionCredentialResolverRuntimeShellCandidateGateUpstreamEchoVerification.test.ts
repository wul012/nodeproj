import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-upstream-echo-verification";

describe("managed audit manual sandbox connection credential resolver runtime shell candidate gate upstream echo verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies Java v134 and mini-kv v131 echoes while keeping runtime implementation blocked", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-upstream-echo-verification.v1",
      verificationState: "runtime-shell-candidate-gate-upstream-echo-verification-ready",
      readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification: true,
      readOnlyUpstreamEchoVerification: true,
      runtimeShellCandidateGateUpstreamEchoVerificationOnly: true,
      consumesNodeV297DisabledRuntimeShellImplementationCandidateGate: true,
      consumesJavaV134RuntimeShellCandidateGateEcho: true,
      consumesMiniKvV131RuntimeShellCandidateGateNonParticipationReceipt: true,
      readyForNodeV299RuntimeShellCandidateGateDecisionRecord: true,
      readyForNodeV299RuntimeShellImplementation: false,
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
      sourceNodeV297: {
        sourceVersion: "Node v297",
        candidateGateState: "disabled-runtime-shell-implementation-candidate-gate-reviewed",
        readyForCandidateGate: true,
        readOnlyCandidateGate: true,
        implementationCandidateGateOnly: true,
        readyForParallelJavaV134MiniKvV131EchoRequest: true,
        readyForNodeV298RuntimeShellCandidateGateUpstreamEchoVerification: false,
        readyForNodeV298RuntimeShellImplementation: false,
        gateVersion: "node-v297-disabled-runtime-shell-implementation-candidate-gate.v1",
        gateMode: "candidate-gate-only-default-blocked",
        gateDecision: "blocked-request-parallel-java-v134-and-mini-kv-v131-before-implementation",
        requiredGateCount: 5,
        documentedGateCount: 5,
        reviewEvidenceSatisfiedCount: 5,
        runtimePrerequisiteSatisfiedCount: 0,
        implementationAllowedGateCount: 0,
        necessityConsumer: "Java v134 and mini-kv v131, then Node v298",
        checkCount: 27,
        passedCheckCount: 27,
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
      upstreamEvidence: {
        javaV134: {
          sourceVersion: "Java v134",
          evidencePresent: true,
          verificationDocumented: true,
          candidateGateEchoPresent: true,
          readyForNodeV298: true,
          candidateGateEchoMode: "java-v134-credential-resolver-disabled-runtime-shell-candidate-gate-echo-only",
          consumedNodeV297: true,
          gateDecisionEchoed: true,
          fiveGateSetEchoed: true,
          necessityEchoed: true,
          noRuntimeImplementation: true,
          noRuntimeInvocation: true,
          credentialValueBoundaryClosed: true,
          rawEndpointBoundaryClosed: true,
          providerClientBoundaryClosed: true,
          connectionBoundaryClosed: true,
          ledgerSqlSchemaBoundaryClosed: true,
          automaticUpstreamStartBlocked: true,
        },
        miniKvV131: {
          sourceVersion: "mini-kv v131",
          evidencePresent: true,
          verificationDocumented: true,
          releaseVersion: "v131",
          consumerHint: "Node v298 runtime shell candidate gate upstream echo verification",
          nodeV297ProfileVersion:
            "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-implementation-candidate-gate.v1",
          nodeV297GateDecision: "blocked-request-parallel-java-v134-and-mini-kv-v131-before-implementation",
          requiredGateCount: 5,
          documentedGateCount: 5,
          reviewEvidenceSatisfiedCount: 5,
          runtimePrerequisiteSatisfiedCount: 0,
          implementationAllowedGateCount: 0,
          readyForNodeV298: true,
          readOnly: true,
          executionAllowed: false,
          runtimeShellImplemented: false,
          runtimeShellInvocationAllowed: false,
          disabledRuntimeShellParticipates: false,
          credentialValueRead: false,
          rawEndpointUrlParsed: false,
          externalRequestSent: false,
          connectsManagedAudit: false,
          providerClientInstantiationAllowed: false,
          storageWriteAllowed: false,
          approvalLedgerWritten: false,
          schemaMigrationExecuted: false,
          loadRestoreCompactExecuted: false,
          setnxexExecutionAllowed: false,
          automaticUpstreamStart: false,
          auditAuthoritative: false,
          orderAuthoritative: false,
          productionBlockerCount: 0,
        },
      },
      echoVerification: {
        verificationMode:
          "node-v297-plus-java-v134-plus-mini-kv-v131-runtime-shell-candidate-gate-upstream-echo-verification-only",
        sourceSpan: "Node v297 + Java v134 + mini-kv v131",
        sourceNodeV297Ready: true,
        javaV134EchoReady: true,
        miniKvV131ReceiptReady: true,
        upstreamEchoAligned: true,
        fiveGateSetAligned: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
        readyForNodeV299RuntimeShellCandidateGateDecisionRecord: true,
        readyForRuntimeShellImplementation: false,
      },
      checks: {
        sourceNodeV297Ready: true,
        sourceNodeV297KeepsImplementationBlocked: true,
        sourceNodeV297KeepsSideEffectsClosed: true,
        javaV134EvidencePresent: true,
        javaV134CandidateGateEchoReady: true,
        miniKvV131EvidencePresent: true,
        miniKvV131NonParticipationReceiptReady: true,
        upstreamEchoConsumerAligned: true,
        nodeJavaMiniKvGateDecisionAligned: true,
        candidateGateCountAligned: true,
        candidateGateDigestAnchored: true,
        runtimeShellImplementationStillForbidden: true,
        runtimeShellInvocationStillForbidden: true,
        credentialBoundaryClosed: true,
        rawEndpointBoundaryClosed: true,
        providerClientBoundaryClosed: true,
        connectionBoundaryClosed: true,
        writeBoundaryClosed: true,
        loadCompactRestoreSetnxexStillBlocked: true,
        autoStartBoundaryClosed: true,
        auditAndOrderAuthorityForbidden: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification: true,
      },
      summary: {
        sourceCheckCount: 27,
        sourcePassedCheckCount: 27,
        requiredGateCount: 5,
        documentedGateCount: 5,
        reviewEvidenceSatisfiedCount: 5,
        runtimePrerequisiteSatisfiedCount: 0,
        implementationAllowedGateCount: 0,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV297.gateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.upstreamEvidence.miniKvV131.nodeV297GateDigest).toBe(profile.sourceNodeV297.gateDigest);
    expect(profile.sourceNodeV297.requiredGateCodes).toEqual([
      "DEDICATED_DISABLED_BY_DEFAULT_FLAG",
      "OPERATOR_APPROVAL",
      "ABORT_SEMANTICS",
      "NO_NETWORK_TESTS",
      "HISTORICAL_FALLBACK_EVIDENCE",
    ]);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  });

  it("uses committed historical fixture fallback for Java v134 and mini-kv v131", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile.verificationState).toBe("runtime-shell-candidate-gate-upstream-echo-verification-ready");
    expect(profile.upstreamEvidence.javaV134.readyForNodeV298).toBe(true);
    expect(profile.upstreamEvidence.miniKvV131.readyForNodeV298).toBe(true);
    expect(profile.upstreamEvidence.javaV134.evidenceFiles.every((file) =>
      file.resolvedPath.includes("fixtures\\historical\\sibling-workspaces")
      || file.resolvedPath.includes("fixtures/historical/sibling-workspaces"))).toBe(true);
    expect(profile.upstreamEvidence.miniKvV131.evidenceFiles.every((file) =>
      file.resolvedPath.includes("fixtures\\historical\\sibling-workspaces")
      || file.resolvedPath.includes("fixtures/historical/sibling-workspaces"))).toBe(true);
    expect(profile.checks.candidateGateDigestAnchored).toBe(true);
    expect(profile.readyForNodeV299RuntimeShellCandidateGateDecisionRecord).toBe(true);
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification)
      .toBe(false);
    expect(profile.readyForNodeV299RuntimeShellCandidateGateDecisionRecord).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-upstream-echo-verification.v1",
        verificationState: "runtime-shell-candidate-gate-upstream-echo-verification-ready",
        readyForNodeV299RuntimeShellCandidateGateDecisionRecord: true,
        readyForDisabledRuntimeShellImplementation: false,
        echoVerification: {
          sourceSpan: "Node v297 + Java v134 + mini-kv v131",
          upstreamEchoAligned: true,
          fiveGateSetAligned: true,
          implementationStillBlocked: true,
        },
        checks: {
          sourceNodeV297Ready: true,
          javaV134CandidateGateEchoReady: true,
          miniKvV131NonParticipationReceiptReady: true,
          nodeJavaMiniKvGateDecisionAligned: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver runtime shell candidate gate upstream echo verification",
      );
      expect(markdown.body).toContain("Java v134");
      expect(markdown.body).toContain("mini-kv v131");
      expect(markdown.body).toContain("blocked-request-parallel-java-v134-and-mini-kv-v131-before-implementation");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-298",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v298-runtime-shell-candidate-gate-echo",
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
