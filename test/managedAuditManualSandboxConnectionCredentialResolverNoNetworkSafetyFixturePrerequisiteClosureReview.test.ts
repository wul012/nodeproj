import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-prerequisite-closure-review";

describe("managed audit manual sandbox connection credential resolver no-network safety fixture prerequisite closure review", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("advances only the no-network safety fixture prerequisite after Node v324", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-prerequisite-closure-review.v1",
      reviewState: "no-network-safety-fixture-prerequisite-closure-review-ready",
      prerequisiteClosureDecision: "advance-no-network-safety-fixture-only",
      readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview:
        true,
      readOnlyClosureReview: true,
      noNetworkSafetyFixturePrerequisiteClosureReviewOnly: true,
      consumesNodeV324NoNetworkSafetyFixtureUpstreamEchoVerification: true,
      activeNodeReviewVersion: "Node v325",
      readyForNewJavaMiniKvEchoRequest: false,
      newJavaMiniKvEchoRequested: false,
      readyForAbortRollbackSemanticsContractIntake: true,
      nextNodeVersionSuggested: "Node v326",
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
      networkSafetyFixtureExecuted: false,
      httpRequestSent: false,
      tcpConnectionAttempted: false,
      networkSocketOpened: false,
      schemaMigrationExecuted: false,
      approvalLedgerWritten: false,
      automaticUpstreamStart: false,
      sourceNodeV324: {
        sourceVersion: "Node v324",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-upstream-echo-verification.v1",
        verificationState: "no-network-safety-fixture-upstream-echo-verification-ready",
        readyForNoNetworkSafetyFixtureUpstreamEchoVerification: true,
        readOnlyUpstreamEchoVerification: true,
        sourceSpan: "Node v323 + Java v149 + mini-kv v141",
        sourceNodeV323Ready: true,
        javaV149EchoReady: true,
        miniKvV141ReceiptReady: true,
        upstreamEchoAligned: true,
        noNetworkSafetyFixtureContractAligned: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
        remainingPrerequisitesAfterV324: [
          "no-network-safety-fixture",
          "abort-rollback-semantics",
        ],
        requiredFieldCount: 10,
        prohibitedFieldCount: 12,
        rejectionReasonCount: 6,
        noGoBoundaryCount: 10,
        upstreamEchoRequestCount: 2,
        sourceProductionBlockerCount: 0,
        runtimeShellImplemented: false,
        runtimeShellInvocationAllowed: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
        networkSafetyFixtureExecuted: false,
        httpRequestSent: false,
        tcpConnectionAttempted: false,
        networkSocketOpened: false,
        schemaMigrationExecuted: false,
        approvalLedgerWritten: false,
        automaticUpstreamStart: false,
      },
      closureReview: {
        reviewMode: "no-network-safety-fixture-prerequisite-closure-review-only",
        sourceSpan: "Node v324",
        completedPrerequisiteCount: 5,
        remainingPrerequisiteCount: 1,
        originalPrerequisiteCount: 6,
        movedPrerequisiteId: "no-network-safety-fixture",
        movedFrom: "contract-intake-defined",
        movedTo: "contract-intake-and-upstream-echo-complete",
        nextConcretePrerequisiteId: "abort-rollback-semantics",
        nextConcretePrerequisiteContractRequired: true,
        nextNodeVersionSuggested: "Node v326",
        nextJavaVersionRequested: null,
        nextMiniKvVersionRequested: null,
        chainContinuationAllowed: true,
        runtimeShellStillBlocked: true,
      },
      checks: {
        sourceNodeV324Ready: true,
        sourceNodeV324EchoAligned: true,
        sourceNodeV324KeepsRuntimeBlocked: true,
        sourceNodeV324KeepsNetworkSideEffectsClosed: true,
        noNetworkSafetyFixtureCanClose: true,
        noNetworkSafetyFixtureClosureDoesNotOpenRuntime: true,
        exactlyFivePrerequisitesCompleted: true,
        onePrerequisiteRemainsMissing: true,
        nextConcretePrerequisiteIsAbortRollbackSemantics: true,
        noNewJavaMiniKvEchoRequested: true,
        closureReviewStillReadOnly: true,
        runtimeShellStillBlocked: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview:
          true,
      },
      summary: {
        originalPrerequisiteCount: 6,
        completedPrerequisiteCount: 5,
        remainingPrerequisiteCount: 1,
        requiredFieldCount: 10,
        prohibitedFieldCount: 12,
        rejectionReasonCount: 6,
        noGoBoundaryCount: 10,
        upstreamEchoRequestCount: 2,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV324.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.closureReview.reviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.closureReview.sourceVerificationDigest).toBe(profile.sourceNodeV324.verificationDigest);
    expect(profile.closureReview.completedPrerequisites.map((prerequisite) => prerequisite.id)).toEqual([
      "java-mini-kv-decision-echo",
      "signed-human-approval-artifact",
      "credential-handle-approval",
      "endpoint-handle-allowlist-approval",
      "no-network-safety-fixture",
    ]);
    expect(profile.closureReview.remainingPrerequisites.map((prerequisite) => prerequisite.id)).toEqual([
      "abort-rollback-semantics",
    ]);
    expect(profile.closureReview.completedPrerequisites.every((prerequisite) => prerequisite.opensRuntimeShell === false))
      .toBe(true);
    expect(profile.closureReview.remainingPrerequisites.every((prerequisite) => prerequisite.opensRuntimeShell === false))
      .toBe(true);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("keeps the v324 historical fixture fallback path available", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview({
      config: loadTestConfig(),
    });

    expect(profile.reviewState).toBe("no-network-safety-fixture-prerequisite-closure-review-ready");
    expect(profile.sourceNodeV324.readyForNoNetworkSafetyFixtureUpstreamEchoVerification).toBe(true);
    expect(profile.closureReview.completedPrerequisiteCount).toBe(5);
    expect(profile.closureReview.remainingPrerequisiteCount).toBe(1);
    expect(profile.closureReview.nextConcretePrerequisiteId).toBe("abort-rollback-semantics");
    expect(profile.newJavaMiniKvEchoRequested).toBe(false);
  }, 60000);

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.reviewState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview)
      .toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.httpRequestSent).toBe(false);
    expect(profile.tcpConnectionAttempted).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-prerequisite-closure-review.v1",
        reviewState: "no-network-safety-fixture-prerequisite-closure-review-ready",
        activeNodeReviewVersion: "Node v325",
        closureReview: {
          completedPrerequisiteCount: 5,
          remainingPrerequisiteCount: 1,
          movedPrerequisiteId: "no-network-safety-fixture",
          nextConcretePrerequisiteId: "abort-rollback-semantics",
          runtimeShellStillBlocked: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver no-network safety fixture prerequisite closure review",
      );
      expect(markdown.body).toContain("contract-intake-and-upstream-echo-complete");
      expect(markdown.body).toContain("DEFINE_ABORT_ROLLBACK_SEMANTICS_CONTRACT_NEXT");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-325",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v325-no-network-closure-review",
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
