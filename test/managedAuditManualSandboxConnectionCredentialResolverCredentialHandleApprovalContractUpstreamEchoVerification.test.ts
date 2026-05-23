import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-upstream-echo-verification";

describe("managed audit manual sandbox connection credential resolver credential handle approval contract upstream echo verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies Java v146 and mini-kv v139 echoes after the Node v317 credential handle approval contract intake", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-upstream-echo-verification.v1",
      verificationState: "credential-handle-approval-contract-upstream-echo-verification-ready",
      runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell",
      readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification: true,
      readOnlyUpstreamEchoVerification: true,
      credentialHandleApprovalContractUpstreamEchoVerificationOnly: true,
      consumesNodeV317CredentialHandleApprovalContractIntake: true,
      consumesJavaV146CredentialHandleApprovalContractIntakeEcho: true,
      consumesMiniKvV139CredentialHandleApprovalContractIntakeNonParticipationReceipt: true,
      activeNodeVerificationVersion: "Node v318",
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
      realResolverImplementationAllowed: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      credentialValueRead: false,
      rawEndpointUrlParsed: false,
      externalRequestSent: false,
      schemaMigrationExecuted: false,
      approvalLedgerWritten: false,
      automaticUpstreamStart: false,
      sourceNodeV317: {
        sourceVersion: "Node v317",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-intake.v1",
        contractState: "credential-handle-approval-contract-intake-ready",
        readyForCredentialHandleApprovalContractIntake: true,
        nextJavaVersion: "Java v146",
        nextMiniKvVersion: "mini-kv v139",
        nextNodeVerificationVersion: "Node v318",
        readyForParallelJavaV146MiniKvV139Echo: true,
        runtimeShellImplemented: false,
        runtimeShellInvocationAllowed: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
      },
      upstreamEvidence: {
        javaV146: {
          sourceVersion: "Java v146",
          receiptVersion:
            "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-credential-handle-approval-contract-echo-receipt.v1",
          echoMode: "java-v146-credential-handle-approval-contract-echo-only",
          sourceSpan: "Node v317",
          nextNodeVersion: "Node v318",
          expectedProfileVersion:
            "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-upstream-echo-verification.v1",
          evidencePresent: true,
          verificationDocumented: true,
          echoesNodeV317Plan: true,
          readyForNodeV318: true,
          credentialHandleContractEchoed: true,
          requiredFieldCountEchoed: true,
          prohibitedFieldCountEchoed: true,
          rejectionReasonCountEchoed: true,
          noGoBoundaryCountEchoed: true,
          upstreamEchoRequestsEchoed: true,
          necessityProofEchoed: true,
          sideEffectBoundariesClosed: true,
        },
        miniKvV139: {
          sourceVersion: "mini-kv v139",
          receiptVersion: "mini-kv-credential-resolver-credential-handle-approval-contract-non-participation-receipt.v1",
          releaseVersion: "v139",
          consumerHint: "Node v318 credential-handle approval contract upstream echo verification",
          evidencePresent: true,
          verificationDocumented: true,
          echoesNodeV317Plan: true,
          readyForNodeV318: true,
          requiredFieldCount: 10,
          prohibitedFieldCount: 8,
          rejectionReasonCount: 5,
          noGoBoundaryCount: 9,
          upstreamEchoRequestCount: 2,
          nonParticipationReceiptOnly: true,
          credentialHandleApprovalContractIntakeOnly: true,
          readOnlyCredentialHandleContract: true,
          consumesNodeV317CredentialHandleApprovalContractIntake: true,
          consumesNodeV316SignedHumanApprovalArtifactPrerequisiteClosureReview: true,
          consumesNodeV313PrerequisiteCatalog: true,
          readyForNodeV318BeforeUpstreamEcho: false,
          runtimeShellImplemented: false,
          runtimeShellInvocationAllowed: false,
          executionAllowed: false,
          connectsManagedAudit: false,
          credentialValueRead: false,
          credentialValueAccepted: false,
          rawEndpointUrlParsed: false,
          rawEndpointUrlAccepted: false,
          externalRequestSent: false,
          secretProviderInstantiated: false,
          resolverClientInstantiated: false,
          fakeSecretProviderInstantiated: false,
          fakeResolverClientInstantiated: false,
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
        verificationMode: "credential-handle-approval-contract-upstream-echo-verification-only",
        sourceSpan: "Node v317 + Java v146 + mini-kv v139",
        sourceNodeV317Ready: true,
        javaV146EchoReady: true,
        miniKvV139ReceiptReady: true,
        upstreamEchoAligned: true,
        credentialHandleContractAligned: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
      },
      checks: {
        sourceNodeV317Ready: true,
        sourceNodeV317RequestsParallelEcho: true,
        sourceNodeV317ContractComplete: true,
        sourceNodeV317KeepsRuntimeBlocked: true,
        sourceNodeV317KeepsSideEffectsClosed: true,
        javaV146EvidencePresent: true,
        javaV146EchoesNodeV317Plan: true,
        javaV146ReadyForNodeV318: true,
        javaV146CredentialHandleContractEchoed: true,
        javaV146KeepsRuntimeBlocked: true,
        miniKvV139EvidencePresent: true,
        miniKvV139EchoesNodeV317Plan: true,
        miniKvV139ReadyForNodeV318: true,
        miniKvV139CredentialHandleContractEchoed: true,
        miniKvV139KeepsRuntimeBlocked: true,
        upstreamEchoesAligned: true,
        credentialHandleContractAligned: true,
        sideEffectBoundariesAligned: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification: true,
      },
      summary: {
        requiredFieldCount: 10,
        prohibitedFieldCount: 8,
        rejectionReasonCount: 5,
        noGoBoundaryCount: 9,
        upstreamEchoRequestCount: 2,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV317.contractDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV317.contractDigest).toBe(profile.upstreamEvidence.miniKvV139.sourceNodeV317ContractDigest);
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.upstreamEvidence.javaV146.expectedSnippets.every((expected) => expected.matched)).toBe(true);
    expect(profile.upstreamEvidence.miniKvV139.expectedSnippets.every((expected) => expected.matched)).toBe(true);
  });

  it("uses committed historical fixture fallback for Java v146 and mini-kv v139", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile.verificationState).toBe("credential-handle-approval-contract-upstream-echo-verification-ready");
    expect(profile.upstreamEvidence.javaV146.evidenceFiles.every((file) =>
      normalizePath(file.resolvedPath).includes("fixtures/historical/sibling-workspaces"))).toBe(true);
    expect(profile.upstreamEvidence.miniKvV139.evidenceFiles.every((file) =>
      normalizePath(file.resolvedPath).includes("fixtures/historical/sibling-workspaces"))).toBe(true);
    expect(profile.checks.upstreamEchoesAligned).toBe(true);
    expect(profile.checks.credentialHandleContractAligned).toBe(true);
    expect(profile.checks.sideEffectBoundariesAligned).toBe(true);
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification)
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
          "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-upstream-echo-verification.v1",
        verificationState: "credential-handle-approval-contract-upstream-echo-verification-ready",
        activeNodeVerificationVersion: "Node v318",
        upstreamEvidence: {
          javaV146: {
            readyForNodeV318: true,
            credentialHandleContractEchoed: true,
            sideEffectBoundariesClosed: true,
          },
          miniKvV139: {
            readyForNodeV318: true,
            requiredFieldCount: 10,
            sideEffectBoundariesClosed: true,
          },
        },
        echoVerification: {
          upstreamEchoAligned: true,
          credentialHandleContractAligned: true,
          implementationStillBlocked: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver credential handle approval contract upstream echo verification",
      );
      expect(markdown.body).toContain("credential-handle-approval-contract-upstream-echo-verification-ready");
      expect(markdown.body).toContain("Java v146 Echo");
      expect(markdown.body).toContain("mini-kv v139 Receipt");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-307",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v318-credential-handle-upstream-echo",
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

function normalizePath(value: string) {
  return value.replace(/\\/g, "/");
}




