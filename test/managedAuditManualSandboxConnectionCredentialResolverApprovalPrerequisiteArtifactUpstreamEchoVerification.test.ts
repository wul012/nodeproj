import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-upstream-echo-verification";

describe("managed audit manual sandbox connection credential resolver approval prerequisite artifact upstream echo verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies Java v142 and mini-kv v135 echoes after the Node v306 artifact intake plan", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-upstream-echo-verification.v1",
      verificationState: "approval-prerequisite-artifact-upstream-echo-verification-ready",
      runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell",
      readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification: true,
      readOnlyUpstreamEchoVerification: true,
      approvalPrerequisiteArtifactUpstreamEchoVerificationOnly: true,
      consumesNodeV306ApprovalPrerequisiteArtifactIntakePlan: true,
      consumesJavaV142ApprovalPrerequisiteArtifactIntakeEcho: true,
      consumesMiniKvV135ApprovalPrerequisiteArtifactIntakeNonParticipationReceipt: true,
      activeNodeVerificationVersion: "Node v307",
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
      sourceNodeV306: {
        sourceVersion: "Node v306",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-intake-plan.v1",
        planState: "approval-prerequisite-artifact-intake-plan-ready",
        readyForArtifactIntakePlan: true,
        sourceNodeVerificationVersion: "Node v305",
        nextJavaVersion: "Java v142",
        nextMiniKvVersion: "mini-kv v135",
        nextNodeVerificationVersion: "Node v307",
        readyForParallelJavaV142MiniKvV135Echo: true,
        runtimeShellImplemented: false,
        runtimeShellInvocationAllowed: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
      },
      upstreamEvidence: {
        javaV142: {
          sourceVersion: "Java v142",
          receiptVersion:
            "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-approval-prerequisite-artifact-intake-echo-receipt.v1",
          echoMode: "java-v142-credential-resolver-approval-prerequisite-artifact-intake-echo-only",
          sourceSpan: "Node v306",
          nextNodeVersion: "Node v307",
          expectedProfileVersion:
            "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-upstream-echo-verification.v1",
          evidencePresent: true,
          verificationDocumented: true,
          echoesNodeV306Plan: true,
          readyForNodeV307: true,
          artifactContractEchoed: true,
          requiredFieldCountEchoed: true,
          prohibitedFieldCountEchoed: true,
          rejectionReasonCountEchoed: true,
          noGoBoundaryCountEchoed: true,
          upstreamEchoRequestsEchoed: true,
          necessityProofEchoed: true,
          sideEffectBoundariesClosed: true,
        },
        miniKvV135: {
          sourceVersion: "mini-kv v135",
          receiptVersion: "mini-kv-credential-resolver-approval-prerequisite-artifact-intake-non-participation-receipt.v1",
          releaseVersion: "v135",
          consumerHint: "Node v307 approval prerequisite artifact upstream echo verification",
          evidencePresent: true,
          verificationDocumented: true,
          echoesNodeV306Plan: true,
          readyForNodeV307: true,
          requiredFieldCount: 12,
          prohibitedFieldCount: 8,
          rejectionReasonCount: 9,
          noGoBoundaryCount: 12,
          upstreamEchoRequestCount: 2,
          nonParticipationReceiptOnly: true,
          approvalPrerequisiteArtifactIntakePlanOnly: true,
          readOnlyArtifactContract: true,
          consumesNodeV306ApprovalPrerequisiteArtifactIntakePlan: true,
          consumesNodeV305StopPrerequisiteUpstreamEchoVerification: true,
          readyForNodeV307BeforeUpstreamEcho: false,
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
        verificationMode: "approval-prerequisite-artifact-upstream-echo-verification-only",
        sourceSpan: "Node v306 + Java v142 + mini-kv v135",
        sourceNodeV306Ready: true,
        javaV142EchoReady: true,
        miniKvV135ReceiptReady: true,
        upstreamEchoAligned: true,
        artifactContractAligned: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
      },
      checks: {
        sourceNodeV306Ready: true,
        sourceNodeV306RequestsParallelEcho: true,
        sourceNodeV306ArtifactContractComplete: true,
        sourceNodeV306KeepsRuntimeBlocked: true,
        sourceNodeV306KeepsSideEffectsClosed: true,
        javaV142EvidencePresent: true,
        javaV142EchoesNodeV306Plan: true,
        javaV142ReadyForNodeV307: true,
        javaV142ArtifactContractEchoed: true,
        javaV142KeepsRuntimeBlocked: true,
        miniKvV135EvidencePresent: true,
        miniKvV135EchoesNodeV306Plan: true,
        miniKvV135ReadyForNodeV307: true,
        miniKvV135ArtifactContractEchoed: true,
        miniKvV135KeepsRuntimeBlocked: true,
        upstreamEchoesAligned: true,
        artifactContractAligned: true,
        sideEffectBoundariesAligned: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification: true,
      },
      summary: {
        requiredFieldCount: 12,
        prohibitedFieldCount: 8,
        rejectionReasonCount: 9,
        noGoBoundaryCount: 12,
        upstreamEchoRequestCount: 2,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV306.artifactDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV306.artifactDigest).toBe(profile.upstreamEvidence.miniKvV135.sourceNodeV306ArtifactDigest);
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.upstreamEvidence.javaV142.expectedSnippets.every((expected) => expected.matched)).toBe(true);
    expect(profile.upstreamEvidence.miniKvV135.expectedSnippets.every((expected) => expected.matched)).toBe(true);
  });

  it("uses committed historical fixture fallback for Java v142 and mini-kv v135", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile.verificationState).toBe("approval-prerequisite-artifact-upstream-echo-verification-ready");
    expect(profile.upstreamEvidence.javaV142.evidenceFiles.every((file) =>
      normalizePath(file.resolvedPath).includes("fixtures/historical/sibling-workspaces"))).toBe(true);
    expect(profile.upstreamEvidence.miniKvV135.evidenceFiles.every((file) =>
      normalizePath(file.resolvedPath).includes("fixtures/historical/sibling-workspaces"))).toBe(true);
    expect(profile.checks.upstreamEchoesAligned).toBe(true);
    expect(profile.checks.artifactContractAligned).toBe(true);
    expect(profile.checks.sideEffectBoundariesAligned).toBe(true);
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification)
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
          "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-upstream-echo-verification.v1",
        verificationState: "approval-prerequisite-artifact-upstream-echo-verification-ready",
        activeNodeVerificationVersion: "Node v307",
        upstreamEvidence: {
          javaV142: {
            readyForNodeV307: true,
            artifactContractEchoed: true,
            sideEffectBoundariesClosed: true,
          },
          miniKvV135: {
            readyForNodeV307: true,
            requiredFieldCount: 12,
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
        "# Managed audit manual sandbox connection credential resolver approval prerequisite artifact upstream echo verification",
      );
      expect(markdown.body).toContain("approval-prerequisite-artifact-upstream-echo-verification-ready");
      expect(markdown.body).toContain("Java v142 Echo");
      expect(markdown.body).toContain("mini-kv v135 Receipt");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-307",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v307-artifact-upstream-echo",
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
