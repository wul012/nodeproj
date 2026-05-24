import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-prerequisite-closure-review";

describe("managed audit manual sandbox connection credential resolver endpoint handle allowlist approval prerequisite closure review", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("advances only the endpoint handle allowlist approval prerequisite after Node v321", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-prerequisite-closure-review.v1",
      reviewState: "endpoint-handle-allowlist-approval-prerequisite-closure-review-ready",
      prerequisiteClosureDecision: "advance-endpoint-handle-allowlist-approval-only",
      readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview:
        true,
      readOnlyClosureReview: true,
      endpointHandleAllowlistApprovalPrerequisiteClosureReviewOnly: true,
      consumesNodeV321EndpointHandleAllowlistApprovalContractUpstreamEchoVerification: true,
      activeNodeReviewVersion: "Node v322",
      readyForNewJavaMiniKvEchoRequest: false,
      newJavaMiniKvEchoRequested: false,
      readyForNoNetworkSafetyFixtureContractIntake: true,
      nextNodeVersionSuggested: "Node v323",
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
      endpointHandleAllowlistApproved: false,
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
      sourceNodeV321: {
        sourceVersion: "Node v321",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-upstream-echo-verification.v1",
        verificationState: "endpoint-handle-allowlist-approval-contract-upstream-echo-verification-ready",
        readyForEndpointHandleAllowlistApprovalContractUpstreamEchoVerification: true,
        readOnlyUpstreamEchoVerification: true,
        sourceSpan: "Node v320 + Java v147 + mini-kv v140",
        sourceNodeV320Ready: true,
        javaV147EchoReady: true,
        miniKvV140ReceiptReady: true,
        upstreamEchoAligned: true,
        endpointHandleAllowlistContractAligned: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
        remainingPrerequisitesAfterV321: [
          "endpoint-handle-allowlist-approval",
          "no-network-safety-fixture",
          "abort-rollback-semantics",
        ],
        requiredFieldCount: 10,
        prohibitedFieldCount: 8,
        rejectionReasonCount: 5,
        noGoBoundaryCount: 9,
        upstreamEchoRequestCount: 2,
        sourceProductionBlockerCount: 0,
        runtimeShellImplemented: false,
        runtimeShellInvocationAllowed: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        endpointHandleAllowlistApproved: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
        schemaMigrationExecuted: false,
        approvalLedgerWritten: false,
        automaticUpstreamStart: false,
      },
      closureReview: {
        reviewMode: "endpoint-handle-allowlist-approval-prerequisite-closure-review-only",
        sourceSpan: "Node v321",
        completedPrerequisiteCount: 4,
        remainingPrerequisiteCount: 2,
        originalPrerequisiteCount: 6,
        movedPrerequisiteId: "endpoint-handle-allowlist-approval",
        movedFrom: "contract-intake-defined",
        movedTo: "contract-intake-and-upstream-echo-complete",
        nextConcretePrerequisiteId: "no-network-safety-fixture",
        nextConcretePrerequisiteContractRequired: true,
        nextNodeVersionSuggested: "Node v323",
        nextJavaVersionRequested: null,
        nextMiniKvVersionRequested: null,
        chainContinuationAllowed: true,
        runtimeShellStillBlocked: true,
      },
      checks: {
        sourceNodeV321Ready: true,
        sourceNodeV321EchoAligned: true,
        sourceNodeV321KeepsRuntimeBlocked: true,
        sourceNodeV321KeepsSideEffectsClosed: true,
        endpointHandleAllowlistContractCanClose: true,
        endpointHandleAllowlistClosureDoesNotOpenRuntime: true,
        exactlyFourPrerequisitesCompleted: true,
        twoPrerequisitesRemainMissing: true,
        nextConcretePrerequisiteIsNoNetworkSafetyFixture: true,
        noNewJavaMiniKvEchoRequested: true,
        closureReviewStillReadOnly: true,
        runtimeShellStillBlocked: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview:
          true,
      },
      summary: {
        originalPrerequisiteCount: 6,
        completedPrerequisiteCount: 4,
        remainingPrerequisiteCount: 2,
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
    expect(profile.sourceNodeV321.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.closureReview.reviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.closureReview.sourceVerificationDigest).toBe(profile.sourceNodeV321.verificationDigest);
    expect(profile.closureReview.completedPrerequisites.map((prerequisite) => prerequisite.id)).toEqual([
      "java-mini-kv-decision-echo",
      "signed-human-approval-artifact",
      "credential-handle-approval",
      "endpoint-handle-allowlist-approval",
    ]);
    expect(profile.closureReview.remainingPrerequisites.map((prerequisite) => prerequisite.id)).toEqual([
      "no-network-safety-fixture",
      "abort-rollback-semantics",
    ]);
    expect(profile.closureReview.completedPrerequisites.every((prerequisite) => prerequisite.opensRuntimeShell === false))
      .toBe(true);
    expect(profile.closureReview.remainingPrerequisites.every((prerequisite) => prerequisite.opensRuntimeShell === false))
      .toBe(true);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  });

  it("keeps the v321 historical fixture fallback path available", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview({
      config: loadTestConfig(),
    });

    expect(profile.reviewState).toBe("endpoint-handle-allowlist-approval-prerequisite-closure-review-ready");
    expect(profile.sourceNodeV321.readyForEndpointHandleAllowlistApprovalContractUpstreamEchoVerification).toBe(true);
    expect(profile.closureReview.completedPrerequisiteCount).toBe(4);
    expect(profile.closureReview.remainingPrerequisiteCount).toBe(2);
    expect(profile.closureReview.nextConcretePrerequisiteId).toBe("no-network-safety-fixture");
    expect(profile.newJavaMiniKvEchoRequested).toBe(false);
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.reviewState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview)
      .toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.externalRequestSent).toBe(false);
  }, 60000);

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
          "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-prerequisite-closure-review.v1",
        reviewState: "endpoint-handle-allowlist-approval-prerequisite-closure-review-ready",
        activeNodeReviewVersion: "Node v322",
        closureReview: {
          completedPrerequisiteCount: 4,
          remainingPrerequisiteCount: 2,
          movedPrerequisiteId: "endpoint-handle-allowlist-approval",
          nextConcretePrerequisiteId: "no-network-safety-fixture",
          runtimeShellStillBlocked: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver endpoint handle allowlist approval prerequisite closure review",
      );
      expect(markdown.body).toContain("contract-intake-and-upstream-echo-complete");
      expect(markdown.body).toContain("DEFINE_NO_NETWORK_SAFETY_FIXTURE_CONTRACT_NEXT");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-322",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v322-endpoint-handle-closure-review",
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
