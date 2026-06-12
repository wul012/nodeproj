import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-prerequisite-closure-review";

describe("managed audit manual sandbox connection credential resolver signed human approval artifact prerequisite closure review", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("advances only the signed human approval artifact prerequisite after Node v315", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-prerequisite-closure-review.v1",
      reviewState: "signed-human-approval-artifact-prerequisite-closure-review-ready",
      prerequisiteClosureDecision: "advance-signed-human-approval-artifact-only",
      readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview: true,
      readOnlyClosureReview: true,
      signedHumanApprovalArtifactPrerequisiteClosureReviewOnly: true,
      consumesNodeV315SignedHumanApprovalArtifactContractUpstreamEchoVerification: true,
      activeNodeReviewVersion: "Node v316",
      readyForNewJavaMiniKvEchoRequest: false,
      newJavaMiniKvEchoRequested: false,
      readyForCredentialHandleContractIntake: true,
      nextNodeVersionSuggested: "Node v317",
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
      sourceNodeV315: {
        sourceVersion: "Node v315",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-upstream-echo-verification.v1",
        verificationState: "signed-human-approval-artifact-contract-upstream-echo-verification-ready",
        readyForSignedHumanApprovalArtifactContractUpstreamEchoVerification: true,
        readOnlyUpstreamEchoVerification: true,
        sourceSpan: "Node v314 + Java v145 + mini-kv v138",
        sourceNodeV314Ready: true,
        javaV145EchoReady: true,
        miniKvV138ReceiptReady: true,
        upstreamEchoAligned: true,
        artifactContractAligned: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
        requiredFieldCount: 11,
        prohibitedFieldCount: 8,
        rejectionReasonCount: 5,
        noGoBoundaryCount: 8,
        upstreamEchoRequestCount: 2,
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
      closureReview: {
        reviewMode: "signed-human-approval-artifact-prerequisite-closure-review-only",
        sourceSpan: "Node v315",
        completedPrerequisiteCount: 2,
        remainingPrerequisiteCount: 4,
        originalPrerequisiteCount: 6,
        movedPrerequisiteId: "signed-human-approval-artifact",
        movedFrom: "contract-intake-defined",
        movedTo: "contract-intake-and-upstream-echo-complete",
        nextConcretePrerequisiteId: "credential-handle-approval",
        nextConcretePrerequisiteContractRequired: true,
        nextNodeVersionSuggested: "Node v317",
        nextJavaVersionRequested: null,
        nextMiniKvVersionRequested: null,
        chainContinuationAllowed: true,
        runtimeShellStillBlocked: true,
      },
      checks: {
        sourceNodeV315Ready: true,
        sourceNodeV315EchoAligned: true,
        sourceNodeV315KeepsRuntimeBlocked: true,
        sourceNodeV315KeepsSideEffectsClosed: true,
        signedArtifactContractCanClose: true,
        signedArtifactClosureDoesNotOpenRuntime: true,
        exactlyTwoPrerequisitesCompleted: true,
        fourPrerequisitesRemainMissing: true,
        nextConcretePrerequisiteIsCredentialHandle: true,
        noNewJavaMiniKvEchoRequested: true,
        closureReviewStillReadOnly: true,
        runtimeShellStillBlocked: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview: true,
      },
      summary: {
        originalPrerequisiteCount: 6,
        completedPrerequisiteCount: 2,
        remainingPrerequisiteCount: 4,
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
    expect(profile.sourceNodeV315.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.closureReview.reviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.closureReview.sourceVerificationDigest).toBe(profile.sourceNodeV315.verificationDigest);
    expect(profile.closureReview.completedPrerequisites.map((prerequisite) => prerequisite.id)).toEqual([
      "java-mini-kv-decision-echo",
      "signed-human-approval-artifact",
    ]);
    expect(profile.closureReview.remainingPrerequisites.map((prerequisite) => prerequisite.id)).toEqual([
      "credential-handle-approval",
      "endpoint-handle-allowlist-approval",
      "no-network-safety-fixture",
      "abort-rollback-semantics",
    ]);
    expect(profile.closureReview.completedPrerequisites.every((prerequisite) => prerequisite.opensRuntimeShell === false))
      .toBe(true);
    expect(profile.closureReview.remainingPrerequisites.every((prerequisite) => prerequisite.opensRuntimeShell === false))
      .toBe(true);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  });

  it("keeps the v315 historical fixture fallback path available", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview({
      config: loadTestConfig(),
    });

    expect(profile.reviewState).toBe("signed-human-approval-artifact-prerequisite-closure-review-ready");
    expect(profile.sourceNodeV315.readyForSignedHumanApprovalArtifactContractUpstreamEchoVerification).toBe(true);
    expect(profile.closureReview.completedPrerequisiteCount).toBe(2);
    expect(profile.closureReview.remainingPrerequisiteCount).toBe(4);
    expect(profile.closureReview.nextConcretePrerequisiteId).toBe("credential-handle-approval");
    expect(profile.newJavaMiniKvEchoRequested).toBe(false);
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.reviewState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview)
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
          "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-prerequisite-closure-review.v1",
        reviewState: "signed-human-approval-artifact-prerequisite-closure-review-ready",
        activeNodeReviewVersion: "Node v316",
        closureReview: {
          completedPrerequisiteCount: 2,
          remainingPrerequisiteCount: 4,
          movedPrerequisiteId: "signed-human-approval-artifact",
          nextConcretePrerequisiteId: "credential-handle-approval",
          runtimeShellStillBlocked: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver signed human approval artifact prerequisite closure review",
      );
      expect(markdown.body).toContain("contract-intake-and-upstream-echo-complete");
      expect(markdown.body).toContain("DEFINE_CREDENTIAL_HANDLE_APPROVAL_CONTRACT_NEXT");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-316",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v316-signed-artifact-closure-review",
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
