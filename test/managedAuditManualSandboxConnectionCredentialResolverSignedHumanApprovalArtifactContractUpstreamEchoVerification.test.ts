import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-upstream-echo-verification";

describe("managed audit manual sandbox connection credential resolver signed human approval artifact contract upstream echo verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies Java v145 and mini-kv v138 echoes after the Node v314 signed artifact contract intake", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-upstream-echo-verification.v1",
      verificationState: "signed-human-approval-artifact-contract-upstream-echo-verification-ready",
      runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell",
      readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification: true,
      readOnlyUpstreamEchoVerification: true,
      signedHumanApprovalArtifactContractUpstreamEchoVerificationOnly: true,
      consumesNodeV314SignedHumanApprovalArtifactContractIntake: true,
      consumesJavaV145SignedHumanApprovalArtifactContractIntakeEcho: true,
      consumesMiniKvV138SignedHumanApprovalArtifactContractIntakeNonParticipationReceipt: true,
      activeNodeVerificationVersion: "Node v315",
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
      sourceNodeV314: {
        sourceVersion: "Node v314",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-intake.v1",
        contractState: "signed-human-approval-artifact-contract-intake-ready",
        readyForArtifactIntake: true,
        nextJavaVersion: "Java v145",
        nextMiniKvVersion: "mini-kv v138",
        nextNodeVerificationVersion: "Node v315",
        readyForParallelJavaV145MiniKvV138Echo: true,
        runtimeShellImplemented: false,
        runtimeShellInvocationAllowed: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
      },
      upstreamEvidence: {
        javaV145: {
          sourceVersion: "Java v145",
          receiptVersion:
            "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-signed-human-approval-artifact-contract-echo-receipt.v1",
          echoMode: "java-v145-signed-human-approval-artifact-contract-echo-only",
          sourceSpan: "Node v314",
          nextNodeVersion: "Node v315",
          expectedProfileVersion:
            "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-upstream-echo-verification.v1",
          evidencePresent: true,
          verificationDocumented: true,
          echoesNodeV314Plan: true,
          readyForNodeV315: true,
          artifactContractEchoed: true,
          requiredFieldCountEchoed: true,
          prohibitedFieldCountEchoed: true,
          rejectionReasonCountEchoed: true,
          noGoBoundaryCountEchoed: true,
          upstreamEchoRequestsEchoed: true,
          necessityProofEchoed: true,
          sideEffectBoundariesClosed: true,
        },
        miniKvV138: {
          sourceVersion: "mini-kv v138",
          receiptVersion: "mini-kv-credential-resolver-signed-human-approval-artifact-contract-non-participation-receipt.v1",
          releaseVersion: "v138",
          consumerHint: "Node v315 signed human approval artifact contract upstream echo verification",
          evidencePresent: true,
          verificationDocumented: true,
          echoesNodeV314Plan: true,
          readyForNodeV315: true,
          requiredFieldCount: 11,
          prohibitedFieldCount: 8,
          rejectionReasonCount: 5,
          noGoBoundaryCount: 8,
          upstreamEchoRequestCount: 2,
          nonParticipationReceiptOnly: true,
          signedHumanApprovalArtifactContractIntakeOnly: true,
          readOnlyArtifactContract: true,
          consumesNodeV314SignedHumanApprovalArtifactContractIntake: true,
          consumesNodeV312GovernanceStopPrerequisiteClosureDecision: true,
          consumesNodeV313PrerequisiteCatalog: true,
          readyForNodeV315BeforeUpstreamEcho: false,
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
        verificationMode: "signed-human-approval-artifact-contract-upstream-echo-verification-only",
        sourceSpan: "Node v314 + Java v145 + mini-kv v138",
        sourceNodeV314Ready: true,
        javaV145EchoReady: true,
        miniKvV138ReceiptReady: true,
        upstreamEchoAligned: true,
        artifactContractAligned: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
      },
      checks: {
        sourceNodeV314Ready: true,
        sourceNodeV314RequestsParallelEcho: true,
        sourceNodeV314ArtifactContractComplete: true,
        sourceNodeV314KeepsRuntimeBlocked: true,
        sourceNodeV314KeepsSideEffectsClosed: true,
        javaV145EvidencePresent: true,
        javaV145EchoesNodeV314Plan: true,
        javaV145ReadyForNodeV315: true,
        javaV145ArtifactContractEchoed: true,
        javaV145KeepsRuntimeBlocked: true,
        miniKvV138EvidencePresent: true,
        miniKvV138EchoesNodeV314Plan: true,
        miniKvV138ReadyForNodeV315: true,
        miniKvV138ArtifactContractEchoed: true,
        miniKvV138KeepsRuntimeBlocked: true,
        upstreamEchoesAligned: true,
        artifactContractAligned: true,
        sideEffectBoundariesAligned: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification: true,
      },
      summary: {
        requiredFieldCount: 11,
        prohibitedFieldCount: 8,
        rejectionReasonCount: 5,
        noGoBoundaryCount: 8,
        upstreamEchoRequestCount: 2,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV314.contractDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV314.contractDigest).toBe(profile.upstreamEvidence.miniKvV138.sourceNodeV314ContractDigest);
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.upstreamEvidence.javaV145.expectedSnippets.every((expected) => expected.matched)).toBe(true);
    expect(profile.upstreamEvidence.miniKvV138.expectedSnippets.every((expected) => expected.matched)).toBe(true);
  });

  it("uses committed historical fixture fallback for Java v145 and mini-kv v138", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile.verificationState).toBe("signed-human-approval-artifact-contract-upstream-echo-verification-ready");
    expect(profile.upstreamEvidence.javaV145.evidenceFiles.every((file) =>
      normalizePath(file.resolvedPath).includes("fixtures/historical/sibling-workspaces"))).toBe(true);
    expect(profile.upstreamEvidence.miniKvV138.evidenceFiles.every((file) =>
      normalizePath(file.resolvedPath).includes("fixtures/historical/sibling-workspaces"))).toBe(true);
    expect(profile.checks.upstreamEchoesAligned).toBe(true);
    expect(profile.checks.artifactContractAligned).toBe(true);
    expect(profile.checks.sideEffectBoundariesAligned).toBe(true);
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification)
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
          "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-upstream-echo-verification.v1",
        verificationState: "signed-human-approval-artifact-contract-upstream-echo-verification-ready",
        activeNodeVerificationVersion: "Node v315",
        upstreamEvidence: {
          javaV145: {
            readyForNodeV315: true,
            artifactContractEchoed: true,
            sideEffectBoundariesClosed: true,
          },
          miniKvV138: {
            readyForNodeV315: true,
            requiredFieldCount: 11,
            sideEffectBoundariesClosed: true,
          },
        },
        echoVerification: {
          upstreamEchoAligned: true,
          artifactContractAligned: true,
          implementationStillBlocked: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver signed human approval artifact contract upstream echo verification",
      );
      expect(markdown.body).toContain("signed-human-approval-artifact-contract-upstream-echo-verification-ready");
      expect(markdown.body).toContain("Java v145 Echo");
      expect(markdown.body).toContain("mini-kv v138 Receipt");
    } finally {
      await app.close();
    }
  }, 45000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-307",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v315-artifact-upstream-echo",
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



