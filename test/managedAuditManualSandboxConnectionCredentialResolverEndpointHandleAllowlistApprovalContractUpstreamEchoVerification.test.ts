import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-upstream-echo-verification";

describe("managed audit manual sandbox connection credential resolver endpoint handle allowlist approval contract upstream echo verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies Java v147 and mini-kv v140 echoes after the Node v320 endpoint handle allowlist contract intake", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-upstream-echo-verification.v1",
      verificationState: "endpoint-handle-allowlist-approval-contract-upstream-echo-verification-ready",
      runtimeShellChainDecision: "require-remaining-prerequisites-before-runtime-shell",
      readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification: true,
      readOnlyUpstreamEchoVerification: true,
      endpointHandleAllowlistApprovalContractUpstreamEchoVerificationOnly: true,
      consumesNodeV320EndpointHandleAllowlistApprovalContractIntake: true,
      consumesJavaV147EndpointHandleAllowlistApprovalContractEcho: true,
      consumesMiniKvV140EndpointHandleAllowlistApprovalContractNonParticipationReceipt: true,
      observesJavaV148QualitySplit: true,
      activeNodeVerificationVersion: "Node v321",
      readyForManagedAuditResolverImplementation: false,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
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
      sourceNodeV320: {
        sourceVersion: "Node v320",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-intake.v1",
        contractState: "endpoint-handle-allowlist-approval-contract-intake-ready",
        readyForEndpointHandleAllowlistApprovalContractIntake: true,
        targetPrerequisiteId: "endpoint-handle-allowlist-approval",
        nextJavaVersion: "Java v147",
        nextMiniKvVersion: "mini-kv v140",
        nextNodeVerificationVersion: "Node v321",
        readyForParallelJavaV147MiniKvV140Echo: true,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
      },
      upstreamEvidence: {
        javaV147: {
          sourceVersion: "Java v147",
          echoMode: "java-v147-endpoint-handle-allowlist-approval-contract-echo-only",
          sourceSpan: "Node v320",
          nextNodeVersion: "Node v321",
          evidencePresent: true,
          verificationDocumented: true,
          echoesNodeV320Plan: true,
          readyForNodeV321: true,
          endpointHandleAllowlistContractEchoed: true,
          requiredFieldCountEchoed: true,
          prohibitedFieldCountEchoed: true,
          rejectionReasonCountEchoed: true,
          noGoBoundaryCountEchoed: true,
          upstreamEchoRequestsEchoed: true,
          necessityProofEchoed: true,
          sideEffectBoundariesClosed: true,
        },
        miniKvV140: {
          sourceVersion: "mini-kv v140",
          receiptVersion:
            "mini-kv-credential-resolver-endpoint-handle-allowlist-approval-contract-non-participation-receipt.v1",
          releaseVersion: "v140",
          consumerHint: "Node v321 endpoint-handle allowlist approval contract upstream echo verification",
          evidencePresent: true,
          verificationDocumented: true,
          echoesNodeV320Plan: true,
          readyForNodeV321: true,
          requiredFieldCount: 10,
          prohibitedFieldCount: 8,
          rejectionReasonCount: 5,
          noGoBoundaryCount: 9,
          upstreamEchoRequestCount: 2,
          nonParticipationReceiptOnly: true,
          readOnlyEndpointHandleAllowlistContract: true,
          consumesNodeV320EndpointHandleAllowlistApprovalContractIntake: true,
          readyForNodeV321BeforeUpstreamEcho: false,
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
          loadRestoreCompactExecuted: false,
          setnxexExecutionAllowed: false,
          endpointAuthorityClaimed: false,
          endpointAllowlistAuthority: false,
          auditAuthoritative: false,
          orderAuthoritative: false,
          sideEffectBoundariesClosed: true,
        },
        javaV148QualitySplit: {
          sourceVersion: "Java v148",
          purpose: "quality-only-response-records-split",
          evidencePresent: true,
        },
      },
      echoVerification: {
        verificationMode: "endpoint-handle-allowlist-approval-contract-upstream-echo-verification-only",
        sourceSpan: "Node v320 + Java v147 + mini-kv v140",
        sourceNodeV320Ready: true,
        javaV147EchoReady: true,
        miniKvV140ReceiptReady: true,
        upstreamEchoAligned: true,
        endpointHandleAllowlistContractAligned: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
      },
      checks: {
        sourceNodeV320Ready: true,
        sourceNodeV320RequestsParallelEcho: true,
        sourceNodeV320ContractComplete: true,
        sourceNodeV320KeepsRuntimeBlocked: true,
        sourceNodeV320KeepsSideEffectsClosed: true,
        javaV147EvidencePresent: true,
        javaV147EchoesNodeV320Plan: true,
        javaV147ReadyForNodeV321: true,
        javaV147EndpointHandleAllowlistContractEchoed: true,
        javaV147KeepsRuntimeBlocked: true,
        miniKvV140EvidencePresent: true,
        miniKvV140EchoesNodeV320Plan: true,
        miniKvV140ReadyForNodeV321: true,
        miniKvV140EndpointHandleAllowlistContractEchoed: true,
        miniKvV140KeepsRuntimeBlocked: true,
        javaV148QualitySplitObserved: true,
        upstreamEchoesAligned: true,
        endpointHandleAllowlistContractAligned: true,
        sideEffectBoundariesAligned: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification: true,
      },
      summary: {
        requiredFieldCount: 10,
        prohibitedFieldCount: 8,
        rejectionReasonCount: 5,
        noGoBoundaryCount: 9,
        upstreamEchoRequestCount: 2,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV320.contractDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV320.contractDigest).toBe(profile.upstreamEvidence.miniKvV140.sourceNodeV320ContractDigest);
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.upstreamEvidence.javaV147.expectedSnippets.every((expected) => expected.matched)).toBe(true);
    expect(profile.upstreamEvidence.miniKvV140.expectedSnippets.every((expected) => expected.matched)).toBe(true);
  });

  it("uses committed historical fixture fallback for Java v147 and mini-kv v140", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile.verificationState).toBe("endpoint-handle-allowlist-approval-contract-upstream-echo-verification-ready");
    expect(profile.upstreamEvidence.javaV147.evidenceFiles.every((file) =>
      normalizePath(file.resolvedPath).includes("fixtures/historical/sibling-workspaces"))).toBe(true);
    expect(profile.upstreamEvidence.miniKvV140.evidenceFiles.every((file) =>
      normalizePath(file.resolvedPath).includes("fixtures/historical/sibling-workspaces"))).toBe(true);
    expect(profile.checks.upstreamEchoesAligned).toBe(true);
    expect(profile.checks.endpointHandleAllowlistContractAligned).toBe(true);
    expect(profile.checks.sideEffectBoundariesAligned).toBe(true);
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification)
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
          "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-upstream-echo-verification.v1",
        verificationState: "endpoint-handle-allowlist-approval-contract-upstream-echo-verification-ready",
        activeNodeVerificationVersion: "Node v321",
        upstreamEvidence: {
          javaV147: {
            readyForNodeV321: true,
            endpointHandleAllowlistContractEchoed: true,
            sideEffectBoundariesClosed: true,
          },
          miniKvV140: {
            readyForNodeV321: true,
            requiredFieldCount: 10,
            sideEffectBoundariesClosed: true,
          },
        },
        echoVerification: {
          upstreamEchoAligned: true,
          endpointHandleAllowlistContractAligned: true,
          implementationStillBlocked: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver endpoint handle allowlist approval contract upstream echo verification",
      );
      expect(markdown.body).toContain("endpoint-handle-allowlist-approval-contract-upstream-echo-verification-ready");
      expect(markdown.body).toContain("Java v147 Echo");
      expect(markdown.body).toContain("mini-kv v140 Receipt");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-321",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v321-endpoint-handle-upstream-echo",
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
